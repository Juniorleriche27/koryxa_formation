"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { normalizeCourseSlug, courseRoutes } from "@/lib/courseConfig";

function AccessRedirect() {
  const searchParams = useSearchParams();
  const courseSlug = normalizeCourseSlug(searchParams.get("course"));
  const target = courseRoutes.dashboard(courseSlug);

  useEffect(() => {
    // course: courseSlug
    window.location.replace(`https://accounts.koryxa.fr/sign-in?redirect_url=${encodeURIComponent(target)}`);
  }, [target]);

  return null;
}

export default function AccessPage() {
  return (
    <Suspense fallback={null}>
      <AccessRedirect />
    </Suspense>
  );
}
