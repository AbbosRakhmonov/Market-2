module.exports.checkPayments = (totalprice, payment, discount, debt) => {
  let prices =
    debt.debt +
    discount.discount +
    payment.cash +
    payment.card +
    payment.transfer;
  if (
    Math.round(totalprice * 1000) / 1000 !==
    Math.round(prices * 1000) / 1000
  ) {
    return true;
  }
  return false;
};
