import { Kafka } from "kafkajs";
import { CreateKafkaConsumer } from "../kafkaConsumer";
import { ActivityLogImpl } from "../../repositories/ActivityLogRepository.impl";
import { CreateActivityLogUsecase } from "../../../application/use-cases/activity_log/CreateActivityLog.usecase";
import { CreateActivityLogDTO } from "../../../application/dtos/activity_log/createActivityLog.dto";
import { ICreateKafkaConsumer } from "../../../domain/interfaces/kafka/ICreateKafkaConsumer.type";

export const createActivityLogConsumer = async (kafkaClient: Kafka) => {
  const aLogImpl = new ActivityLogImpl();

  const activityLogConfig: ICreateKafkaConsumer = {
    topic: "activity_log_topic",
    groupId: "alt-0",
    onMessageHandler: async ({ message, topic }) => {

      const messageValue = message.value?.toString();
      if (!messageValue) {
        console.error("Message value is empty or undefined");
        return;
      }

      // Parse the message value as JSON
      const alog: CreateActivityLogDTO = JSON.parse(messageValue);

      // Log the parsed message and topic
      console.log("Logs -> ", alog, topic);

      // Create a new Activity Log on message
      await new CreateActivityLogUsecase(aLogImpl).execute(
        alog
      );
    },
    fromBeginning: false,
  };

  new CreateKafkaConsumer(kafkaClient).create(activityLogConfig);
};
