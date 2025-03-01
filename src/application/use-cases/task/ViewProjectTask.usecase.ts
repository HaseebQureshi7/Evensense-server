import { Task } from "../../../domain/entities/Task.entity";
import { ProjectRepository } from "../../../domain/repositories/ProjectRepository.repo";
import { TaskRepository } from "../../../domain/repositories/TaskRepository.repo";
import { AppError } from "../../../shared/utils/AppError";

export class ViewProjectTasksUseCase {
  private taskRepository: TaskRepository;
  private projectRepository: ProjectRepository;

  constructor(taskRepository: TaskRepository, projectRepository: ProjectRepository) {
    this.taskRepository = taskRepository
    this.projectRepository = projectRepository
  }

  async execute(pid: number): Promise<Task[]> {
    const projectExists = await this.projectRepository.getById(pid);
    
    if (!projectExists) {
      throw new AppError('Project with the provided id does not exist', 404)
    }

    return this.taskRepository.getByProjectId(pid);
  }
}
