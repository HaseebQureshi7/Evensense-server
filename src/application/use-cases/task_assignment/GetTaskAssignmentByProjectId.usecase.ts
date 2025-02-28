import { AppError } from "../../../shared/utils/AppError";
import { TaskAssignmentRepository } from "../../../domain/repositories/TaskAssignmentRepository.repo";
import { ProjectRepository } from "../../../domain/repositories/ProjectRepository.repo"; // ✅ Inject this

export class GetTaskAssignmentsByProjectIdUseCase {
  private taskAssignmentRepo: TaskAssignmentRepository;
  private projectRepo: ProjectRepository; // ✅ Inject ProjectRepository

  constructor(
    taskAssignmentRepo: TaskAssignmentRepository,
    projectRepo: ProjectRepository // ✅ Inject ProjectRepository
  ) {
    this.taskAssignmentRepo = taskAssignmentRepo;
    this.projectRepo = projectRepo;
  }

  async execute(pid: number) {
    if (!pid) {
      throw new AppError("Missing required field project_id!", 400);
    }

    // 🔍 Check if project exists using `projectRepo`
    const projectExists = await this.projectRepo.getById(pid);
    if (!projectExists) {
      throw new AppError("Project not found!", 404);
    }

    // ✅ Now fetch task assignments
    return this.taskAssignmentRepo.getByProjectId(pid);
  }
}
