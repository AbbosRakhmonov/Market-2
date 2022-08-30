const { replaceAllProductdata } = require("./socketFunctions.js");
const socketIO = (io) => {
  io.on("connection", (socket) => {
    socket.on("test", () => console.log("Test"));
    socket.on("updateProductDatas", async () => {
      const products = await replaceAllProductdata();
      socket.emit("updateProductDatas", products);
    });
  });
};

module.exports = { socketIO };
