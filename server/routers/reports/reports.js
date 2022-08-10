const { Expense } = require('../../models/Expense/Expense');
const { Market } = require('../../models/MarketAndBranch/Market');
const { Incoming } = require('../../models/Products/Incoming');
const { Product } = require('../../models/Products/Product');
const { ProductData } = require('../../models/Products/Productdata');
const { ProductPrice } = require('../../models/Products/ProductPrice');
const { Debt } = require('../../models/Sales/Debt');
const { Discount } = require('../../models/Sales/Discount');
const { Payment } = require('../../models/Sales/Payment');
const { SaleConnector } = require('../../models/Sales/SaleConnector');
const { SaleProduct } = require('../../models/Sales/SaleProduct');
const {
  DailySaleConnector,
} = require('../../models/Sales/DailySaleConnector.js');
require('../../models/Sales/Client');

module.exports.getReport = async (req, res) => {
  try {
    const { market, startDate, endDate } = req.body;
    const marke = await Market.findById(market);
    if (!marke) {
      return res
        .status(401)
        .json({ message: `Diqqat! Do'kon haqida malumotlar topilmadi!` });
    }

    const sales = await DailySaleConnector.find({
      market,
      createdAt: {
        $gte: startDate,
        $lt: endDate,
      },
    })
      .select('-isArchive -updatedAt -user -market -__v')
      .populate(
        'payment',
        'cash cashuzs card carduzs transfer transferuzs payment paymentuzs totalprice totalpriceuzs'
      )
      .populate({
        path: 'products',
        select: 'totalprice totalpriceuzs pieces price',
        populate: {
          path: 'price',
          select: 'incomingprice incomingpriceuzs sellingprice sellingpriceuzs',
        },
      })
      .populate('discount', 'discount discountuzs procient');

    let reports = {
      sale: {
        sale: 0,
        saleuzs: 0,
        salecount: 0,
      },
      income: {
        income: 0,
        incomeuzs: 0,
      },
      expenses: {
        expenses: 0,
        expensesuzs: 0,
        expensescount: 0,
      },
      cash: {
        cash: 0,
        cashuzs: 0,
        cashcount: 0,
      },
      card: {
        card: 0,
        carduzs: 0,
        cardcount: 0,
      },
      transfer: {
        transfer: 0,
        transferuzs: 0,
        transfercount: 0,
      },
      backproducts: {
        backproducts: 0,
        backproductsuzs: 0,
        backproductscount: 0,
      },
      discounts: {
        discounts: 0,
        discountsuzs: 0,
        discountscount: 0,
      },
      debts: {
        debts: 0,
        debtsuzs: 0,
        debtscount: 0,
      },
    };

    let incomingprice = 0;
    let incomingpriceuzs = 0;

    let backproduct = 0;
    let backproductuzs = 0;
    let backproductcount = 0;

    const roundUzs = (price) => Math.round(Number(price) * 1) / 1;
    const roundUsd = (price) => Math.round(Number(price) * 1000) / 1000;

    sales.map((sale) => {
      reports.sale.sale += roundUsd(sale.payment.totalprice);
      reports.sale.saleuzs += roundUzs(sale.payment.totalpriceuzs);
      reports.sale.salecount++;
      sale.products.map((product) => {
        incomingprice += roundUsd(product.price.incomingprice);
        incomingpriceuzs += roundUzs(product.price.incomingpriceuzs);
        if (product.totalprice < 0) {
          backproduct += roundUsd(product.totalprice);
          backproductuzs += roundUzs(product.totalpriceuzs);
          backproductcount++;
        }
      });
      reports.cash.cash += roundUsd(sale.payment.cash);
      reports.cash.cashuzs += roundUzs(sale.payment.cashuzs);
      reports.cash.cash > 0 && reports.cash.cashcount++;
      reports.card.card += roundUsd(sale.payment.card);
      reports.card.carduzs += roundUzs(sale.payment.carduzs);
      reports.card.card > 0 && reports.card.card++;
      reports.transfer.transfer += roundUsd(sale.payment.transfer);
      reports.transfer.transferuzs += roundUzs(sale.payment.transferuzs);
      reports.transfer.transfer > 0 && reports.transfer.transfercount++;
      reports.discounts.discounts += roundUsd(
        (sale.discount && sale.discount.discount) || 0
      );
      reports.discounts.discountsuzs += roundUzs(
        (sale.discount && sale.discount.discountuzs) || 0
      );
      reports.discounts.discounts > 0 && reports.discounts.discountscount++;
      sale.payment.totalprice - sale.payment.payment > 0.1 &&
        reports.debts.debtscount++;
    });
    reports.income.income = roundUsd(
      Number(reports.sale.sale) -
        Number(incomingprice) -
        Number(reports.discounts.discounts)
    );
    reports.income.incomeuzs = roundUzs(
      Number(reports.sale.saleuzs) -
        Number(incomingpriceuzs) -
        Number(reports.discounts.discountsuzs)
    );
    reports.debts.debts = roundUsd(
      Number(reports.sale.sale) -
        Number(reports.discounts.discounts) -
        Number(reports.cash.cash) -
        Number(reports.card.card) -
        Number(reports.transfer.transfer)
    );

    reports.debts.debtsuzs = roundUzs(
      Number(reports.sale.saleuzs) -
        Number(reports.discounts.discountsuzs) -
        Number(reports.cash.cashuzs) -
        Number(reports.card.carduzs) -
        Number(reports.transfer.transferuzs)
    );

    reports.backproducts.backproducts = backproduct;
    reports.backproducts.backproductsuzs = backproductuzs;
    reports.backproducts.backproductscount = backproductcount;

    res.status(201).send(reports);
  } catch (error) {
    res.status(400).json({ error: 'Serverda xatolik yuz berdi...' });
  }
};

