import { TaskRepository } from "../../../domain/repositories/TaskRepository.repo";
import { AppError } from "../../../shared/utils/AppError";
import { UpdateTaskDTO } from "../../dtos/task/updateTask.dto";

export class UpdateTaskUseCase {
    constructor(private taskRepository: TaskRepository) { }

    async execute(taskId: number, taskData: UpdateTaskDTO) {
        const taskExists = await this.taskRepository.getById(taskId);
        if (!taskExists) {
            throw new AppError("Task does not exists", 404)
        }
        
        return this.taskRepository.update(taskId, taskData);
    }
}
