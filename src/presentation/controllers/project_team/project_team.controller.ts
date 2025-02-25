import { CreateProjectTeamDTO } from "./../../../application/dtos/project_team/createProjectTeam.dto";
import { Request, Response } from "express";
import { ProjectTeamRepositoryImpl } from "../../../infrastructure/repositories/ProjectTeamRepository.impl";
import { catchAsync } from "../../../shared/utils/catchAsync";
import { CreateProjectTeamUsecase } from "../../../application/use-cases/project_team/CreateProjectTeam.usecase";
import { ResponseHandler } from "../../../shared/utils/ResponseHandler";
import { UpdateProjectTeamUsecase } from "../../../application/use-cases/project_team/UpdateProjectTeam.usecase";
import { DeleteProjectTeamUsecase } from "../../../application/use-cases/project_team/DeleteProjectTeam.usecase";
import { GetProjectTeamUsecase } from "../../../application/use-cases/project_team/GetProjectTeam.usecase";
import { GetUserAssignedProjectsUsecase } from "../../../application/use-cases/project_team/GetUserAssignedProjects.usecase";

export class ProjectTeamController {
  private ProTeamRepoImpl = new ProjectTeamRepositoryImpl();

  createProjectTeam = catchAsync(async (req: Request, res: Response) => {
    const newPTData: CreateProjectTeamDTO = req.body;

    const newProjectTeam = await new CreateProjectTeamUsecase(
      this.ProTeamRepoImpl
    ).execute(newPTData);

    return ResponseHandler.success(
      res,
      "Project team created successfully",
      201,
      newProjectTeam
    );
  });

  updateProjectTeam = catchAsync(async (req: Request, res: Response) => {
    const pt_id = Number(req.params.pt_id);
    const updatedPTData: CreateProjectTeamDTO = req.body;

    const updatedProjectTeam = await new UpdateProjectTeamUsecase(
      this.ProTeamRepoImpl
    ).execute(pt_id, updatedPTData);

    return ResponseHandler.success(
      res,
      `Project team: ${pt_id} updated successfully`,
      200,
      updatedProjectTeam
    );
  });

  deleteProjectTeam = catchAsync(async (req: Request, res: Response) => {
    const pt_id = Number(req.params.pt_id);

    const deletedProjectTeam = await new DeleteProjectTeamUsecase(
      this.ProTeamRepoImpl
    ).execute(pt_id);

    return ResponseHandler.success(
      res,
      `Project team: ${pt_id} deleted successfully`,
      200,
      deletedProjectTeam
    );
  });

  getProjectTeam = catchAsync(async (req: Request, res: Response) => {
    const pid = Number(req.params.pid);

    const projectTeam = await new GetProjectTeamUsecase(
      this.ProTeamRepoImpl
    ).execute(pid);

    return ResponseHandler.success(
      res,
      `Project team fetched successfully`,
      200,
      projectTeam
    );
  });

  getUserAssignedProjects = catchAsync(async (req: Request, res: Response) => {
    const uid = Number(req.params.uid);

    const userAssignedProjects = await new GetUserAssignedProjectsUsecase(
      this.ProTeamRepoImpl
    ).execute(uid);

    return ResponseHandler.success(
      res,
      `User assigned projects fetched successfully`,
      200,
      userAssignedProjects
    );
  });
}
