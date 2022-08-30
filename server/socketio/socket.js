const { getAllCategories, getAllProducts } = require("./socketFunctions.js");
const socketIO = (io) => {
  io.on("connection", (socket) => {
    socket.on("getAllCategories", async (market) => {
      const categories = await getAllCategories(market);
      socket.emit("getAllCategories", categories);
    });

    socket.on("getAllProducts", async (market) => {
      const products = await getAllProducts(market);
      socket.emit("getAllProducts", products);
    });
  });
};

module.exports = { socketIO };
