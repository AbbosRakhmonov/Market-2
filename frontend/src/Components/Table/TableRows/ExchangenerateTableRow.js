import React from 'react';
import TableBtn from '../../Buttons/TableBtn';

export const ExchangenerateTableRow = ({
  data,
  currentPage,
  countPage,
  Edit,
  Delete,
}) => {
  return (
    <>
      {data.map((exchange, index) => (
        <tr className='tr'>
          <td className='text-left td'>
            {currentPage * countPage + 1 + index}
          </td>
          <td className='text-left td'>
            {exchange.createdAt.toLocaleDateString()}
          </td>
          <td className='text-left td'>
            1 USD - {exchange.exchangenerate} UZS
          </td>
          <td className='border-r-0 td py-[0.375rem]'>
            <div className='flex items-center justify-center gap-[0.625rem]'>
              <TableBtn
                type={'edit'}
                bgcolor={'bg-warning-500'}
                onClick={() => Edit(exchange)}
              />
              <TableBtn
                type={'delete'}
                bgcolor={'bg-error-500'}
                onClick={() => Delete(exchange)}
              />
            </div>
          </td>
        </tr>
      ))}
    </>
  );
};
