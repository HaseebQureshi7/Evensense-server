import { ProjectTeamRepository } from "./../../../domain/repositories/ProjectTeam.repo";
export class DeleteProjectTeamUsecase {
  private projectTeamRepo: ProjectTeamRepository;

  constructor(projectTeamRepository: ProjectTeamRepository) {
    this.projectTeamRepo = projectTeamRepository;
  }

  execute(pt_id: number) {
    if (!pt_id) {
      throw new Error("Missing required field: pt_id");
    }

    return this.projectTeamRepo.delete(pt_id);
  }
}
