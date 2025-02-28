import { AppError } from "../../../shared/utils/AppError";
import { UpdateProjectTeamDTO } from "../../dtos/project_team/updateProjectTeam.dto";
import { ProjectTeamRepository } from "./../../../domain/repositories/ProjectTeam.repo";
export class UpdateProjectTeamUsecase {
  private projectTeamRepo: ProjectTeamRepository;

  constructor(projectTeamRepository: ProjectTeamRepository) {
    this.projectTeamRepo = projectTeamRepository;
  }

  execute(pt_id: number, updatedPTData: UpdateProjectTeamDTO) {
    if (!pt_id) {
      throw new AppError("No project_team id provided!", 400);
    }
    
    return this.projectTeamRepo.update(pt_id, updatedPTData);
  }
}
