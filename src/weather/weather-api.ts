import { config } from "../libraries/config";

const baseUrl = config.get("visualCrossingApi.baseUrl");
const apiKey = config.get("visualCrossingApi.key");

function createUrl(location: string, date1?: string, date2?: string) {
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

export const getTimelineWeather = async (
  location: string,
  date1?: string,
  date2?: string
) => {
  const response = await fetch(createUrl(location, date1, date2));
  return await response.json();
};

export const api = {
  getTimelineWeather,
};
