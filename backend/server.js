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

const io = new Server(server, {
  cors: {
    origin: "*",
  },
}); 

const PORT = 5000;

// Middlewares
app.use(cors({
  origin: '*'
}));
app.use(express.json());

// Attach io to app so routes can use it
app.set("io", io);

// Routes
app.use("/api/menu", menuRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth",authRoutes);

// Socket connection
io.on("connection", (socket) => {
  console.log("Admin connected to real-time updates");

  socket.on("disconnect", () => {
    console.log("Admin disconnected");
  });
});

// Start server
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});