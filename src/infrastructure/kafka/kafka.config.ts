import { Kafka } from "kafkajs";
import { config } from "dotenv";
config();

const KAFKA_BROKER = process.env.KAFKA_BROKER;
const KAFKA_USERNAME = process.env.KAFKA_USERNAME;
const KAFKA_PASSWORD = process.env.KAFKA_PASSWORD;

// console.log(KAFKA_BROKER, KAFKA_USERNAME, KAFKA_PASSWORD)

const kafka = new Kafka({
  clientId: "evenSenseApp",
  brokers: [KAFKA_BROKER!], // Aiven Kafka broker
  ssl: {
    rejectUnauthorized: false,
  },
  sasl: {
    mechanism: "plain",
    username: KAFKA_USERNAME!,
    password: KAFKA_PASSWORD!,
  },
});

export default kafka;
