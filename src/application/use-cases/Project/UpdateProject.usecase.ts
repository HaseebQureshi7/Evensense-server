import { ProjectRepository } from "../../../domain/repositories/ProjectRepository.repo";
import { ProjectRepositoryImpl } from "../../../infrastructure/repositories/ProjectRepository.impl";
import { UpdateProjectDTO } from "../../dtos/project/updateProject.dto";

export class UpdateProject {
  private projectRepository: ProjectRepository;
  constructor(ProjectRepository: ProjectRepository) {
    this.projectRepository = ProjectRepository;
  }

  async execute(uid: number, pid: number, projectData: UpdateProjectDTO) {
    if (!projectData || !pid) {
      throw new Error("Project Data or Id not provided!");
    }

    const findProjectById = await this.projectRepository.getById(pid);
    if (findProjectById?.user_id != uid) {
      throw new Error(
        "Access Error: Only the project owner can update this project"
      );
    }

    return this.projectRepository.update(pid, projectData);
  }
}
