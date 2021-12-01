import Mongoose from "mongoose";
import UserSchema from "./user.schema";

const UserModel = Mongoose.model("user", UserSchema);

export default UserModel;
