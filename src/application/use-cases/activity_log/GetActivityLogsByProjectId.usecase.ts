import { AppError } from "../../../shared/utils/AppError";
import { ActivityLogRepository } from "./../../../domain/repositories/ActivityLogRepository.repo";
export class GetActivityLogsByProjectIdUsecase {
  private activityLogRepository: ActivityLogRepository;

  constructor(activityLogRepository: ActivityLogRepository) {
    this.activityLogRepository = activityLogRepository;
  }

  async execute(pid: number) {
    if (!pid) {
      throw new AppError(`Missing required fields: project_id`, 400);
    }
    
    const projectLogs = await this.activityLogRepository.getByProjectId(pid)

    // --> NOT NEEDED
    // if (projectLogs.length <= 0) {
    //   throw new AppError(`No Activity Logs found for this project`, 200);
    // }

    return projectLogs;
  }
}
