const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/admin.model");

const router = express.Router();

const SECRET = "restaurant_secret_key";

router.post("/login", async (req,res)=>{

  const {username,password} = req.body;

  const admin = await Admin.findOne({username});

  if(!admin){
    return res.status(401).json({message:"Invalid credentials"});
  }

  const valid = await bcrypt.compare(password,admin.password);

  if(!valid){
    return res.status(401).json({message:"Invalid credentials"});
  }

  const token = jwt.sign(
    {id:admin._id},
    SECRET,
    {expiresIn:"1h"}
  );

  res.json({token});

});

module.exports = router;