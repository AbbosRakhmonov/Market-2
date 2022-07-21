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
          <th className='td text-left'>
            {currentPage * countPage + 1 + index}
          </th>
          <th className='td'>{incoming.product.code}</th>
          <th className='td text-left'>{incoming.product.name}</th>
          <th className='td'>
            <TableInput
              onChange={(e) => changeHandler(e, 'count', incoming.product._id)}
              type={'number'}
            />
          </th>
          <th className='td'>
            <TableInput
              onChange={(e) => changeHandler(e, 'price', incoming.product._id)}
              type={'number'}
            />
          </th>
          <th className='td text-error-500'>
            {incoming.previousprice} {currency}
          </th>
          <th className='td'>
            {incoming.total} {currency}
          </th>
          <th className='td'>
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
