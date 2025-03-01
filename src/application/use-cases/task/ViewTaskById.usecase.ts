import { Task } from "../../../domain/entities/Task.entity";
import { TaskRepository } from "../../../domain/repositories/TaskRepository.repo";
import { AppError } from "../../../shared/utils/AppError";

export class ViewTaskByIdUseCase {
    constructor(private taskRepository: TaskRepository) {}

    async execute(taskId: number): Promise<Task | null> {
        const taskExists = await this.taskRepository.getById(taskId);
        if (!taskExists) {
            throw new AppError("Task does not exists!", 404)
        }

        return taskExists
    }
}
