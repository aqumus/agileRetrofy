import { Schema, model, Document } from "mongoose";
import { Note, NoteType, RetroModelType } from "../types";

export const noteSchema = new Schema<Note>(
  {
    votes: [
      {
        type: Schema.Types.ObjectId,
        ref: RetroModelType.User,
      },
    ],
    description: [
      {
        text: { type: String, required: true, trim: true },
        postedBy: {
          type: Schema.Types.ObjectId,
          ref: RetroModelType.User,
        },
      },
    ],
    category: {
      type: String,
      required: true,
      enum: Object.keys(NoteType),
    },
    boardId: {
      required: [true, "Board ID is required"],
      index: true,
      type: Schema.Types.ObjectId,
      ref: RetroModelType.Board,
    },
  },
  { timestamps: true }
);

export const NoteModel = model<Note & Document>(
  RetroModelType.Note,
  noteSchema
);
