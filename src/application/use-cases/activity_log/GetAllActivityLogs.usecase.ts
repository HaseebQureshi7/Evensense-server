import { CreateActivityLogDTO } from "../../dtos/activity_log/createActivityLog.dto";
import { ActivityLogRepository } from "./../../../domain/repositories/ActivityLogRepository.repo";
export class GetAllActivityLogsUsecase {
  private activityLogRepository: ActivityLogRepository;

  constructor(activityLogRepository: ActivityLogRepository) {
    this.activityLogRepository = activityLogRepository;
  }

  execute() {    
    return this.activityLogRepository.getAll();
  }
}
