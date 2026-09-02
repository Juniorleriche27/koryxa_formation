from datetime import datetime, timezone
from fastapi import HTTPException, status
from app.database import get_service_supabase
from app.services.partner_attribution_service import sync_partner_sale


def _course_by_slug(course_slug: str) -> dict:
    db = get_service_supabase()
    result = (
        db.table("courses")
        .select("id,slug,title,is_published,price_amount,price_currency,partner_product_slug")
        .eq("slug", course_slug)
        .limit(1)
        .execute()
    )
    if not result.data:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Formation introuvable")
    course = result.data[0]
    if not course.get("is_published"):
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Formation non disponible à l'achat")
    if course.get("price_amount") is None:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Tarif non configuré")
    return course


def get_or_create_order(user, course_slug: str, partner_code: str | None = None) -> dict:
    db = get_service_supabase()
    course = _course_by_slug(course_slug)
    user_id = str(user.id)
    email = user.email or ""

    existing = (
        db.table("formation_orders")
        .select("*")
        .eq("learner_user_id", user_id)
        .eq("course_id", course["id"])
        .in_("status", ["pending", "payment_submitted", "paid"])
        .order("created_at", desc=True)
        .limit(1)
        .execute()
    )
    if existing.data:
        return {**existing.data[0], "course_slug": course["slug"], "course_title": course["title"]}

    payload = {
        "learner_user_id": user_id,
        "learner_email": email,
        "course_id": course["id"],
        "amount": course["price_amount"],
        "currency": course.get("price_currency") or "XOF",
        "status": "pending",
        "partner_code": partner_code.strip() if partner_code else None,
        "partner_attribution_status": "pending" if partner_code and partner_code.strip() else None,
    }
    created = db.table("formation_orders").insert(payload).execute()
    if not created.data:
        raise HTTPException(status_code=500, detail="Impossible de créer la commande")
    return {**created.data[0], "course_slug": course["slug"], "course_title": course["title"]}


def list_orders(user) -> list[dict]:
    db = get_service_supabase()
    result = (
        db.table("formation_orders")
        .select("*,courses(slug)")
        .eq("learner_user_id", str(user.id))
        .order("created_at", desc=True)
        .execute()
    )
    orders = []
    for row in result.data or []:
        course = row.pop("courses", None) or {}
        row["course_slug"] = course.get("slug", "")
        orders.append(row)
    return orders


def submit_payment(user, order_id: str, payment_method: str, payment_reference: str) -> dict:
    db = get_service_supabase()
    owned = (
        db.table("formation_orders")
        .select("*,courses(slug)")
        .eq("id", order_id)
        .eq("learner_user_id", str(user.id))
        .limit(1)
        .execute()
    )
    if not owned.data:
        raise HTTPException(status_code=404, detail="Commande introuvable")
    order = owned.data[0]
    if order["status"] == "paid":
        return {**order, "course_slug": (order.get("courses") or {}).get("slug", "")}
    if order["status"] not in {"pending", "payment_submitted"}:
        raise HTTPException(status_code=409, detail="Cette commande ne peut plus recevoir de paiement")

    duplicate = (
        db.table("formation_orders")
        .select("id")
        .eq("payment_reference", payment_reference.strip())
        .neq("id", order_id)
        .limit(1)
        .execute()
    )
    if duplicate.data:
        raise HTTPException(status_code=409, detail="Référence de paiement déjà utilisée")

    updated = (
        db.table("formation_orders")
        .update({
            "payment_method": payment_method,
            "payment_reference": payment_reference.strip(),
            "status": "payment_submitted",
        })
        .eq("id", order_id)
        .execute()
    )
    row = updated.data[0]
    row["course_slug"] = (order.get("courses") or {}).get("slug", "")
    return row


def confirm_payment_and_enroll(order_id: str, new_status: str) -> dict:
    db = get_service_supabase()
    result = db.table("formation_orders").select("*").eq("id", order_id).limit(1).execute()
    if not result.data:
        raise HTTPException(status_code=404, detail="Commande introuvable")
    order = result.data[0]

    if new_status == "failed":
        if order["status"] == "paid":
            raise HTTPException(status_code=409, detail="Une commande payée ne peut pas être rejetée")
        updated = db.table("formation_orders").update({"status": "failed"}).eq("id", order_id).execute()
        return {"order": updated.data[0], "enrollment": None}

    if order["status"] not in {"payment_submitted", "paid"}:
        raise HTTPException(status_code=409, detail="Le paiement doit d'abord être soumis")

    now = datetime.now(timezone.utc).isoformat()
    if order["status"] != "paid":
        paid = db.table("formation_orders").update({"status": "paid", "paid_at": now}).eq("id", order_id).execute()
        order = paid.data[0]

    existing = (
        db.table("formation_enrollments")
        .select("*")
        .eq("learner_user_id", order["learner_user_id"])
        .eq("course_id", order["course_id"])
        .limit(1)
        .execute()
    )
    if existing.data:
        enrollment = existing.data[0]
        if enrollment["status"] != "active":
            refreshed = (
                db.table("formation_enrollments")
                .update({"status": "active", "order_id": order_id, "access_source": "purchase", "revoked_at": None})
                .eq("id", enrollment["id"])
                .execute()
            )
            enrollment = refreshed.data[0]
    else:
        created = (
            db.table("formation_enrollments")
            .insert({
                "learner_user_id": order["learner_user_id"],
                "course_id": order["course_id"],
                "order_id": order_id,
                "status": "active",
                "access_source": "purchase",
            })
            .execute()
        )
        enrollment = created.data[0]

    course_result = db.table("courses").select("slug,partner_product_slug").eq("id", order["course_id"]).limit(1).execute()
    course_row = course_result.data[0] if course_result.data else {}
    course_slug = course_row.get("slug", "")
    partner_product_slug = course_row.get("partner_product_slug")
    attribution = sync_partner_sale(order, course_slug, partner_product_slug) if order.get("partner_code") else {"required": False, "synced": False}

    refreshed_order = db.table("formation_orders").select("*").eq("id", order_id).limit(1).execute()
    return {
        "order": refreshed_order.data[0] if refreshed_order.data else order,
        "enrollment": enrollment,
        "partner_attribution": attribution,
    }


