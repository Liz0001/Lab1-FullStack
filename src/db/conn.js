const mongoose = require("mongoose");

require("dotenv").config();
const uri = process.env.ATLAS_URI || "";

mongoose.set("strictQuery", false);

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

connectDB().catch((err) => console.log(err));

async function connectDB() {
  await mongoose.connect(uri, connectionParams);
  const con = mongoose.connection;
  con.on("open", function () {
    console.log("Database connected successfully!");
  });
}

module.exports = { connectDB };
