import { Channel } from "amqplib";
import {
  rabbitConnectionURI,
  rabbitMQAssertQueue,
  rabbitMQChannel,
  rabbitMQConsume,
  rabbitMQDeleteQueue,
  rabbitMQSentToQueue,
} from "../../utils/rabbitmq";

const queueName = "testing";
const message = `send this message to ${queueName}`;

describe("RabbitMQ utils", () => {
  test("connection uri", () => {
    const uri = rabbitConnectionURI();
    expect("amqp://shohan:shohan@localhost:5672").toEqual(uri);
  });

  test("create channel test", async () => {
    await rabbitMQChannel().then((channel) => {
      const type: boolean = !!channel.assertQueue;
      expect(true).toEqual(type);
    });
  });

  test("assert queue test", async () => {
    await rabbitMQChannel().then((channel) => {
      const queueName = "testing";

      rabbitMQAssertQueue(channel, queueName).then((value) => {
        expect(value.messageCount).toBeGreaterThanOrEqual(0);
      });
    });
  });

  test("send to queue", async () => {
    await rabbitMQChannel().then(async (channel) => {
      await rabbitMQSentToQueue(
        channel,
        queueName,
        Buffer.from(message)
      );
    });
  });

  test("receive message from queue", async () => {
    await rabbitMQChannel().then(async (channel) => {
      await rabbitMQConsume(channel, queueName, (msg) => {
        const content = msg.content.toString();
        expect(content).toBe(message);
      });
    });
  });

  test("delete asserted queue", async () => {
    await rabbitMQChannel().then(async (channel) => {
      await rabbitMQDeleteQueue(channel, queueName);
    });
  });
  afterAll(() => {});
});
