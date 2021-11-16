import dotenv from "dotenv";
import { Env } from "../../utils/env";

const data = dotenv.config().parsed;

describe("Env file testcases", () => {
  test("Env DataType test", () => {
    expect(typeof Env).toBe("object");
  });
  test("Received data DataType test", () => {
    expect(typeof data).toBe("object");
  });
  test("Check ENV data", () => {
    expect(JSON.parse(JSON.stringify(Env))).toEqual(data);
  });
});
