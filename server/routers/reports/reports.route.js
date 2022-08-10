const { Router } = require('express');
const router = Router();
const auth = require('../../middleware/auth.middleware');

router.post('/getreports', auth, (req, res) => {
  require('./reports').getReport(req, res);
});

router.post('/getsalesreport', auth, (req, res) => {
  require('./reports').getSales(req, res);
});

router.post('/profitreport', auth, (req, res) => {
  require('./reports').getProfitData(req, res);
});

router.post('/paymentsreport', auth, (req, res) => {
  require('./reports').getPayment(req, res);
});

router.post('/getdebtsreport', auth, (req, res) => {
  require('./reports').getDebtsReport(req, res);
});

router.post('/getdiscountsreport', auth, (req, res) => {
  require('./reports').getDiscountsReport(req, res);
});

module.exports = router;
