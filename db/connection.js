const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1); // 1 means "stopped because of an error"
  }
};

module.exports = connectDB; // the CommonJS version of export. It lets other files require it
