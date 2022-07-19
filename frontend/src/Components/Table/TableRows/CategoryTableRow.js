import React from 'react';
import TableBtn from '../../Buttons/TableBtn';

export const CategoryTableRow = ({
  data,
  currentPage,
  countPage,
  Edit,
  Delete,
}) => {
  return (
    <>
      {data.map((category, index) => (
        <tr key={index} className='tr'>
          <td className='td'>{currentPage * countPage + 1 + index}</td>
          <td className='td'>{category.code}</td>
          <td className='td'>{category.name}</td>
          <td className='td border-r-0 text-center max-w-[50px]'>
            <div className='flex items-center justify-center'>
              <TableBtn
                type={'edit'}
                bgcolor='bg-warning-500'
                onClick={() => Edit(category)}
              />
              <TableBtn
                type={'delete'}
                bgcolor='bg-error-500 ml-2.5'
                onClick={() => Delete(category)}
              />
            </div>
          </td>
        </tr>
      ))}
    </>
  );
};
