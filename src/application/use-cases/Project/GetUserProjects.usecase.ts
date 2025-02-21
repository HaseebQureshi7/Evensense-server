import { ProjectRepository } from "./../../../domain/repositories/ProjectRepository.repo";
export class GetUserProjectsUsecase {
  private projectRepository: ProjectRepository;

  constructor(ProjectRepository: ProjectRepository) {
    this.projectRepository = ProjectRepository
  }

  execute(uid: number) {
    if (!uid) {
        throw new Error("No user_id provided!")
    }
    return this.projectRepository.getUserProjects(uid);
  }
}
