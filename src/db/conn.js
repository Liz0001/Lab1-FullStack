const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

require("dotenv").config();
const uri = process.env.ATLAS_URI || "";

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: "Music",
};

connectDB().catch((err) => console.log(err));

async function connectDB() {
  await mongoose.connect(uri, connectionParams);

  const con = mongoose.connection;
  con.on("open", () => {
    console.log("Database connected successfully!");
  });
}

module.exports = { connectDB };
