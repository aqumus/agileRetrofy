import config from "./config";
import fastify from "fastify";

const server = fastify({
  logger: true,
});

// Declare a route
server.get("/", async function (request, reply) {
  reply.send({ hello: "world" });
});

server
  .listen(config.PORT)
  .then(() => {
    console.log("Fastify server listening on port:", config.PORT);
  })
  .catch((err) => {
    console.log("Error while listening on port:", config.PORT, err);
  });
