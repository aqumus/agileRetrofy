import { User } from "./User";

export type Action = {
  readonly task: string;
  readonly completed?: boolean;
  readonly boardId: string;
  readonly owner: ReadonlyArray<User>;
};
