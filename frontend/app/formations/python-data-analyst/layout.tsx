import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Formation Python Data Analyst — KORYXA Formation",
  description: "Formation Python Data Analyst KORYXA : Python, Pandas, notebooks, quiz, projet portfolio et certificat.",
  alternates: {
    canonical: "/formations/python-data-analyst",
  },
};

export default function PythonDataAnalystLayout({ children }: { children: React.ReactNode }) {
  return children;
}
