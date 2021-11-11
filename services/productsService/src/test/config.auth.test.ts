import auth from "../configs/auth";
import Users from "../models/user/user.model";

test("config.auth data format check", () => {
  const data = {
    guards: {
      api: {
        driver: "passport",
        provider: "users",
        hash: true,
      },
      providers: {
        users: {
          name: Users.name,
          model: Users,
        },
      },
    },
  };

  expect(auth).toEqual(data);
});
