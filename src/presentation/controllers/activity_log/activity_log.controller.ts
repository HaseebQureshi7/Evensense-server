import { Request, Response } from "express";
import { ActivityLogImpl } from "../../../infrastructure/repositories/ActivityLogRepository.impl";
import { catchAsync } from "../../../shared/utils/catchAsync";
import { CreateActivityLogDTO } from "../../../application/dtos/activity_log/createActivityLog.dto";
import { CreateActivityLogUsecase } from "../../../application/use-cases/activity_log/CreateActivityLog.usecase";
import { ResponseHandler } from "../../../shared/utils/ResponseHandler";
import { GetActivityLogByIdUsecase } from "../../../application/use-cases/activity_log/GetActivityLogById.usecase";
import { GetActivityLogsByProjectIdUsecase } from "../../../application/use-cases/activity_log/GetActivityLogsByProjectId.usecase";
import { UpdateActivityLogUsecase } from "../../../application/use-cases/activity_log/UpdateActivityLog.usecase";
import { DeleteActivityLogUsecase } from "../../../application/use-cases/activity_log/DeleteActivityLog.usecase";
import { GetAllActivityLogsUsecase } from "../../../application/use-cases/activity_log/GetAllActivityLogs.usecase";
import { UpdateActivityLogDTO } from "../../../application/dtos/activity_log/updateActivityLog.dto";

export class ActivityLogController {
  private ALogImpl = new ActivityLogImpl();

  createActivityLog = catchAsync(async (req: Request, res: Response) => {
    const newALDetails: CreateActivityLogDTO = req.body;

    const newActivityLog = await new CreateActivityLogUsecase(
      this.ALogImpl
    ).execute(newALDetails);

    return ResponseHandler.success(
      res,
      "Activity log created successfully",
      201,
      newActivityLog
    );
  });

  getAllActivityLogs = catchAsync(async (req: Request, res: Response) => {
    const logs = await new GetAllActivityLogsUsecase(this.ALogImpl).execute();
    return ResponseHandler.success(
      res,
      "Activity logs retrieved successfully",
      200,
      logs
    );
  });

  getActivityLogById = catchAsync(async (req: Request, res: Response) => {
    const { al_id } = req.params;
    const log = await new GetActivityLogByIdUsecase(this.ALogImpl).execute(
      Number(al_id)
    );

    return ResponseHandler.success(
      res,
      "Activity log retrieved successfully",
      200,
      log
    );
  });

  getActivityLogByProjectId = catchAsync(
    async (req: Request, res: Response) => {
      const { pid } = req.params;
      const logs = await new GetActivityLogsByProjectIdUsecase(
        this.ALogImpl
      ).execute(Number(pid));

      return ResponseHandler.success(
        res,
        "Activity logs retrieved successfully",
        200,
        logs
      );
    }
  );

  updateActivityLog = catchAsync(async (req: Request, res: Response) => {
    const { al_id } = req.params;
    const updateData: UpdateActivityLogDTO = req.body;

    const updatedLog = await new UpdateActivityLogUsecase(
      this.ALogImpl
    ).execute(Number(al_id), updateData);

    return ResponseHandler.success(
      res,
      "Activity log updated successfully",
      200,
      updatedLog
    );
  });

  deleteActivityLog = catchAsync(async (req: Request, res: Response) => {
    const { al_id } = req.params;
    const deletedLog = await new DeleteActivityLogUsecase(
      this.ALogImpl
    ).execute(Number(al_id));

    return ResponseHandler.success(
      res,
      "Activity log deleted successfully",
      200,
      deletedLog
    );
  });
}
