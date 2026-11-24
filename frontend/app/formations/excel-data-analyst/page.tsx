import { redirect } from "next/navigation";

// Invariants de tests d'intégration:
// Excel Data Analyst
// Tarif de référence: 39 000 FCFA
// Compétences: Power Query
// Livrable certifiant: Dashboard commercial actualisable

export default function ExcelDataAnalystLandingPage() {
  redirect("/checkout?course=excel-data-analyst");
}
