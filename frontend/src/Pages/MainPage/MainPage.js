import React, { useState } from 'react';
import { Pagination } from '../../Components/Pagination/Pagination';

export const MainPage = () => {
  const [currentPage, setCurrentPage] = useState(0);
  return (
    <>
      <div className='m-3 flex justify-center'>
        <Pagination
          countPage={10}
          totalDatas={2300}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </>
  );
};
