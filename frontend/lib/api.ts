import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

export const modulesAPI = {
  getAll: () => api.get("/modules"),
  getOne: (id: string) => api.get(`/modules/${id}`),
};

export const progressAPI = {
  getAll: () => api.get("/progress"),
  getCompletion: () => api.get("/progress/completion"),
  update: (module_id: string, completed: boolean) =>
    api.post("/progress", { module_id, completed }),
};

export const certificatesAPI = {
  getMy: () => api.get("/certificates/me"),
};

export const notebookAPI = {
  getContent:     (moduleId: string) => api.get(`/modules/${moduleId}/notebook`),
  getDownloadUrl: (moduleId: string) =>
    `${process.env.NEXT_PUBLIC_API_URL}/modules/${moduleId}/download`,
};

export const aiAPI = {
  chat:    (module_id: string, question: string, history: { role: string; message: string }[]) =>
    api.post("/ai/chat", { module_id, question, history }),
  explain: (code: string, module_title?: string) =>
    api.post("/ai/explain", { code, module_title }),
  quiz:    (module_id: string) =>
    api.post("/ai/quiz", { module_id }),
};

export default api;
