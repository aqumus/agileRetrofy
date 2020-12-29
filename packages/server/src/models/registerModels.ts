import { noteSchema } from "./noteModel";
import { actionSchema } from "./actionModel";
import { userSchema } from "./userModel";
import { Connection, Schema } from "mongoose";
import { RetroModelType } from "../types";
import { projectSchema } from "./projectModel";
import { boardSchema } from "./boardModel";

const models: Record<RetroModelType, Schema> = {
  [RetroModelType.User]: userSchema,
  [RetroModelType.Project]: projectSchema,
  [RetroModelType.Board]: boardSchema,
  [RetroModelType.Action]: actionSchema,
  [RetroModelType.Note]: noteSchema,
};

const getSchema = (modelName: RetroModelType) => models[modelName];

export function registerModels(connection: Connection): undefined {
  Object.keys(models).forEach((modelName) => {
    connection.model(modelName, getSchema(modelName as RetroModelType));
  });
  return undefined;
}
