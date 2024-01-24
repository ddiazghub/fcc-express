// index.js
// where your node app starts
const PORT = Number(process.env.PORT ?? 8000);

// init project
const express = require("express");
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
const cors = require("cors");
const { time } = require("console");

app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204
app.use(express.json());

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

function parseDate(date) {
  const timestamp = Number(date);

  if (Number.isInteger(timestamp)) {
    return timestamp;
  } else {
    return Date.parse(date);
  }
}

app.get("/api/:timestamp", (req, res) => {
  const timestamp = req.params.timestamp
    ? parseDate(req.params.timestamp)
    : Date.now();

  if (isNaN(timestamp)) {
    res.json({ error: "Invalid Date" });
  } else {
    res.json({
      unix: timestamp,
      utc: new Date(timestamp).toUTCString()
    });
  }
})

// listen for requests :)
var listener = app.listen(PORT, function () {
  console.log(`Your app is listening on port ${listener.address().port}`);
});
