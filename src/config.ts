import convict from "convict";

export const config = convict({
  env: {
    doc: "The application environment.",
    format: ["production", "development", "test"],
    default: "development",
    env: "NODE_ENV",
  },
  port: {
    doc: "The port to bind.",
    format: "port",
    default: 8080,
    env: "PORT",
  },
  visualCrossingKey: {
    default: "",
    env: "VISUAL_CROSSING_KEY",
  },
});
