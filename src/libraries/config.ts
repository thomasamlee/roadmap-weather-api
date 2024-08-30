import convict from "convict";

export const config = convict({
  env: {
    format: ["production", "development", "test"],
    default: "development",
    env: "NODE_ENV",
  },
  port: {
    format: "port",
    default: 3000,
    env: "PORT",
  },
  visualCrossingApi: {
    key: {
      default: "",
      format: String,
      env: "VISUAL_CROSSING_KEY",
    },
    baseUrl: {
      default: "",
      format: String,
      env: "VISUAL_CROSSING_BASE_URL",
    },
  },
});
