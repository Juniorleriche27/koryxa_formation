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
  if (url?.startsWith("/api/")) return url;
  try {
    return new URL(url || "", API_BASE_URL).toString();
  } catch {
    return `${API_BASE_URL}${url || ""}`;
  }
}

const AUTH_TOKEN_KEY = "koryxa_formation_access_token";

export function storeAuthSession(token: string) {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(AUTH_TOKEN_KEY, token);
  }
}

export function clearAuthSession() {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(AUTH_TOKEN_KEY);
  }
}

export function getStoredAuthToken() {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(AUTH_TOKEN_KEY);
}

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = getStoredAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const internalApi = axios.create({
  withCredentials: true,
});

api.interceptors.response.use(
  (res) => res,
  (err) => Promise.reject(err)
);

export type AuthUser = {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string | null;
};

export const authAPI = {
  register: (payload: { full_name: string; email: string; password: string }) => api.post("/auth/register", payload),
  login: (payload: { email: string; password: string }) => api.post<{ access_token: string; token_type: string }>("/auth/login", payload),
  me: () => api.get<AuthUser>("/auth/me"),
};

export const commerceAPI = {
  createOrder: (payload: { course_slug: string; partner_code?: string | null }) => api.post("/commerce/orders", payload),
  listOrders: () => api.get("/commerce/orders"),
  listEnrollments: () => api.get("/commerce/enrollments"),
  initiateKoryxaPay: (payload: { product_code: string; item_type?: "course" | "pack"; partner_code?: string | null; customer_name: string; customer_phone: string }) =>
    internalApi.post<{ checkout_url?: string; checkout_id?: string; success?: boolean }>("/api/commerce/koryxa-pay/initiate", payload),
};

export type AccessUser = {
  id: string;
  name: string;
  email: string;
  avatar_url?: string | null;
  kind: string;
};

export const accessAPI = {
  // Same-origin: Clerk/KORYXA Identity is authoritative, with the Formation
  // cookie used as fallback by the server route. This also avoids CORS races.
  me: () => internalApi.get<AccessUser>("/api/auth/profile"),
  logout: () => api.post("/access/logout"),
  activateEnrollment: (course: string) => api.post("/access/activate-enrollment", undefined, { params: { course } }),
};

export const modulesAPI = {
  getAll: (course?: string) => api.get("/modules/", { params: course ? { course } : undefined }),
  getOne: (id: string, course?: string) => api.get(`/modules/${id}`, { params: course ? { course } : undefined }),
};

export const progressAPI = {
  getAll: (course?: string) => api.get("/progress", { params: course ? { course } : undefined }),
  getCompletion: (course?: string) => api.get("/progress/completion", { params: course ? { course } : undefined }),
  update: (module_id: string, completed: boolean) =>
    api.post("/progress", { module_id, completed }),
};

export const certificatesAPI = {
  getMy: (course?: string) => internalApi.get("/api/certificates/me", { params: course ? { course } : undefined }),
  issue: (course?: string) => internalApi.post("/api/certificates/issue", undefined, { params: course ? { course } : undefined }),
};

export const validationAPI = {
  getModuleStatuses: (course?: string) => internalApi.get("/api/validation/modules/status", { params: course ? { course } : undefined }),
  getQuiz: (module_id: string) => internalApi.get(`/api/validation/quiz/${module_id}`),
  submitQuiz: (module_id: string, answers: Record<string, string>) =>
    internalApi.post(`/api/validation/quiz/${module_id}/submit`, { answers }),
  getCertificationStatus: (course?: string) => internalApi.get("/api/validation/certification/me", { params: course ? { course } : undefined }),
  submitFinalProject: (submission_url?: string, submission_notes?: string, course?: string) =>
    internalApi.post("/api/validation/final-project/submit", { submission_url, submission_notes }, { params: course ? { course } : undefined }),
};

export const contentAPI = {
  lessons: (course: string, moduleId: string) => api.get(`/lessons/${course}/modules/${moduleId}`),
  exercises: (course: string, moduleId: string) => api.get(`/exercises/${course}/modules/${moduleId}`),
  theory: (course: string) => api.get(`/theory/${course}`),
  projects: (course: string) => api.get(`/projects/${course}`),
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
