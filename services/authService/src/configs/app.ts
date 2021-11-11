import { env } from "../helpers";

export default {
  name: env<string>("APP_NAME", "Laravel"),

  env: env<string>("APP_ENV", "production"),

  debug: env<string>("APP_DEBUG", false),

  url: env<string>("APP_URL", "http://localhost"),
  asset_url: env<string>("ASSET_URL", null),

  timezone: "UTC",
};
