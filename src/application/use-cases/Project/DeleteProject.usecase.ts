import { ProjectRepository } from '../../../domain/repositories/ProjectRepository.repo';
export class DeleteProject {
    private projectRepository: ProjectRepository;
    constructor(ProjectRepository: ProjectRepository) {
        this.projectRepository = ProjectRepository
    }

    async execute(uid:number, pid:number) {
        if (!pid) {
            throw new Error("No project-id provided!")
        }

        const findProjectById = await this.projectRepository.getById(pid);
        if (findProjectById?.user_id != uid) {
          throw new Error(
            "Access Error: Only the project owner can delete this project"
          );
        }
        
        return this.projectRepository.delete(pid)
    }
}