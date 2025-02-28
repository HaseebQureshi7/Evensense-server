import { CreateActivityLogDTO } from "../../dtos/activity_log/createActivityLog.dto";
import { ActivityLogRepository } from "./../../../domain/repositories/ActivityLogRepository.repo";
export class CreateActivityLogUsecase {
  private activityLogRepository: ActivityLogRepository;

  constructor(activityLogRepository: ActivityLogRepository) {
    this.activityLogRepository = activityLogRepository;
  }

  execute(alDetails: CreateActivityLogDTO) {
    if (!alDetails.action || !alDetails.project_id || !alDetails.user_id) {
      throw new Error(
        `Missing required fields: action, user_id, or project_id`
      );
    }

    return this.activityLogRepository.create(alDetails);
  }
}
