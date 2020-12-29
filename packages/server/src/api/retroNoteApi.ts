import { FastifyPluginOptions, FastifyInstance } from "fastify";
import { Note } from "../types";

type IdParam = {
  readonly id: string;
};

type NotesQueryString = {
  readonly boardId: string;
};

type ReqWithQueryString = {
  Querystring: NotesQueryString;
};

type ReqWithCreateNoteBody = {
  Body: Note;
};

type ReqWithParams = {
  Params: IdParam;
};

export async function noteApi(
  fastifyInstance: FastifyInstance,
  opts: FastifyPluginOptions,
  next: () => void
): Promise<void> {
  fastifyInstance.post<ReqWithCreateNoteBody>(
    "/note",
    async function (req, reply) {
      const result = await fastifyInstance.services.noteService.createNote(
        req.body
      );
      req.log.info("New user created", result);
      reply.status(201).send(result);
    }
  );

  fastifyInstance.get<ReqWithParams>("/note/:id", async function (req, reply) {
    const result = await fastifyInstance.services.noteService.getNote(
      req.params.id
    );
    reply.status(200).send(result);
  });

  fastifyInstance.get<ReqWithQueryString>(
    "/notes",
    async function (req, reply) {
      const result = await fastifyInstance.services.noteService.getNotes(
        req.query.boardId
      );
      reply.status(200).send(result);
    }
  );

  fastifyInstance.patch<ReqWithParams & ReqWithCreateNoteBody>(
    "/note/:id",
    async function (req, reply) {
      const result = await fastifyInstance.services.noteService.updateNote(
        req.params.id,
        req.body
      );
      req.log.info("Updated user details", result);
      reply.status(200).send(result);
    }
  );

  fastifyInstance.delete<ReqWithParams>(
    "/note/:id",
    async function (req, reply) {
      const result = await fastifyInstance.services.noteService.deleteNote(
        req.params.id
      );
      req.log.info("Deleted user", result);
      reply.status(204);
    }
  );

  next();
}
