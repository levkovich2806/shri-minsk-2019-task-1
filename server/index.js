const express = require("express");
const path = require("path");
const utils = require("./utils/utils");
const cors = require("cors");

const app = express();
app.use(cors());

app.use(express.json());

utils.getCardsData();

const cards = require("./routes/cards.js");

app.use("/api/cards", cards);

// Все маршруты, кроме тех, что описаны выше (в нашем случае только /api/cards/*)  обрабатываем ниже

app.use(express.static("build"));
app.get("*", (req, res) => res.sendFile(path.resolve("build", "index.html")));

app.use("*", (req, res) => {
  return res.status(404).send("<h1>Page not found</h1>");
});

app.listen(8000);

module.exports = app;
