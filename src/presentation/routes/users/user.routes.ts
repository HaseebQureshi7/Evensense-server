import { Router } from "express";
import { UserController } from "../../controllers/users/user.controller";
import { authenticateUser } from "../../../shared/middlewares/auth.middleware";

const userRouter = Router();
const userController = new UserController();

// Protect routes using the middleware
userRouter.patch("/", authenticateUser, userController.updateProfile);
userRouter.delete("/", authenticateUser, userController.deleteProfile);

export default userRouter;
