const express = require("express");

const apiRouter = express.Router();

apiRouter.get("/:date?", (req, res) => {
  const date = req.params.date;
  let dateObj = !date
    ? new Date()
    : isNaN(date)
    ? new Date(date)
    : new Date(parseInt(date));

  if (dateObj.toString() === "Invalid Date") {
    res.json({ error: "Invalid Date" });
  }

  res.json({ unix: dateObj.getTime(), utc: dateObj.toUTCString() });
});

apiRouter.get("/ti")

module.exports = apiRouter;
