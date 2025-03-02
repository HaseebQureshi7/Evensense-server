import { Router } from "express";
import { TaskAssignmentController } from "../../controllers/task_assignment/task_assignment.controller";
import { authenticateUser } from "../../../shared/middlewares/auth.middleware";

const taskAssignmentRouter = Router();

const taskAssignmentController = new TaskAssignmentController();

// CRUD
taskAssignmentRouter.get("/", taskAssignmentController.getAllTaskAssignment);
taskAssignmentRouter.get(
  "/:ta_id",
  taskAssignmentController.getTaskAssignmentsById
);
taskAssignmentRouter.get(
  "/user/:uid",
  authenticateUser,
  taskAssignmentController.getTaskAssignmentsByUserId
);
taskAssignmentRouter.get(
  "/project/:pid",
  authenticateUser,
  taskAssignmentController.getTaskAssignmentsByProjectId
);
taskAssignmentRouter.post(
  "/",
  authenticateUser,
  taskAssignmentController.createTaskAssignment
);
taskAssignmentRouter.patch(
  "/:ta_id",
  authenticateUser,
  taskAssignmentController.updateTaskAssignment
);
taskAssignmentRouter.delete(
  "/:ta_id",
  authenticateUser,
  taskAssignmentController.deleteTaskAssignment
);

export default taskAssignmentRouter;
