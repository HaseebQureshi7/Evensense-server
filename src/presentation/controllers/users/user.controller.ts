import { Request, Response } from "express";
import { catchAsync } from "../../../shared/utils/catchAsync";
import { ResponseHandler } from "../../../shared/utils/ResponseHandler";

export class UserController {
  updateProfile = catchAsync(async (req: Request, res: Response) => {
    return ResponseHandler.success(
      res,
      `Message from Update Profile Auth for id: ${req.userId}`,
      200
    );
  });
  deleteProfile = catchAsync(async (req: Request, res: Response) => {
    return ResponseHandler.success(
        res,
        `Message from Delete Profile Auth for id: ${req.userId}`,
        200
      );
  });
}
