import { Schema, model, Document } from "mongoose";
import { Board, RetroModelType } from "../types";

export const boardSchema = new Schema(
  {
    name: {
      required: [true, "Boared name is required"],
      trim: true,
      type: String,
    },
    notes: [
      {
        default: [],
        type: Schema.Types.ObjectId,
        ref: RetroModelType.Note,
      },
    ],
    actions: [
      {
        type: Schema.Types.ObjectId,
        ref: RetroModelType.Action,
      },
    ],
    projectId: {
      required: [true, "Project Id is required"],
      index: true,
      type: Schema.Types.ObjectId,
      ref: RetroModelType.Project,
    },
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: RetroModelType.User,
      },
    ],
  },
  { timestamps: true }
);

export const BoardModel = model<Board & Document>(
  RetroModelType.Board,
  boardSchema
);
