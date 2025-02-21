import { ProjectRepository } from "../../../domain/repositories/ProjectRepository.repo";
import { Project } from "../../../domain/entities/Project.entity";
import { CreateProjectDTO } from "../../dtos/createProject.dto";

export class CreateProjectUseCase {
  private projectRepository: ProjectRepository;

  constructor(projectRepository: ProjectRepository) {
    this.projectRepository = projectRepository;
  }

  async execute(data: CreateProjectDTO): Promise<Project> {
    // Business Logic Check here 
    if (!data.name || !data.description) {
      throw new Error("Project name and description are required!");
    }

    const project = new Project(data.name, data.description, data.user_id, data.deadline, data.projectLogo, data.estDeadline, data.startDate);

    return this.projectRepository.create(project);
  }
}
