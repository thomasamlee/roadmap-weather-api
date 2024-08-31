// features and flows: DTO, services, logic

import express, { RequestHandler } from "express";
import { config } from "../libraries/config";

export const router = express.Router();

const baseUrl = config.get("visualCrossingApi.baseUrl");
const apiKey = config.get("visualCrossingApi.key");

export function getTimelineWeatherUrl(
  location: string,
  date1?: string,
  date2?: string
) {
  let url = new URL(baseUrl + "/" + location);

  if (date1) {
    url = new URL(date1, url);

    if (date2) {
      url = new URL(date1, url);
    }
  }

  url.searchParams.set("key", apiKey);

  return url;
}
