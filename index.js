import { MONGO_DB_URL } from "./config";

const express = require("express");
const app = express();
const port = 5000;

export const mongoose = require("mongoose");
mongoose.connect(MONGO_DB_URL, {
  autoIndex: true,
  })
  .then(() => {
  console.log("MongoDB Connected...");
  })
  .catch((err) => {
    console.log(err);
});

app.get("/", (req, res) => res.send("Hellow, World!"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));