import { ConsoleUtil } from "../../shared/utils/Console";
import { createActivityLogConsumer } from "./consumers/activity_log.consumer";
import kafka from "./kafka.config";

export const connectToKafka = async () => {
  const kafkaClient = kafka;
  console.info(new ConsoleUtil().infoLog("\nConnecting to Kafka Brokers..."));

  try {
    // Consumers
    createActivityLogConsumer(kafkaClient);
    
    console.log(
      new ConsoleUtil().successLog("Kafka Brokers connected successfully\n")
    );
  } catch (err) {
    console.log(err);
  }
};
