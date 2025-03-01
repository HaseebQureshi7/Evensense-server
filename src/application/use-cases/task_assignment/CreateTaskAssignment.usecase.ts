import { AppError } from '../../../shared/utils/AppError';
import { TaskAssignmentRepository } from './../../../domain/repositories/TaskAssignmentRepository.repo';
export class CreateTaskAssignmentUseCase {
    private taskAssignmentRepo: TaskAssignmentRepository
    constructor(TaskAssignmentRepository: TaskAssignmentRepository) {
        this.taskAssignmentRepo = TaskAssignmentRepository
    }

    async execute(task_id: number, user_id: number) {
        if (!task_id || !user_id) {
            throw new AppError(`Missing required fields!. Provide task_id and user_id`, 400)
        }
        
        const newTask = await this.taskAssignmentRepo.create(task_id, user_id)
        
        if (!newTask) {
            throw new AppError(`Failure! Task Assignment was not created!`, 500)
        }

        return newTask
    }
}