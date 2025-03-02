import { ProjectRepository } from "../../../domain/repositories/ProjectRepository.repo";
import kafka from "../../../infrastructure/kafka/kafka.config";
import { CreateKafkaProducer } from "../../../infrastructure/kafka/kafkaProducer";
import { AppError } from "../../../shared/utils/AppError";
import { CreateActivityLogDTO } from "../../dtos/activity_log/createActivityLog.dto";
import { UpdateProjectDTO } from "../../dtos/project/updateProject.dto";

export class UpdateProject {
  private projectRepository: ProjectRepository;
  constructor(ProjectRepository: ProjectRepository) {
    this.projectRepository = ProjectRepository;
  }

  async execute(uid: number, pid: number, projectData: UpdateProjectDTO) {
    if (!projectData || !pid) {
      throw new AppError("Project Data or Id not provided!", 400);
    }

    // RBAC
    const findProjectById = await this.projectRepository.getById(pid);
    if (findProjectById?.user_id != uid) {
      throw new Error(
        "Access Error: Only the project owner can update this project"
      );
    }

    const updatedProject = await this.projectRepository.update(
      pid,
      projectData
    );
    if (!updatedProject) {
      throw new AppError("Project could'nt be updated!", 500);
    }

    // Send an Event Message
    const kafkaConf = kafka;

    const aLog: CreateActivityLogDTO = {
      action: `A Project was updated`,
      project_id: updatedProject.id!,
      user_id: uid,
      details: `User ${uid} made changes to project ${updatedProject.name}`,
    };

    interface IMessage {
      key: string;
      value: string;
    }
    const message: IMessage = {
      key: "project",
      value: JSON.stringify(aLog),
    };

    new CreateKafkaProducer(kafkaConf).create({
      topic: "activity_log_topic",
      messages: [message],
    });
  }
}
