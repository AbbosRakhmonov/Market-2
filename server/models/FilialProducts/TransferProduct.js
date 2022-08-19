const { Schema, model } = require('mongoose');

const transferproducts = new Schema(
  {
    product: { type: Schema.Types.ObjectId, ref: 'Product' },
    productdata: { type: Schema.Types.ObjectId, ref: 'ProductData' },
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    pieces: { type: Number },
    price: { type: Schema.Types.ObjectId, ref: 'Price' },
    transfer: { type: Schema.Types.ObjectId, ref: 'Transfer' },
    isArchive: { type: Boolean, default: false },
    market: { type: Schema.Types.ObjectId, ref: 'Market' },
    filial: { type: Schema.Types.ObjectId, ref: 'Market' },
  },
  {
    timestamps: true,
  }
);

module.exports.TransferProduct = model('TransferProduct', transferproducts);
