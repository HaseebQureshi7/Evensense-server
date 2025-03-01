import { Task } from "../../../domain/entities/Task.entity";

export interface CreateTaskDTO extends Omit<Task, "id" | "created_at"> {}