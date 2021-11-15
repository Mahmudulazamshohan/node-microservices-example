import { Channel, ConsumeMessage, Options, Replies } from "amqplib";

import { debugPrint } from "../helpers";
import { RabbitMQError } from "./exceptions";

import { rabbitMQAssertQueue, rabbitMQChannel } from "./rabbitmq";

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
    content: Buffer,
    options?: Options.Publish
  ) {
    if (!this.isAssertQueue)
      throw new RabbitMQError(
        "Assert Queue not found,please create queueAssert"
      );

    (await this.channel).sendToQueue(queue, content, options);
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
    returnType?: MessageQueueType
  ) {
    let self = this;

    return (await this.channel).consume(
      queue,
      async (msg: ConsumeMessage | null) => {
        if (returnType === MessageQueueType.JSON) {
          const content: any = msg?.content.toString();

          listener({
            ...msg,
            content: JSON.parse(content),
          });
        } else if (returnType === MessageQueueType.STRING) {
          listener({ ...msg, content: msg?.content.toString() });
        } else {
          listener(msg);
        }

        if (msg) (await self.channel).ack(msg);
      }
    );
  }
}
