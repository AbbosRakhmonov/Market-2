const {
  getProductsByCount,
  getCountOfProducts,
} = require("./socketFunctions.js");
const socketIO = (io) => {
  io.on("connection", (socket) => {
    socket.on("getProductsOfCount", async ({ market, count }) => {
      let countOfProducts = await getCountOfProducts(market);
      let current = 0;
      let allProducts = [];
      while (countOfProducts > 0) {
        const products = await getProductsByCount({ market, current, count });
        allProducts.push(...products);
        countOfProducts -= count;
        current++;
      }
      socket.emit("getProductsOfCount", allProducts);
    });
  });
};

module.exports = { socketIO };
