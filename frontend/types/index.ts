export interface User {
  id: string;
  full_name: string;
  email: string;
  role: "student" | "admin";
}

export interface Module {
  id: string;
  title: string;
  description: string;
  order_index: number;
  duration: string;
  is_published: boolean;
  notebook_path?: string;
  resources?: Resource[];
}

export interface Resource {
  id: string;
  module_id: string;
  title: string;
  url: string;
  type: "video" | "notebook" | "article" | "dataset";
  description?: string;
}

export interface Progress {
  id: string;
  user_id: string;
  module_id: string;
  completed: boolean;
  completed_at?: string;
}

export interface Certificate {
  id: string;
  user_id: string;
  issued_at: string;
  certificate_url?: string;
}
