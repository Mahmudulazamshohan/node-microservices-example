import Mongoose from "mongoose";
import {
  blueCmd,
  debugPrint,
  mongodbURLParse,
  redBgCmd,
  yellowCmd,
} from "../helpers";
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
          `MONGODB - ${database.mongodb.host}:${database.mongodb.port}-${database.mongodb.database}`
        )
      );
    })
    .catch((err) =>
      debugPrint(blueCmd(`MONGODB Error:- `) + redBgCmd(err.message))
    );
};
