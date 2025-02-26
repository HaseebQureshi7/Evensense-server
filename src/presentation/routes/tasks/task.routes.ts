import { Router } from "express";
import { TaskController } from "../../controllers/tasks/task.controller";
import { authenticateUser } from "../../../shared/middlewares/auth.middleware";

const taskRouter = Router();

const taskController = new TaskController();

// CRUD
taskRouter.get("/", taskController.viewAllTasks);
taskRouter.post("/", authenticateUser, taskController.createTask);
taskRouter.patch("/:tid", authenticateUser, taskController.updateTask);
taskRouter.get("/project/:pid", authenticateUser, taskController.viewProjectTasks);
taskRouter.get("/:tid", authenticateUser, taskController.viewTaskById);
taskRouter.delete("/:tid", authenticateUser, taskController.deleteTask);

export default taskRouter;
