import { z, ZodError } from "zod";
import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { logger } from "../libraries/logger";

const schema = z.object({
  location: z.string(),
  date1: z.string().optional(),
  date2: z.string().optional(),
});

export type WeatherRequestParams = z.infer<typeof schema>;

export const validateWeatherRequest: RequestHandler = (req, res, next) => {
  try {
    schema.parse(req.params);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      const errorMessages = error.errors.map((issue) => ({
        message: `${issue.path.join(".")} is ${issue.message}`,
      }));
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Invalid data", details: errorMessages });
    } else {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: "Internal Server Error" });
    }
  }
};
