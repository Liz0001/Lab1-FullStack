const express = require("express");
const cors = require("cors");
const { connectDB } = require("./db/conn.js");
const bodyParser = require("body-parser");
const albumRoutes = require("./routes/album.js");

const app = express();
const port = process.env.PORT || 3000;
const staticPath = "src/static";

require("dotenv").config();

app.use(
  cors({
    origin: "*",
  })
);
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`, req.body);
  next();
});

app.use(express.static(staticPath));

app.use("/api/albums", albumRoutes);

app.listen(port, async () => {
  await connectDB();
  console.log(`Server is running on port: ${port}`);
});
