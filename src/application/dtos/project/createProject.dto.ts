export interface CreateProjectDTO {
  name: string;
  description: string;
  user_id: number;
  deadline?: Date;
  project_logo?: string;
  est_deadline?: Date;
  start_date?: Date;
  tech_stack?: string[];
  project_architecture?: string[];
  document_links?: string[];
  project_links?: string[];
}
