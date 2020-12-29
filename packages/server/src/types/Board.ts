import { Action } from "./Action";
import { Note } from "./Note";
import { User } from "./User";

export type Board = {
  readonly name: string;
  readonly notes?: ReadonlyArray<Note>;
  readonly actions?: ReadonlyArray<Action>;
  readonly users: ReadonlyArray<User>;
  readonly projectId: string;
};
