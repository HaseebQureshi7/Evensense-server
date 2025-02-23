import { TaskAssignment } from "../entities/TaskAssignment.entity";

export interface TaskAssignmentRepository {
  getAll(): Promise<TaskAssignment[]>;
  getById(ta_id: number): Promise<TaskAssignment>;
  getByUserId(user_id: number): Promise<TaskAssignment[]>;
  getByProjectId(project_id: number): Promise<TaskAssignment[]>;
  create(task_id: number, user_id: number): Promise<TaskAssignment>;
  update(
    task_id: number,
    updatedTaskAssignment: TaskAssignment
  ): Promise<TaskAssignment>;
  delete(ta_id: number): Promise<TaskAssignment>;
}
