import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { Action } from "../types";

type IdParam = {
  readonly id: string;
};

type ActionsQueryString = {
  readonly boardId: string;
};

type ReqWithQueryString = {
  Querystring: ActionsQueryString;
};

type ReqWithCreateActionBody = {
  Body: Action;
};

type ReqWithParams = {
  Params: IdParam;
};

export async function actionApi(
  fastifyInstance: FastifyInstance,
  opts: FastifyPluginOptions,
  next: () => void
): Promise<void> {
  fastifyInstance.post<ReqWithCreateActionBody>(
    "/action",
    async function (req, reply) {
      const result = await fastifyInstance.services.actionService.createAction(
        req.body
      );
      req.log.info("New Action created", result);
      reply.status(201).send(result);
    }
  );

  fastifyInstance.get<ReqWithParams>(
    "/action/:id",
    async function (req, reply) {
      const result = await fastifyInstance.services.actionService.getAction(
        req.params.id
      );
      reply.status(200).send(result);
    }
  );

  fastifyInstance.get<ReqWithQueryString>(
    "/actions",
    async function (req, reply) {
      const result = await fastifyInstance.services.actionService.getActions(
        req.query.boardId
      );
      reply.status(200).send(result);
    }
  );

  fastifyInstance.patch<ReqWithCreateActionBody & ReqWithParams>(
    "/action/:id",
    async function (req, reply) {
      const result = await fastifyInstance.services.actionService.updateAction(
        req.params.id,
        req.body
      );
      req.log.info("Updated Action details", result);
      reply.status(200).send(result);
    }
  );

  fastifyInstance.delete<ReqWithParams>(
    "/action/:id",
    async function (req, reply) {
      const result = await fastifyInstance.services.actionService.deleteAction(
        req.params.id
      );
      req.log.info("Deleted Action", result);
      reply.status(204);
    }
  );

  next();
}
