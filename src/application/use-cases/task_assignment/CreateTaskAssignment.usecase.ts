import kafka from "../../../infrastructure/kafka/kafka.config";
import { CreateKafkaProducer } from "../../../infrastructure/kafka/kafkaProducer";
import { TaskRepositoryImpl } from "../../../infrastructure/repositories/TaskRepository.impl";
import { UserRepositoryImpl } from "../../../infrastructure/repositories/UserRepository.impl";
import { AppError } from "../../../shared/utils/AppError";
import { CreateActivityLogDTO } from "../../dtos/activity_log/createActivityLog.dto";
import { ViewTaskByIdUseCase } from "../task/ViewTaskById.usecase";
import { FindUserByIdUsecase } from "../users/FindUserById.usecase";
import { TaskAssignmentRepository } from "./../../../domain/repositories/TaskAssignmentRepository.repo";
export class CreateTaskAssignmentUseCase {
  private taskAssignmentRepo: TaskAssignmentRepository;
  constructor(TaskAssignmentRepository: TaskAssignmentRepository) {
    this.taskAssignmentRepo = TaskAssignmentRepository;
  }

  async execute(uid: number, task_id: number, user_id: number) {
    if (!task_id || !user_id) {
      throw new AppError(
        `Missing required fields!. Provide task_id and user_id`,
        400
      );
    }

    // check if the user exists
    const userExists = await new FindUserByIdUsecase(
      new UserRepositoryImpl()
    ).execute(user_id);
    if (!userExists) {
      throw new AppError(`Provided user does not exist`, 500);
    }

    // check if the task exists
    const taskExists = await new ViewTaskByIdUseCase(
      new TaskRepositoryImpl()
    ).execute(task_id);
    if (!taskExists) {
      throw new AppError(`Provided task does not exist`, 500);
    }

    const newTaskAssn = await this.taskAssignmentRepo.create(task_id, user_id);

    if (!newTaskAssn) {
      throw new AppError(`Failure! Task Assignment was not created!`, 500);
    }

    // Send an Event Message
    const kafkaConf = kafka;

    const aLog: CreateActivityLogDTO = {
      action: `A Task Assignment was created`,
      project_id: taskExists.project_id!,
      user_id: uid,
      details: `User ${uid} created a new task assignment: ${newTaskAssn.id} for project ${taskExists.project_id}`,
    };

    const message = {
      key: "task_assignment",
      value: JSON.stringify(aLog),
    };

    new CreateKafkaProducer(kafkaConf).create({
      topic: "activity_log_topic",
      messages: [message],
    });

    return newTaskAssn;
  }
}
