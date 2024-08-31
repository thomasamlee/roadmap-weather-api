// features and flows: DTO, services, logic

import { config } from "../../libraries/config";

async function getTimelineWeather(location: string) {
  const url = new URL(location, config.get("visualCrossingApi.baseUrl"));

  url.searchParams.set("key", config.get("visualCrossingApi.key"));

  return fetch(url.href);
}

export const api = {
  getTimelineWeather,
};
