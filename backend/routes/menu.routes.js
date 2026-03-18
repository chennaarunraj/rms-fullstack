const express = require("express");
const router = express.Router();

const menu = require("../data/menu");

// GET all menu items
router.get("/", (req, res) => {
  res.status(200).json(menu);
});

module.exports = router;