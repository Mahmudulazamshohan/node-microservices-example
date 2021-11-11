import Mongoose from "mongoose";
import { debugPrint, mongodbURLParse, yellowCmd } from "../helpers";
import database from "../configs/database";

export default async () => {
  return await Mongoose.connect(
    mongodbURLParse(database.mongodb),
    database.mongodb.options
  )
    .then(() => {
      console.log("Connected Mongodb");
      debugPrint(
        yellowCmd(
          `MONGODB - ${database.mongodb.host}:${database.mongodb.port}`
        )
      );
    })
    .catch((err) => console.error(err.message));
};
