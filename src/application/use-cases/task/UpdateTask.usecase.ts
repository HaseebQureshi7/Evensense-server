import { TaskRepository } from "../../../domain/repositories/TaskRepository.repo";
import kafka from "../../../infrastructure/kafka/kafka.config";
import { CreateKafkaProducer } from "../../../infrastructure/kafka/kafkaProducer";
import { AppError } from "../../../shared/utils/AppError";
import { CreateActivityLogDTO } from "../../dtos/activity_log/createActivityLog.dto";
import { UpdateTaskDTO } from "../../dtos/task/updateTask.dto";

export class UpdateTaskUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute(uid: number, taskId: number, taskData: UpdateTaskDTO) {
    const taskExists = await this.taskRepository.getById(taskId);
    if (!taskExists) {
      throw new AppError("Task does not exists", 404);
    }

    const updatedTask = await this.taskRepository.update(taskId, taskData);
    if (!updatedTask) {
      throw new AppError("Task could'nt be updated", 500);
    }

    // Send an Event Message
    const kafkaConf = kafka;

    const aLog: CreateActivityLogDTO = {
      action: `A Task was updated`,
      project_id: updatedTask.project_id!,
      user_id: uid,
      details: `User ${uid} made changes to project ${updatedTask.project_id}`,
    };

    const message = {
      key: "task",
      value: JSON.stringify(aLog),
    };

    new CreateKafkaProducer(kafkaConf).create({
      topic: "activity_log_topic",
      messages: [message],
    });

    return updatedTask;
  }
}
