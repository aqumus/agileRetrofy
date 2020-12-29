import { Schema, model, Document } from "mongoose";
import { Action, RetroModelType } from "../types";

export const actionSchema = new Schema(
  {
    task: {
      type: String,
      required: true,
    },
    completed: {
      required: true,
      default: false,
      type: Boolean,
    },
    boardId: {
      required: [true, "Board ID is required"],
      index: true,
      type: Schema.Types.ObjectId,
      ref: RetroModelType.Board,
    },
    owner: [
      {
        type: Schema.Types.ObjectId,
        ref: RetroModelType.User,
      },
    ],
  },
  { timestamps: true }
);

export const ActionModel = model<Action & Document>(
  RetroModelType.Action,
  actionSchema
);
