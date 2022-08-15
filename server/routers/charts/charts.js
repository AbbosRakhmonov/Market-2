const { Market } = require('../../models/MarketAndBranch/Market');
const { Incoming } = require('../../models/Products/Incoming');
const { SaleProduct } = require('../../models/Sales/SaleProduct');
const { SaleConnector } = require('../../models/Sales/SaleConnector');
require('../../models/Sales/Payment');

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
      const saleconnectors = await SaleConnector.find({
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
        .select('payments')
        .populate('payments', 'totalprice totalpriceuzs');

      const reducer = (arr, el) =>
        arr.reduce((prev, item) => prev + (item[el] || 0), 0);

      const usd = saleconnectors.reduce((sum, { payments }) => {
        return sum + reducer(payments, 'totalprice');
      }, 0);
      const uzs = saleconnectors.reduce((sum, { payments }) => {
        return sum + reducer(payments, 'totalpriceuzs');
      }, 0);

      sales.push(saleconnectors.length);
      salesSum.push({
        usd,
        uzs,
      });
      count += 1;
    }

    res.status(200).json({ sales, salesSum });
  } catch (error) {
    res.status(501).json({ error: 'Serverda xatolik yuz berdi...' });
  }
};
