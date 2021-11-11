import { Schema, Document } from "mongoose";
const { Types } = Schema;

const UserSchema = new Schema(
  {
    username: {
      type: Types.String,
      unique: true,
      required: true,
    },
    firstname: {
      type: Types.String,
      unique: true,
      required: true,
    },
    lastname: {
      type: Types.String,
      unique: true,
      required: true,
    },
    email: {
      type: Types.String,
      unique: true,
      required: true,
    },
    password: {
      type: Types.String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default UserSchema;
