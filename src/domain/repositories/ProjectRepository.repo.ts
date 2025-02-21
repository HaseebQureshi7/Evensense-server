import { Project } from "../entities/Project.entity";

export interface ProjectRepository {
  // CRUD
  create(project: Project): Promise<Project>;
  getAll(): Promise<Project[]>;
  getById(pid: number): Promise<Project>;
  update(pid: number, updatedData: Partial<Project>): Promise<Project>;
  delete(pid: number): Promise<Project>;

  //
  getUserProjects(uid: number) : Promise<Project[] | []>
}
