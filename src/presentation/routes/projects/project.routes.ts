import { Router } from "express";
import { ProjectController } from "../../controllers/projects/project.controller";

const projectRouter = Router();

const projectController = new ProjectController()

// CRUD
projectRouter.get("/:pid", projectController.getProjectById)
projectRouter.get("/", projectController.getAllProjects)
projectRouter.post("/", projectController.createProject)
projectRouter.patch("/:pid", projectController.updateProjectById)
projectRouter.delete("/:pid", projectController.deleteProjectById)

//
projectRouter.get("/user_projects/:uid", projectController.getUserProjects)


export default projectRouter;
