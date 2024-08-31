import express, { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { z, ZodError } from "zod";
import { logger } from "../../libraries/logger";
import { getTimelineWeatherUrl } from "../domain";

export const router = express.Router();

const paramSchema = z.string();

const validateParamMiddleware: RequestHandler = (req, res, next) => {
  try {
    paramSchema.parse(req.params.location);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      const errorMessages = error.errors.map((issue) => ({
        message: `${issue.path.join(".")} is ${issue.message}`,
      }));
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Missing Location param", details: errorMessages });
    } else {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: "Internal Server Error" });
    }
  }
};

const handler: RequestHandler = async (req, res) => {
  try {
    const { location } = req.params;

    const response = await fetch(getTimelineWeatherUrl(location));
    const data = await response.json();
    res.send(data);
  } catch (error) {
    logger.error("Error:" + error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};

router.get("/:location", validateParamMiddleware, handler);
