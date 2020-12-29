import { Board } from "./Board";

export type Project = {
  readonly name: string;
  readonly boards?: ReadonlyArray<Board>;
};
