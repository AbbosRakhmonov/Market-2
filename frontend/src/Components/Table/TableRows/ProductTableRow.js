import React from 'react';

export const ProductTableRow = ({ currentPage, countPage, data }) => {
  return (
    <>
      {data.map((product, index) => {
        return (
          <tr key={index} className='tr '>
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
            <td className='td border-r-0 text-center'>
              <button className=''>Edit</button>
              <button className=''>Delete</button>
            </td>
          </tr>
        );
      })}
    </>
  );
};
