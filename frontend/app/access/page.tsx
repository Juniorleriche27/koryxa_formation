"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { normalizeCourseSlug, courseRoutes } from "@/lib/courseConfig";

function AccessRedirect() {
  const searchParams = useSearchParams();
  const courseSlug = normalizeCourseSlug(searchParams.get("course"));

  useEffect(() => {
    const params = new URLSearchParams();
    if (courseSlug) {
      params.set("course", courseSlug);
      void courseRoutes.dashboard(courseSlug);
    }
    // Payload context: { course: courseSlug }
    window.location.replace(`/login${params.toString() ? `?${params.toString()}` : ""}`);
  }, [courseSlug]);

  return null;
}

export default function AccessPage() {
  return (
    <Suspense fallback={null}>
      <AccessRedirect />
    </Suspense>
  );
}
