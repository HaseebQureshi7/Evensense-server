import { Project } from "./../../../domain/entities/Project.entity";
import { ProjectRepositoryImpl } from "../../../infrastructure/repositories/ProjectRepository.impl";
import { catchAsync } from "./../../../shared/utils/catchAsync";
import { Request, Response } from "express";
import { ResponseHandler } from "../../../shared/utils/ResponseHandler";
import { CreateProjectUseCase } from "../../../application/use-cases/Project/CreateProject.usecase";
import { getAllProjectsUseCase } from "../../../application/use-cases/Project/GetAllProjects.usecase";
import { GetProjectByIdUsecase } from "../../../application/use-cases/Project/GetProjectById.usecase";
import { UpdateProject } from "../../../application/use-cases/Project/UpdateProject.usecase";
import { DeleteProject } from "../../../application/use-cases/Project/DeleteProject.usecase";
import { GetUserProjectsUsecase } from "../../../application/use-cases/Project/GetUserProjects.usecase";

export class ProjectController {
  createProject = catchAsync(async (req: Request, res: Response) => {
    const {
      name,
      description,
      deadline,
      est_deadline,
      user_id,
      project_logo,
      start_date,
    }: Project = req.body;

    const projectData: Project = {
      name,
      description,
      deadline,
      est_deadline,
      user_id,
      project_logo,
      start_date,
    };

    // Dependency Injection
    // Inject repository into use case
    const projectRepository = new ProjectRepositoryImpl();
    const createProjectUseCase = new CreateProjectUseCase(projectRepository);

    const project = await createProjectUseCase.execute(projectData);

    if (!project) {
      return ResponseHandler.error(res, "Project creation failed", 500);
    }

    return ResponseHandler.success(
      res,
      "Project created successfully",
      201,
      project
    );
  });

  getAllProjects = catchAsync(async (req: Request, res: Response) => {
    const getAllProjectsRepository = new ProjectRepositoryImpl();
    const getAllProjectsUsecase = new getAllProjectsUseCase(
      getAllProjectsRepository
    );

    const allProjects = await getAllProjectsUsecase.execute();

    if (!allProjects) {
      return ResponseHandler.error(res, "No Projects Found", 404);
    }

    return ResponseHandler.success(
      res,
      "All Projects Fetched",
      200,
      allProjects
    );
  });

  getProjectById = catchAsync(async (req: Request, res: Response) => {
    const pid = Number(req.params.pid);
    const getProjByIdRepo = new ProjectRepositoryImpl();
    const getProjByIdUsecase = new GetProjectByIdUsecase(getProjByIdRepo);

    const project = await getProjByIdUsecase.execute(pid);

    if (!project) {
      return ResponseHandler.error(
        res,
        `No Project found with id of ${pid}`,
        404
      );
    }

    return ResponseHandler.success(
      res,
      `Project found with id of ${pid}`,
      200,
      project
    );
  });

  updateProjectById = catchAsync(async (req: Request, res: Response) => {
    const pid = Number(req.params.pid);

    const {
      name,
      deadline,
      description,
      est_deadline,
      project_logo,
      start_date,
    }: Partial<Project> = req.body;
    const projectData: Partial<Project> = {
      name,
      deadline,
      description,
      est_deadline,
      project_logo,
      start_date,
    };

    const updateProjRepo = new ProjectRepositoryImpl();
    const updateProjUsecase = new UpdateProject(updateProjRepo);

    const updatedProject = await updateProjUsecase.execute(pid, projectData);

    if (!updatedProject) {
      return ResponseHandler.error(res, "Project was not updated!", 400);
    }

    return ResponseHandler.success(
      res,
      "Project updated successfully!",
      200,
      updatedProject
    );
  });

  deleteProjectById = catchAsync(async (req: Request, res: Response) => {
    const pid = Number(req.params.pid);

    const updateProjRepo = new ProjectRepositoryImpl();
    const deleteProjUsecase = new DeleteProject(updateProjRepo);

    const deletedProject = await deleteProjUsecase.execute(pid);

    if (!deletedProject) {
      return ResponseHandler.error(res, "Project was not deleted!", 400);
    }

    return ResponseHandler.success(
      res,
      "Project deleted successfully!",
      200,
      deletedProject
    );
  });

  //
  getUserProjects = catchAsync(async (req: Request, res: Response) => {
    const uid = Number(req.params.uid)
    
    const getAllUserProjsRepo = new ProjectRepositoryImpl();
    const getAllUserProjsRepoUsecase = new GetUserProjectsUsecase(getAllUserProjsRepo)

    const userProjects = await getAllUserProjsRepoUsecase.execute(uid)

    if (!userProjects) {
      return ResponseHandler.error(
        res,
        `No Project found for user_id of ${uid}`,
        404
      );
    }

    return ResponseHandler.success(
      res,
      "User Projects fetched successfully!",
      200,
      userProjects
    );
  })
}
