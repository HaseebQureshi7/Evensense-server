import { TaskAssignmentRepository } from './../../../domain/repositories/TaskAssignmentRepository.repo';
export class GetTaskAssignmentsByUserIdUseCase {
    private taskAssignmentRepo: TaskAssignmentRepository
    constructor(TaskAssignmentRepository: TaskAssignmentRepository) {
        this.taskAssignmentRepo = TaskAssignmentRepository
    }

    execute(uid: number) {
        if (!uid) {
            throw new Error("Missing required field user_id!")
        }
        return this.taskAssignmentRepo.getByUserId(uid)
    }
}