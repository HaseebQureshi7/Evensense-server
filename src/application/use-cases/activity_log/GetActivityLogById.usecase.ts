import { ActivityLogRepository } from "./../../../domain/repositories/ActivityLogRepository.repo";
export class GetActivityLogByIdUsecase {
  private activityLogRepository: ActivityLogRepository;

  constructor(activityLogRepository: ActivityLogRepository) {
    this.activityLogRepository = activityLogRepository;
  }

  execute(al_id: number) {    
    if (!al_id) {
        throw new Error(
            `Missing required fields: id`
        )
    }
    return this.activityLogRepository.getById(al_id);
  }
}
