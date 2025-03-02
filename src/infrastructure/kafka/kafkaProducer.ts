import { Kafka, RecordMetadata } from "kafkajs";
import { ConsoleUtil } from "../../shared/utils/Console";
import { currentTopics } from "./topics";

export interface ICreateKafkaProducer {
  // topic: string;
  topic: currentTopics;
  messages: { key?: string; value: string }[];
}

export class CreateKafkaProducer {
  private client: Kafka;

  constructor(kafkaClient: Kafka) {
    this.client = kafkaClient; // Reuse the pre-configured client
  }

  async create({
    topic,
    messages,
  }: ICreateKafkaProducer): Promise<RecordMetadata[]> {
    const producer = this.client.producer();

    try {
      // Connect the producer
      await producer.connect();
      console.log(
        new ConsoleUtil().successLog("Producer connected successfully")
      );

      // Send messages to the topic
      const metadata = await producer.send({
        topic,
        messages,
      });

      console.log(
        new ConsoleUtil().successLog(`Messages sent to topic ${topic}`)
      );
      return metadata; // Return metadata for the sent messages
    } catch (error) {
      console.error("Producer error:", error);
      throw error;
    } finally {
      // Disconnect the producer after sending messages
      await producer.disconnect();
      console.log("Producer disconnected");
    }
  }
}
