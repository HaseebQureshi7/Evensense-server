import { CreateProjectDTO } from "../../application/dtos/project/createProject.dto";
import { UpdateProjectDTO } from "../../application/dtos/project/updateProject.dto";
import { Project } from "../entities/Project.entity";

export interface ProjectRepository {
  // CRUD
  create(project: CreateProjectDTO): Promise<Project>;
  getAll(): Promise<Project[]>;
  getById(pid: number): Promise<Project>;
  update(pid: number, updatedData: UpdateProjectDTO): Promise<Project>;
  delete(pid: number): Promise<Project>;

  //
  getUserProjects(uid: number) : Promise<Project[] | []>
}
