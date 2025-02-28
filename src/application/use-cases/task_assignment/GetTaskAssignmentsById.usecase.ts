import { AppError } from '../../../shared/utils/AppError';
import { TaskAssignmentRepository } from './../../../domain/repositories/TaskAssignmentRepository.repo';
export class GetTaskAssignmentByIdUseCase {
    private taskAssignmentRepo: TaskAssignmentRepository
    constructor(TaskAssignmentRepository: TaskAssignmentRepository) {
        this.taskAssignmentRepo = TaskAssignmentRepository
    }

    async execute(ta_id: number) {
        if (!ta_id) {
            throw new AppError("Missing required field task_assignment_id!", 400)
        }

        const taskAssignment = await this.taskAssignmentRepo.getById(ta_id)

        if (!taskAssignment) {
            throw new AppError(`Task Assignment was not found!`, 404)
        }

        return taskAssignment
    }
}