module.exports.getSales = async (req, res) => {
  try {
    const { market, currentPage, countPage, startDate, endDate } = req.body;

    const marke = await Market.findById(market);
    if (!marke) {
      return res
        .status(401)
        .json({ message: `Diqqat! Do'kon haqida malumotlar topilmadi!` });
    }

    const saleconnector = await SaleConnector.find({
      market,
      createdAt: {
        $gte: startDate,
        $lte: endDate,
      },
    })
      .select('-isArchive -user -updatedAt -__v -packman')
      .populate(
        'payments',
        'cash cashuzs card carduzs transfer transferuzs payment paymentuzs totalprice totalpriceuzs'
      )
      .populate('client', 'name')
      .populate('products', 'totalprice totalpriceuzs pieces price');

    const count = saleconnector.length;
    const data = saleconnector.slice(currentPage * countPage, countPage);

    res.status(200).json({ data, count });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: 'Serverda xatolik yuz berdi...' });
  }
};

module.exports.getProfitData = async (req, res) => {
  try {
    const { market, currentPage, countPage, startDate, endDate } = req.body;

    const marke = await Market.findById(market);
    if (!marke) {
      return res
        .status(401)
        .json({ message: `Diqqat! Do'kon haqida malumotlar topilmadi!` });
    }

    const saleconnector = await SaleConnector.find({
      market,
      createdAt: {
        $gte: startDate,
        $lte: endDate,
      },
    })
      .select('-isArchive -user -updatedAt -__v -packman')
      .populate('client', 'name')
      .populate({
        path: 'products',
        select:
          'totalprice unitprice totalpriceuzs unitpriceuzs pieces createdAt discount price',
        populate: {
          path: 'price',
          select: 'incomingprice incomingpriceuzs',
        },
      })
      .populate('discounts', 'discount discountuzs');

    let profitData = saleconnector.map((sale) => {
      let totalincomingprice = sale.products.reduce(
        (prev, product) => prev + product.price.incomingprice,
        0
      );
      let totalincomingpriceuzs = sale.products.reduce(
        (prev, product) => prev + product.price.incomingpriceuzs,
        0
      );
      let totalsellingprice = sale.products.reduce(
        (prev, product) => prev + product.totalprice,
        0
      );
      let totalsellingpriceuzs = sale.products.reduce(
        (prev, product) => prev + product.totalpriceuzs,
        0
      );
      let totaldiscount = sale.discounts.reduce(
        (prev, discount) => prev + discount.discount,
        0
      );
      let totaldiscountuzs = sale.discounts.reduce(
        (prev, discount) => prev + discount.discountuzs,
        0
      );
      let profit = totalsellingprice - totalincomingprice - totaldiscount;
      let profituzs =
        totalsellingpriceuzs - totalincomingpriceuzs - totaldiscountuzs;

      return {
        createdAt: sale.createdAt,
        client: sale.client && sale.client,
        id: sale.id,
        totalincomingprice,
        totalincomingpriceuzs,
        totalsellingprice,
        totalsellingpriceuzs,
        totaldiscount,
        totaldiscountuzs,
        profit,
        profituzs,
      };
    });

    const count = profitData.length;
    profitData = profitData.slice(currentPage * countPage, countPage);

    res.status(201).json({ data: profitData, count });
  } catch (error) {
    res.status(400).json({ error: 'Serverda xatolik yuz berdi...' });
  }
};

