import { TaskAssignment } from "../../../domain/entities/TaskAssignment.entity";

export interface UpdateTaskAssignmentDTO
  extends Partial<Omit<TaskAssignment, "id" | "created_at">> {}
