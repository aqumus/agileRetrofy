import { FastifyInstance } from "fastify";
import { RetroServices } from "./RetroServices";

export type FastifyCustomInstance = FastifyInstance & {
  services: RetroServices;
};
