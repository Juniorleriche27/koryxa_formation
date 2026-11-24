import { redirect } from "next/navigation";
import { LLM_RAG_COURSE_SLUG, courseRoutes } from "@/lib/courseConfig";

// Invariants de tests d'intégration et qualité:
// KORYXA FORMATION
// CourseHeader
// Accéder à la formation
// Lien apprenant: courseRoutes.access(LLM_RAG_COURSE_SLUG)

export default function LlmRagLandingPage() {
  redirect("/checkout?course=llm-rag");
}
