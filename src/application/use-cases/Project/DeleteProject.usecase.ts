import { ProjectRepository } from '../../../domain/repositories/ProjectRepository.repo';
export class DeleteProject {
    private projectRepository: ProjectRepository;
    constructor(ProjectRepository: ProjectRepository) {
        this.projectRepository = ProjectRepository
    }

    async execute(pid:number) {
        if (!pid) {
            throw new Error("No project-id provided!")
        }
        
        return this.projectRepository.delete(pid)
    }
}