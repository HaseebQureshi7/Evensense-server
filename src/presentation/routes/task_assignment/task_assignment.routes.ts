import { Router } from "express";
import { TaskAssignmentController } from "../../controllers/task_assignment/task_assignment.controller";

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
  taskAssignmentController.getTaskAssignmentsByUserId
);
taskAssignmentRouter.get(
  "/project/:pid",
  taskAssignmentController.getTaskAssignmentsByProjectId
);
taskAssignmentRouter.post("/", taskAssignmentController.createTaskAssignment);
taskAssignmentRouter.patch(
  "/:ta_id",
  taskAssignmentController.updateTaskAssignment
);
taskAssignmentRouter.delete(
  "/:ta_id",
  taskAssignmentController.deleteTaskAssignment
);

export default taskAssignmentRouter;
