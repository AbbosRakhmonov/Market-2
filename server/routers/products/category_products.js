const { Router } = require('express');
const router = Router();
const auth = require('../../middleware/auth.middleware');
//========================================================
// CATEGORY
// CRUD
router.post('/category/register', auth, (req, res) => {
  require('./category').register(req, res);
});

router.post('/category/getall', auth, (req, res) => {
  require('./category').getAll(req, res);
});

router.post('/category/getcategories', auth, (req, res) => {
  require('./category').getCategories(req, res);
});

router.post('/category/getcategoriesexcel', auth, (req, res) => {
  require('./category').getCategoriesExcel(req, res);
});

router.put('/category/update', auth, (req, res) => {
  require('./category').update(req, res);
});

router.delete('/category/delete', auth, (req, res) => {
  require('./category').delete(req, res);
});

//========================================================
// PRODUCT
router.post('/product/registerall', auth, (req, res) => {
  require('./product').registerAll(req, res);
});

router.post('/product/register', auth, (req, res) => {
  require('./product').register(req, res);
});

router.put('/product/update', auth, (req, res) => {
  require('./product').update(req, res);
});

router.delete('/product/delete', auth, (req, res) => {
  require('./product').delete(req, res);
});

router.post('/product/getproductsale', auth, (req, res) => {
  require('./product').getproductsale(req, res);
});

router.post('/product/getall', auth, (req, res) => {
  require('./product').getAll(req, res);
});

router.post('/product/getproducts', auth, (req, res) => {
  require('./product').getProducts(req, res);
});

router.post('/product/getexceldata', auth, (req, res) => {
  require('./product').getProductExcel(req, res);
});

router.delete('/product/deleteall', auth, (req, res) => {
  require('./product').deleteAll(req, res);
});

router.post('/product/getallincoming', auth, (req, res) => {
  require('./product').getAllIncoming(req, res);
});

//========================================================
// UNIT
// CRUD
router.post('/unit/register', auth, (req, res) => {
  require('./unit').register(req, res);
});

router.post('/unit/getall', auth, (req, res) => {
  require('./unit').getAll(req, res);
});

router.put('/unit/update', auth, (req, res) => {
  require('./unit').update(req, res);
});

router.delete('/unit/delete', auth, (req, res) => {
  require('./unit').delete(req, res);
});

//========================================================
// INCOMING
// CRUD
router.post('/incoming/registerall', auth, (req, res) => {
  require('./incoming').registerAll(req, res);
});

router.post('/incoming/register', auth, (req, res) => {
  require('./incoming').register(req, res);
});

router.post('/incoming/get', auth, (req, res) => {
  require('./incoming').get(req, res);
});

router.post('/incoming/getexcel', auth, (req, res) => {
  require('./incoming').getexcel(req, res);
});

router.put('/incoming/update', auth, (req, res) => {
  require('./incoming').update(req, res);
});

router.delete('/incoming/delete', auth, (req, res) => {
  require('./incoming').delete(req, res);
});

router.post('/incoming/getconnectors', auth, (req, res) => {
  require('./incoming').getConnectors(req, res);
});

router.post('/incoming/getcount', auth, (req, res) => {
  require('./incoming').getCount(req, res);
});

// TEMPORARY
router.post('/temporary/register', (req, res) => {
  require('./temporaryincoming').register(req, res);
});

router.post('/temporary/get', (req, res) => {
  require('./temporaryincoming').getAll(req, res);
});

router.post('/temporary/delete', (req, res) => {
  require('./temporaryincoming').deleteTemporaryIncoming(req, res);
});

module.exports = router;