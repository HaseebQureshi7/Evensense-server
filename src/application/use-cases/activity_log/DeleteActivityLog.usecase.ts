import { AppError } from "../../../shared/utils/AppError";
import { ActivityLogRepository } from "./../../../domain/repositories/ActivityLogRepository.repo";
export class DeleteActivityLogUsecase {
  private activityLogRepository: ActivityLogRepository;

  constructor(activityLogRepository: ActivityLogRepository) {
    this.activityLogRepository = activityLogRepository;
  }

  async execute(al_id: number) {
    if (!al_id) {
      throw new Error(
        `Missing required fields: id`
      );
    }

    const deletedLog = await this.activityLogRepository.delete(al_id);

    if (!deletedLog) {
      throw new AppError(
        "Activity log not found or could not be deleted",
        404
      );
    }

    return deletedLog
  }
}
