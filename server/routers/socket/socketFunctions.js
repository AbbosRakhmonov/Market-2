const { Market } = require("../../models/MarketAndBranch/Market");
const { Product } = require("../../models/Products/Product");
const { ProductData } = require("../../models/Products/Productdata");
const { Category } = require("../../models/Products/Category");
const { Unit } = require("../../models/Products/Unit");
const { ProductPrice } = require("../../models/Products/ProductPrice.js");

const getAllProducts = async (market) => {
  try {
    const marke = await Market.findById(market);
    if (!marke) {
      return;
      {
        message: "Diqqat! Do'kon ma'lumotlari topilmadi.";
      }
    }

    const products = await Product.find({
      market,
    })
      .sort({ code: 1 })
      .select("name code unit category producttype brand price total")
      .populate("category", "name code")
      .populate("productdata", "name code barcode")
      .populate("unit", "name")
      .populate(
        "price",
        "incomingprice sellingprice incomingpriceuzs sellingpriceuzs"
      );
    return products;
  } catch (error) {
    return { message: "Serverda xatolik yuz berdi" };
  }
};

module.exports = { getAllProducts };
