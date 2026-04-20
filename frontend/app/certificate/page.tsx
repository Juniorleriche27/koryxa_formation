"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { certificatesAPI } from "@/lib/api";
import type { Certificate } from "@/types";
import Navbar from "@/components/layout/Navbar";

export default function CertificatePage() {
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [error, setError]             = useState("");

  useEffect(() => {
    certificatesAPI.getMy()
      .then((r) => setCertificate(r.data))
      .catch(() => setError("Certificat non disponible. Complète tous les modules."));
  }, []);

  if (error) return (
    <div className="min-h-screen bg-[#050c1a] flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4">🔒</div>
          <p className="text-slate-400 text-lg">{error}</p>
        </div>
      </div>
    </div>
  );

  if (!certificate) return (
    <div className="min-h-screen bg-[#050c1a] flex items-center justify-center">
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full" />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050c1a] flex flex-col relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px]" />
      </div>
      <Navbar />
      <div className="flex-1 flex items-center justify-center p-8 relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/5 border-2 border-blue-500/40 rounded-3xl p-12 max-w-2xl w-full text-center backdrop-blur-sm"
          style={{ boxShadow: "0 0 60px rgba(59,130,246,0.15)" }}
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-7xl mb-6"
          >
            🏆
          </motion.div>
          <h1 className="text-3xl font-bold text-white mb-2">Certificat de complétion</h1>
          <p className="text-slate-400 mb-6">Formation : Analyse de Données avec Python</p>
          <div className="border-t border-white/10 border-b py-6 my-6">
            <p className="text-blue-400 font-bold text-xl">KORYXA Tech Store</p>
          </div>
          <p className="text-slate-500 text-sm">
            Délivré le{" "}
            {new Date(certificate.issued_at).toLocaleDateString("fr-FR", {
              year: "numeric", month: "long", day: "numeric"
            })}
          </p>
          {certificate.certificate_url && (
            <motion.a
              href={certificate.certificate_url} target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              className="inline-block mt-8 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold px-8 py-3 rounded-xl"
            >
              Télécharger le certificat
            </motion.a>
          )}
        </motion.div>
      </div>
    </div>
  );
}
