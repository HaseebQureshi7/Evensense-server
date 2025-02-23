import { Router } from "express";
import { TaskController } from "../../controllers/tasks/task.controller";

const taskRouter = Router();

const taskController = new TaskController();

// CRUD
taskRouter.get("/", taskController.viewAllTasks);
taskRouter.post("/", taskController.createTask);
taskRouter.patch("/:tid", taskController.updateTask);
taskRouter.get("/project/:pid", taskController.viewProjectTasks);
taskRouter.get("/:tid", taskController.viewTaskById);
taskRouter.delete("/:tid", taskController.deleteTask);

export default taskRouter;
