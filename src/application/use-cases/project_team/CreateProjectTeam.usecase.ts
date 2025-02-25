import { CreateProjectTeamDTO } from '../../dtos/project_team/createProjectTeam.dto';
import { ProjectTeamRepository } from './../../../domain/repositories/ProjectTeam.repo';
export class CreateProjectTeamUsecase {
    private projectTeamRepo: ProjectTeamRepository

    constructor(projectTeamRepository: ProjectTeamRepository) {
        this.projectTeamRepo = projectTeamRepository
    }

    execute(newPTData: CreateProjectTeamDTO) {
        if (!newPTData.project_id || !newPTData.user_id) {
            throw new Error("Missing required fields: project_id or user_id");
        }

        return this.projectTeamRepo.create(newPTData)
    }
}