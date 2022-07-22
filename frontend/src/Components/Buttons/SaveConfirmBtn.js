import React from 'react';
import { BsPaperclip, BsShieldFillCheck } from 'react-icons/bs';

 export const SaveBtn = ({ onClick, text }) => {
  return (
    <>
      <button
        onClick={onClick}
        className='bg-[#F79009] p-[10px] text-white-900 text-sm rounded-lg'
      >
        <BsPaperclip className='text-white-900 inline-block' /> {text}
      </button>
    </>
  );
};

export const ConfirmBtn = ({ onClick, text }) => {
  return (
    <button
      onClick={onClick}
      className='mx-3 bg-[#0090A3] p-[10px] text-white-900 text-sm rounded-lg'
    >
      <BsShieldFillCheck className='text-white-900  inline-block w-[15px] h-[15px]' /> {text}
    </button>
  );
};



