const express = require("express");

const apiRouter = express.Router();

//task 1
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
// task 2
apiRouter.get("/whoami", (req, res) => {
  const ipaddress = req.ip;
  const language = req.headers["accept-language"];
  const software = req.headers["user-agent"];
  res.json({ ipaddress, language, software });
});

apiRouter.get("/ti");

module.exports = apiRouter;
