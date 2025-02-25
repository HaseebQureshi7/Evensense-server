import { Project } from "../../../domain/entities/Project.entity";

export interface UpdateProjectDTO
  extends Partial<Omit<Project, "id" | "created_at">> {}
