"use client";
import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

function RedirectToAccess() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const redirect = searchParams.get("redirect") || "/dashboard";
    const safeRedirect = redirect.startsWith("/") ? redirect : "/dashboard";
    window.location.href = `/access?redirect=${encodeURIComponent(safeRedirect)}`;
  }, [searchParams]);

  return null;
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#050c1a] flex items-center justify-center px-4">
      <Suspense>
        <RedirectToAccess />
      </Suspense>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="text-2xl font-bold mb-4">
          <span className="text-blue-400">KORYXA</span>
          <span className="text-white"> Formation</span>
        </div>
        <div className="flex items-center gap-3 text-slate-400">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full"
          />
          Redirection vers l&apos;accès formation...
        </div>
      </motion.div>
    </div>
  );
}
