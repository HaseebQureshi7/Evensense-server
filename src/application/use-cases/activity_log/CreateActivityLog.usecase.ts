import { AppError } from "../../../shared/utils/AppError";
import { CreateActivityLogDTO } from "../../dtos/activity_log/createActivityLog.dto";
import { ActivityLogRepository } from "./../../../domain/repositories/ActivityLogRepository.repo";
export class CreateActivityLogUsecase {
  private activityLogRepository: ActivityLogRepository;

  constructor(activityLogRepository: ActivityLogRepository) {
    this.activityLogRepository = activityLogRepository;
  }

  async execute(alDetails: CreateActivityLogDTO) {
    if (!alDetails.action || !alDetails.project_id || !alDetails.user_id) {
      throw new AppError(
        `Missing required fields: action, user_id, or project_id`
      ,400);
    }

    const newALog = await this.activityLogRepository.create(alDetails);
    if (!newALog) {
      throw new AppError("Failure! Activity Log was not created", 500)
    }

    return newALog
  }
}
