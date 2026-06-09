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
  estimated_hours?: number;
  platform_points?: number;
  requires_quiz?: boolean;
  quiz_pass_score?: number;
}

export type ModuleValidationStatus = "locked" | "available" | "in_progress" | "quiz_failed" | "validated";

export interface ModuleStatus {
  module_id: string;
  order_index: number;
  title: string;
  duration?: string;
  estimated_hours?: number;
  platform_points?: number;
  requires_quiz?: boolean;
  quiz_pass_score?: number;
  status: ModuleValidationStatus;
  is_accessible: boolean;
  is_validated: boolean;
  quiz_best_score?: number | null;
  validated_at?: string | null;
  platform_points_awarded?: number;
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
