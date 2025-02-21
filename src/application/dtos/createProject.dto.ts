export interface CreateProjectDTO {
  name: string;
  description: string;
  user_id: number;
  deadline?: string;
  projectLogo?: string;
  estDeadline?: string;
  startDate?: string;
}