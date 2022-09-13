const {
  getProductsByCount,
  getCountOfProducts,
} = require("./socketFunctions.js");
const socketIO = (io) => {
  io.on("connection", (socket) => {
    socket.on("getProductsOfCount", async ({ market }) => {
      await getProductsByCount({
        socket,
        market,
      });
    });
  });
};

module.exports = { socketIO };
