const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// GET all orders from DB
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});

// CREATE new order and save to DB
router.post('/', async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();

    // Emit real-time event
    const io = req.app.get('io');
    io.emit('new-order', order);

    res.json(order);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE order status
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    // Emit real-time update
    const io = req.app.get('io');
    io.emit('order-updated', updatedOrder);

    res.json(updatedOrder);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;