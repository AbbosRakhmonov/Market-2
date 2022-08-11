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
    const { market, currentPage, countPage, startDate, endDate, search } =
      req.body;

    const id = new RegExp('.*' + search ? search.id : '' + '.*', 'i');
    const client = new RegExp('.*' + search ? search.client : '' + '.*', 'i');

    const marke = await Market.findById(market);
    if (!marke) {
      return res
        .status(401)
        .json({ message: `Diqqat! Do'kon haqida malumotlar topilmadi!` });
    }

    const saleconnector = await DailySaleConnector.find({
      market,
      createdAt: {
        $gte: startDate,
        $lte: endDate,
      },
    })
      .select('-isArchive -user -updatedAt -__v -packman')
      .populate({
        path: 'saleconnector',
        select: 'id',
        match: { id: id },
      })
      .populate(
        'payment',
        'cash cashuzs card carduzs transfer transferuzs payment paymentuzs totalprice totalpriceuzs'
      )
      .populate({
        path: 'client',
        select: 'name',
        match: { name: client },
      })
      .populate('products', 'totalprice totalpriceuzs pieces price');

    let filter = saleconnector.filter((sale) => {
      return sale.saleconnector !== null && sale.client !== null;
    });
    const count = filter.length;
    const data = filter.slice(currentPage * countPage, countPage);

    res.status(200).json({ data, count });
  } catch (error) {
    res.status(400).json({ error: 'Serverda xatolik yuz berdi...' });
  }
};

module.exports.getProfitData = async (req, res) => {
  try {
    const { market, currentPage, countPage, startDate, endDate, search } =
      req.body;

    const id = new RegExp('.*' + search ? search.id : '' + '.*', 'i');
    const client = new RegExp('.*' + search ? search.client : '' + '.*', 'i');

    const marke = await Market.findById(market);
    if (!marke) {
      return res
        .status(401)
        .json({ message: `Diqqat! Do'kon haqida malumotlar topilmadi!` });
    }

    const saleconnector = await DailySaleConnector.find({
      market,
      createdAt: {
        $gte: startDate,
        $lte: endDate,
      },
    })
      .select('-isArchive -updatedAt -user -market -__v')
      .populate(
        'payment',
        'cash cashuzs card carduzs transfer transferuzs payment paymentuzs totalprice totalpriceuzs'
      )
      .populate({
        path: 'saleconnector',
        select: 'id',
        match: { id: id },
      })
      .populate({
        path: 'client',
        select: 'name',
        match: { name: client },
      })
      .populate({
        path: 'products',
        select: 'totalprice totalpriceuzs pieces price',
        populate: {
          path: 'price',
          select: 'incomingprice incomingpriceuzs sellingprice sellingpriceuzs',
        },
      })
      .populate(
        'discount',
        'discount discountuzs totalprice totalpriceuzs procient'
      );

    const profitData = saleconnector
      .map((sale) => {
        const totalincomingprice = sale.products.reduce(
          (prev, item) => prev + item.pieces * item.price.incomingprice,
          0
        );
        const totalincomingpriceuzs = sale.products.reduce(
          (prev, item) => prev + item.pieces * item.price.incomingpriceuzs,
          0
        );
        const totalprice = sale.payment.totalprice;
        const totalpriceuzs = sale.payment.totalpriceuzs;
        const discount = (sale.discount && sale.discount.discount) || 0;
        const discountuzs = (sale.discount && sale.discount.discountuzs) || 0;
        const profit = totalprice - totalincomingprice - discount;
        const profituzs = totalpriceuzs - totalincomingpriceuzs - discountuzs;

        return {
          createdAt: sale.createdAt,
          id: sale.id,
          saleconnector: sale.saleconnector,
          client: sale.client && sale.client,
          totalincomingprice,
          totalincomingpriceuzs,
          totalprice,
          totalpriceuzs,
          discount,
          discountuzs,
          profit,
          profituzs,
        };
      })
      .filter((sale) => sale.saleconnector !== null && sale.client !== null);

    const count = profitData.length;
    const profitreport = profitData.slice(currentPage * countPage, countPage);

    res.status(201).json({ data: profitreport, count });
  } catch (error) {
    res.status(400).json({ error: 'Serverda xatolik yuz berdi...' });
  }
};

