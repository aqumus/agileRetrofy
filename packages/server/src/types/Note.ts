import { User } from "./User";

export enum NoteType {
  LIKED = "Liked",
  LEARNED = "Learned",
  LACKED = "Lacked",
  LONGEDFOR = "Longed For",
}

export type NoteDescription = {
  readonly text: string;
  readonly postedBy: User;
};

export type Note = {
  readonly votes: ReadonlyArray<User>;
  readonly description: ReadonlyArray<NoteDescription>;
  readonly category: NoteType;
  readonly boardId: string;
};
