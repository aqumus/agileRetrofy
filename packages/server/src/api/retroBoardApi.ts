import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { Board } from "../types";

type IdParam = {
  readonly id: string;
};

type ReqWithCreateBoardBody = {
  Body: Pick<Board, "name" | "projectId" | "users">;
};

type ReqWithParams = {
  Params: IdParam;
};

export async function boardApi(
  fastifyInstance: FastifyInstance,
  opts: FastifyPluginOptions,
  next: () => void
): Promise<void> {
  fastifyInstance.post<ReqWithCreateBoardBody>(
    "/board",
    async function (req, reply) {
      const result = await fastifyInstance.services.boardService.createBoard(
        req.body
      );
      req.log.info("New Board created", result);
      reply.status(201).send(result);
    }
  );

  fastifyInstance.get<ReqWithParams>("/board/:id", async function (req, reply) {
    const result = await fastifyInstance.services.boardService.getBoard(
      req.params.id
    );
    reply.status(200).send(result);
  });

  fastifyInstance.patch<ReqWithCreateBoardBody & ReqWithParams>(
    "/board/:id",
    async function (req, reply) {
      const result = await fastifyInstance.services.boardService.updateBoard(
        req.params.id,
        req.body
      );
      req.log.info("Updated Board details", result);
      reply.status(200).send(result);
    }
  );

  fastifyInstance.delete<ReqWithParams>(
    "/board/:id",
    async function (req, reply) {
      const result = await fastifyInstance.services.boardService.deleteBoard(
        req.params.id
      );
      req.log.info("Deleted board", result);
      reply.status(204);
    }
  );

  next();
}
