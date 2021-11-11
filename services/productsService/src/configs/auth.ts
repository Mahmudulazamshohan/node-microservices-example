import Users from "../models/user/user.model";
export default {
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
