import { ProjectTeamRepository } from "./../../../domain/repositories/ProjectTeam.repo";
export class GetProjectTeamUsecase {
  private projectTeamRepo: ProjectTeamRepository;

  constructor(projectTeamRepository: ProjectTeamRepository) {
    this.projectTeamRepo = projectTeamRepository;
  }

  execute(project_id: number) {
    if (!project_id) {
      throw new Error("Missing required field: project_id");
    }

    return this.projectTeamRepo.getProjectTeam(project_id);
  }
}