module.exports.getPayment = async (req, res) => {
  try {
    const { market, currentPage, countPage, startDate, endDate } = req.body;

    const marke = await Market.findById(market);
    if (!marke) {
      return res
        .status(401)
        .json({ message: `Diqqat! Do'kon haqida malumotlar topilmadi!` });
    }

    const saleconnector = await SaleConnector.find({
      market,
      createdAt: {
        $gte: startDate,
        $lte: endDate,
      },
    })
      .select('-isArchive -user -updatedAt -__v -packman')
      .populate(
        'payments',
        'cash cashuzs card carduzs transfer transferuzs payment paymentuzs totalprice totalpriceuzs'
      )
      .populate('client', 'name')
      .populate('products', 'totalprice totalpriceuzs pieces price');

    const payments = saleconnector.map((sale) => {
      const count = (arr, el) => arr.reduce((prev, item) => prev + item[el], 0);
      let cash = count(sale.payments, 'cash');
      let cashuzs = count(sale.payments, 'cashuzs');
      let card = count(sale.payments, 'card');
      let carduzs = count(sale.payments, 'carduzs');
      let transfer = count(sale.payments, 'transfer');
      let transferuzs = count(sale.payments, 'transferuzs');
      let totalprice = count(sale.products, 'totalprice');
      let totalpriceuzs = count(sale.products, 'totalpriceuzs');

      return {
        id: sale.id,
        createdAt: sale.createdAt,
        client: sale.client && sale.client,
        cash,
        cashuzs,
        card,
        carduzs,
        transfer,
        transferuzs,
        totalprice,
        totalpriceuzs,
      };
    });

    const count = payments.length;

    let paymentsreport = payments.slice(currentPage * countPage, countPage);

    res.status(201).json({ data: paymentsreport, count });
  } catch (error) {
    res.status(400).json({ error: 'Serverda xatolik yuz berdi...' });
  }
};

module.exports.getDebtsReport = async (req, res) => {
  try {
    const { market, currentPage, countPage, startDate, endDate } = req.body;

    const marke = await Market.findById(market);
    if (!marke) {
      return res
        .status(400)
        .json({ message: `Diqqat! Do'kon haqida malumotlar topilmadi!` });
    }

    const saleconnector = await SaleConnector.find({
      market,
      createdAt: {
        $gte: startDate,
        $lte: endDate,
      },
    })
      .select('-isArchive -user -updatedAt -__v -packman')
      .populate(
        'payments',
        'cash cashuzs card carduzs transfer transferuzs payment paymentuzs totalprice totalpriceuzs'
      )
      .populate('client', 'name')
      .populate('products', 'totalprice totalpriceuzs pieces price')
      .populate('discounts', 'discount discountuzs');

    const debtsreport = saleconnector
      .map((sale) => {
        const count = (arr, el) =>
          arr.reduce((prev, item) => prev + item[el], 0);
        let totalprice = count(sale.products, 'totalprice');
        let totalpriceuzs = count(sale.products, 'totalpriceuzs');
        let payment = count(sale.payments, 'payment');
        let paymentuzs = count(sale.payments, 'paymentuzs');
        let discount = count(sale.discounts, 'discount');
        let discountuzs = count(sale.discounts, 'discountuzs');

        return {
          createdAt: sale.createdAt,
          id: sale.id,
          client: sale.client && sale.client,
          debt: Math.round((totalprice - payment - discount) * 1000) / 1000,
          debtuzs:
            Math.round((totalpriceuzs - paymentuzs - discountuzs) * 1000) /
            1000,
        };
      })
      .filter(({ debt }) => debt > 0);

    let count = debtsreport.length;

    let reportdebts = debtsreport.slice(currentPage * countPage, countPage);

    res.status(201).json({ data: reportdebts, count });
  } catch (error) {
    res.status(400).json({ error: 'Serverda xatolik yuz berdi...' });
  }
};

module.exports.getDiscountsReport = async (req, res) => {
  try {
    const { market, currentPage, countPage, startDate, endDate } = req.body;

    const marke = await Market.findById(market);
    if (!marke) {
      return res
        .status(400)
        .json({ message: `Diqqat! Do'kon haqida malumotlar topilmadi!` });
    }

    const saleconnector = await SaleConnector.find({
      market,
      createdAt: {
        $gte: startDate,
        $lte: endDate,
      },
    })
      .select('-isArchive -user -updatedAt -__v -packman')
      .populate('client', 'name')
      .populate('products', 'totalprice totalpriceuzs pieces price')
      .populate('discounts', 'discount discountuzs');

    const discountsreport = saleconnector
      .map((sale) => {
        const count = (arr, el) =>
          arr.reduce((prev, item) => prev + item[el], 0);
        let totalprice = count(sale.products, 'totalprice');
        let totalpriceuzs = count(sale.products, 'totalpriceuzs');
        let discount = count(sale.discounts, 'discount');
        let discountuzs = count(sale.discounts, 'discountuzs');

        return {
          createdAt: sale.createdAt,
          id: sale.id,
          client: sale.client && sale.client,
          totalprice,
          totalpriceuzs,
          discount,
          discountuzs,
        };
      })
      .filter(({ discount }) => discount > 0);

    const count = discountsreport.length;

    const reportdiscount = discountsreport.slice(
      currentPage * countPage,
      countPage
    );

    res.status(200).json({ data: reportdiscount, count });
  } catch (error) {
    res.status(400).json({ error: 'Serverda xatolik yuz berdi...' });
  }
};
