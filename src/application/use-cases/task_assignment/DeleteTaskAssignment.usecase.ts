import { TaskAssignmentRepository } from './../../../domain/repositories/TaskAssignmentRepository.repo';
export class DeleteTaskAssignmentUseCase {
    private taskAssignmentRepo: TaskAssignmentRepository
    constructor(TaskAssignmentRepository: TaskAssignmentRepository) {
        this.taskAssignmentRepo = TaskAssignmentRepository
    }

    execute(ta_id: number) {
        if (!ta_id) {
            throw new Error("Missing required filed task_assignment_id!")
        }
        return this.taskAssignmentRepo.delete(ta_id)
    }
}