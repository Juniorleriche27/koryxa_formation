"use client";

import { useEffect, useState } from "react";
import { Loader2, ServerCrash, Wifi } from "lucide-react";

type ApiState = "idle" | "waking" | "ready" | "offline";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const HEALTH_URL = API_URL ? `${API_URL.replace(/\/$/, "")}/health` : "";
const WAKE_INTERVAL_MS = 8 * 60 * 1000;

async function pingApi(signal?: AbortSignal) {
  if (!HEALTH_URL) return false;

  const response = await fetch(HEALTH_URL, {
    method: "GET",
    cache: "no-store",
    signal,
  });

  return response.ok;
}

export default function ApiWakeStatus() {
  const [state, setState] = useState<ApiState>("idle");

  useEffect(() => {
    if (!HEALTH_URL) return;

    let stopped = false;
    let interval: ReturnType<typeof setInterval> | undefined;

    const wakeApi = async (showStatus = true) => {
      if (showStatus) setState("waking");

      for (let attempt = 0; attempt < 4; attempt += 1) {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 12000);

        try {
          const ok = await pingApi(controller.signal);
          clearTimeout(timeout);

          if (stopped) return;

          if (ok) {
            setState("ready");
            window.setTimeout(() => {
              if (!stopped) setState("idle");
            }, 3500);
            return;
          }
        } catch {
          clearTimeout(timeout);
        }

        await new Promise((resolve) => window.setTimeout(resolve, 2500 + attempt * 1500));
      }

      if (!stopped) setState("offline");
    };

    wakeApi(true);

    interval = setInterval(() => {
      if (document.visibilityState === "visible") {
        wakeApi(false);
      }
    }, WAKE_INTERVAL_MS);

    const onVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        wakeApi(false);
      }
    };

    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      stopped = true;
      if (interval) clearInterval(interval);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  if (state === "idle") return null;

  const copy = {
    waking: {
      icon: <Loader2 className="h-4 w-4 animate-spin text-blue-300" />,
      title: "Réactivation du serveur",
      message: "L'espace de formation se prépare. Cela peut prendre quelques secondes.",
    },
    ready: {
      icon: <Wifi className="h-4 w-4 text-emerald-300" />,
      title: "Serveur prêt",
      message: "La plateforme est connectée.",
    },
    offline: {
      icon: <ServerCrash className="h-4 w-4 text-orange-300" />,
      title: "Serveur lent à répondre",
      message: "Actualise la page dans quelques secondes si les modules ne chargent pas.",
    },
    idle: {
      icon: null,
      title: "",
      message: "",
    },
  }[state];

  return (
    <div className="fixed bottom-4 left-4 right-4 z-[60] mx-auto max-w-md rounded-2xl border border-white/10 bg-[#071326]/95 p-4 text-white shadow-2xl shadow-blue-950/40 backdrop-blur sm:left-auto sm:right-5 sm:w-[380px]">
      <div className="flex gap-3">
        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
          {copy.icon}
        </div>
        <div>
          <p className="text-sm font-semibold">{copy.title}</p>
          <p className="mt-1 text-xs leading-5 text-slate-300">{copy.message}</p>
        </div>
      </div>
    </div>
  );
}
