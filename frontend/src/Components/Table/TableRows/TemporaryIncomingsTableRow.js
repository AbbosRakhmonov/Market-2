import React from 'react';
import { uniqueId } from 'lodash';
import TableBtn from '../../Buttons/TableBtn';

export const TemporaryIncomingsTableRow = ({
  data,
  currentPage,
  countPage,
  Print,
  Edit,
  Delete,
}) => {
  return (
    <>
      {data.map((temporary, index) => (
        <tr className='tr' key={uniqueId('temporary')}>
          <td className='td'>{currentPage * countPage + 1 + index}</td>
          <td className='td text-left'>
            {temporary.temporaryincoming.supplier.name}
          </td>
          <td className='td text-right'>
            {temporary.temporaryincoming.incomings.reduce((prev, product) => {
              return prev + product.pieces;
            }, 0)}
          </td>
          <td className='td text-right'>
            {temporary.temporaryincoming.incomings.reduce((prev, product) => {
              return prev + product.totalprice;
            }, 0)}
          </td>
          <td className='td text-right'>
            {temporary.createdAt.toLocaleDateString()}
          </td>
          <td className='td text-right'>
            {temporary.createdAt.toLocaleTimeString()}
          </td>
          <td className='td py-[6px] border-r-0'>
            <div className='flex items-center justify-center gap-[0.625rem]'>
              <TableBtn
                type={'print'}
                bgcolor={'bg-primary-800'}
                onClick={() => Print(temporary)}
              />
              <TableBtn
                type={'edit'}
                bgcolor={'bg-warning-500'}
                onClick={() => Edit(temporary)}
              />
              <TableBtn
                type={'delete'}
                bgcolor={'bg-error-500'}
                onClick={() => Delete(temporary)}
              />
            </div>
          </td>
        </tr>
      ))}
    </>
  );
};
