/*const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/restaurant_db", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};
                      // code for local mongo db

module.exports = connectDB; */ 

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://Arunraj67732_db_user:Chenna%4067732@cluster0.ig5bxzg.mongodb.net/rms?retryWrites=true&w=majority"
    );
// password Chenna@67732 encoded like Chenna%4067732@cluster0 cause @ confuses cluster 
    console.log("MongoDB Atlas connected successfully ✅");

  } catch (error) {
    console.error("MongoDB connection failed :", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;