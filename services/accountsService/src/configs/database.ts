import { Env } from "../utils/env";

export default {
  mongodb: {
    host: Env?.MONGO_HOSTNAME || "",
    port: Env?.MONGO_PORT || 27017,
    database: Env?.MONGO_DB || "",
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    },
  },
};
