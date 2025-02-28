import { AppError } from '../../../shared/utils/AppError';
import { TaskAssignmentRepository } from './../../../domain/repositories/TaskAssignmentRepository.repo';
export class GetTaskAssignmentsByUserIdUseCase {
    private taskAssignmentRepo: TaskAssignmentRepository
    constructor(TaskAssignmentRepository: TaskAssignmentRepository) {
        this.taskAssignmentRepo = TaskAssignmentRepository
    }

    async execute(uid: number) {
        if (!uid) {
            throw new AppError("Missing required field user_id!", 400)
        }

        const userExists = await this.taskAssignmentRepo.getById(uid);
        
        if (!userExists) {
            throw new AppError(`Provided user does not exist!`, 404)
        }
        
        const taskAssns = await this.taskAssignmentRepo.getByUserId(uid)

        return taskAssns
    }
}