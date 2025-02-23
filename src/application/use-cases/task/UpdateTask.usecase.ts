import { Task } from "../../../domain/entities/Task.entity";
import { TaskRepository } from "../../../domain/repositories/TaskRepository.repo";

export class UpdateTaskUseCase {
    constructor(private taskRepository: TaskRepository) {}

    async execute(taskId: number, taskData: Partial<Task>): Promise<Task | null> {
        return this.taskRepository.update(taskId, taskData);
    }
}
