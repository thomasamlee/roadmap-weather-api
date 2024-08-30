import { config } from "./libraries/config";
import express from "express";
import { logger } from "./libraries/logger";
import { router as weatherRouter } from "./weather";

const app = express();
const port = config.get("port");

app.use("/weather", weatherRouter);

app.listen(port, () => {
  logger.info(`Server is running at http://localhost:${port}`);
});
