import amqplib, { Channel, Options, Replies } from "amqplib";
import EventEmitter from "events";

import { debugPrint } from "../helpers";

import { Env } from "./env";

const responseEmitter = new EventEmitter();
export interface IRabbitMQConsume {
  consumerTag?: string | undefined;
  noLocal?: boolean | undefined;
  noAck?: boolean | undefined;
  exclusive?: boolean | undefined;
  priority?: number | undefined;
  arguments?: any;
}
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
      debugPrint(`[${new Date()}] RabbitMQ Server Started`);
      return connection.createChannel();
    });
};
/**
 * Assert Queue for channel
 * @param channel
 * @param queue
 * @returns
 */
export const rabbitMQAssertQueue = async (
  channel: Channel,
  queue: string,
  options: Options.AssertQueue = {}
): Promise<Replies.AssertQueue> => {
  return channel.assertQueue(queue, options);
};
/**
 * Rabbit MQ consume
 * @param channel
 * @param queue
 * @param callback
 * @param options
 * @returns
 */
export const rabbitMQConsume = async (
  channel: Channel,
  queue: string,
  callback: Function,
  options: IRabbitMQConsume = {}
): Promise<Replies.Consume> => {
  return channel.consume(queue, (msg) => callback(msg), options);
};
/**
 * Sent data to queue
 * @param channel
 * @param queue
 * @param content
 * @param options
 * @returns
 */
export const rabbitMQSentToQueue = async (
  channel: Channel,
  queue: string,
  content: Buffer,
  options: Options.Publish = {}
) => {
  return await channel.sendToQueue(queue, content, options);
};

export const rabbitMQDeleteQueue = async (
  channel: Channel,
  queue: string,
  options: Options.DeleteQueue = {}
) => {
  return await channel.deleteQueue(queue, options);
};
