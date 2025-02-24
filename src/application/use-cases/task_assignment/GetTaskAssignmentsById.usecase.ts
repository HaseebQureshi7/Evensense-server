import { TaskAssignmentRepository } from './../../../domain/repositories/TaskAssignmentRepository.repo';
export class GetTaskAssignmentByIdUseCase {
    private taskAssignmentRepo: TaskAssignmentRepository
    constructor(TaskAssignmentRepository: TaskAssignmentRepository) {
        this.taskAssignmentRepo = TaskAssignmentRepository
    }

    execute(ta_id: number) {
        if (!ta_id) {
            throw new Error("Missing required field task_assignment_id!")
        }
        return this.taskAssignmentRepo.getById(ta_id)
    }
}