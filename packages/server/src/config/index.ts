import { config } from "dotenv";
import path from "path";

// load the env vars
config({ path: path.join(".", ".env") });

export default {
  NODE_ENV: process.env.NODE_ENV ?? "development",
  PORT: process.env.PORT ?? 7000,
  DB_URL: process.env.DB_URL,
  AUTH_SECRET_KEY: process.env.AUTH_SECRET_KEY,
};
