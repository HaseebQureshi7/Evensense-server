import { Task } from "../../../domain/entities/Task.entity";
import { TaskRepository } from "../../../domain/repositories/TaskRepository.repo";

export class ViewProjectTasksUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute(projectId: number): Promise<Task[]> {
    return this.taskRepository.getByProjectId(projectId);
  }
}
