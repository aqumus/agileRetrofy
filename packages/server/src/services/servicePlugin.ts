import fastifyPlugin from "fastify-plugin";
import { UserService } from "./UserService";
import { FastifyInstance, FastifyPluginOptions } from "fastify";
import {
  ProjectModel,
  UserModel,
  BoardModel,
  ActionModel,
  NoteModel,
} from "../models";
import { ProjectService } from "./ProjectService";
import { BoardService } from "./BoardService";
import { NoteService } from "./NoteService";
import { ActionService } from "./ActionService";

async function servicePluginHandler(
  fastifyInstance: FastifyInstance,
  opts: FastifyPluginOptions,
  next: () => void
) {
  fastifyInstance.decorate("services", {
    userService: new UserService(UserModel),
    projectService: new ProjectService(ProjectModel),
    boardService: new BoardService(BoardModel),
    noteService: new NoteService(NoteModel),
    actionService: new ActionService(ActionModel),
  });

  next();
}

export const servicePlugin = fastifyPlugin(servicePluginHandler);
