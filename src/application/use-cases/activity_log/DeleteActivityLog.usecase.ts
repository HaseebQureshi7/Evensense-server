import { ActivityLogRepository } from "./../../../domain/repositories/ActivityLogRepository.repo";
export class DeleteActivityLogUsecase {
  private activityLogRepository: ActivityLogRepository;

  constructor(activityLogRepository: ActivityLogRepository) {
    this.activityLogRepository = activityLogRepository;
  }

  execute(al_id: number) {
    if (!al_id) {
      throw new Error(
        `Missing required fields: id`
      );
    }

    // Probably check if the activity log exists or not
    
    return this.activityLogRepository.delete(al_id);
  }
}
