import { TaskAssignment } from '../../../domain/entities/TaskAssignment.entity';
import { TaskAssignmentRepository } from './../../../domain/repositories/TaskAssignmentRepository.repo';
export class UpdateTaskAssignmentUseCase {
    private taskAssignmentRepo: TaskAssignmentRepository
    constructor(TaskAssignmentRepository: TaskAssignmentRepository) {
        this.taskAssignmentRepo = TaskAssignmentRepository
    }

    execute(task_id: number, updated_task_assignment_details: TaskAssignment) {
        if (!task_id || !updated_task_assignment_details) {
            throw new Error(`Missing required fields!. Provide task_id and user_id`)
        }

        return this.taskAssignmentRepo.update(task_id, updated_task_assignment_details)
    }
}