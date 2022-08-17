const { Market } = require('../../models/MarketAndBranch/Market');
const { Incoming } = require('../../models/Products/Incoming');
const { SaleProduct } = require('../../models/Sales/SaleProduct');
const { SaleConnector } = require('../../models/Sales/SaleConnector');
const { Expense } = require('../../models/Expense/Expense');
const { DailySaleConnector } = require('../../models/Sales/DailySaleConnector');
const { Discount } = require('../../models/Sales/Discount');
require('../../models/Sales/Payment');
require('../../models/Sales/Discount');
require('../../models/Products/ProductPrice');

module.exports.getIncomingData = async (req, res) => {
  try {
    const { market } = req.body;

    const marke = await Market.findById(market);

    if (!marke) {
      return res
        .status(401)
        .json({ message: "Diqqat! Do'kon ma'lumotlari topilmadi." });
    }

    const startDate = new Date(
      new Date(new Date(new Date().setMonth(0)).setDate(1)).setHours(3, 0, 0, 0)
    );
    const currenDate = new Date();

    const incomings = await Incoming.find({
      market,
      createdAt: {
        $gte: startDate,
        $lte: currenDate,
      },
    }).select('totalprice market createdAt');

    res.status(201).json(incomings);
  } catch (error) {
    res.status(501).json({ error: 'Serverda xatolik yuz berdi...' });
  }
};

module.exports.getSellingData = async (req, res) => {
  try {
    const { market } = req.body;

    const marke = await Market.findById(market);

    if (!marke) {
      return res
        .status(401)
        .json({ message: "Diqqat! Do'kon ma'lumotlari topilmadi." });
    }

    const startDate = new Date(
      new Date(new Date(new Date().setMonth(0)).setDate(1)).setHours(3, 0, 0, 0)
    );
    const currenDate = new Date();

    const selling = await SaleProduct.find({
      market,
      createdAt: {
        $gte: startDate,
        $lte: currenDate,
      },
    }).select('totalprice market createdAt');

    res.status(201).json(selling);
  } catch (error) {
    res.status(501).json({ error: 'Serverda xatolik yuz berdi...' });
  }
};

module.exports.getSalesDataByMonth = async (req, res) => {
  try {
    const { market } = req.body;

    const sales = [];
    const salesSum = [];

    let count = 0;
    const currentMonth = new Date().getMonth();

    while (count <= currentMonth) {
      const daysales = await DailySaleConnector.find({
        market,
        createdAt: {
          $gte: new Date(
            new Date(new Date().setMonth(count, 1)).setHours(3, 0, 0, 0)
          ).toISOString(),
          $lte: new Date(
            new Date(new Date().setMonth(count + 1, 0)).setHours(26, 59, 59, 59)
          ).toISOString(),
        },
      })
        .select('-isArchive -updatedAt -user -market -__v')
        .populate('products', 'totalprice totalpriceuzs pieces price');

      const reducer = (arr, el) =>
        arr.reduce((prev, item) => prev + (item[el] || 0), 0);

      const usd = daysales.reduce((sum, { products }) => {
        return sum + reducer(products, 'totalprice');
      }, 0);
      const uzs = daysales.reduce((sum, { products }) => {
        return sum + reducer(products, 'totalpriceuzs');
      }, 0);

      sales.push(daysales.length);
      salesSum.push({
        usd: Math.round(usd * 1000) / 1000,
        uzs: Math.round(uzs * 1) / 1,
      });
      count += 1;
    }

    // Oylik soffoyda chiqarish
    const monthProfit = {
      usd: 0,
      uzs: 0,
    };

    const dailysales = await DailySaleConnector.find({
      market,
      createdAt: {
        $gte: new Date(new Date().setDate(1)).toISOString(),
        $lte: new Date().toISOString(),
      },
    })
      .select('discount products')
      .populate({
        path: 'products',
        select: 'pieces price totalprice totalpriceuzs',
        populate: {
          path: 'price',
          select: 'incomingprice incomingpriceuzs',
        },
      })
      .populate('discount', 'discount discountuzs');

    const roundUzs = (price) => Math.round(Number(price) * 1) / 1;
    const roundUsd = (price) => Math.round(Number(price) * 1000) / 1000;

    dailysales.map((sale) => {
      const totalprice = sale.products.reduce((prev, { totalprice }) => {
        return prev + (totalprice || 0);
      }, 0);
      const totalpriceuzs = sale.products.reduce((prev, { totalpriceuzs }) => {
        return prev + (totalpriceuzs || 0);
      }, 0);
      const incomingtotal = sale.products.reduce((prev, product) => {
        return prev + (product.price?.incomingprice || 0) * product.pieces;
      }, 0);
      const incomingtotaluzs = sale.products.reduce((prev, product) => {
        return prev + (product.price?.incomingpriceuzs || 0) * product.pieces;
      }, 0);

      monthProfit.usd += roundUsd(totalprice - incomingtotal);
      monthProfit.uzs += roundUzs(totalpriceuzs - incomingtotaluzs);
    });

    const discounts = await Discount.find({
      discount: { $ne: 0 },
      market,
      createdAt: {
        $gte: new Date(new Date().setDate(1)).toISOString(),
        $lte: new Date().toISOString(),
      },
    });
    const discounttotal = discounts.reduce(
      (prev, { discount }) => prev + discount,
      0
    );
    const discounttotaluzs = discounts.reduce(
      (prev, { discountuzs }) => prev + discountuzs,
      0
    );

    monthProfit.usd = roundUsd(monthProfit.usd - discounttotal);
    monthProfit.uzs = roundUzs(monthProfit.uzs - discounttotaluzs);

    // Xarajat chiqarish bir oylik
    const monthExpense = {
      usd: 0,
      uzs: 0,
    };

    const expenses = await Expense.find({
      market,
      createdAt: {
        $gte: new Date(new Date().setDate(1)).toISOString(),
        $lte: new Date().toISOString(),
      },
    }).select('sum sumuzs');

    expenses.map((expense) => {
      monthExpense.usd += expense.sum;
      monthExpense.uzs += expense.sumuzs;
    });

    monthExpense.usd = roundUsd(monthExpense.usd);
    monthExpense.uzs = roundUzs(monthExpense.uzs);

    res.status(200).json({
      sales,
      salesSum,
      monthProfit,
      monthExpense,
    });
  } catch (error) {
    res.status(501).json({ error: 'Serverda xatolik yuz berdi...' });
  }
};
