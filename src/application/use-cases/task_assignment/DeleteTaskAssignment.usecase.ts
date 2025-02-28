import { AppError } from '../../../shared/utils/AppError';
import { TaskAssignmentRepository } from './../../../domain/repositories/TaskAssignmentRepository.repo';
export class DeleteTaskAssignmentUseCase {
    private taskAssignmentRepo: TaskAssignmentRepository
    constructor(TaskAssignmentRepository: TaskAssignmentRepository) {
        this.taskAssignmentRepo = TaskAssignmentRepository
    }

    async execute(ta_id: number) {
        if (!ta_id) {
            throw new AppError("Missing required filed task_assignment_id!", 400)
        }

        const tAssnExists = await this.taskAssignmentRepo.getById(ta_id)
        if (!tAssnExists) {
            throw new AppError(`Task Assignment not found!`, 404)
        }

        return this.taskAssignmentRepo.delete(ta_id)
    }
}