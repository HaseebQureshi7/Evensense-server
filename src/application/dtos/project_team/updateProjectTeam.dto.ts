import { ProjectTeam } from "../../../domain/entities/ProjectTeam.entity";

export interface UpdateProjectTeamDTO
  extends Omit<ProjectTeam, "id" | "created_at"> {}