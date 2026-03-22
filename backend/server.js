const express = require("express");
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

// 🔥 FORCE CORS (THIS IS THE KEY FIX)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  next();
});

// Middleware
app.use(express.json());

// 🔥 SOCKET.IO (simple + compatible)
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// Attach io
app.set("io", io);

// Routes
app.use("/api/menu", menuRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", authRoutes);

// Socket connection
io.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// Start server
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});