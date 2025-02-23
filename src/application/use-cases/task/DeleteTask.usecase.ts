import { Task } from "../../../domain/entities/Task.entity";
import { TaskRepository } from "../../../domain/repositories/TaskRepository.repo";

export class DeleteTaskUseCase {
    constructor(private taskRepository: TaskRepository) {}

    async execute(taskId: number): Promise<Task> {
        return this.taskRepository.delete(taskId);
    }
}
