import { Task } from "../../../domain/entities/Task.entity";
import { TaskRepository } from "../../../domain/repositories/TaskRepository.repo";

export class CreateTaskUseCase {
    constructor(private taskRepository: TaskRepository) {}

    async execute(taskData: Partial<Task>): Promise<Task> {
        return this.taskRepository.create(taskData);
    }
}
