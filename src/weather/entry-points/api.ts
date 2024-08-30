import express from "express";
export const router = express.Router();

// Home page route.
router.get("/timeline", function (req, res) {
  res.send("timeline weather");
});
