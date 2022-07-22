import React from 'react';
import TableBtn from '../../Buttons/TableBtn';

export const ProductTableRow = ({
  currentPage,
  countPage,
  data,
  Edit,
  Delete,
}) => {
  return (
    <>
      {data.map((product, index) => (
        <tr key={product._id} className='tr'>
          <td className='td text-center '>
            {currentPage * countPage + 1 + index}
          </td>
          <td className='td text-center'>{product.productdata.code}</td>
          <td className='td text-left'>{product.productdata.name}</td>
          <td className='td text-right'>
            {product.total} {product.unit && product.unit.name}
          </td>
          <td className='td text-right'>
            {product.price &&
              product.price.incomingprice.toLocaleString('ru-RU')}{' '}
            USD
          </td>
          <td className='td text-right'>
            {product.price &&
              product.price.sellingprice.toLocaleString('ru-RU')}{' '}
            USD
          </td>
          <td className='td py-[0.375rem] border-r-0 text-center max-w-[50px]'>
            <div className='flex items-center justify-center'>
              <TableBtn
                type={'edit'}
                bgcolor='bg-warning-500'
                onClick={() => Edit(product)}
              />
              <TableBtn
                type={'delete'}
                bgcolor='bg-error-500 ml-2.5'
                onClick={() => Delete(product)}
              />
            </div>
          </td>
        </tr>
      ))}
    </>
  );
};
