import { FastifyPluginOptions, FastifyInstance } from "fastify";
import { User } from "../types";

type IdParam = {
  readonly id: string;
};

type ReqWithCreateUserBody = {
  Body: Pick<User, "firstName" | "lastName" | "emailId">;
};

type ReqWithParams = {
  Params: IdParam;
};

export async function userApi(
  fastifyInstance: FastifyInstance,
  opts: FastifyPluginOptions,
  next: () => void
): Promise<void> {
  fastifyInstance.post<ReqWithCreateUserBody>(
    "/user",
    async function (req, reply) {
      const result = await fastifyInstance.services.userService.createUser(
        req.body
      );
      req.log.info("New user created", result);
      reply.status(201).send(result);
    }
  );

  fastifyInstance.get<ReqWithParams>("/user/:id", async function (req, reply) {
    const result = await fastifyInstance.services.userService.getUser(
      req.params.id
    );
    reply.status(200).send(result);
  });

  fastifyInstance.patch<ReqWithCreateUserBody & ReqWithParams>(
    "/user/:id",
    async function (req, reply) {
      const result = await fastifyInstance.services.userService.updateUser(
        req.params.id,
        req.body
      );
      req.log.info("Updated user details", result);
      reply.status(200).send(result);
    }
  );

  fastifyInstance.delete<ReqWithParams>(
    "/user/:id",
    async function (req, reply) {
      const result = await fastifyInstance.services.userService.deleteUser(
        req.params.id
      );
      req.log.info("Deleted user", result);
      reply.status(204);
    }
  );

  next();
}
