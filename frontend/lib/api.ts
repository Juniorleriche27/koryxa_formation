import axios, { AxiosError } from "axios";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "http://localhost:8000";

function stringifyApiDetail(detail: unknown) {
  if (!detail) return "";
  if (typeof detail === "string") return detail;
  if (typeof detail === "object" && detail && "message" in detail) {
    const value = (detail as { message?: unknown }).message;
    return typeof value === "string" ? value : JSON.stringify(value);
  }
  try {
    return JSON.stringify(detail);
  } catch {
    return String(detail);
  }
}

export function getApiErrorMessage(error: unknown) {
  const axiosError = error as AxiosError<{ detail?: unknown; message?: unknown }>;
  const method = axiosError.config?.method?.toUpperCase() || "GET";
  const url = buildRequestUrl(axiosError.config?.url);

  if (axiosError?.response) {
    const detail = stringifyApiDetail(axiosError.response.data?.detail || axiosError.response.data?.message);
    return `API ${axiosError.response.status} sur ${method} ${url}${detail ? ` - ${detail}` : ""}`;
  }

  if (axiosError?.request) {
    return `Reseau/CORS sur ${method} ${url}. Verifie NEXT_PUBLIC_API_URL cote Vercel et CORS_ORIGINS cote Render.`;
  }

  return axiosError?.message || "Erreur inconnue";
}

function buildRequestUrl(url?: string) {
  try {
    return new URL(url || "", API_BASE_URL).toString();
  } catch {
    return `${API_BASE_URL}${url || ""}`;
  }
}

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

const internalApi = axios.create({
  withCredentials: true,
});

api.interceptors.response.use(
  (res) => res,
  (err) => Promise.reject(err)
);

export const modulesAPI = {
  getAll: () => api.get("/modules/"),
  getOne: (id: string) => api.get(`/modules/${id}`),
};

export const progressAPI = {
  getAll: () => api.get("/progress"),
  getCompletion: () => api.get("/progress/completion"),
  update: (module_id: string, completed: boolean) =>
    api.post("/progress", { module_id, completed }),
};

export const certificatesAPI = {
  getMy: () => internalApi.get("/api/certificates/me"),
  issue: () => internalApi.post("/api/certificates/issue"),
};

export const validationAPI = {
  getModuleStatuses: () => internalApi.get("/api/validation/modules/status"),
  getQuiz: (module_id: string) => internalApi.get(`/api/validation/quiz/${module_id}`),
  submitQuiz: (module_id: string, answers: Record<string, string>) =>
    internalApi.post(`/api/validation/quiz/${module_id}/submit`, { answers }),
  getCertificationStatus: () => internalApi.get("/api/validation/certification/me"),
  submitFinalProject: (submission_url?: string, submission_notes?: string) =>
    internalApi.post("/api/validation/final-project/submit", { submission_url, submission_notes }),
};

export const notebookAPI = {
  getContent: (moduleId: string) => api.get(`/modules/${moduleId}/notebook`),
  getDownloadUrl: (moduleId: string) => `${API_BASE_URL}/modules/${moduleId}/download`,
};

export const aiAPI = {
  chat: (module_id: string, question: string, history: { role: string; message: string }[]) =>
    api.post("/ai/chat", { module_id, question, history }),
  explain: (code: string, module_title?: string) =>
    api.post("/ai/explain", { code, module_title }),
  quiz: (module_id: string) => api.post("/ai/quiz", { module_id }),
};

export default api;
