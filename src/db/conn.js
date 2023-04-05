const mongoose = require("mongoose");

require("dotenv").config();
const uri = process.env.ATLAS_URI || "";

mongoose.set("strictQuery", false);

// Database
const connectDB = (module.exports = async () => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  try {
    await mongoose.connect(uri, connectionParams);
    console.log("Database connected successfully!");
  } catch (error) {
    console.log(error);
    console.log("Database connection failed");
  }
});

module.exports = { connectDB };
