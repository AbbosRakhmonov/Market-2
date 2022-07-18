import React from 'react';

export const ProductTableRow = ({ currentPage, countPage, data }) => {
  return (
    <>
      {data.map((product, index) => {
        return (
          <tr
            key={index}
            className='grid grid-cols-12 border-b-2 border-primary-700 hover:bg-black-300'
          >
            <td className='col-span-1 text-center px-4 py-2.5 border-r-2 border-primary-700'>
              {currentPage * countPage + 1 + index}
            </td>
            <td className='col-span-1 px-2 py-2.5 text-center border-r-2 border-primary-700'>
              {product.productdata.code}
            </td>
            <td className='col-span-4 px-2 py-2.5 border-r-2 border-primary-700 text-left'>
              {product.productdata.name}
            </td>
            <td className='col-span-1 px-2 py-2.5 border-r-2 border-primary-700 text-right'>
              {product.total} {product.unit && product.unit.name}
            </td>
            <td className='col-span-2 px-2 py-2.5 border-r-2 border-primary-700 text-right'>
              {product.price &&
                product.price.incomingprice.toLocaleString('ru-RU')}{' '}
              USD
            </td>
            <td className='col-span-2 px-2 py-2.5 border-r-2 border-primary-700 text-right'>
              {product.price &&
                product.price.sellingprice.toLocaleString('ru-RU')}{' '}
              USD
            </td>
            <td className='col-span-1 px-2 py-2.5 text-center'>
              <button className=''>Edit</button>
              <button className=''>Delete</button>
            </td>
          </tr>
        );
      })}
    </>
  );
};
