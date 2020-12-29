import config from "./config";
import fastify from "fastify";
import { connectMongoDb } from "./connectMongoDb";
import fastifyHelmet from "fastify-helmet";
import fastifyEtag from "fastify-etag";
import { actionApi, boardApi, noteApi, projectApi, userApi } from "./api";
import { servicePlugin } from "./services";
import { RetroServices } from "./types";

declare module "fastify" {
  interface FastifyInstance {
    services: RetroServices;
  }
}

const server = fastify({
  logger: true,
});

async function initialise() {
  try {
    await server.register(fastifyHelmet);
    await server.register(fastifyEtag);
    await server.register(connectMongoDb);
    await server.register(userApi);
    await server.register(projectApi);
    await server.register(boardApi);
    await server.register(noteApi);
    await server.register(actionApi);
    await server.register(servicePlugin);

    await server.ready();
    console.info("Registered plugins");
  } catch (err) {
    console.error("Error while registering plugin", err);
    process.exit(1);
  }

  try {
    await server.listen(config.PORT);
  } catch (err) {
    console.error("Error while listening on port:", config.PORT, err);
    process.exit(1);
  }
}

initialise();
