import Mongoose from "mongoose";
import UserSchema from "./user.schema";

export default Mongoose.model("user", UserSchema);
