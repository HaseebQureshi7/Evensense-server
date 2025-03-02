import { TaskAssignment } from "../../../domain/entities/TaskAssignment.entity";
import kafka from "../../../infrastructure/kafka/kafka.config";
import { CreateKafkaProducer } from "../../../infrastructure/kafka/kafkaProducer";
import { TaskRepositoryImpl } from "../../../infrastructure/repositories/TaskRepository.impl";
import { AppError } from "../../../shared/utils/AppError";
import { CreateActivityLogDTO } from "../../dtos/activity_log/createActivityLog.dto";
import { UpdateTaskAssignmentDTO } from "../../dtos/task_assignment/UpdateTaskAssignment.dto";
import { ViewTaskByIdUseCase } from "../task/ViewTaskById.usecase";
import { TaskAssignmentRepository } from "./../../../domain/repositories/TaskAssignmentRepository.repo";
export class UpdateTaskAssignmentUseCase {
  private taskAssignmentRepo: TaskAssignmentRepository;
  constructor(TaskAssignmentRepository: TaskAssignmentRepository) {
    this.taskAssignmentRepo = TaskAssignmentRepository;
  }

  async execute(
    uid: number,
    ta_id: number,
    updated_task_assignment_details: UpdateTaskAssignmentDTO
  ) {
    if (!ta_id || !updated_task_assignment_details) {
      throw new AppError(
        `Missing required fields!. Provide task_id and user_id`,
        400
      );
    }

    const tAssnExists = await this.taskAssignmentRepo.getById(ta_id);
    if (!tAssnExists) {
      throw new AppError(`Task Assignment not found!`, 404);
    }

    const updatedTAssn = await this.taskAssignmentRepo.update(
      ta_id,
      updated_task_assignment_details
    );
    if (!updatedTAssn) {
      throw new AppError(`Task Assignment not updated!`, 500);
    }

    const assnTask = await new ViewTaskByIdUseCase(
      new TaskRepositoryImpl()
    ).execute(updatedTAssn.task_id);
    if (!assnTask) {
      throw new AppError(`Task related to this Assignemt doesn not exist`, 500);
    }

    // Send an Event Message
    const kafkaConf = kafka;

    const aLog: CreateActivityLogDTO = {
      action: `A Task Assignment was updated`,
      project_id: assnTask.project_id!,
      user_id: uid,
      details: `User ${uid} updated a new task assignment: ${updatedTAssn.id} for project ${assnTask.project_id}`,
    };

    const message = {
      key: "task_assignment",
      value: JSON.stringify(aLog),
    };

    new CreateKafkaProducer(kafkaConf).create({
      topic: "activity_log_topic",
      messages: [message],
    });

    return updatedTAssn;
  }
}
