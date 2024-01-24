require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dns = require("dns/promises");
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

const urls = [];
const shortUrls = new Map();

app.use(cors());
app.use(express.json());

app.use("/public", express.static(`${process.cwd()}/public`));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

// Your first API endpoint
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/shorturl/:shorturl", (req, res) => {
  const shortUrl = Number(req.params.shorturl);

  if (Number.isNaN(shortUrl)) {
    return res.status(400).json({
      error: "Wrong format",
    });
  }

  if (urls.length <= shortUrl) {
    return res.status(400).json({
      error: "No short URL found for the given input",
    })
  }

  res.redirect(urls[shortUrl]);
});

app.post("/api/shorturl", async (req, res) => {
  try {
    const url = new URL(req.body);
    let shortUrl = null;
    const lookup = await dns.lookup(url);

    if (lookup && lookup.address) {
      if (shortUrls.has(url)) {
        shortUrl = shortUrls.get(url);
      } else {
        shortUrl = urls.length;
        shortUrls.set(url, shortUrl);
        urls.push(url);
      }

      res.status(200).json({
        original_url: url,
        short_url: shortUrl,
      });
    } else {
      res.status(400).json({
        error: "Invalid Hostname",
      });
    }
  } catch (err) {
    res.status(400).json({
      error: "Invalid URL",
    });
  }
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
