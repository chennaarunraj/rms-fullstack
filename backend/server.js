const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const connectDB = require("./config/db");

connectDB();

const menuRoutes = require("./routes/menu.routes");
const orderRoutes = require("./routes/order.routes");
const authRoutes = require("./routes/auth.routes");

const app = express();
const server = http.createServer(app);

const PORT = 5000;

// 🔥 CORS CONFIG (VERY IMPORTANT)
const corsOptions = {
  origin: "http://localhost:4200", // frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

// ✅ APPLY CORS BEFORE EVERYTHING
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "*");
  next();
});
app.use(express.json());

// 🔥 SOCKET.IO WITH SAME CORS
const io = new Server(server, {
  cors: corsOptions,
});

// Attach io to app
app.set("io", io);

// Routes
app.use("/api/menu", menuRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", authRoutes);

// Socket connection
io.on("connection", (socket) => {
  console.log("Client connected to real-time updates");

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// Start server
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});