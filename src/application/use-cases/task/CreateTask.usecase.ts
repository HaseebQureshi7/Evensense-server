import { Task } from "../../../domain/entities/Task.entity";
import { TaskRepository } from "../../../domain/repositories/TaskRepository.repo";
import { AppError } from "../../../shared/utils/AppError";
import { CreateTaskDTO } from "../../dtos/task/createTask.dto";

export class CreateTaskUseCase {
    constructor(private taskRepository: TaskRepository) { }

    async execute(taskData: CreateTaskDTO) {
        if (!taskData.name || !taskData.project_id) {
            throw new AppError("Missing Required fields: name, project_id", 400)
        }

        return this.taskRepository.create(taskData);
    }
}
