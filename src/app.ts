import path from "path";
import cors from "cors";
import express, { Express } from "express";
import dotenv from "dotenv";

import Api1 from "./routes/v1/global.router";
import { environment } from "./types/global";
import { corsOptions } from "./config/cors.config";

const IS_DEVELOPMENT = process.env.NODE_ENV === environment.DEVELOPMENT;

dotenv.config();

const app: Express = express();

app.use(cors(corsOptions));

// api versioning.
app.use("/v1", Api1);
app.use("/static", express.static(path.join(__dirname, "public")));

export default app;
