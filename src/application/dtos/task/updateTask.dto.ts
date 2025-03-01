import { Task } from "../../../domain/entities/Task.entity";

export interface UpdateTaskDTO extends Omit<Task, "id" | "created_at" | "project_id"> {}