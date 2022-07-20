import React from 'react';
import { Pagination } from '../../Components/Pagination/Pagination';

function MainPage(props) {
  return (
    <div>
      <Pagination
        countPage={10}
        totalDatas={1000}
        setCurrentPage={() => {}}
        currentPage={0}
      />
    </div>
  );
}

export default MainPage;
