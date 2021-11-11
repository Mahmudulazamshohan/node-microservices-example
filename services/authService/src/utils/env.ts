import dotenv from "dotenv";

const parsed: any = dotenv.config().parsed;
export const Env = dotenv.config().parsed;
