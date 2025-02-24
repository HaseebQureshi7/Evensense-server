import { TaskAssignmentRepository } from './../../../domain/repositories/TaskAssignmentRepository.repo';
export class CreateTaskAssignmentUseCase {
    private taskAssignmentRepo: TaskAssignmentRepository
    constructor(TaskAssignmentRepository: TaskAssignmentRepository) {
        this.taskAssignmentRepo = TaskAssignmentRepository
    }

    execute(task_id: number, user_id: number) {
        if (!task_id || !user_id) {
            throw new Error(`Missing required fields!. Provide task_id and user_id`)
        }

        return this.taskAssignmentRepo.create(task_id, user_id)
    }
}