import { ProjectRepository } from "../../../domain/repositories/ProjectRepository.repo";
import { UpdateProjectDTO } from "../../dtos/project/updateProject.dto";

export class UpdateProject {
  private projectRepository: ProjectRepository;
  constructor(ProjectRepository: ProjectRepository) {
    this.projectRepository = ProjectRepository;
  }

  async execute(pid: number, projectData: UpdateProjectDTO) {
    if (!projectData || !pid) {
      throw new Error("Project Data or Id not provided!");
    }

    return this.projectRepository.update(pid, projectData);
  }
}
