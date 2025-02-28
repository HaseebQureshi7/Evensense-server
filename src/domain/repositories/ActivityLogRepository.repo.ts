import { CreateActivityLogDTO } from "../../application/dtos/activity_log/createActivityLog.dto";
import { UpdateActivityLogDTO } from "../../application/dtos/activity_log/updateActivityLog.dto";
import { ActivityLog } from "../entities/ActivityLog.entity";

export interface ActivityLogRepository {
  getAll(): Promise<ActivityLog[]>;
  getById(al_id: number): Promise<ActivityLog | null>;
  getByProjectId(pid: number): Promise<ActivityLog[] | null>;
  create(activityLogDetails: CreateActivityLogDTO): Promise<ActivityLog>;
  update(
    al_id: number,
    newALDetails: UpdateActivityLogDTO
  ): Promise<ActivityLog>;
  delete(al_id: number): Promise<ActivityLog>;
}
