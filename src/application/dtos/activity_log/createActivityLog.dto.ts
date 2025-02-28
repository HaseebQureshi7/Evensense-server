import { ActivityLog } from "../../../domain/entities/ActivityLog.entity";

export interface CreateActivityLogDTO extends Omit<ActivityLog, "id" | "created_at"> {}