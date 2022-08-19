const { Router } = require('express');
const router = Router();
const auth = require('../../middleware/auth.middleware');

//========================================================
// Products
router.post('/register', auth, (req, res) => {
  require('./products').registerProducts(req, res);
});

module.exports = router;
