import { CreateProjectTeamDTO } from "../../application/dtos/project_team/createProjectTeam.dto";
import { UpdateProjectTeamDTO } from "../../application/dtos/project_team/updateProjectTeam.dto";
import { Project } from "../entities/Project.entity";
import { User } from "../entities/User.entity";
import { ProjectTeam } from "./../entities/ProjectTeam.entity";
export interface ProjectTeamRepository {
  create(newPTData: CreateProjectTeamDTO): Promise<ProjectTeam>;
  getProjectTeam(project_id: number): Promise<User[]>;
  getUserProjects(user_id: number): Promise<Project[]>;
  update(
    pt_id: number,
    updatedPTData: UpdateProjectTeamDTO
  ): Promise<ProjectTeam>;
  delete(pt_id: number): Promise<ProjectTeam>;
}
