import { Router } from "express";
import projectRouter from "./projects/project.routes";
import userRouter from "./users/user.routes";
import authRouter from "./auth/auth.routes";
import taskRouter from "./tasks/task.routes";
import taskAssignmentRouter from "./task_assignment/task_assignment.routes";
import projectTeamRouter from "./project_team/project_team.routes";
import activityLogRouter from "./activity_log/activity_log.routes";

const appRouter = Router();

appRouter.use("/auth", authRouter);
appRouter.use("/user", userRouter);
appRouter.use("/project", projectRouter);
appRouter.use("/task", taskRouter)
appRouter.use("/task_assignment", taskAssignmentRouter)
appRouter.use("/project_team", projectTeamRouter)
appRouter.use("/activity_log", activityLogRouter)

export default appRouter;
