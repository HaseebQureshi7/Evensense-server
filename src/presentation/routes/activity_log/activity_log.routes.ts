import { Router } from "express";
import { ActivityLogController } from "../../controllers/activity_log/activity_log.controller";

const activityLogRouter = Router();

const activityLogController = new ActivityLogController();

// CRUD
activityLogRouter.get("/", activityLogController.getAllActivityLogs);
activityLogRouter.get("/:al_id", activityLogController.getActivityLogById);
activityLogRouter.get("/:pid", activityLogController.getActivityLogByProjectId);
activityLogRouter.post("/", activityLogController.createActivityLog);
activityLogRouter.patch("/:al_id", activityLogController.updateActivityLog);
activityLogRouter.delete("/:al_id", activityLogController.deleteActivityLog);

export default activityLogRouter;
