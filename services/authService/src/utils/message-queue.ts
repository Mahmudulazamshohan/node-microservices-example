import { Channel, ConsumeMessage, Options, Replies } from "amqplib";
import { v4 as uuidv4 } from "uuid";
import { debugPrint } from "../helpers";
import { RabbitMQError } from "./exceptions";

import {
  rabbitMQAssertQueue,
  rabbitMQChannel,
  rabbitMQConsume,
  rabbitMQSentToQueue,
} from "./rabbitmq";

export interface IMessageQueueProvider {
  channel: Promise<Channel>;
  isAssertQueue: boolean;
}
export enum MessageQueueType {
  JSON,
  STRING,
  BUFFER,
}
export class MessageQueueProvider implements IMessageQueueProvider {
  channel: Promise<Channel> = rabbitMQChannel();
  isAssertQueue: boolean = false;

  constructor() {}

  async queueAssert(
    queue: string,
    options: Options.AssertQueue = {}
  ) {
    return await this.channel
      .then(async (current) => {
        const asserted = await rabbitMQAssertQueue(
          current,
          queue,
          options
        );
        if (!!asserted) {
          this.isAssertQueue = true;
        }
        return current;
      })
      .catch((error: any) => {
        debugPrint(error);
        this.isAssertQueue = false;
      });
  }

  async send(
    queue: string,
    content: object,
    options?: Options.Publish,
    replyQueue?: string,
    receive?: Function
  ) {
    const correlationId = uuidv4();

    if (!this.isAssertQueue)
      throw new RabbitMQError(
        "Assert Queue not found,please create queueAssert"
      );
    if (!!replyQueue) {
      await rabbitMQConsume(
        await this.channel,
        queue,
        (msg) => {
          receive && receive(msg);
        },
        {
          noAck: true,
        }
      );
    }

    let data: object = {
      ...(!!replyQueue ? { correlationId, replyTo: replyQueue } : {}),
      ...content,
    };
    console.log(data);
    (await this.channel).sendToQueue(
      queue,
      Buffer.from(JSON.stringify(data)),
      options
    );
  }
  async sendAndReponse(
    queue: string,
    content: Buffer,
    reply: string,
    listener: Function
  ): Promise<any> {}

  async on(
    queue: string,
    listener: Function,
    returnType?: MessageQueueType,
    reply?: Function
  ) {
    let self = this;

    return rabbitMQConsume(
      await this.channel,
      queue,
      async (msg: ConsumeMessage | null) => {
        if (returnType === MessageQueueType.JSON) {
          const content: any = msg?.content.toString();

          listener({
            ...msg,
            content: JSON.parse(content),
          });
        } else if (returnType === MessageQueueType.STRING) {
          listener({
            ...msg,
            content: msg?.content.toString(),
          });
        } else {
          listener(msg);
        }
        if (!!reply) {
          new Promise((resolve, reject) => setTimeout(resolve, 1000))
            .then(async () => {
              if (
                msg?.properties.replyTo &&
                msg?.properties.correlationId
              ) {
                rabbitMQSentToQueue(
                  await self.channel,
                  msg?.properties.replyTo,
                  Buffer.from(JSON.stringify(reply()))
                );
              } else {
                throw new Error(
                  `Properties replyTo & correlationId ${JSON.stringify(
                    msg?.properties
                  )}`
                );
              }
            })
            .catch((err) =>
              debugPrint("Send Message Queue Error::", err)
            );
        } else {
          if (msg) (await self.channel).ack(msg);
        }
      }
    );
  }
}
