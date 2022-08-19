const { Transfer } = require('../../models/FilialProducts/Transfer');
const {
  TransferProduct,
} = require('../../models/FilialProducts/TransferProduct');
const { Market } = require('../../models/MarketAndBranch/Market');
const { Category } = require('../../models/Products/Category');
const { Product } = require('../../models/Products/Product');
const { ProductData } = require('../../models/Products/Productdata');
const { ProductPrice } = require('../../models/Products/ProductPrice');
const { Unit } = require('../../models/Products/Unit');

module.exports.registerProducts = async (req, res) => {
  try {
    const { market, filial, products } = req.body;

    const marke = await Market.findById(market);
    if (!marke) {
      return res.status(400).json({
        message:
          "Diqqat! Foydalanuvchi ro'yxatga olinayotgan do'kon dasturda ro'yxatga olinmagan.",
      });
    }

    if (!marke.filials.includes(filial)) {
      return res.status(400).json({
        message: "Diqqat! Bosh do'konda bunaqa filial mavjud emas.",
      });
    }

    const newTransfer = new Transfer({
      market,
      filial,
    });
    await newTransfer.save();

    for (const product of products) {
      // O'tkazma mahsulotlar datasi
      const { incomingprice, incomingpriceuzs, sellingprice, sellingpriceuzs } =
        product.price;

      const transferPrice = new ProductPrice({
        incomingprice,
        incomingpriceuzs,
        sellingprice,
        sellingpriceuzs,
        market,
      });
      await transferPrice.save();

      const newTransferProduct = new TransferProduct({
        product: product._id,
        productdata: product.productdata._id,
        category: product.category._id,
        unit: product.unit._id,
        pieces: product.total,
        transfer: newTransfer._id,
        price: transferPrice._id,
        market,
        filial,
      });
      await newTransferProduct.save();

      transferPrice.product = newTransferProduct._id;
      await transferPrice.save();

      newTransfer.products.push(newTransferProduct._id);
      await newTransfer.save();

      // Bosh do'kondan mahsulotlar sonini ayirish
      const sellerProduct = await Product.findOne({ _id: product._id, market });
      sellerProduct.total = sellerProduct.total - product.total;
      await sellerProduct.save();

      // Filialda mahsulot borligini tekshirish va qo'shish
      const filialProductData = await ProductData.findOne({
        code: product.productdata.code,
        market: filial,
      });

      if (filialProductData) {
        // filialda mahsulot bor bulsa
        const filialProduct = await Product.findOne({
          productdata: filialProductData._id,
          market: filial,
        });
        filialProduct.total = filialProduct.total + product.total;
        await filialProduct.save();
      } else {
        // filialda mahsulot yuq bulsa

        // kategoriya bulsa || bulmasa
        const filialCategory = await createFilialCategory(filial, product);

        // O'lchov birligi bulsa bulmasa
        const filialUnit = await createFilialUnit(filial, product);

        // Filialga yangi mahsulot yaratish
        const filialNewProductData = new ProductData({
          name: product.productdata.name,
          code: product.productdata.code,
          category: filialCategory._id,
          unit: filialUnit._id,
          market: filial,
        });
        await filialNewProductData.save();

        const filialNewProduct = new Product({
          productdata: filialNewProductData._id,
          unit: filialUnit._id,
          category: filialCategory._id,
          market: filial,
          total: product.total,
        });
        await filialNewProduct.save();

        // Mahsulotga yangi narx yaratish
        const filialPrice = new ProductPrice({
          incomingprice,
          incomingpriceuzs,
          sellingprice,
          sellingpriceuzs,
          market: filial,
          product: filialNewProduct._id,
        });
        await filialPrice.save();

        filialNewProductData.products.push(filialNewProduct._id);
        await filialNewProductData.save();

        filialNewProduct.price = filialPrice._id;
        await filialNewProduct.save();
      }
    }

    newTransfer.pieces = products.reduce(
      (summ, product) => summ + product.total,
      0
    );
    newTransfer.totalprice = products.reduce(
      (summ, product) => summ + product.price.incomingprice,
      0
    );
    newTransfer.totalpriceuzs = products.reduce(
      (summ, product) => summ + product.price.incomingpriceuzs,
      0
    );
    await newTransfer.save();

    const responseTransfer = await Transfer.find({
      market,
    })
      .sort({ createdAt: -1 })
      .select(
        'market filial totalprice totalpriceuzs pieces createdAt products'
      );

    res.status(200).json(responseTransfer);
  } catch (error) {
    res.status(501).json({ error: 'Serverda xatolik yuz berdi...' });
  }
};

const createFilialCategory = async (filial, product) => {
  const filialCategory = await Category.findOne({
    market: filial,
    code: product.category.code,
  });
  if (filialCategory) {
    return filialCategory;
  } else {
    const newFilialCategory = new Category({
      code: product.category.code,
      market: filial,
    });
    if (product.category.name) {
      newFilialCategory.name = product.category.name;
    }
    await newFilialCategory.save();
    return newFilialCategory;
  }
};

const createFilialUnit = async (filial, product) => {
  const filialUnit = await Unit.findOne({
    market: filial,
    name: product.unit.name,
  });
  if (filialUnit) {
    return filialUnit;
  } else {
    const newFilialUnit = new Unit({
      name: product.unit.name,
      market: filial,
    });
    await newFilialUnit.save();
    return newFilialUnit;
  }
};
