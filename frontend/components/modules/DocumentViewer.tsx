"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Download, ExternalLink, Maximize2, Minimize2 } from "lucide-react";
import type { Resource } from "@/types";

// Détecte si l'URL est embeddable dans une iframe
function getEmbedUrl(url: string): string | null {
  // Google Docs / Slides / Sheets
  const gdoc = url.match(/docs\.google\.com\/(document|presentation|spreadsheets)\/d\/([^/]+)/);
  if (gdoc) {
    const base = url.split("/edit")[0].split("/pub")[0].split("/view")[0];
    return `${base}/preview`;
  }
  // PDF direct
  if (url.match(/\.pdf(\?|$)/i)) return url;
  // Google Drive file
  if (url.match(/drive\.google\.com\/file\/d\/([^/]+)/)) {
    const id = url.match(/\/d\/([^/]+)/)?.[1];
    return id ? `https://drive.google.com/file/d/${id}/preview` : null;
  }
  // Fichier Office (.docx, .doc, .pptx, .xlsx…) → Google Docs Viewer
  if (url.match(/\.(docx?|pptx?|xlsx?)(\?|$)/i)) {
    return `https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true`;
  }
  return null;
}

interface DocumentViewerProps {
  resource: Resource;
}

export default function DocumentViewer({ resource }: DocumentViewerProps) {
  const [expanded, setExpanded] = useState(false);
  const embedUrl = getEmbedUrl(resource.url);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-blue-500/20 bg-gradient-to-b from-[#0d1a2e] to-[#080f1e] overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4 px-6 py-5 border-b border-white/5">
        <div className="flex items-start gap-4">
          <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-blue-500/15 border border-blue-500/25 shrink-0 mt-0.5">
            <FileText size={20} className="text-blue-400" />
          </div>
          <div>
            <p className="text-xs font-semibold text-blue-400 uppercase tracking-widest mb-1">Document de cours</p>
            <h2 className="text-lg font-bold text-white leading-snug">{resource.title}</h2>
            {resource.description && (
              <p className="text-slate-400 text-sm mt-1">{resource.description}</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <a
            href={embedUrl ?? `https://docs.google.com/viewer?url=${encodeURIComponent(resource.url)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white border border-white/10 hover:border-white/25 bg-white/3 hover:bg-white/8 px-3 py-1.5 rounded-lg transition"
          >
            <ExternalLink size={12} /> Ouvrir
          </a>
          <a
            href={resource.url}
            download
            className="flex items-center gap-1.5 text-xs text-blue-300 hover:text-blue-200 border border-blue-500/30 hover:border-blue-400/50 bg-blue-500/8 hover:bg-blue-500/15 px-3 py-1.5 rounded-lg transition"
          >
            <Download size={12} /> Télécharger
          </a>
        </div>
      </div>

      {/* Embed ou fallback card */}
      {embedUrl ? (
        <div>
          <div className={`relative transition-all duration-300 ${expanded ? "h-[80vh]" : "h-[600px]"}`}>
            <iframe
              src={embedUrl}
              title={resource.title}
              className="w-full h-full border-0"
              allow="fullscreen"
            />
          </div>
          <div className="flex items-center justify-end px-4 py-2 bg-white/2 border-t border-white/5">
            <button
              onClick={() => setExpanded((v) => !v)}
              className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 transition"
            >
              {expanded ? <><Minimize2 size={12} /> Réduire</> : <><Maximize2 size={12} /> Agrandir</>}
            </button>
          </div>
        </div>
      ) : (
        /* Fallback : pas embeddable, on présente une belle carte d'accès */
        <div className="px-6 py-8 flex flex-col items-center gap-6 text-center">
          <div className="w-20 h-20 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
            <FileText size={36} className="text-blue-400" />
          </div>
          <div>
            <p className="text-white font-semibold text-base mb-1">{resource.title}</p>
            {resource.description && <p className="text-slate-400 text-sm">{resource.description}</p>}
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href={`https://docs.google.com/viewer?url=${encodeURIComponent(resource.url)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-xl transition"
              >
                <ExternalLink size={16} /> Ouvrir le document
              </motion.button>
            </a>
            <a href={resource.url} download>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 border border-white/15 hover:border-white/30 text-slate-300 hover:text-white font-semibold px-6 py-3 rounded-xl transition"
              >
                <Download size={16} /> Télécharger
              </motion.button>
            </a>
          </div>
          <p className="text-slate-600 text-xs">Le document s&apos;ouvre dans un nouvel onglet</p>
        </div>
      )}
    </motion.div>
  );
}
