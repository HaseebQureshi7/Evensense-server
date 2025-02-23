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
  "/:tid",
  taskAssignmentController.updateTaskAssignment
);
taskAssignmentRouter.delete(
  "/:tid",
  taskAssignmentController.deleteTaskAssignment
);

export default taskAssignmentRouter;
