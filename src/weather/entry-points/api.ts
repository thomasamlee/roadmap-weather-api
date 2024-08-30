import express from "express";
export const router = express.Router();

// Home page route.
router.get("/", function (req, res) {
  res.send("weather from router");
});
