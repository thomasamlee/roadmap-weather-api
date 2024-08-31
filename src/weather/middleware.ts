import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { z, ZodError } from "zod";

const paramSchema = z.string();

export const validateParamMiddleware: RequestHandler = (req, res, next) => {
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
