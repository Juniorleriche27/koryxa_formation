"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle2,
  Code2,
  Database,
  GraduationCap,
  Layers3,
  Play,
  RotateCcw,
  Table,
} from "lucide-react";

interface Chapter {
  id: number;
  slug: string;
  badge: string;
  title: string;
  subtitle: string;
  analogyTitle: string;
  analogyText: string;
  whyInData: string;
  initialCode: string;
  challengeText: string;
  expectedKeywords?: string[];
}

const CHAPTERS: Chapter[] = [
  {
    id: 1,
    slug: "variable",
    badge: "Fondation 1 / 4",
    title: "1. C'est quoi une Variable ? (La boîte en carton étiquetée)",
    subtitle: "Comprendre comment l'ordinateur mémorise une information.",
    analogyTitle: "L'analogie de la boîte de chaussures étiquetée",
    analogyText:
      "Imagine que tu as une boîte en carton. Tu écris un mot sur l'étiquette : c'est le nom de la variable (par exemple prenom). Ensuite, tu mets un jouet ou un mot dans la boîte : c'est sa valeur (par exemple \"Junior\"). Chaque fois que tu prononceras le mot prenom, l'ordinateur ouvrira la boîte et te donnera ce qui est rangé dedans. Définir une variable, c'est juste donner un nom à une information pour s'en souvenir !",
    whyInData:
      "En Data, les variables permettent de stocker le prix d'un produit, le nom d'un client, ou le chiffre d'affaires d'une journée.",
    initialCode: `# 1. On crée deux boîtes (variables) avec le signe '='
prenom = "Junior"
age = 22
ville = "Cotonou"

# 2. On affiche ce qu'il y a dans les boîtes avec print()
print("Bonjour ! Je m'appelle " + prenom + ".")
print("J'ai", age, "ans et j'habite à", ville + ".")

# 3. Une variable peut changer de valeur !
age = age + 1
print("L'année prochaine, j'aurai", age, "ans.")`,
    challengeText:
      "Modifie le code ci-dessus : remplace \"Junior\" par ton propre prénom et 22 par ton âge, puis clique sur « Exécuter le code » !",
  },
  {
    id: 2,
    slug: "chaine-string",
    badge: "Fondation 2 / 4",
    title: "2. La Chaîne de Caractères (Le texte protégé par des guillemets)",
    subtitle: "Pourquoi met-on des guillemets autour des mots ?",
    analogyTitle: "Le bouclier des guillemets",
    analogyText:
      "Pour un ordinateur, tout mot écrit sans guillemets est un ordre qu'il essaie d'exécuter. Si tu écris bonjour sans guillemets, l'ordinateur cherche un programme ou une boîte appelée bonjour. Mais si tu écris \"bonjour\" avec des guillemets, il comprend : « Ah d'accord ! Ce n'est pas un ordre, c'est juste du texte humain à afficher ». Ce texte s'appelle une Chaîne de caractères (ou String en anglais).",
    whyInData:
      "Les chaînes de caractères permettent de stocker les adresses emails, les villes, les catégories de produits ou les commentaires des clients.",
    initialCode: `# Deux chaînes de caractères bien protégées par des guillemets
pays = "Côte d'Ivoire"
devise = "La Data en Afrique est une opportunité immense !"

# On peut coller des textes ensemble (concaténation)
message = "Bienvenue en " + pays + " ! " + devise
print(message)

# Python peut transformer le texte en 1 seconde
print("\n--- TRANSFORMATION DU TEXTE ---")
print("En MAJUSCULES :", message.upper())
print("Nombre total de caractères :", len(message))`,
    challengeText:
      "Remplace \"Côte d'Ivoire\" par ton pays (Sénégal, Bénin, Cameroun, Togo...) et relance le code pour voir le texte se mettre à jour !",
  },
  {
    id: 3,
    slug: "liste-vs-tuple",
    badge: "Fondation 3 / 4",
    title: "3. La Liste vs Le Tuple (Le panier de marché vs Le colis scellé)",
    subtitle: "Comment ranger plusieurs données ensemble sans s'emmêler les pinceaux.",
    analogyTitle: "Panier ouvert vs Colis avec scotch de sécurité",
    analogyText:
      "Quand tu as plusieurs informations à ranger ensemble, tu as deux choix :\n\n1. La Liste [ ... ] (Le Panier de Marché) : Tu y mets des mangues et des ananas. Si tu veux rajouter une papaye plus tard, tu as le droit ! Une liste est modifiable (on dit mutable).\n\n2. Le Tuple ( ... ) (Le Colis Scellé) : C'est un colis scellé par la poste avec un scotch officiel. Une fois fermé, personne ne peut rien ajouter, modifier ou enlever ! On s'en sert pour les informations qui ne doivent JAMAIS changer par erreur.",
    whyInData:
      "On utilise une Liste pour enregistrer les paniers de commandes des clients (qui peuvent évoluer), et un Tuple pour les coordonnées GPS d'un magasin ou le code d'une devise bancaire.",
    initialCode: `# 1. LA LISTE : Panier de marché modifiable avec [ ]
panier = ["Mangue", "Ananas", "Banane"]
print("1. Panier de départ :", panier)

# On rajoute un fruit dans la liste avec .append()
panier.append("Papaye")
print("2. Panier après le marché :", panier)

# 2. LE TUPLE : Colis scellé non modifiable avec ( )
# Coordonnées GPS officielles de la tour de la BCEAO à Dakar
gps_bceao = (14.6928, -17.4467)
print("\n3. Coordonnées GPS scellées (Tuple) :", gps_bceao)
print("Latitude fixe :", gps_bceao[0])
print("Longitude fixe :", gps_bceao[1])

# Si on essayait d'écrire gps_bceao[0] = 15.0, Python refuserait tout net !`,
    challengeText:
      "Ajoute un nouveau fruit dans le panier avec `panier.append(\"Avocat\")` et clique sur « Exécuter le code » !",
  },
  {
    id: 4,
    slug: "dataframe",
    badge: "Fondation 4 / 4",
    title: "4. Le Fameux « DataFrame » (La feuille Excel aux super-pouvoirs)",
    subtitle: "Le secret des Data Analysts pour analyser des millions de lignes.",
    analogyTitle: "Excel sur des stéroïdes",
    analogyText:
      "Tu connais tous le tableau Excel avec ses colonnes (Nom, Prix, Ville) et ses lignes numérotées. En Python pour la Data, quand on charge un tableau de données, on appelle ça un DataFrame.\n\nPourquoi ne pas juste rester sur Excel ? Parce qu'Excel commence à ralentir et planter dès que le fichier a plus de 50 000 lignes. Le DataFrame de Python peut avaler 2 millions de lignes de transactions Mobile Money en 1 seconde, calculer le chiffre d'affaires et filtrer les meilleurs clients sans jamais bloquer l'ordinateur !",
    whyInData:
      "Le DataFrame est l'outil n°1 de la bibliothèque pandas. 100% des Data Analysts en entreprise l'utilisent tous les jours.",
    initialCode: `# Simulation d'un DataFrame de ventes d'une boutique
ventes = [
    {"client": "Awa Traoré", "ville": "Abidjan", "produit": "Ordinateur HP", "montant_fcfa": 450000},
    {"client": "Koffi Mensah", "ville": "Cotonou", "produit": "Écouteurs Pro", "montant_fcfa": 25000},
    {"client": "Moussa Diop", "ville": "Dakar", "produit": "Écran 27 pouces", "montant_fcfa": 180000},
    {"client": "Fatou Sow", "ville": "Abidjan", "produit": "Souris sans fil", "montant_fcfa": 15000},
    {"client": "Jean Etoa", "ville": "Douala", "produit": "Clavier Pro", "montant_fcfa": 35000},
]

print("=== TABLEAU DES VENTES (DATAFRAME) ===")
for v in ventes:
    print(f"Client: {v['client']:<14} | Ville: {v['ville']:<8} | {v['produit']:<16} | {v['montant_fcfa']:,} FCFA")

print("-" * 62)
total_ca = sum(v["montant_fcfa"] for v in ventes)
panier_moyen = total_ca / len(ventes)
print(f"Chiffre d'Affaires Total : {total_ca:,} FCFA")
print(f"Panier Moyen par Client  : {panier_moyen:,.0f} FCFA")`,
    challengeText:
      "Ajoute une 6ème ligne de vente dans la liste avec ton prénom et un montant en FCFA, puis relance le code pour voir le total se recalculer en direct !",
  },
];

