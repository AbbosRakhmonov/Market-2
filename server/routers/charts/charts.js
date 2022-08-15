const {Market} = require('../../models/MarketAndBranch/Market')
const {Incoming} = require('../../models/Products/Incoming')
const {SaleProduct} = require('../../models/Sales/SaleProduct')
const {SaleConnector} = require('../../models/Sales/SaleConnector')
const {Expense} = require('../../models/Expense/Expense')
require('../../models/Sales/Payment')
require('../../models/Sales/Discount')
require('../../models/Products/ProductPrice')

module.exports.getIncomingData = async (req, res) => {
    try {
        const {market} = req.body

        const marke = await Market.findById(market)

        if (!marke) {
            return res
                .status(401)
                .json({message: 'Diqqat! Do\'kon ma\'lumotlari topilmadi.'})
        }

        const startDate = new Date(
            new Date(new Date(new Date().setMonth(0)).setDate(1)).setHours(3, 0, 0, 0)
        )
        const currenDate = new Date()

        const incomings = await Incoming.find({
            market,
            createdAt: {
                $gte: startDate,
                $lte: currenDate
            }
        }).select('totalprice market createdAt')

        res.status(201).json(incomings)
    } catch (error) {
        res.status(501).json({error: 'Serverda xatolik yuz berdi...'})
    }
}

module.exports.getSellingData = async (req, res) => {
    try {
        const {market} = req.body

        const marke = await Market.findById(market)

        if (!marke) {
            return res
                .status(401)
                .json({message: 'Diqqat! Do\'kon ma\'lumotlari topilmadi.'})
        }

        const startDate = new Date(
            new Date(new Date(new Date().setMonth(0)).setDate(1)).setHours(3, 0, 0, 0)
        )
        const currenDate = new Date()

        const selling = await SaleProduct.find({
            market,
            createdAt: {
                $gte: startDate,
                $lte: currenDate
            }
        }).select('totalprice market createdAt')

        res.status(201).json(selling)
    } catch (error) {
        res.status(501).json({error: 'Serverda xatolik yuz berdi...'})
    }
}

module.exports.getSalesDataByMonth = async (req, res) => {
    try {
        const {market} = req.body

        const sales = []
        const salesSum = []

        let count = 0
        const currentMonth = new Date().getMonth()

        while (count <= currentMonth) {
            const saleconnectors = await SaleConnector.find({
                market,
                createdAt: {
                    $gte: new Date(
                        new Date(new Date().setMonth(count, 1)).setHours(3, 0, 0, 0)
                    ).toISOString(),
                    $lte: new Date(
                        new Date(new Date().setMonth(count + 1, 0)).setHours(26, 59, 59, 59)
                    ).toISOString()
                }
            })
                .select('payments dailyconnectors')
                .populate('payments', 'totalprice totalpriceuzs')

            const reducer = (arr, el) =>
                arr.reduce((prev, item) => prev + (item[el] || 0), 0)

            const usd = saleconnectors.reduce((sum, {payments}) => {
                return sum + reducer(payments, 'totalprice')
            }, 0)
            const uzs = saleconnectors.reduce((sum, {payments}) => {
                return sum + reducer(payments, 'totalpriceuzs')
            }, 0)

            const salespieces = saleconnectors.reduce((prev, sale) => {
                return prev + sale.dailyconnectors.length
            }, 0)

            sales.push(salespieces)
            salesSum.push({
                usd: Math.round(usd * 1000) / 1000,
                uzs: Math.round(uzs * 1) / 1
            })
            count += 1
        }

        // Oylik soffoyda chiqarish
        const monthProfit = {
            usd: 0,
            uzs: 0
        }

        const saleconnectors = await SaleConnector.find({
            market,
            createdAt: {
                $gte: new Date(new Date().setDate(1)).toISOString(),
                $lte: new Date().toISOString()
            }
        })
            .select('payments discounts products')
            .populate('payments', 'totalprice totalpriceuzs')
            .populate({
                path: 'products',
                select: 'pieces price',
                populate: {
                    path: 'price',
                    select: 'incomingprice incomingpriceuzs'
                }
            })
            .populate('discounts', 'discount discountuzs')

        saleconnectors.map((sale) => {
            const totalprice = sale.payments.reduce((prev, payment) => {
                return prev + (payment.totalprice || 0)
            }, 0)
            const totalpriceuzs = sale.payments.reduce((prev, payment) => {
                return prev + (payment.totalpriceuzs || 0)
            }, 0)
            const incomingtotal = sale.products.reduce((prev, product) => {
                return prev + (product.price?.incomingprice || 0) * product.pieces
            }, 0)
            const incomingtotaluzs = sale.products.reduce((prev, product) => {
                return prev + (product.price?.incomingpriceuzs || 0) * product.pieces
            }, 0)
            const discount = sale.discounts.reduce((prev, discount) => {
                return prev + (discount.discount || 0)
            }, 0)
            const discountuzs = sale.discounts.reduce((prev, discount) => {
                return prev + (discount.discountuzs || 0)
            }, 0)
            monthProfit.usd += totalprice - incomingtotal - (discount || 0)
            monthProfit.uzs += totalpriceuzs - incomingtotaluzs - (discountuzs || 0)
        })

        // Xarajat chiqarish bir oylik
        const monthExpense = {
            usd: 0,
            uzs: 0
        }

        const expenses = await Expense.find({
            market,
            createdAt: {
                $gte: new Date(new Date().setDate(1)).toISOString(),
                $lte: new Date().toISOString()
            }
        }).select('sum sumuzs')

        expenses.map((expense) => {
            monthExpense.usd += expense.sum
            monthExpense.uzs += expense.sumuzs
        })

        monthProfit.usd = Math.round(monthProfit.usd * 1000) / 1000
        monthProfit.uzs = Math.round(monthProfit.uzs * 1) / 1

        monthExpense.usd = Math.round(monthExpense.usd * 1000) / 1000
        monthExpense.uzs = Math.round(monthExpense.uzs * 1) / 1

        res.status(200).json({
            sales,
            salesSum,
            monthProfit,
            monthExpense
        })
    } catch (error) {
        res.status(501).json({error: 'Serverda xatolik yuz berdi...'})
    }
}
