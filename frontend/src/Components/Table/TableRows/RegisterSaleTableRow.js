import React from 'react';
import TableBtn from '../../Buttons/TableBtn';
import TableInput from '../../Inputs/TableInput';

export const RegisterSaleTableRow = ({
  data,
  currentPage,
  countPage,
  Delete,
  changeHandler,
  currency,
}) => {
  return (
    <>
      {data.map((product, index) => (
        <tr className='tr'>
          <td className='text-left td'>
            {currentPage * countPage + 1 + index}
          </td>
          <td className='text-right td'>{product.code}</td>
          <td className='text-left td'>{product.name}</td>
          <td className='text-right td'>
            <TableInput
              value={product.total}
              onChange={(e) => changeHandler(e, 'total')}
              type={'number'}
            />
          </td>
          <td className='text-right td'>
            <TableInput
              value={product.sellingprice}
              onChange={(e) => changeHandler(e, 'price')}
              type={'number'}
            />
          </td>
          <td className='text-right td'>
            {product.totalprice} {currency}
          </td>
          <td className='td border-r-0'>
            <div className='flex items-center justify-center'>
              <TableBtn
                type={'delete'}
                bgcolor={'bg-error-500'}
                onClick={() => Delete(product)}
              />
            </div>
          </td>
        </tr>
      ))}
    </>
  );
};
