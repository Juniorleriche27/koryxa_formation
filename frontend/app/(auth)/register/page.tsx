"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { authAPI } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm]     = useState({ full_name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await authAPI.register(form);
      router.push("/login?registered=1");
    } catch {
      setError("Une erreur est survenue. Vérifie tes informations.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050c1a] flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-bold">
            <span className="text-blue-400">KORYXA</span>
            <span className="text-white"> Formation</span>
          </Link>
          <p className="text-slate-400 mt-2">Crée ton compte gratuitement</p>
        </div>

        <div className="bg-white/3 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
          <h1 className="text-2xl font-bold text-white mb-6">Créer un compte</h1>

          {error && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="bg-red-500/10 border border-red-500/30 text-red-300 text-sm px-4 py-3 rounded-xl mb-4">
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { type: "text",     placeholder: "Nom complet",  key: "full_name" },
              { type: "email",    placeholder: "Email",        key: "email" },
              { type: "password", placeholder: "Mot de passe", key: "password" },
            ].map((field) => (
              <input
                key={field.key}
                type={field.type}
                placeholder={field.placeholder}
                value={form[field.key as keyof typeof form]}
                onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                className="w-full bg-white/5 border border-white/10 text-white placeholder-slate-500 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            ))}

            <motion.button
              type="submit" disabled={loading}
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              animate={{ boxShadow: loading ? "none" : ["0 0 8px #3b82f6", "0 0 20px #3b82f6", "0 0 8px #3b82f6"] }}
              transition={{ boxShadow: { duration: 2, repeat: Infinity } }}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold py-3 rounded-xl disabled:opacity-50 transition"
            >
              {loading ? "Création du compte..." : "S'inscrire gratuitement"}
            </motion.button>
          </form>

          <p className="text-center text-slate-500 mt-5 text-sm">
            Déjà un compte ?{" "}
            <Link href="/login" className="text-blue-400 font-medium hover:text-blue-300">
              Se connecter
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
