import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { Project } from "../types";

type IdParam = {
  readonly id: string;
};

type ReqWithCreateProjectBody = {
  Body: Pick<Project, "name">;
};

type ReqWithParams = {
  Params: IdParam;
};

export async function projectApi(
  fastifyInstance: FastifyInstance,
  opts: FastifyPluginOptions,
  next: () => void
): Promise<void> {
  fastifyInstance.post<ReqWithCreateProjectBody>(
    "/project",
    async function (req, reply) {
      const result = await fastifyInstance.services.projectService.createProject(
        req.body
      );
      req.log.info("New Project created", result);
      reply.status(201).send(result);
    }
  );

  fastifyInstance.get<ReqWithParams>(
    "/project/:id",
    async function (req, reply) {
      const result = await fastifyInstance.services.projectService.getProject(
        req.params.id
      );
      reply.status(200).send(result);
    }
  );

  fastifyInstance.patch<ReqWithCreateProjectBody & ReqWithParams>(
    "/project/:id",
    async function (req, reply) {
      const result = await fastifyInstance.services.projectService.updateProject(
        req.params.id,
        req.body
      );
      req.log.info("Updated user details", result);
      reply.status(200).send(result);
    }
  );

  fastifyInstance.delete<ReqWithParams>(
    "/project/:id",
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