def list_enrollments(user) -> list[dict]:
    db = get_service_supabase()
    result = (
        db.table("formation_enrollments")
        .select("*,courses(slug)")
        .eq("learner_user_id", str(user.id))
        .order("created_at", desc=True)
        .execute()
    )
    enrollments = []
    for row in result.data or []:
        course = row.pop("courses", None) or {}
        row["course_slug"] = course.get("slug", "")
        enrollments.append(row)
    return enrollments


CAREER_PACKS = {
    "full-stack-data-analyst": {
        "title": "Pack Full-Stack Data Analyst",
        "courses": ["excel-data-analyst", "sql-data-analyst", "power-bi-data-analyst"],
    },
    "data-scientist-ai-engineer": {
        "title": "Pack Data Scientist & AI Engineer",
        "courses": ["python-data-analyst", "statistics-data-science-python", "machine-learning-python", "llm-rag"],
    },
    "data-ultimate-all-access": {
        "title": "Pack Data Ultimate All-Access",
        "courses": [
            "python-data-analyst",
            "excel-data-analyst",
            "sql-data-analyst",
            "power-bi-data-analyst",
            "statistics-data-science-python",
            "machine-learning-python",
            "data-engineering-python-sql",
            "llm-rag",
        ],
    },
}


def process_koryxa_pay_webhook(payload) -> dict:
    db = get_service_supabase()
    now = datetime.now(timezone.utc).isoformat()

    event = payload.event
    if event == "payment.failed":
        return {
            "success": True,
            "status": "acknowledged",
            "event": "payment.failed",
            "transaction_id": payload.transaction_id,
        }

    # Résolution des cours concernés
    if payload.item_type == "pack":
        pack_info = CAREER_PACKS.get(payload.item_slug)
        if not pack_info:
            raise HTTPException(status_code=404, detail=f"Pack inconnu : {payload.item_slug}")
        course_slugs = pack_info["courses"]
    else:
        course_slugs = [payload.item_slug]

    learner_user_id = payload.clerk_user_id or payload.learner_email.strip().lower()
    learner_email = payload.learner_email.strip().lower()

    enrolled_courses = []
    created_orders = []

    for slug in course_slugs:
        course_result = db.table("courses").select("id,slug,title,price_amount").eq("slug", slug).limit(1).execute()
        if not course_result.data:
            continue
        course = course_result.data[0]
        course_id = course["id"]

        # Création ou mise à jour de la commande
        order_payload = {
            "learner_user_id": learner_user_id,
            "learner_email": learner_email,
            "course_id": course_id,
            "amount": float(payload.amount) if payload.item_type != "pack" else 0.0,
            "currency": payload.currency,
            "status": "paid",
            "payment_method": payload.payment_method,
            "payment_reference": payload.payment_reference or payload.transaction_id,
            "partner_code": payload.partner_code,
            "paid_at": now,
        }

        order_res = db.table("formation_orders").insert(order_payload).execute()
        if order_res.data:
            created_orders.append(order_res.data[0])

        # Création ou activation de l'enrollment
        existing_enrollment = (
            db.table("formation_enrollments")
            .select("*")
            .eq("learner_user_id", learner_user_id)
            .eq("course_id", course_id)
            .limit(1)
            .execute()
        )

        if existing_enrollment.data:
            enroll_id = existing_enrollment.data[0]["id"]
            db.table("formation_enrollments").update({
                "status": "active",
                "access_source": "koryxa_pay",
                "revoked_at": None,
            }).eq("id", enroll_id).execute()
        else:
            db.table("formation_enrollments").insert({
                "learner_user_id": learner_user_id,
                "course_id": course_id,
                "status": "active",
                "access_source": "koryxa_pay",
            }).execute()

        enrolled_courses.append(slug)

    return {
        "success": True,
        "transaction_id": payload.transaction_id,
        "item_type": payload.item_type,
        "item_slug": payload.item_slug,
        "enrolled_courses": enrolled_courses,
        "learner_email": learner_email,
        "orders_count": len(created_orders),
    }
