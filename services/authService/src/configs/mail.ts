import { env } from "../helpers";

export default {
  smtp: {
    transport: "smtp",
    host: env<string>("MAIL_HOST", "smtp.mailgun.org"),
    port: env<string>("MAIL_PORT", 587),
    encryption: env("MAIL_ENCRYPTION", "tls"),
    username: env("MAIL_USERNAME"),
    password: env("MAIL_PASSWORD"),
    timeout: null,
    auth_mode: null,
  },
};
