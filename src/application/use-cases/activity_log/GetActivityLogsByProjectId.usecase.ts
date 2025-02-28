import { ActivityLogRepository } from "./../../../domain/repositories/ActivityLogRepository.repo";
export class GetActivityLogsByProjectIdUsecase {
  private activityLogRepository: ActivityLogRepository;

  constructor(activityLogRepository: ActivityLogRepository) {
    this.activityLogRepository = activityLogRepository;
  }

  execute(pid: number) {
    if (!pid) {
      throw new Error(`Missing required fields: project_id`);
    }
    return this.activityLogRepository.getByProjectId(pid);
  }
}
