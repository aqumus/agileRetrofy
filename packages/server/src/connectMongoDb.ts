import { FastifyInstance, FastifyPluginOptions } from "fastify";
import mongoose from "mongoose";
import config from "./config";

export async function connectMongoDb(
  fastifyInstance: FastifyInstance,
  opts: FastifyPluginOptions,
  next: () => void
): Promise<void> {
  try {
    await mongoose.connect(config.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("Opened MongoDB connection to:", config.DB_URL);
    next();
  } catch (err) {
    console.error("Error while connecting to MongoDb at:", config.DB_URL);
    throw Error("Connection failed to MongoDb");
  }

  const db = mongoose.connection;

  db.on("error", () => {
    console.error("Error while re-connecting to MongoDb at:", config.DB_URL);
    // throw Error('Re-connection failed to MongoDb');
  });

  //   db.on('open', () => {
  //     console.log('Opened MongoDB connection to:', config.DB_URL);
  //     next();
  //   });
}
