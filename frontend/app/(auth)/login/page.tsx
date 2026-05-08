"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

export default function LoginPage() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const redirectPath = searchParams.get("redirect") ?? "/dashboard";
    const returnUrl    = (process.env.NEXT_PUBLIC_APP_URL ?? "") + redirectPath;
    const koryxaLogin  = process.env.NEXT_PUBLIC_KORYXA_SITE_URL + "/login";
    window.location.href = `${koryxaLogin}?redirect=${encodeURIComponent(returnUrl)}`;
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-[#050c1a] flex items-center justify-center px-4">
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
          Redirection vers KORYXA...
        </div>
      </motion.div>
    </div>
  );
}
