import {
  ProjectService,
  UserService,
  ActionService,
  NoteService,
  BoardService,
} from "../services";

export type RetroServices = {
  readonly userService: UserService;
  readonly projectService: ProjectService;
  readonly boardService: BoardService;
  readonly noteService: NoteService;
  readonly actionService: ActionService;
};
