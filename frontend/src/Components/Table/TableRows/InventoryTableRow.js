import React from 'react';
import TableBtn from '../../Buttons/TableBtn';
import TableInput from '../../Inputs/TableInput';

export const InventoryTableRow = ({
  data,
  currentPage,
  countPage,
  changeHandler,
  inputDisabled,
  Delete,
}) => {
  return (
    <>
      {data.map((product, index) => (
        <tr key={product._id} className='tr'>
          <th className='td text-left'>
            {currentPage * countPage + 1 + index}
          </th>
          <th className='td text-left'>{product.productdata.code}</th>
          <th className='td text-left'>{product.productdata.name}</th>
          <th className='td text-right'>{product.total}</th>
          <th className='py-1 td'>
            <TableInput
              disabled={inputDisabled}
              onChange={(e) => changeHandler(e)}
              type={'number'}
            />
          </th>
          <th className='td text-error-500 text-right'>
            {product.difference}{' '}
            <span className='text-error-500'>{product.unit.name}</span>
          </th>
          <th className='py-1 td'>
            <TableInput
              disabled={inputDisabled}
              onChange={(e) => changeHandler(e)}
              type={'text'}
            />
          </th>
          <th className='py-0 td'>
            <div className='flex justify-center items-center'>
              <TableBtn
                type={'save'}
                bgcolor={'bg-success-500'}
                onClick={() => Delete(product)}
              />
            </div>
          </th>
        </tr>
      ))}
    </>
  );
};
