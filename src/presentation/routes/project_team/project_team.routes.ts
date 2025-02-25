import { Router } from "express";
import { ProjectController } from "../../controllers/projects/project.controller";
import { ProjectTeamController } from "../../controllers/project_team/project_team.controller";

const projectTeamRouter = Router();

const projectTeamController = new ProjectTeamController();

// CRUD
projectTeamRouter.post("/", projectTeamController.createProjectTeam);
projectTeamRouter.patch("/:pt_id", projectTeamController.updateProjectTeam);
projectTeamRouter.delete("/:pt_id", projectTeamController.deleteProjectTeam);
projectTeamRouter.get("/project/:pid", projectTeamController.getProjectTeam);
projectTeamRouter.get("/user/:uid", projectTeamController.getUserAssignedProjects);

export default projectTeamRouter;
