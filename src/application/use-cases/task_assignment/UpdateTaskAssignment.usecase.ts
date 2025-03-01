import { TaskAssignment } from '../../../domain/entities/TaskAssignment.entity';
import { AppError } from '../../../shared/utils/AppError';
import { TaskAssignmentRepository } from './../../../domain/repositories/TaskAssignmentRepository.repo';
export class UpdateTaskAssignmentUseCase {
    private taskAssignmentRepo: TaskAssignmentRepository
    constructor(TaskAssignmentRepository: TaskAssignmentRepository) {
        this.taskAssignmentRepo = TaskAssignmentRepository
    }

    async execute(ta_id: number, updated_task_assignment_details: TaskAssignment) {
        if (!ta_id || !updated_task_assignment_details) {
            throw new AppError(`Missing required fields!. Provide task_id and user_id`, 400)
        }
        
        const tAssnExists = await this.taskAssignmentRepo.getById(ta_id)
        if (!tAssnExists) {
            throw new AppError(`Task Assignment not found!`, 404)
        }
        
        return this.taskAssignmentRepo.update(ta_id, updated_task_assignment_details)
    }
}