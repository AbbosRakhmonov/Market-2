import React from 'react';
import TableBtn from '../../Buttons/TableBtn';
import TableInput from '../../Inputs/TableInput';

export const IncomingTableRow = ({
  changeHandler,
  data,
  currentPage,
  countPage,
  Delete,
  currency,
}) => {
  return (
    <>
      {data.map((incoming, index) => (
        <tr key={incoming.product._id} className='tr'>
          <th className='py-0 td text-left'>
            {currentPage * countPage + 1 + index}
          </th>
          <th className='py-0 td text-left'>{incoming.product.code}</th>
          <th className='py-0 td text-left'>{incoming.product.name}</th>
          <th className='py-1 td'>
            <TableInput
              onChange={(e) => changeHandler(e, 'count', incoming.product._id)}
              type={'number'}
            />
          </th>
          <th className='py-1 td'>
            <TableInput
              onChange={(e) => changeHandler(e, 'price', incoming.product._id)}
              type={'number'}
            />
          </th>
          <th className='py-0 td text-error-500 text-right'>
            {incoming.previousprice} {currency}
          </th>
          <th className='py-0 td text-right'>
            {incoming.total} {currency}
          </th>
          <th className='py-0 td'>
            <div className='flex justify-center items-center'>
              <TableBtn
                type={'delete'}
                bgcolor={'bg-error-500'}
                onClick={() => Delete(incoming)}
              />
            </div>
          </th>
        </tr>
      ))}
    </>
  );
};
