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
    cash: <BsCashStack className='paymentsstyle' />,
    card: <BsFillCreditCardFill className='paymentsstyle' />,
    transfer: <BsArrowLeftRight className='paymentsstyle' />,
    mixed: <BiGitCompare className='paymentsstyle' />,
  };
  return (
    <>
      <button onClick={onClick} className='salestyle'>
        {icons[type]}
        {text}
      </button>
    </>
  );
};

export const DiscountBtn = ({ onClick, text }) => {
  return (
    <button onClick={onClick} className='discountstyle'>
      <AiOutlineTag className='discstyle' />
      {text}
    </button>
  );
};

export const Payment = ({ onClick, text }) => {
  return (
    <button onClick={onClick} className='paymentstyle'>
      <IoWalletOutline className='paystyle' />
      {text}
    </button>
  );
};

export const PaymentClip = ({ onClick, text }) => {
  return (
    <button onClick={onClick} className='payclipstyle'>
      <BsPaperclip className='w-[2rem] h-[18px]' />
    </button>
  );
};
