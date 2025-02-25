import { authenticateUser } from './../../../shared/middlewares/auth.middleware';
import { Router } from "express";
import { ProjectController } from "../../controllers/projects/project.controller";

const projectRouter = Router();

const projectController = new ProjectController()

// CRUD
projectRouter.get("/", projectController.getAllProjects)
projectRouter.get("/:pid", authenticateUser, projectController.getProjectById)
projectRouter.post("/", authenticateUser, projectController.createProject)
projectRouter.patch("/:pid", authenticateUser, projectController.updateProjectById)
projectRouter.delete("/:pid", authenticateUser, projectController.deleteProjectById)

//
projectRouter.get("/user_projects/:uid", projectController.getUserProjects)


export default projectRouter;
