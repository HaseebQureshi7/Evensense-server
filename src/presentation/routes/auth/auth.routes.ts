import { Router } from "express";
import { AuthController } from "../../controllers/auth/auth.controller";

const authRouter = Router();

const authController = new AuthController()

// auth routes
authRouter.post("/login", authController.userLogin)
authRouter.post("/signup", authController.userSignup)
authRouter.post("/refresh", authController.refreshToken)
authRouter.post("/logout", authController.userLogout)

export default authRouter;
