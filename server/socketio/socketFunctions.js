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

    const categories = await Category.find({ market }).select(
      "code market name products"
    );
    return categories;
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

module.exports = { getAllCategories, getAllProducts, replaceAllProductdata };
