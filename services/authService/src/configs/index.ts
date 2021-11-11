import app from "./app";
import auth from "./auth";
import database from "./database";
import cache from "./cache";
import mail from "./mail";
type TConfigs = {
  auth: object;
};
export default {
  auth,
  database,
  cache,
  app,
  mail,
};
