import { TaskAssignmentRepository } from './../../../domain/repositories/TaskAssignmentRepository.repo';
export class GetTaskAssignmentsByProjectIdUseCase {
    private taskAssignmentRepo: TaskAssignmentRepository
    constructor(TaskAssignmentRepository: TaskAssignmentRepository) {
        this.taskAssignmentRepo = TaskAssignmentRepository
    }

    execute(pid: number) {
        if (!pid) {
            throw new Error("Missing required field project_id!")
        }
        return this.taskAssignmentRepo.getByProjectId(pid)
    }
}