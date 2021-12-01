import app from "../configs/app";

test("App Config data format check", () => {
  const data = {
    asset_url: "http://localhost:4000/assets",
    debug: "true",
    env: "local",
    name: "Accounts",
    timezone: "UTC",
    url: "http://localhost:4000",
  };
  expect(app).toEqual(data);
});
