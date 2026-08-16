"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";

type Props = {
  courseSlug: string;
  className?: string;
  children: ReactNode;
};

export default function PurchaseCourseLink({ courseSlug, className, children }: Props) {
  const base = `/checkout?course=${encodeURIComponent(courseSlug)}`;
  const [href, setHref] = useState(base);

  useEffect(() => {
    const ref = new URLSearchParams(window.location.search).get("ref")?.trim();
    setHref(ref ? `${base}&ref=${encodeURIComponent(ref)}` : base);
  }, [base]);

  return <Link href={href} className={className}>{children}</Link>;
}
