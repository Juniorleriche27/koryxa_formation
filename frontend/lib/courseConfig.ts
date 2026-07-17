export const DEFAULT_COURSE_SLUG = "python-data-analyst";
export const LLM_RAG_COURSE_SLUG = "llm-rag";
export const EXCEL_DATA_ANALYST_COURSE_SLUG = "excel-data-analyst";

export type CourseSlug =
  | typeof DEFAULT_COURSE_SLUG
  | typeof LLM_RAG_COURSE_SLUG
  | typeof EXCEL_DATA_ANALYST_COURSE_SLUG;

export const courseCatalog = {
  "python-data-analyst": {
    title: "Python Data Analyst",
    shortDescription: "Analyse de données, notebooks, quiz et certification.",
    landingPath: "/formations/python-data-analyst",
    published: true,
  },
  "llm-rag": {
    title: "LLM RAG Developer",
    shortDescription: "Documents, embeddings, Qdrant et réponses sourcées.",
    landingPath: "/formations/llm-rag",
    published: true,
  },
  "excel-data-analyst": {
    title: "Excel Data Analyst",
    shortDescription: "Formules, Power Query, tableaux croisés et dashboard professionnel.",
    landingPath: "/formations",
    published: false,
  },
} as const;

export const courseRoutes = {
  catalog: "/formations",
  pythonLanding: "/formations/python-data-analyst",
  llmRagLanding: "/formations/llm-rag",
  learn: (slug: string) => `/learn/${encodeURIComponent(slug)}`,
  access: (slug: string = DEFAULT_COURSE_SLUG) =>
    `/access?course=${encodeURIComponent(slug)}&redirect=${encodeURIComponent(`/dashboard?course=${slug}`)}`,
  dashboard: (slug: string = DEFAULT_COURSE_SLUG) => `/dashboard?course=${encodeURIComponent(slug)}`,
  modules: (slug: string = DEFAULT_COURSE_SLUG) => `/modules?course=${encodeURIComponent(slug)}`,
  module: (moduleId: string, slug: string = DEFAULT_COURSE_SLUG) =>
    `/modules/${encodeURIComponent(moduleId)}?course=${encodeURIComponent(slug)}`,
} as const;

export function readCourseSlug(search: string): string {
  return new URLSearchParams(search).get("course") || DEFAULT_COURSE_SLUG;
}

export function normalizeCourseSlug(value?: string | null): CourseSlug {
  if (value === LLM_RAG_COURSE_SLUG) return LLM_RAG_COURSE_SLUG;
  if (value === EXCEL_DATA_ANALYST_COURSE_SLUG) return EXCEL_DATA_ANALYST_COURSE_SLUG;
  return DEFAULT_COURSE_SLUG;
}
