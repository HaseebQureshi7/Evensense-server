import { Project } from "../../../domain/entities/Project.entity";
import { ProjectRepository } from "../../../domain/repositories/ProjectRepository.repo";

export class UpdateProject {
  private projectRepository: ProjectRepository;
  constructor(ProjectRepository: ProjectRepository) {
    this.projectRepository = ProjectRepository;
  }

  async execute(pid: number, projectData: Partial<Project>) {
    if (!projectData || !pid) {
      throw new Error("Project Data or Id not provided!");
    }

    return this.projectRepository.update(pid, projectData);
  }
}
