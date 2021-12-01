import { MQueue } from "../configs/mqueue";
import { MessageQueueProvider } from "../utils/message-queue";
const QUEUE_NAME = "testing_q";
describe("MessageQueueProvider Testcase", () => {
  let messageQueueProvider: MessageQueueProvider;
  beforeAll(async () => {
    messageQueueProvider = await new MessageQueueProvider();
  });
  // queuAsset
  test("queueAsset function test", async () => {
    await messageQueueProvider.queueAssert(QUEUE_NAME);

    expect(messageQueueProvider.isAssertQueue).toEqual(true);
  });

  test("send function test", async () => {
    const response = await messageQueueProvider.send(
      MQueue.PRODUCT_ORDER,
      {
        name: "Shohan",
      }
    );
  });
  test("delete function test", async () => {
    await messageQueueProvider.delete(QUEUE_NAME);
  });
});
