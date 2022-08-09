const auth = require("../../middleware/auth.middleware.js");
const { Router } = require("express");
const router = Router();

router.post("/register", auth, (req, res) => {
  require("./barcode.js").register(req, res);
});

router.post("/registerall", auth, (req, res) => {
  require("./barcode.js").registerAll(req, res);
});

router.post("/getbycode", auth, (req, res) => {
  require("./barcode.js").getbycode(req, res);
});

module.exports = router;
