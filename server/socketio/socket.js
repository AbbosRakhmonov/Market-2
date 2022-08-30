const { getAllCategories, getAllProducts } = require("./socketFunctions.js");
const socketIO = (io) => {
  io.on("connection", (socket) => {});
};

module.exports = { socketIO };
