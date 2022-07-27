import React from 'react';
import TableBtn from '../../Buttons/TableBtn';

export const SalesListTableRow = ({
  data,
  currentPage,
  countPage,
  currency,
  Print,
  AddPayment,
  ReturnPayment,
}) => {
  const result = (prev, usd, uzs) => {
    return currency === 'USD' ? prev + usd : prev + uzs;
  };

  return (
    <>
      {data.map((saleconnector, index) => (
        <tr className='tr'>
          <td className='text-left td'>
            {currentPage * countPage + 1 + index}
          </td>
          <td className='text-left td'>{saleconnector.id}</td>
          <td className='text-left td'>
            {saleconnector.client && saleconnector.client.name}
          </td>
          <td className='text-success-500 text-right td'>
            {saleconnector.products.reduce(
              (prev, product) =>
                result(prev, product.totalprice, product.totalpriceuzs),
              0
            )}{' '}
            {currency}
          </td>
          <td className='text-warning-500 text-right td'>
            {saleconnector.discounts.reduce(
              (prev, discount) =>
                result(prev, discount.discount, discount.discountuzs),
              0
            )}{' '}
            {currency}
          </td>
          <td className='text-error-500 text-right td'>
            {saleconnector.products.reduce(
              (prev, product) =>
                result(prev, product.totalprice, product.totalpriceuzs),
              0
            ) -
              saleconnector.payments.reduce(
                (prev, payment) =>
                  result(prev, payment.payment, payment.paymentuzs),
                0
              ) -
              saleconnector.discounts.reduce(
                (prev, discount) =>
                  result(prev, discount.discount, discount.discountuzs),
                0
              )}{' '}
            {currency}
          </td>
          <td className='text-left td'>
            {saleconnector.payments.map((payment, index) => {
              if (payment.comment) {
                return <p key={index}>{payment.comment}</p>;
              }
              return '';
            })}
          </td>
          <td className='py-[0.375rem] td border-r-0'>
            <div className='flex items-center justify-center gap-[0.625rem]'>
              <TableBtn
                type={'print'}
                bgcolor={'bg-primary-800'}
                onClick={() => Print(saleconnector)}
              />
              <TableBtn
                type={'add'}
                bgcolor={'bg-success-500'}
                onClick={() => AddPayment(saleconnector)}
              />
              <TableBtn
                type={'return'}
                bgcolor={'bg-error-500'}
                onClick={() => ReturnPayment(saleconnector)}
              />
            </div>
          </td>
        </tr>
      ))}
    </>
  );
};
