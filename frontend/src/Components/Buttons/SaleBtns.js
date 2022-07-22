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
  const icons = {
    cash: <BsCashStack className='style' />,
    card: <BsFillCreditCardFill className='style' />,
    transfer: <BsArrowLeftRight className='style' />,
    mixed: <BiGitCompare className='style' />,
  };
  return (
    <>
      <button onClick={onClick} className='SaleStyle'>
        {icons[type]}
        {text}
      </button>
    </>
  );
};

export const DiscountBtn = ({ onClick, text }) => {
  return (
    <button onClick={onClick} className='DiscountStyle'>
      <AiOutlineTag className='DiscStyle' />
      {text}
    </button>
  );
};

export const Payment = ({ onClick, text }) => {
  return (
    <button onClick={onClick} className='paymentStyle'>
      <IoWalletOutline className='payStyle' />
      {text}
    </button>
  );
};

export const PaymentClip = ({ onClick, text }) => {
  return (
    <button onClick={onClick} className='PayStyle'>
      <BsPaperclip className='w-[2rem] h-[18px]' />
    </button>
  );
};
