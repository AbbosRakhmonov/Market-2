import React from 'react';
import TableBtn from '../../Components/Buttons/TableBtn';

export const SellerTableRow = ({
  data,
  currentPage,
  countPage,
  Edit,
  Delete,
}) => {
  return (
    <>
      {data.map((seller, index) => (
        <tr className='tr'>
          <td className='text-left td'>
            {currentPage * countPage + index + 1}
          </td>
          <td className='text-right td'>{seller.firstname}</td>
          <td className='text-left td'>{seller.lastname}</td>
          <td className='text-right td'>{seller.phone}</td>
          <td className='text-right td'>{seller.login}</td>
          <td className='border-r-0 td py-[0.375rem]'>
            <div className='flex items-center justify-center gap-[0.625rem]'>
              <TableBtn
                type={'edit'}
                bgcolor={'bg-warning-500'}
                onClick={() => Edit(seller)}
              />
              <TableBtn
                type={'delete'}
                bgcolor={'bg-error-500'}
                onClick={() => Delete(seller)}
              />
            </div>
          </td>
        </tr>
      ))}
    </>
  );
};
