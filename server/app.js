const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const { start } = require("./connectDB/db");
const io = new Server(server, {
  cors: {
    origin: "*",
    method: ["*"],
  },
});

const { getAllProducts } = require("./routers/socket/socketFunctions");

app.use(cors());

io.on("connection", (socket) => {
  socket.on("getallproducts", async (market) => {
    const products = await getAllProducts(market);
    socket.emit("getallproducts", products);
  });
});

start(server);

const { routers } = require("./routers/routers");

routers(app);

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "./../frontend", "build")));

  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "./../frontend", "build", "index.html")
    );
  });
}
