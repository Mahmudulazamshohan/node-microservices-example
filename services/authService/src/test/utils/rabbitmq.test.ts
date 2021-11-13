import { Channel } from "amqplib";
import {
  rabbitConnectionURI,
  rabbitMQChannel,
} from "../../utils/rabbitmq";

describe("RabbitMQ utils", () => {
  test("Connection uri", () => {
    const uri = rabbitConnectionURI();
    expect("amqp://shohan:shohan@localhost:5672").toEqual(uri);
  });
  test("Create Channel", async () => {
    await rabbitMQChannel().then((channel) => {
      const type: boolean = !!channel.assertQueue;
      expect(true).toEqual(type);
    });
  });
});
