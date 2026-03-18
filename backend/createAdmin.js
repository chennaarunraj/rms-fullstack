const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("./models/admin.model");

mongoose.connect("mongodb://localhost:27017/restaurant_db");

async function createAdmin(){

  const hashedPassword = await bcrypt.hash("admin123",10);

  const admin = new Admin({
    username:"admin",
    password:hashedPassword
  });

  await admin.save();

  console.log("Admin created successfully");

  mongoose.disconnect();

}

createAdmin();