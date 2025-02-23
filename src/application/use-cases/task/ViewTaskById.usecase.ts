import { Task } from "../../../domain/entities/Task.entity";
import { TaskRepository } from "../../../domain/repositories/TaskRepository.repo";

export class ViewTaskByIdUseCase {
    constructor(private taskRepository: TaskRepository) {}

    async execute(taskId: number): Promise<Task | null> {
        return this.taskRepository.getById(taskId);
    }
}
