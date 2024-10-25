const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("You are connected to your Mongo database.");
  } catch (error) {
    console.log("unable to connect to MongoDB", error);
    process.exit(1);
  }
};

module.exports = connectDB;
