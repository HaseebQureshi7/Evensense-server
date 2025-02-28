import { TaskRepository } from "../../../domain/repositories/TaskRepository.repo";
import { AppError } from "../../../shared/utils/AppError";

export class DeleteTaskUseCase {
    constructor(private taskRepository: TaskRepository) { }

    async execute(taskId: number) {
        const taskExists = await this.taskRepository.getById(taskId);
        if (!taskExists) {
            throw new AppError("Task does not exists", 404)
        }
        return this.taskRepository.delete(taskId);
    }
}
