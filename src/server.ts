import cors from "cors";
import express from "express";
import logger from "morgan";
import { AppDataSource } from "./data-source";
import { router } from "./routes/indexRouter";

const portDB = process.env.DB_PORT_DB ? parseInt(process.env.DB_PORT_DB) : 3335;
export const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(router);

AppDataSource.initialize()
  .then(() => {
    const app = express();

    app.use(express.json());

    app.use(router);

    app.use(logger("dev"));

    app.listen(portDB, () => console.log(`Api running on port ${portDB}`));
  })
  .catch((error) => console.log(error));
