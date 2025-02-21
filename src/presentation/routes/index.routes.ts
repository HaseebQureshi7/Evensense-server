import { Router } from "express";
import projectRouter from "./projects/project.routes";
import userRouter from "./users/user.routes";
import authRouter from "./auth/auth.routes";

const appRouter = Router();

appRouter.use("/auth", authRouter);
appRouter.use("/user", userRouter);
appRouter.use("/project", projectRouter);

export default appRouter;
