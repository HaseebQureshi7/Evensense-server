import { TaskRepository } from "../../../domain/repositories/TaskRepository.repo";
import kafka from "../../../infrastructure/kafka/kafka.config";
import { CreateKafkaProducer } from "../../../infrastructure/kafka/kafkaProducer";
import { AppError } from "../../../shared/utils/AppError";
import { CreateTaskDTO } from "../../dtos/task/createTask.dto";

export class CreateTaskUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute(uid: number, taskData: CreateTaskDTO) {
    if (!taskData.name || !taskData.project_id) {
      throw new AppError("Missing Required fields: name, project_id", 400);
    }

    const taskCreated = await this.taskRepository.create(taskData);
    if (!taskCreated) {
      throw new AppError("Task was not created!", 500);
    }

    const message = {
      key: "task",
      value: JSON.stringify({
        action: "A new task was created",
        user_id: uid,
        project_id: taskCreated.project_id,
        details: `User ${uid} created a new task on project ${taskCreated.project_id}`,
      }),
    };

    const kafkaClient = kafka;
    new CreateKafkaProducer(kafkaClient).create({
      topic: "activity_log_topic",
      messages: [message],
    });

    return taskCreated;
  }
}
