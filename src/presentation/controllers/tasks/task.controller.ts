import { Request, Response } from "express";
import { catchAsync } from "../../../shared/utils/catchAsync";
import { CreateTaskUseCase } from "../../../application/use-cases/task/CreateTask.usecase";
import { DeleteTaskUseCase } from "../../../application/use-cases/task/DeleteTask.usecase";
import { UpdateTaskUseCase } from "../../../application/use-cases/task/UpdateTask.usecase";
import { ViewAllTasksUseCase } from "../../../application/use-cases/task/ViewAllTasks.usecase";
import { ViewProjectTasksUseCase } from "../../../application/use-cases/task/ViewProjectTask.usecase";
import { ViewTaskByIdUseCase } from "../../../application/use-cases/task/ViewTaskById.usecase";
import { TaskRepositoryImpl } from "../../../infrastructure/repositories/TaskRepository.impl";
import { ResponseHandler } from "../../../shared/utils/ResponseHandler";
import { ProjectRepositoryImpl } from "../../../infrastructure/repositories/ProjectRepository.impl";
import { UpdateTaskDTO } from "../../../application/dtos/task/updateTask.dto";

export class TaskController {
  private taskRepository = new TaskRepositoryImpl();
  viewAllTasks = catchAsync(async (req: Request, res: Response) => {
    const tasks = await new ViewAllTasksUseCase(this.taskRepository).execute();

    return ResponseHandler.success(
      res,
      "All tasks fetched successfully",
      200,
      tasks
    );
  });

  viewTaskById = catchAsync(async (req: Request, res: Response) => {
    const { tid } = req.params;

    const task = await new ViewTaskByIdUseCase(this.taskRepository).execute(
      Number(tid)
    );

    return ResponseHandler.success(
      res,
      `Task with id : ${tid} fetched successfully`,
      200,
      task
    );
  });

  viewProjectTasks = catchAsync(async (req: Request, res: Response) => {
    const { pid } = req.params;

    const projectImpl = new ProjectRepositoryImpl();
    const tasks = await new ViewProjectTasksUseCase(
      this.taskRepository,
      projectImpl
    ).execute(Number(pid));

    return ResponseHandler.success(
      res,
      "All project tasks fetched successfully",
      200,
      tasks
    );
  });

  createTask = catchAsync(async (req: Request, res: Response) => {
    const taskData = req.body;
    const uid = Number(req.userId);

    const task = await new CreateTaskUseCase(this.taskRepository).execute(
      uid,
      taskData
    );

    return ResponseHandler.success(res, "Task created successfully", 201, task);
  });

  updateTask = catchAsync(async (req: Request, res: Response) => {
    const uid = Number(req.userId);
    const { tid } = req.params;
    const { name, comments, deadline, status }: UpdateTaskDTO = req.body;
    const taskData = {
      name,
      comments,
      deadline,
      status,
    };

    const updatedTask = await new UpdateTaskUseCase(
      this.taskRepository
    ).execute(uid, Number(tid), taskData);

    return ResponseHandler.success(
      res,
      `Task ${tid} updated successfully`,
      200,
      updatedTask
    );
  });

  deleteTask = catchAsync(async (req: Request, res: Response) => {
    const { tid } = req.params;

    const deletedTask = await new DeleteTaskUseCase(
      this.taskRepository
    ).execute(Number(tid));

    return ResponseHandler.success(
      res,
      `Task ${tid} deleted successfully`,
      200,
      deletedTask
    );
  });
}