module.exports.getPayment = async (req, res) => {
  try {
    const { market, currentPage, countPage, startDate, endDate, search } =
      req.body;

    const id = new RegExp('.*' + search ? search.id : '' + '.*', 'i');
    const client = new RegExp('.*' + search ? search.client : '' + '.*', 'i');

    const marke = await Market.findById(market);
    if (!marke) {
      return res
        .status(401)
        .json({ message: `Diqqat! Do'kon haqida malumotlar topilmadi!` });
    }

    const saleconnector = await DailySaleConnector.find({
      market,
      createdAt: {
        $gte: startDate,
        $lte: endDate,
      },
    })
      .select('-isArchive -user -updatedAt -__v -packman')
      .populate(
        'payment',
        'cash cashuzs card carduzs transfer transferuzs payment paymentuzs totalprice totalpriceuzs'
      )
      .populate({
        path: 'client',
        select: 'name',
        match: { name: client },
      })
      .populate({
        path: 'saleconnector',
        select: 'id',
        match: { id: id },
      });

    const payments = saleconnector
      .map((sale) => {
        return {
          id: sale.id,
          saleconnector: sale.saleconnector,
          createdAt: sale.createdAt,
          client: sale.client && sale.client,
          cash: sale.payment.cash,
          cashuzs: sale.payment.cashuzs,
          card: sale.payment.card,
          carduzs: sale.payment.carduzs,
          transfer: sale.payment.transfer,
          transferuzs: sale.payment.transferuzs,
          totalprice: sale.payment.totalprice,
          totalpriceuzs: sale.payment.totalpriceuzs,
        };
      })
      .filter(
        (payment) => payment.saleconnector !== null && payment.client !== null
      );

    const count = payments.length;

    let paymentsreport = payments.slice(currentPage * countPage, countPage);

    res.status(201).json({ data: paymentsreport, count });
  } catch (error) {
    res.status(400).json({ error: 'Serverda xatolik yuz berdi...' });
  }
};

module.exports.getDebtsReport = async (req, res) => {
  try {
    const { market } = req.body;

    const marke = await Market.findById(market);
    if (!marke) {
      return res
        .status(400)
        .json({ message: `Diqqat! Do'kon haqida malumotlar topilmadi!` });
    }

    const saleconnector = await DailySaleConnector.find({
      market,
    })
      .select('-isArchive -user -updatedAt -__v -packman')
      .populate(
        'payment',
        'cash cashuzs card carduzs transfer transferuzs payment paymentuzs totalprice totalpriceuzs'
      )
      .populate('client', 'name')
      .populate('saleconnector', 'id')
      .populate('discount', 'discount discountuzs');

    const debtsreport = saleconnector
      .map((sale) => {
        let discount = (sale.discount && sale.discount.discount) || 0;
        let discountuzs = (sale.discount && sale.discount.discountuzs) || 0;
        const round = (el) => Math.round(el * 1000) / 1000;
        return {
          createdAt: sale.createdAt,
          id: sale.id,
          saleconnector: sale.saleconnector,
          totalprice: sale.payment.totalprice,
          totalpriceuzs: sale.payment.totalpriceuzs,
          client: sale.client && sale.client,
          debt: round(
            sale.payment.totalprice - sale.payment.payment - discount
          ),
          debtuzs: round(
            sale.payment.totalpriceuzs - sale.payment.paymentuzs - discountuzs
          ),
        };
      })
      .filter(
        (sale) =>
          sale.debt > 0 && sale.saleconnector !== null && sale.client !== null
      );

    res.status(201).json({ data: debtsreport });
  } catch (error) {
    res.status(400).json({ error: 'Serverda xatolik yuz berdi...' });
  }
};

module.exports.getDiscountsReport = async (req, res) => {
  try {
    const { market, currentPage, countPage, startDate, endDate, search } =
      req.body;

    const id = new RegExp('.*' + search ? search.id : '' + '.*', 'i');
    const client = new RegExp('.*' + search ? search.client : '' + '.*', 'i');

    const marke = await Market.findById(market);
    if (!marke) {
      return res
        .status(400)
        .json({ message: `Diqqat! Do'kon haqida malumotlar topilmadi!` });
    }

    const saleconnector = await DailySaleConnector.find({
      market,
      createdAt: {
        $gte: startDate,
        $lte: endDate,
      },
    })
      .select('-isArchive -user -updatedAt -__v -packman')
      .populate({
        path: 'client',
        select: 'name',
        match: { name: client },
      })
      .populate({
        path: 'saleconnector',
        select: 'id',
        match: { id: id },
      })
      .populate('payment', 'totalprice totalpriceuzs')
      .populate('discount', 'discount discountuzs');

    const discountsreport = saleconnector
      .map((sale) => {
        return {
          createdAt: sale.createdAt,
          id: sale.id,
          saleconnector: sale.saleconnector,
          client: sale.client && sale.client,
          totalprice: sale.payment.totalprice,
          totalpriceuzs: sale.payment.totalpriceuzs,
          discount: (sale.discount && sale.discount.discount) || 0,
          discountuzs: (sale.discount && sale.discount.discountuzs) || 0,
        };
      })
      .filter(
        (sale) =>
          sale.discount > 0 &&
          sale.saleconnector !== null &&
          sale.client !== null
      );

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
