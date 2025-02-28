import { ActivityLog } from "../../../domain/entities/ActivityLog.entity";

export interface UpdateActivityLogDTO extends Partial<Omit<ActivityLog, "id" | "created_at" | "user_id" | "project_id">> {}