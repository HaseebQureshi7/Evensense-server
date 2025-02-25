import { ProjectTeamRepository } from "../../../domain/repositories/ProjectTeam.repo";
export class GetUserAssignedProjectsUsecase {
  private projectTeamRepo: ProjectTeamRepository;

  constructor(projectTeamRepository: ProjectTeamRepository) {
    this.projectTeamRepo = projectTeamRepository;
  }

  execute(user_id: number) {
    if (!user_id) {
      throw new Error("Missing required field: user_id");
    }

    return this.projectTeamRepo.getUserProjects(user_id);
  }
}
