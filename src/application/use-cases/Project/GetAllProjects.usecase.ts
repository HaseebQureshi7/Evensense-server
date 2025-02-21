import { ProjectRepository } from "../../../domain/repositories/ProjectRepository.repo";

export class getAllProjectsUseCase {
    private projectRepository: ProjectRepository;

    constructor(projectRepository: ProjectRepository) {
        this.projectRepository = projectRepository
    }

    async execute() {
        // No checks here
        return this.projectRepository.getAll()
    }
}