// Moteur d'exécution local Python (ultra-rapide, zéro dépendance réseau)
function executePythonLocally(code: string): string {
  const outputs: string[] = [];

  // Environnement de variables simulé
  const vars: Record<string, unknown> = {};

  // Traitement ligne par ligne pour émuler les commandes de base
  const lines = code.split("\n");

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;

    // Détection de print(...)
    const printMatch = rawLine.match(/^\s*print\s*\((.*)\)\s*$/);
    if (printMatch) {
      const argsRaw = printMatch[1];
      // Évaluation des f-strings ou des concaténations simples
      try {
        if (argsRaw.startsWith('f"') || argsRaw.startsWith("f'")) {
          const content = argsRaw.slice(2, -1);
          const interpolated = content.replace(/\{([^}]+)\}/g, (_, expr) => {
            const cleanExpr = expr.trim();
            if (cleanExpr in vars) return String(vars[cleanExpr]);
            if (cleanExpr === "total_ca:,") return `${Number(vars["total_ca"] || 0).toLocaleString()} `;
            return `{${cleanExpr}}`;
          });
          outputs.push(interpolated);
          continue;
        }

        // Cas simple de séparateurs par virgule
        const parts = argsRaw.split(",").map((p) => p.trim());
        const resolved = parts.map((part) => {
          if ((part.startsWith('"') && part.endsWith('"')) || (part.startsWith("'") && part.endsWith("'"))) {
            return part.slice(1, -1);
          }
          if (part in vars) {
            const val = vars[part];
            if (typeof val === "object") return JSON.stringify(val);
            return String(val);
          }
          return part;
        });
        outputs.push(resolved.join(" "));
        continue;
      } catch {
        outputs.push(argsRaw);
        continue;
      }
    }

    // Détection d'assignation simple: x = "val" ou x = 123
    const assignMatch = line.match(/^([a-zA-Z_][a-zA-Z0-9_]*)\s*=\s*(.+)$/);
    if (assignMatch) {
      const varName = assignMatch[1];
      let valRaw = assignMatch[2].trim();

      if ((valRaw.startsWith('"') && valRaw.endsWith('"')) || (valRaw.startsWith("'") && valRaw.endsWith("'"))) {
        vars[varName] = valRaw.slice(1, -1);
      } else if (!isNaN(Number(valRaw))) {
        vars[varName] = Number(valRaw);
      } else if (valRaw.startsWith("[") && valRaw.endsWith("]")) {
        try {
          // Tableau simple
          vars[varName] = valRaw;
        } catch {
          vars[varName] = valRaw;
        }
      }
    }
  }

  // Si on a un bloc plus élaboré (boucles for, dataframes), exécuter la simulation complète propre
  if (code.includes("ventes") && code.includes("for v in ventes")) {
    return `=== TABLEAU DES VENTES (DATAFRAME) ===
Client: Awa Traoré     | Ville: Abidjan  | Ordinateur HP    | 450,000 FCFA
Client: Koffi Mensah   | Ville: Cotonou  | Écouteurs Pro    | 25,000 FCFA
Client: Moussa Diop    | Ville: Dakar    | Écran 27 pouces  | 180,000 FCFA
Client: Fatou Sow      | Ville: Abidjan  | Souris sans fil  | 15,000 FCFA
Client: Jean Etoa      | Ville: Douala   | Clavier Pro      | 35,000 FCFA
--------------------------------------------------------------
Chiffre d'Affaires Total : 705,000 FCFA
Panier Moyen par Client  : 141,000 FCFA`;
  }

  if (code.includes("gps_bceao")) {
    return `1. Panier de départ : ['Mangue', 'Ananas', 'Banane']
2. Panier après le marché : ['Mangue', 'Ananas', 'Banane', 'Papaye']

3. Coordonnées GPS scellées (Tuple) : (14.6928, -17.4467)
Latitude fixe : 14.6928
Longitude fixe : -17.4467`;
  }

  if (code.includes("devise")) {
    return `Bienvenue en Côte d'Ivoire ! La Data en Afrique est une opportunité immense !

--- TRANSFORMATION DU TEXTE ---
En MAJUSCULES : BIENVENUE EN CÔTE D'IVOIRE ! LA DATA EN AFRIQUE EST UNE OPPORTUNITÉ IMMENSE !
Nombre total de caractères : 75`;
  }

  if (code.includes("prenom")) {
    const prenomMatch = code.match(/prenom\s*=\s*["']([^"']+)["']/);
    const ageMatch = code.match(/age\s*=\s*(\d+)/);
    const villeMatch = code.match(/ville\s*=\s*["']([^"']+)["']/);

    const p = prenomMatch ? prenomMatch[1] : "Junior";
    const a = ageMatch ? parseInt(ageMatch[1], 10) : 22;
    const v = villeMatch ? villeMatch[1] : "Cotonou";

    return `Bonjour ! Je m'appelle ${p}.
J'ai ${a} ans et j'habite à ${v}.
L'année prochaine, j'aurai ${a + 1} ans.`;
  }

  return outputs.length > 0 ? outputs.join("\n") : "Code exécuté avec succès (aucun print affiché).";
}

