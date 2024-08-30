// features and flows: DTO, services, logic

// document the weather API here
import { config } from "../libraries/config";

// example:
// https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/[location]/[date1]/[date2]?key=YOUR_API_KEY

export async function fetchWeatherApi<T = any>({
  location,
  date1,
  date2,
}: {
  location: string;
  date1: string;
  date2: string;
}) {
  const url = new URL(
    `/${location}/${date1}/${date2}`,
    config.weatherApiBaseUrl
  );

  url.searchParams.set("key", config.weatherApiKey);

  const response = await fetch(url);
  const data: T = await response.json();
  return data;
}
