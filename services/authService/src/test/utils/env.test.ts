import dotenv from "dotenv";
import { Env } from "../../utils/env";

const data = dotenv.config().parsed;

describe("Env file testcases", () => {
  test("env data type test", () => {
    expect(typeof Env).toBe("object");
  });
  test("received data data type test", () => {
    expect(typeof data).toBe("object");
  });
  test("check env data", () => {
    expect(JSON.parse(JSON.stringify(Env))).toEqual(data);
  });
});
