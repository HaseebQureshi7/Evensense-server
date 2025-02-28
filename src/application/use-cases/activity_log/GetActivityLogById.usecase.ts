import { AppError } from "../../../shared/utils/AppError";
import { ActivityLogRepository } from "./../../../domain/repositories/ActivityLogRepository.repo";
export class GetActivityLogByIdUsecase {
  private activityLogRepository: ActivityLogRepository;

  constructor(activityLogRepository: ActivityLogRepository) {
    this.activityLogRepository = activityLogRepository;
  }

  async execute(al_id: number) {
    if (!al_id) {
      throw new AppError(
        `Missing required fields: id`
        , 400)
    }

    const log = await this.activityLogRepository.getById(al_id);

    if (!log) {
      throw new AppError("Activity log not found", 404)
    }

    return log
  }
}
