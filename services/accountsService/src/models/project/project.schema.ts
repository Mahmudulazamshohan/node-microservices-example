import { Schema } from "mongoose";

const { Types } = Schema;
const ProjectSchema = new Schema(
  {
    title: {
      type: Types.String,
      unique: true,
      required: true,
    },
    key: {
      type: Types.String,
      unique: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default ProjectSchema;
