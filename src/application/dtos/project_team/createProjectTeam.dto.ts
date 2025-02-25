import { ProjectTeam } from "../../../domain/entities/ProjectTeam.entity";

export interface CreateProjectTeamDTO
  extends Omit<ProjectTeam, "id" | "created_at"> {}