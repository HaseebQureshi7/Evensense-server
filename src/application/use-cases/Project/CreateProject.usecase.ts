import { ProjectRepository } from "../../../domain/repositories/ProjectRepository.repo";
import { Project } from "../../../domain/entities/Project.entity";
import { CreateProjectDTO } from "../../dtos/project/createProject.dto";

export class CreateProjectUseCase {
  private projectRepository: ProjectRepository;

  constructor(projectRepository: ProjectRepository) {
    this.projectRepository = projectRepository;
  }

  async execute(projectDetails: CreateProjectDTO): Promise<Project> {
    // Business Logic Check here 
    if (!projectDetails.name || !projectDetails.description || !projectDetails.user_id) {
      throw new Error("Project name, user_id, or description are required!");
    }

    return this.projectRepository.create(projectDetails);
  }
}
