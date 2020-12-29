import { Schema, model, Document } from "mongoose";
import { RetroModelType, User } from "../types";

const EMAIL_ADDR_REGEX = /^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/;

export const userSchema = new Schema(
  {
    firstName: {
      required: [true, "First Name is required"],
      type: String,
    },
    lastName: String,
    emailId: {
      required: [true, "Email is required"],
      type: String,
      unique: true,
      trim: true,
      validate: [EMAIL_ADDR_REGEX, "Invalid email address"],
    },
    projects: [
      {
        type: Schema.Types.ObjectId,
        ref: RetroModelType.Project,
      },
    ],
  },
  { timestamps: true }
);

export const UserModel = model<User & Document>(
  RetroModelType.User,
  userSchema
);
