import { AppError } from '../../../shared/utils/AppError';
import { CreateProjectTeamDTO } from '../../dtos/project_team/createProjectTeam.dto';
import { ProjectTeamRepository } from './../../../domain/repositories/ProjectTeam.repo';
export class CreateProjectTeamUsecase {
    private projectTeamRepo: ProjectTeamRepository

    constructor(projectTeamRepository: ProjectTeamRepository) {
        this.projectTeamRepo = projectTeamRepository
    }

    execute(newPTData: CreateProjectTeamDTO) {
        if (!newPTData.project_id || !newPTData.user_id) {
            throw new AppError("Missing required fields: project_id or user_id", 400);
        }

        return this.projectTeamRepo.create(newPTData)
    }
}