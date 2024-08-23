const express = require("express");

const apiRouter = express.Router();
const { fileManager, createShortUrl } = require("../helpers/common");

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

// task 3
apiRouter.post("/shorturl", (req, res) => {
  const original_url = req.body.url;
  const short_url = createShortUrl();
  // check valid url
  const urlRegex = new RegExp(/^(ftp|http|https):\/\/[^ "]+$/);

  if (!urlRegex.test(original_url)) {
    res.json({ error: "invalid url" });
  }
  fileManager("save", { original_url, short_url });
  res.json({ original_url, short_url });
});

apiRouter.get("/shorturl/:short_url", (req, res) => {
  const short_url = req.params.short_url;
  const data = fileManager("load");
  const item = data.find((item) => item.short_url == short_url);

  if (item) {
    res.redirect(item.original_url);
  }
  res.json({ error: "No short url found for given input" });
});

module.exports = apiRouter;
