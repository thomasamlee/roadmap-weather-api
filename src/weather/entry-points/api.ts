import express from "express";
import { logger } from "../../libraries/logger";
import { StatusCodes } from "http-status-codes";
import { config } from "../../libraries/config";

export const router = express.Router();

const baseUrl = config.get("visualCrossingApi.baseUrl");
const apiKey = config.get("visualCrossingApi.key");

router.get("/", async (req, res) => {
  try {
    const url = new URL(baseUrl);
    url.pathname = url.pathname + "/75010";
    url.searchParams.set("key", apiKey);

    const response = await fetch(url);
    const data = await response.json();
    res.send(data);
  } catch (error) {
    logger.error("Error:" + error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
});
