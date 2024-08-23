// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();
const apiRouter = require("./routes/api");
// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
//allow upload file



app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.use("/api", apiRouter);

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
