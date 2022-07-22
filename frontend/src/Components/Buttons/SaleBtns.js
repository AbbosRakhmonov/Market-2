import React from 'react';
import {
  BsCashStack,
  BsFillCreditCardFill,
  BsArrowLeftRight,
  BsPaperclip,
} from 'react-icons/bs';

import { BiGitCompare } from 'react-icons/bi';
import { AiOutlineTag } from 'react-icons/ai';
import { IoWalletOutline } from 'react-icons/io5';

export const SaleBtn = ({ onClick, text, type }) => {
  const style = 'inline-block mx-2 w-[22px] h-[18-px]';
  const icons = {
    cash: <BsCashStack className={style} />,
    card: <BsFillCreditCardFill className={style} />,
    transfer: <BsArrowLeftRight className={style} />,
    mixed: <BiGitCompare className={style} />,
  };
  return (
    <>
      <button
        onClick={onClick}
        className='bg-[#E9ECEB] px-[10px] py-[10px] text-[#5A5B5B]] active:bg-[#00B4CC] active:text-white-900 rounded-lg mx-1 font-roboto outline-none'
      >
        {icons[type]}
        {text}
      </button>
    </>
  );
};

export const DiscountBtn = ({ onClick, text }) => {
  return (
    <button
      onClick={onClick}
      className='bg-[#F79009] px-[15px] py-[10px] text-white-900 rounded-lg mx-1 w-[284px] my-2 outline-none'
    >
      <AiOutlineTag className='inline-block mx-1 w-[21px] h-[21px]' />

      {text}
    </button>
  );
};

export const Payment = ({ onClick, text }) => {
  return (
    <button
      onClick={onClick}
      className='bg-[#12B76A] px-[15px] py-[10px] text-white-900 rounded-lg mx-1 w-[220px] h-[68px] my-2 outline-none'
    >
      <IoWalletOutline className='inline-block mx-1 w-[21px] h-[21px]' />

      {text}
    </button>
  );
};

export const PaymentClip = ({ onClick, text }) => {
  return (
    <button
      onClick={onClick}
      className='bg-[#9E9E9E] px-[12px] py-[10px] text-white-900 rounded-lg mx-1 w-[54px] h-[68px] my-2 outline-none'
    >
      <BsPaperclip className='w-[30px] h-[18px]' />
    </button>
  );
};
