import { config } from "./config";
import express from "express";
import { logger } from "./logger";

const app = express();
const port = config.port;

app.get("/", (req, res) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  logger.info(`Server is running at http://localhost:${port}`);
});
