const {
  getProductsByCount,
  getCountOfProducts,
} = require("./socketFunctions.js");
const socketIO = (io) => {
  io.on("connection", (socket) => {
    socket.on("getProductsOfCount", async ({ market, count }) => {
      let countOfProducts = await getCountOfProducts(market);
      let current = 0;
      while (countOfProducts > 0) {
        const products = await getProductsByCount({ market, current, count });
        socket.emit("getProductsOfCount", products);
        countOfProducts -= count;
        current++;
      }
    });
  });
};

module.exports = { socketIO };
