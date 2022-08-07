const { Market } = require("../../models/MarketAndBranch/Market.js");
const { SaleConnector } = require("../../models/Sales/SaleConnector.js");
const { Expense } = require("../../models/Expense/Expense.js");
module.exports.getSalesReport = async (req, res) => {
  try {
    const { market, startDate, endDate } = req.body;
    const marke = await Market.findById(market);
    if (!marke) {
      return res
        .status(401)
        .json({ message: `Diqqat! Do'kon haqida malumotlar topilmadi!` });
    }

    const sales = await SaleConnector.find({
      market,
      createdAt: {
        $gte: startDate,
        $lt: endDate,
      },
    })
      .select(
        "-isArchive -updatedAt -user -market -__v -debts -dailyconnectors"
      )
      .populate(
        "payments",
        "cash cashuzs card carduzs transfer transferuzs payment paymentuzs"
      )
      .populate("products", "totalprice totalpriceuzs");

    const cashcount = sales.reduce(
      (summ, sale) =>
        summ + sale.payments.filter((payment) => payment.cash > 0).length,
      0
    );

    const cardcount = sales.reduce(
      (summ, sale) =>
        summ + sale.payments.filter((payment) => payment.card > 0).length,
      0
    );

    const transfercount = sales.reduce(
      (summ, sale) =>
        summ + sale.payments.filter((payment) => payment.transfer > 0).length,
      0
    );

    const totalsale = sales.reduce(
      (summ, sale) =>
        summ +
        sale.products.reduce((summ, product) => summ + product.totalprice, 0),
      0
    );

    const totalsaleuzs = sales.reduce(
      (summ, sale) =>
        summ +
        sale.products.reduce(
          (summ, product) => summ + product.totalpriceuzs,
          0
        ),
      0
    );

    const totalcash = sales.reduce(
      (summ, sale) =>
        summ + sale.payments.reduce((summ, payment) => summ + payment.cash, 0),
      0
    );
    const totalcashuzs = sales.reduce(
      (summ, sale) =>
        summ +
        sale.payments.reduce((summ, payment) => summ + payment.cashuzs, 0),
      0
    );
    const totalcard = sales.reduce(
      (summ, sale) =>
        summ + sale.payments.reduce((summ, payment) => summ + payment.card, 0),
      0
    );
    const totalcarduzs = sales.reduce(
      (summ, sale) =>
        summ +
        sale.payments.reduce((summ, payment) => summ + payment.carduzs, 0),
      0
    );
    const totaltransfer = sales.reduce(
      (summ, sale) =>
        summ +
        sale.payments.reduce((summ, payment) => summ + payment.transfer, 0),
      0
    );
    const totaltransferuzs = sales.reduce(
      (summ, sale) =>
        summ +
        sale.payments.reduce((summ, payment) => summ + payment.transferuzs, 0),
      0
    );

    let totalSales = {
      totalsale,
      totalcash,
      totalcard,
      totalsaleuzs,
      totalcashuzs,
      totalcarduzs,
      totaltransfer,
      totaltransferuzs,
      salecount: sales.length,
      cashcount,
      cardcount,
      transfercount,
      cashexpense: 0,
      cardexpense: 0,
      transferexpense: 0,
    };

    const expense = await Expense.find({
      market,
      createdAt: {
        $gte: startDate,
        $lt: endDate,
      },
    }).select("sum comment type market createdAt");

    expense.map((item) => {
      if (item.type === "cash") {
        totalSales.cashexpense += item.sum;
      }
      if (item.type === "card") {
        totalSales.cardexpense += item.sum;
      }
      if (item.type === "transfer") {
        totalSales.transferexpense += item.sum;
      }
    });

    res.status(201).json(totalSales);
  } catch (error) {
    res.status(400).json({ error: "Serverda xatolik yuz berdi..." });
  }
};
