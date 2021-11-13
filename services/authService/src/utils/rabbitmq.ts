import amqplib, { Channel } from "amqplib";
import { Env } from "./env";

/**
 * Rabbit Connection URI
 * @returns string
 */
export const rabbitConnectionURI = (): string => {
  return `amqp://${Env?.RABBITMQ_USERNAME}:${Env?.RABBITMQ_PASSWORD}@${Env?.RABBITMQ_HOSTNAME}:${Env?.RABBITMQ_PORT}`;
};

/**
 * Create RabbitMQ channel
 * @returns Promise<Channel>
 */
export const rabbitMQChannel = async (): Promise<Channel> => {
  return await amqplib
    .connect(rabbitConnectionURI())
    .then((connection) => {
      return connection.createChannel();
    });
};
