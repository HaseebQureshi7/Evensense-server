import { Request, Response } from "express";
import { catchAsync } from "../../../shared/utils/catchAsync";
import { ResponseHandler } from "../../../shared/utils/ResponseHandler";

export class TaskAssignmentController {
  createTaskAssignment = catchAsync(async (req: Request, res: Response) => {
    const taskAssignment = null;
    return ResponseHandler.success(
      res,
      "Task Assignment created successfully",
      201,
      taskAssignment
    );
  });

  getAllTaskAssignment = catchAsync(async (req: Request, res: Response) => {
    const taskAssignment = null;
    return ResponseHandler.success(
      res,
      "All Task Assignments fetched successfully",
      201,
      taskAssignment
    );
  });

  getTaskAssignmentsById = catchAsync(async (req: Request, res: Response) => {
    const taskAssignment = null;
    return ResponseHandler.success(
      res,
      "Task Assignments of id : ${put id here} fetched successfully",
      200,
      taskAssignment
    );
  });

  getTaskAssignmentsByUserId = catchAsync(
    async (req: Request, res: Response) => {
      const taskAssignment = null;
      return ResponseHandler.success(
        res,
        "Task Assignments of user_id: ${put id here} fetched successfully",
        200,
        taskAssignment
      );
    }
  );

  getTaskAssignmentsByProjectId = catchAsync(
    async (req: Request, res: Response) => {
      const taskAssignment = null;
      return ResponseHandler.success(
        res,
        "Task Assignments of project_id: ${put id here} fetched successfully",
        200,
        taskAssignment
      );
    }
  );

  updateTaskAssignment = catchAsync(async (req: Request, res: Response) => {
    const taskAssignment = null;
    return ResponseHandler.success(
      res,
      "Task Assignment ${put id here} updated successfully",
      200,
      taskAssignment
    );
  });

  deleteTaskAssignment = catchAsync(async (req: Request, res: Response) => {
    const taskAssignment = null;
    return ResponseHandler.success(
      res,
      "Task Assignments ${put id here} deleted successfully",
      200,
      taskAssignment
    );
  });
}
