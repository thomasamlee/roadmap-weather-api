import express from "express";
import { StatusCodes } from "http-status-codes";
import { logger } from "../libraries/logger";
import { api } from "./weather-api";
import { validateParamMiddleware } from "./middleware";

const router = express.Router();

router.get(
  "/:location",
  validateParamMiddleware,
  async function handler(req, res) {
    try {
      const { location } = req.params;

      const data = await api.getTimelineWeather(location);
      res.send(data);
    } catch (error) {
      logger.error("Error:" + error);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: "Internal Server Error" });
    }
  }
);

export default router;
