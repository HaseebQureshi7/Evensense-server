import { Task } from "../entities/Task.entity";

export interface TaskRepository {
    getAll(): Promise<Task[]>;
    getById(taskId: number): Promise<Task | null>;
    getByProjectId(projectId: number): Promise<Task[]>;
    create(taskData: Partial<Task>): Promise<Task>;
    update(taskId: number, taskData: Partial<Task>): Promise<Task | null>;
    delete(taskId: number): Promise<Task>;
}
