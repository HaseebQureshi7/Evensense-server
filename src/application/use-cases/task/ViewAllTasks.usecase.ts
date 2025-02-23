import { Task } from "../../../domain/entities/Task.entity";
import { TaskRepository } from "../../../domain/repositories/TaskRepository.repo";

export class ViewAllTasksUseCase {
    constructor(private taskRepository: TaskRepository) {}

    async execute(): Promise<Task[]> {
        return this.taskRepository.getAll();
    }
}
