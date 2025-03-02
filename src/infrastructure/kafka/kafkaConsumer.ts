import { Kafka, Consumer } from "kafkajs";
import { ConsoleUtil } from "../../shared/utils/Console";
import { ICreateKafkaConsumer } from "../../domain/interfaces/kafka/ICreateKafkaConsumer.type";

export class CreateKafkaConsumer {
  private client: Kafka;

  constructor(kafkaClient: Kafka) {
    this.client = kafkaClient; // Reuse the pre-configured client
  }

  async create({
    topic,
    groupId,
    onMessageHandler,
    fromBeginning,
  }: ICreateKafkaConsumer): Promise<Consumer> {
    // Return the consumer instance for reuse
    const consumer = this.client.consumer({ groupId });

    try {
      // Each consumer must connect individually
      await consumer.connect();
      await consumer.subscribe({ topic, fromBeginning });
      await consumer.run({ eachMessage: onMessageHandler });

      console.log(
        new ConsoleUtil().successLog(
          `Consumer ${groupId} connected and running`
        )
      );
      return consumer; // Return the connected consumer
    } catch (error) {
      console.error(`Consumer ${groupId} error:`, error);
      throw error;
    }
  }
}
