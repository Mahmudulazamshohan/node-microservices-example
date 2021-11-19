import { Channel, ConsumeMessage, Options, Replies } from "amqplib";
import { EventEmitter } from "events";
import { v4 as uuidv4 } from "uuid";
import { debugPrint, isJSON } from "../helpers";
import { RabbitMQError } from "./exceptions";

import {
  rabbitMQAssertQueue,
  rabbitMQChannel,
  rabbitMQConsume,
  rabbitMQDeleteQueue,
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
    receive?: any
  ) {
    const correlationId = uuidv4();

    let responseEmitter = new EventEmitter();
    responseEmitter.setMaxListeners(0);

    if (!this.isAssertQueue)
      throw new RabbitMQError(
        "Assert Queue not found,please create queueAssert"
      );
    if (!!replyQueue) {
      await rabbitMQConsume(
        await this.channel,
        replyQueue,
        (msg) => {
          responseEmitter.emit(
            msg.properties.correlationId,
            msg.content.toString("utf8")
          );
        },
        {
          noAck: true,
        }
      );
    }

    let finalOptions: object = {
      ...(!!replyQueue
        ? {
            correlationId,
            replyTo: replyQueue,
          }
        : {}),
      ...options,
    };

    (await this.channel).sendToQueue(
      queue,
      Buffer.from(JSON.stringify(content)),
      finalOptions
    );
    return new Promise((resolve, reject) =>
      responseEmitter.once(correlationId, (data) => {
        receive(data);
        if (isJSON(data)) resolve(JSON.parse(data));
        else resolve(data);
      })
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
          // console.log("--->", content);

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
          await new Promise((resolve, reject) =>
            setTimeout(resolve, 1000)
          )
            .then(async () => {
              // -------------->

              if (
                msg?.properties.replyTo &&
                msg?.properties.correlationId
              ) {
                // Message Queue
                rabbitMQSentToQueue(
                  await self.channel,
                  msg?.properties.replyTo,
                  Buffer.from(
                    JSON.stringify(
                      await reply(msg?.content.toString())
                    )
                  ),
                  {
                    correlationId: msg?.properties.correlationId,
                  }
                );
              } else {
                // throw new Error(
                //   `Properties replyTo & correlationId ${JSON.stringify(
                //     msg?.properties
                //   )}`
                // );
              }
            })
            .catch((err) =>
              debugPrint("Send Message Queue Error::", err)
            );
        } else {
          if (msg) (await self.channel).ack(msg);
        }
      },
      {
        noAck: true,
      }
    );
  }
  /**
   * Delete Queue
   * @param queue
   */
  async delete(queue: string) {
    await rabbitMQDeleteQueue(await this.channel, queue);
  }
}
