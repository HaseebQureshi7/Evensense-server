import { AppError } from "../../../shared/utils/AppError";
import { ActivityLogRepository } from "./../../../domain/repositories/ActivityLogRepository.repo";
export class GetAllActivityLogsUsecase {
  private activityLogRepository: ActivityLogRepository;

  constructor(activityLogRepository: ActivityLogRepository) {
    this.activityLogRepository = activityLogRepository;
  }

  async execute() {    
    const allALogs = await this.activityLogRepository.getAll();
    if (allALogs.length < 0) {
      throw new AppError("No Activity Logs present", 204)
    }

    return allALogs
  }
}
