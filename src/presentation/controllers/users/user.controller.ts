import { Request, Response } from "express";
import { catchAsync } from "../../../shared/utils/catchAsync";
import { ResponseHandler } from "../../../shared/utils/ResponseHandler";
import { UserRepositoryImpl } from "../../../infrastructure/repositories/UserRepository.impl";
import { UpdateUserUsecase } from "../../../application/use-cases/users/UpdateUser.usecase";
import { DeleteUserUsecase } from "../../../application/use-cases/users/DeleteUser.usecase";

export class UserController {
  private UserRepository = new UserRepositoryImpl();
  
  updateProfile = catchAsync(async (req: Request, res: Response) => {
    const updateUserProfileUsecase = new UpdateUserUsecase(this.UserRepository);

    const userId = Number(req.userId)
    const updatedUserBody = req.body
    const updatedUser = await updateUserProfileUsecase.execute(userId, updatedUserBody)

    return ResponseHandler.success(
      res,
      `User was profile updated successfully`,
      200,
      updatedUser
    );
  });

  deleteProfile = catchAsync(async (req: Request, res: Response) => {
    const deleteUserProfileUsecase = new DeleteUserUsecase(this.UserRepository);

    const userId = Number(req.userId)
    const deletedUser = await deleteUserProfileUsecase.execute(userId)

    return ResponseHandler.success(
      res,
      `User was profile deleted successfully`,
      200,
      deletedUser
    );
  });
}
