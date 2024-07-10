import cors from "cors";
import express from "express";
import logger from "morgan";
import { AppDataSource } from "./data-source";
import { router } from "./routes/indexRouter";

const apiPort = process.env.API_PORT ? parseInt(process.env.API_PORT) : 3336;
export const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(router);

AppDataSource.initialize()
  .then(() =>
    app.listen(apiPort, () => console.log(`Api running on port ${apiPort}`))
  )
  .catch((error) => console.log(error));
