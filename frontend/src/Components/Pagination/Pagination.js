import React from 'react';
import { IoChevronBack } from 'react-icons/io5';
import { IoChevronForward } from 'react-icons/io5';
import ReactPaginate from 'react-paginate';
import './index.css';

export const Pagination = ({
  countPage,
  totalDatas,
  setCurrentPage,
  currentPage,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalDatas / countPage); i++) {
    pageNumbers.push(i);
  }

  const pageHandle = (data) => {
    setCurrentPage(data.selected);
  };

  return (
    <nav className='float-right'>
      <ReactPaginate
        previousLabel={<IoChevronBack width={'7px'} height={'12px'} />}
        forcePage={currentPage}
        nextLabel={<IoChevronForward width={'7px'} height={'12px'} />}
        breakLabel={'...'}
        pageCount={pageNumbers.length}
        marginPagesDisplayed={1}
        pageRangeDisplayed={3}
        onPageChange={pageHandle}
        containerClassName={'flex justify-between items-center'}
        pageClassName={'page-item'}
        pageLinkClassName={'page-link anim'}
        previousClassName={'page-item'}
        previousLinkClassName={'page-link anim'}
        nextClassName={'page-item'}
        nextLinkClassName={'page-link anim'}
        breakClassName={'page-item'}
        breakLinkClassName={'page-link anim'}
        activeClassName={'mr-[15px]'}
        activeLinkClassName={'active__page-link'}
        disabledLinkClassName={'active__btn-link'}
      />
    </nav>
  );
};
