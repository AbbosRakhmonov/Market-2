import React from 'react';
import { IoCloseSharp } from 'react-icons/io5'

export const ExitBtn = ({ onClick }) => {
  return (
    <>
      <button 
      onClick={onClick} 
      className='bg-error-400 py-[4px] px-[5px] text-white-900 rounded hover:bg-error-500'>
        <IoCloseSharp/>
      </button>
    </>
  );
};
