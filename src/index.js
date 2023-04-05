// const { MongoClient, ServerApiVersion } = require("mongodb");

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// const uri = process.env.ATLAS_URI;
const app = express();
const staticPath = "src/static";

require("dotenv").config();
mongoose.set("strictQuery", false);

app.use(express.static(staticPath));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome!");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port: ${process.env.PORT}`);
});