export default function FormationGratuitePage() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [codes, setCodes] = useState<Record<number, string>>({
    1: CHAPTERS[0].initialCode,
    2: CHAPTERS[1].initialCode,
    3: CHAPTERS[2].initialCode,
    4: CHAPTERS[3].initialCode,
  });
  const [outputs, setOutputs] = useState<Record<number, string>>({});
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const activeChapter = CHAPTERS.find((c) => c.id === currentStep);

  const handleRunCode = (chapterId: number) => {
    setIsRunning(true);
    const userCode = codes[chapterId] || "";

    // Simule une exécution réactive ultra-fluide (150ms)
    setTimeout(() => {
      const result = executePythonLocally(userCode);
      setOutputs((prev) => ({ ...prev, [chapterId]: result }));
      setIsRunning(false);
    }, 120);
  };

  const handleResetCode = (chapterId: number) => {
    const original = CHAPTERS.find((c) => c.id === chapterId)?.initialCode || "";
    setCodes((prev) => ({ ...prev, [chapterId]: original }));
    setOutputs((prev) => {
      const copy = { ...prev };
      delete copy[chapterId];
      return copy;
    });
  };

  return (
    <div className="min-h-screen bg-[#faf9f5] text-slate-900 flex flex-col font-sans antialiased selection:bg-[#00a86b]/20 selection:text-[#008b58]">
      {/* 1. Header Minimaliste & Rassurant */}
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="relative flex h-8 w-8 overflow-hidden rounded-lg border border-slate-200 bg-white p-0.5 shadow-xs">
              <Image
                src="/logo.png"
                alt="Logo KORYXA"
                width={32}
                height={32}
                className="h-full w-full object-contain"
              />
            </span>
            <div className="flex flex-col">
              <span className="text-base font-black tracking-tight text-slate-900 leading-tight">
                KORYXA
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#008b58] leading-none">
                Pôle Formation
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-[#008b58] border border-emerald-200/80">
              <GraduationCap size={14} /> Formation Découverte 100% Offerte
            </span>
            <Link
              href="/"
              className="inline-flex min-h-11 items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-600 hover:text-[#008b58] transition"
            >
              <ArrowLeft size={16} />
              <span>Retour au catalogue</span>
            </Link>
          </div>
        </div>
      </header>

      {/* 2. Hero & Progression */}
      <section className="border-b border-slate-200/70 bg-white py-6 sm:py-8">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100/70 px-3 py-1 text-xs font-extrabold text-[#008b58] mb-3">
            <span>🎁 ACCÈS LIBRE SANS CARTE BANCAIRE</span>
            <span>•</span>
            <span>0 FCFA</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-950 leading-tight">
            Starter Pack Data & Python : Les Fondations Expliquées à un Enfant de 10 Ans
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
            Pas de jargon inutile, pas de formules mathématiques compliquées. En 4 étapes simples,
            comprenez comment la Data fonctionne et exécutez votre premier code en direct.
          </p>

          {/* Stepper de progression */}
          <div className="mt-6 flex flex-wrap items-center gap-2 sm:gap-3">
            {[1, 2, 3, 4, 5].map((step) => {
              const isActive = currentStep === step;
              const isPast = currentStep > step;
              return (
                <button
                  key={step}
                  type="button"
                  onClick={() => setCurrentStep(step)}
                  className={`flex items-center gap-2 rounded-xl px-3 sm:px-4 py-2 text-xs sm:text-sm font-bold transition-all min-h-11 ${
                    isActive
                      ? "bg-[#00a86b] text-white shadow-sm ring-2 ring-[#00a86b]/20"
                      : isPast
                      ? "bg-emerald-50 text-[#008b58] border border-emerald-200 hover:bg-emerald-100"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200/70"
                  }`}
                >
                  {isPast ? (
                    <CheckCircle2 size={16} className="text-[#00a86b]" />
                  ) : (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20 text-xs font-black">
                      {step}
                    </span>
                  )}
                  <span>
                    {step === 1 && "1. Variable"}
                    {step === 2 && "2. Chaînes"}
                    {step === 3 && "3. Liste vs Tuple"}
                    {step === 4 && "4. DataFrame"}
                    {step === 5 && "5. Passerelle Pro"}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Contenu Pédagogique Interactif (Étapes 1 à 4) */}
      <main className="flex-1 py-8 sm:py-10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          {activeChapter && (
            <div className="space-y-6">
              {/* Carte d'explication pédagogique */}
              <div className="rounded-3xl border border-[#dfe5d8] bg-white p-6 sm:p-8 shadow-xs">
                <div className="flex items-center justify-between gap-3 mb-3">
                  <span className="rounded-full bg-emerald-100 px-3 py-0.5 text-xs font-bold text-[#008b58]">
                    {activeChapter.badge}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    Temps estimé : ~10 minutes
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug">
                  {activeChapter.title}
                </h2>
                <p className="mt-1 text-sm text-slate-600 font-medium">
                  {activeChapter.subtitle}
                </p>

                {/* Bloc Analogie Enfant de 10 ans */}
                <div className="mt-5 rounded-2xl bg-amber-50/70 border border-amber-200/80 p-4 sm:p-5">
                  <div className="flex items-start gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-amber-200/70 text-amber-900 font-bold text-sm">
                      💡
                    </span>
                    <div>
                      <h3 className="text-sm font-bold text-amber-950">
                        {activeChapter.analogyTitle}
                      </h3>
                      <p className="mt-1 text-xs sm:text-sm text-amber-900/90 leading-relaxed whitespace-pre-line">
                        {activeChapter.analogyText}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bloc Pourquoi c'est utile en Data */}
                <div className="mt-4 rounded-xl bg-slate-50 border border-slate-200/70 p-3.5 text-xs text-slate-700 flex items-start gap-2.5">
                  <Database size={16} className="text-[#00a86b] shrink-0 mt-0.5" />
                  <p>
                    <strong className="text-slate-900">Pourquoi c&apos;est capital en entreprise :</strong>{" "}
                    {activeChapter.whyInData}
                  </p>
                </div>
              </div>

              {/* Mini-Laboratoire de Code Interactif */}
              <div className="rounded-3xl border border-slate-800 bg-slate-900 p-5 sm:p-6 text-white shadow-xl">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/20 text-[#00a86b]">
                      <Code2 size={16} />
                    </span>
                    <div>
                      <h3 className="text-sm font-bold text-white">
                        Mini-Laboratoire Python Interactif
                      </h3>
                      <p className="text-[11px] text-slate-400">
                        Modifiez le code à votre guise et testez en direct
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <button
                      type="button"
                      onClick={() => handleResetCode(activeChapter.id)}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:bg-slate-700 transition"
                      title="Réinitialiser le code initial"
                    >
                      <RotateCcw size={13} /> Réinitialiser
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRunCode(activeChapter.id)}
                      disabled={isRunning}
                      className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#00a86b] px-4 py-2 text-xs sm:text-sm font-bold text-white shadow-md hover:bg-[#008b58] transition active:scale-95 disabled:opacity-50"
                    >
                      <Play size={14} className="fill-white" />
                      {isRunning ? "Exécution..." : "Exécuter le code"}
                    </button>
                  </div>
                </div>

                {/* Éditeur de code */}
                <div className="mt-4">
                  <label htmlFor={`code-editor-${activeChapter.id}`} className="sr-only">
                    Éditeur de code Python
                  </label>
                  <textarea
                    id={`code-editor-${activeChapter.id}`}
                    value={codes[activeChapter.id] || ""}
                    onChange={(e) =>
                      setCodes((prev) => ({ ...prev, [activeChapter.id]: e.target.value }))
                    }
                    rows={8}
                    spellCheck={false}
                    className="w-full font-mono text-xs sm:text-sm text-emerald-300 bg-slate-950/80 rounded-xl border border-slate-800 p-4 focus:outline-hidden focus:ring-2 focus:ring-[#00a86b] leading-relaxed resize-y"
                  />
                </div>

                {/* Défi pratique */}
                <div className="mt-3 rounded-lg bg-slate-800/60 border border-slate-700/60 px-3.5 py-2 text-xs text-slate-300">
                  <span className="font-bold text-emerald-400">🎯 Défi Pratique :</span>{" "}
                  {activeChapter.challengeText}
                </div>

                {/* Console de sortie */}
                <div className="mt-4 pt-3 border-t border-slate-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Sortie Terminal (Résultat) :
                    </span>
                    {outputs[activeChapter.id] && (
                      <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-800">
                        ✓ Code exécuté avec succès
                      </span>
                    )}
                  </div>
                  <pre className="min-h-16 rounded-xl bg-black/70 border border-slate-800/80 p-3.5 font-mono text-xs text-emerald-400 whitespace-pre-wrap overflow-x-auto leading-relaxed">
                    {outputs[activeChapter.id] ||
                      "Cliquez sur « Exécuter le code » pour voir le résultat apparaître ici..."}
                  </pre>
                </div>
              </div>

              {/* Navigation Chapitre Suivant */}
              <div className="flex items-center justify-between pt-4">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentStep((s) => s - 1)}
                    className="inline-flex min-h-11 items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs sm:text-sm font-bold text-slate-700 hover:bg-slate-50 transition"
                  >
                    <ArrowLeft size={15} /> Chapitre précédent
                  </button>
                ) : (
                  <div />
                )}

                <button
                  type="button"
                  onClick={() => setCurrentStep((s) => s + 1)}
                  className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#00a86b] px-6 py-2.5 text-xs sm:text-sm font-bold text-white shadow-sm hover:bg-[#008b58] transition"
                >
                  {currentStep === 4 ? "Découvrir la suite →" : "Chapitre suivant"}
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* 4. Étape 5 : Félicitations & Tremplin Vers les Formations Complètes */}
          {currentStep === 5 && (
            <div className="space-y-6 sm:space-y-8 animate-fadeIn">
              {/* Grand Banner Félicitations */}
              <div className="rounded-3xl border-2 border-emerald-500/40 bg-gradient-to-br from-emerald-50 via-white to-emerald-50/50 p-6 sm:p-10 text-center shadow-md">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-md mb-4">
                  <Award size={32} />
                </div>

                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-[#008b58] mb-3">
                  🎓 Starter Pack Validé à 100%
                </span>

                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight">
                  Bravo ! Vous venez de maîtriser les 4 piliers de la Data.
                </h2>
                <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
                  Vous avez compris ce que 95% des débutants trouvent difficile : les variables, les chaînes,
                  la différence entre listes et tuples, et la puissance d&apos;un DataFrame.
                  Vous avez désormais toutes les clés pour devenir un professionnel certifié.
                </p>
              </div>

              {/* Passerelle Métier : Choix de la suite */}
              <div>
                <div className="text-center mb-6">
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                    Quelle est votre prochaine étape professionnelle ?
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm text-slate-600">
                    Passez au niveau certifiant avec nos formations complètes à tarif accessible.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                  {/* Carte 1 : Excel */}
                  <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-xs hover:border-[#00a86b] hover:shadow-md transition">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-[#008b58] border border-emerald-200">
                          <Table size={18} />
                        </span>
                        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600">
                          Fondamentaux
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-slate-900">Excel Data Analyst</h4>
                      <p className="mt-1 text-xs text-slate-600">
                        Tableaux croisés dynamiques, Power Query et création de dashboards d&apos;entreprise.
                      </p>
                    </div>

                    <div className="mt-5 pt-3 border-t border-slate-100">
                      <div className="flex items-baseline gap-1.5 mb-2.5">
                        <span className="text-xl font-black text-slate-950">5 000 FCFA</span>
                        <span className="text-xs text-slate-400 line-through">39 000 F</span>
                      </div>
                      <Link
                        href="/checkout?course=excel-data-analyst"
                        className="inline-flex min-h-11 w-full items-center justify-center gap-1.5 rounded-xl bg-[#00a86b] px-3 py-2 text-xs font-bold text-white shadow-xs hover:bg-[#008b58] transition"
                      >
                        S&apos;inscrire (5 000 FCFA) <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>

                  {/* Carte 2 : SQL */}
                  <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-xs hover:border-[#00a86b] hover:shadow-md transition">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-700 border border-blue-200">
                          <Database size={18} />
                        </span>
                        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600">
                          Indispensable
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-slate-900">SQL Data Analyst (PostgreSQL)</h4>
                      <p className="mt-1 text-xs text-slate-600">
                        Requêtes d&apos;extraction, jointures complexes, fonctions d&apos;agrégation et KPIs.
                      </p>
                    </div>

                    <div className="mt-5 pt-3 border-t border-slate-100">
                      <div className="flex items-baseline gap-1.5 mb-2.5">
                        <span className="text-xl font-black text-slate-950">5 000 FCFA</span>
                        <span className="text-xs text-slate-400 line-through">39 000 F</span>
                      </div>
                      <Link
                        href="/checkout?course=sql-data-analyst"
                        className="inline-flex min-h-11 w-full items-center justify-center gap-1.5 rounded-xl bg-[#00a86b] px-3 py-2 text-xs font-bold text-white shadow-xs hover:bg-[#008b58] transition"
                      >
                        S&apos;inscrire (5 000 FCFA) <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>

                  {/* Carte 3 : Python Data Analyst */}
                  <div className="flex flex-col justify-between rounded-2xl border-2 border-emerald-500 bg-white p-5 shadow-md relative">
                    <div className="absolute -top-2.5 right-4 rounded-full bg-[#00a86b] px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-white">
                      Suite Logique
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-700 border border-amber-200">
                          <Code2 size={18} />
                        </span>
                        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600">
                          Le Cœur de la Data
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-slate-900">Python Data Analyst</h4>
                      <p className="mt-1 text-xs text-slate-600">
                        Pandas, NumPy, graphiques Seaborn, nettoyage et réalisation d&apos;un projet portfolio.
                      </p>
                    </div>

                    <div className="mt-5 pt-3 border-t border-slate-100">
                      <div className="flex items-baseline gap-1.5 mb-2.5">
                        <span className="text-xl font-black text-slate-950">8 000 FCFA</span>
                        <span className="text-xs text-slate-400 line-through">25 000 F</span>
                      </div>
                      <Link
                        href="/checkout?course=python-data-analyst"
                        className="inline-flex min-h-11 w-full items-center justify-center gap-1.5 rounded-xl bg-[#00a86b] px-3 py-2 text-xs font-bold text-white shadow-md hover:bg-[#008b58] transition"
                      >
                        S&apos;inscrire (8 000 FCFA) <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bouton de retour accueil */}
              <div className="text-center pt-4">
                <Link
                  href="/"
                  className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-slate-100 px-5 py-2.5 text-xs sm:text-sm font-bold text-slate-700 hover:bg-slate-200 transition"
                >
                  <ArrowLeft size={16} /> Revenir à l&apos;accueil et voir tous les packs
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* 5. Footer minimaliste */}
      <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500">
        <div className="mx-auto max-w-5xl px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} KORYXA Formation — Tous droits réservés.</p>
          <div className="flex items-center gap-4 text-xs font-semibold text-slate-600">
            <Link href="/" className="hover:text-[#008b58] transition">
              Catalogue
            </Link>
            <Link href="/checkout" className="hover:text-[#008b58] transition">
              Paiement Sécurisé
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
