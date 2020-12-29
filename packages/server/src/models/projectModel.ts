import { Schema, model, Document } from "mongoose";
import { Project, RetroModelType } from "../types";

export const projectSchema = new Schema(
  {
    name: {
      required: [true, "Project name is required"],
      type: String,
    },
    boards: [
      {
        type: Schema.Types.ObjectId,
        ref: RetroModelType.Board,
      },
    ],
  },
  { timestamps: true }
);

export const ProjectModel = model<Project & Document>(
  RetroModelType.Project,
  projectSchema
);
