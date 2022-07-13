const { Router } = require('express');
const router = Router();
const auth = require('../../middleware/auth.middleware');

//========================================================
// Market
router.post('/market/register', (req, res) => {
  require('./market.route').register(req, res);
});

router.put('/market/edit', (req, res) => {
  require('./market.route').edit(req, res);
});

router.post('/market', (req, res) => {
  require('./market.route').getMarket(req, res);
});

//========================================================
//========================================================
//User
router.post('/user/register', auth, (req, res) => {
  require('./user.route').register(req, res);
});

router.post('/director/register', (req, res) => {
  require('./user.route').registerDirector(req, res);
});

router.put('/director/update', (req, res) => {
  require('./user.route').updateDirector(req, res);
});

router.post('/user/login', (req, res) => {
  require('./user.route').login(req, res);
});

router.post('/user/gettype', auth, (req, res) => {
  require('./user.route').getUserType(req, res);
});

router.post('/user/getall', auth, (req, res) => {
  require('./user.route').getUsers(req, res);
});

router.post('/user/remove', auth, (req, res) => {
  require('./user.route').removeUser(req, res);
});

router.post('/user', auth, (req, res) => {
  require('./user.route').getUser(req, res);
});

router.post('/user/createseller', auth, (req, res) => {
  require('./user.route').createseller(req, res);
});

router.post('/user/getsellers', auth, (req, res) => {
  require('./user.route').getsellers(req, res);
});

module.exports = router;
