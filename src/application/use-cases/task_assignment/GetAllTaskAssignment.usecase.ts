import { TaskAssignmentRepository } from './../../../domain/repositories/TaskAssignmentRepository.repo';
export class GetAllTaskAssignmentUseCase {
    private taskAssignmentRepo: TaskAssignmentRepository
    constructor(TaskAssignmentRepository: TaskAssignmentRepository) {
        this.taskAssignmentRepo = TaskAssignmentRepository
    }

    execute() {
        return this.taskAssignmentRepo.getAll()
    }
}