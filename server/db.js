require("dotenv").config();
const mongoose = require("mongoose");

class MongoDB {
  constructor() {
    this.MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/vp-pharmacy";
  }

  async connect() {
    try {
      await mongoose.connect(this.MONGO_URI);
      console.log("MongoDB successfully connected");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error.message);
      throw error;
    }
  }

  async destroy() {
    try {
      await mongoose.disconnect();
    } catch (error) {
      throw error;
    }
  }
}

export default MongoDB;
