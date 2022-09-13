const { Market } = require("../models/MarketAndBranch/Market.js");
const { Product } = require("../models/Products/Product.js");
const { ProductData } = require("../models/Products/Productdata.js");
const { Category } = require("../models/Products/Category.js");
const { Unit } = require("../models/Products/Unit.js");
const { ProductPrice } = require("../models/Products/ProductPrice.js");
const { filter } = require("lodash");

const getAllCategories = async (market) => {
  try {
    const marke = await Market.findById(market);

    if (!marke) {
      return { error: error };
    }

    return await Category.find({ market }).select("code market name products");
  } catch (error) {
    return { error: error };
  }
};

const getAllProducts = async (market) => {
  try {
    const marke = await Market.findById(market);
    if (!marke) {
      return;
      {
        message: "Diqqat! Do'kon ma'lumotlari topilmadi.";
      }
    }

    return await Product.find({
      market,
    })
      .sort({ code: 1 })
      .select("name code unit category producttype brand pricez total")
      .populate("category", "name code")
      .populate("productdata", "name code barcode")
      .populate("unit", "name")
      .populate(
        "price",
        "sellingprice incomingprice sellingpriceuzs incomingpriceuzs tradeprice tradepriceuzs"
      );
  } catch (error) {
    return { message: "Serverda xatolik yuz berdi" };
  }
};

const replaceAllProductdata = async () => {
  try {
    const allProductData = await ProductData.find();
    filter(allProductData, async (productdata) => {
      await ProductData.findByIdAndUpdate(productdata._id, {
        product: productdata.products[0],
      });
    });
    const allProductDatas = await ProductData.find();

    return allProductDatas;
  } catch (error) {
    return { message: "Serverda xatolik yuz berdi" };
  }
};

const getCountOfProducts = async (market) => {
  try {
    const marke = await Market.findById(market);
    if (!marke) {
      return;
      {
        message: "Diqqat! Do'kon ma'lumotlari topilmadi.";
      }
    }

    const count = await Product.find({ market }, { timestamps: 1 }).count();

    return count;
  } catch (error) {
    return { message: "Serverda xatolik yuz berdi" };
  }
};

const getProductsByCount = async ({ socket, market }) => {
  try {
    const marke = await Market.findById(market);
    if (!marke) {
      return socket.emit("error", {
        message: "Diqqat! Do'kon ma'lumotlari topilmadi.",
      });
    }
    const categories = await Category.find(
      { market },
      { timestamp: 1, code: 1, name: 1, products: 1 }
    )
      .sort({ code: 1 })
      .select("_id");

    socket.emit("categories", categories);

    for (const category of categories) {
      const products = await Product.find(
        { market, category },
        { timestamp: 1 }
      )
        .sort({ timestamp: -1 })
        .select("market total productdata price category unit")
        .populate("productdata", "name code barcode")
        .populate(
          "price",
          "sellingprice incomingprice sellingpriceuzs incomingpriceuzs tradeprice tradepriceuzs"
        )
        .populate("category", "name code")
        .populate("unit", "name");
      socket.emit("getProductsOfCount", products);
    }
  } catch (error) {
    return { message: "Serverda xatolik yuz berdi" };
  }
};

module.exports = {
  getAllCategories,
  getAllProducts,
  replaceAllProductdata,
  getCountOfProducts,
  getProductsByCount,
};
