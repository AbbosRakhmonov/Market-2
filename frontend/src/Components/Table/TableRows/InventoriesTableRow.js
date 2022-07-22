import React from 'react';
import { StatusIcon } from '../TableIcons/StatusIcon';
import TableBtn from '../../Buttons/TableBtn';

export const InventoriesTableRow = ({
  data,
  currentPage,
  countPage,
  Print,
  Excel,
}) => {
  return (
    <>
      {data.map((inventory, index) => (
        <tr key={inventory._id} className='tr'>
          <th className='td text-left'>
            {currentPage * countPage + 1 + index}
          </th>
          <th className='td text-right'>{inventory.createdAt}</th>
          <th className='td text-right'>{inventory.id}</th>
          <th className='td text-left'>{inventory.product.name}</th>
          <th className='py-[0.375rem] td text-center'>
            <div className='flex items justify-center'>
              <StatusIcon status={inventory.status} />
            </div>
          </th>
          <th className='td border-r-0 text-center max-w-[50px]'>
            <div className='flex items-center justify-center gap-[5px]'>
              <TableBtn
                type={'print'}
                bgcolor={'bg-primary-800'}
                onClick={Print}
              />
              <TableBtn
                type={'excel'}
                bgcolor={'bg-success-500'}
                onClick={Excel}
              />
            </div>
          </th>
        </tr>
      ))}
    </>
  );
};
