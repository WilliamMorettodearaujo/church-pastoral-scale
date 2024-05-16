import cors from "cors";
import express from "express";
import logger from "morgan";
import { router } from "./routes/indexRouter";

export const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(router);
