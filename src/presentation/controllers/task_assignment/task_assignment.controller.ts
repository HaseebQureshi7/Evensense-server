import { Request, Response } from "express";
import { catchAsync } from "../../../shared/utils/catchAsync";
import { ResponseHandler } from "../../../shared/utils/ResponseHandler";
import { TaskAssignmentImpl } from "../../../infrastructure/repositories/TaskAssignmentRepository.impl";
import { TaskAssignment } from "../../../domain/entities/TaskAssignment.entity";
import { CreateTaskAssignmentUseCase } from "../../../application/use-cases/task_assignment/CreateTaskAssignment.usecase";
import { GetAllTaskAssignmentUseCase } from "../../../application/use-cases/task_assignment/GetAllTaskAssignment.usecase";
import { GetTaskAssignmentByIdUseCase } from "../../../application/use-cases/task_assignment/GetTaskAssignmentsById.usecase";
import { GetTaskAssignmentsByUserIdUseCase } from "../../../application/use-cases/task_assignment/GetTaskAssignmentByUserId.usecase";
import { GetTaskAssignmentsByProjectIdUseCase } from "../../../application/use-cases/task_assignment/GetTaskAssignmentByProjectId.usecase";
import { UpdateTaskAssignmentUseCase } from "../../../application/use-cases/task_assignment/UpdateTaskAssignment.usecase";
import { DeleteTaskAssignmentUseCase } from "../../../application/use-cases/task_assignment/DeleteTaskAssignment.usecase";
import { ProjectRepositoryImpl } from "../../../infrastructure/repositories/ProjectRepository.impl";

export class TaskAssignmentController {
  private taskAssignmentImpl = new TaskAssignmentImpl(

  )
  createTaskAssignment = catchAsync(async (req: Request, res: Response) => {
    const { task_id, user_id }: TaskAssignment = req.body
    const createTaskAssignmentUC = new CreateTaskAssignmentUseCase(this.taskAssignmentImpl);
    const taskAssignment = await createTaskAssignmentUC.execute(task_id, user_id)

    return ResponseHandler.success(
      res,
      "Task Assignment created successfully",
      201,
      taskAssignment
    );
  });

  getAllTaskAssignment = catchAsync(async (req: Request, res: Response) => {
    const allTaskAssignments = await new GetAllTaskAssignmentUseCase(this.taskAssignmentImpl).execute();

    return ResponseHandler.success(
      res,
      "All Task Assignments fetched successfully",
      200,
      allTaskAssignments
    );
  });

  getTaskAssignmentsById = catchAsync(async (req: Request, res: Response) => {
    const ta_id = Number(req.params.ta_id)

    const taskAssignmentFromId = await new GetTaskAssignmentByIdUseCase(this.taskAssignmentImpl).execute(ta_id)

    return ResponseHandler.success(
      res,
      `Task Assignments of id : ${ta_id} fetched successfully`,
      200,
      taskAssignmentFromId
    );
  });

  getTaskAssignmentsByUserId = catchAsync(
    async (req: Request, res: Response) => {
      const uid = Number(req.params.uid)

      const taskAssignmentFromUserId = await new GetTaskAssignmentsByUserIdUseCase(this.taskAssignmentImpl).execute(uid)

      return ResponseHandler.success(
        res,
        `Task Assignments of user_id: ${uid} fetched successfully`,
        200,
        taskAssignmentFromUserId
      );
    }
  );

  getTaskAssignmentsByProjectId = catchAsync(
    async (req: Request, res: Response) => {
      const pid = Number(req.params.pid)

      const projectRepoImpl = new ProjectRepositoryImpl()
      const taskAssignmentFromProjectId = await new GetTaskAssignmentsByProjectIdUseCase(this.taskAssignmentImpl, projectRepoImpl).execute(pid)

      return ResponseHandler.success(
        res,
        `Task Assignments of project_id: ${pid} fetched successfully`,
        200,
        taskAssignmentFromProjectId
      );
    }
  );

  updateTaskAssignment = catchAsync(async (req: Request, res: Response) => {
    const ta_id = Number(req.params.ta_id)
    const updated_ta_body = req.body

    const updated_task_assignment = await new UpdateTaskAssignmentUseCase(this.taskAssignmentImpl).execute(ta_id, updated_ta_body)

    return ResponseHandler.success(
      res,
      `Task Assignment ${ta_id} updated successfully`,
      200,
      updated_task_assignment
    );
  });

  deleteTaskAssignment = catchAsync(async (req: Request, res: Response) => {
    const ta_id = Number(req.params.ta_id)

    const taskAssignment = await new DeleteTaskAssignmentUseCase(this.taskAssignmentImpl).execute(ta_id);

    return ResponseHandler.success(
      res,
      `Task Assignments ${ta_id} deleted successfully`,
      200,
      taskAssignment
    );
  });
}
