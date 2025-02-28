import { CreateActivityLogDTO } from "../../dtos/activity_log/createActivityLog.dto";
import { ActivityLogRepository } from "./../../../domain/repositories/ActivityLogRepository.repo";
import { ActivityLog } from "../../../domain/entities/ActivityLog.entity";
import { AppError } from "../../../shared/utils/AppError";

export class UpdateActivityLogUsecase {
  private activityLogRepository: ActivityLogRepository;

  constructor(activityLogRepository: ActivityLogRepository) {
    this.activityLogRepository = activityLogRepository;
  }

  async execute(al_id: number, alDetails: Partial<CreateActivityLogDTO>): Promise<ActivityLog> {
    if (!al_id) {
      throw new AppError("Activity log ID is required", 400);
    }

    // 🔍 Check if the activity log exists
    const existingLog = await this.activityLogRepository.getById(al_id);
    if (!existingLog) {
      throw new AppError(`Activity log with ID ${al_id} not found`, 404)
    }

    // 🚀 Perform update and return result
    const updatedLog = await this.activityLogRepository.update(al_id, alDetails);
    if (!updatedLog) {
      throw new AppError(`Failed to update Activity Log with ID ${al_id}`, 500);
    }

    return updatedLog;
  }
}
