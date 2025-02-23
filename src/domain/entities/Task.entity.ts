export interface Task {
  id: number;
  name: string;
  status: "open" | "close" | "conflict";
  deadline?: Date;
  comments?: string;
  project_id: number;
  created_at: Date;
}
