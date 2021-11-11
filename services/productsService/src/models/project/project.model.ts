import Mongoose from "mongoose";
import ProjectSchema from "./project.schema";

export default Mongoose.model("user", ProjectSchema);
