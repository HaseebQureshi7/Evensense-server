import { EachMessageHandler } from "kafkajs";

export interface ICreateKafkaConsumer {
  topic: string;
  groupId: string;
  onMessageHandler: EachMessageHandler;
  fromBeginning?: boolean;
}