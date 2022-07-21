import React from 'react';
import {IoAdd, IoCreateOutline, IoPrint, IoSave, IoSwapHorizontal, IoTrashOutline,} from 'react-icons/io5';
import {SiMicrosoftexcel} from 'react-icons/si';

const TableBtn = ({ type, onClick, bgcolor}) => {
  const chooseIcon = () => {
    switch (type) {
      case 'delete':
        return <IoTrashOutline color='white' />;
      case 'edit':
        return <IoCreateOutline color='white' />;
      case 'print':
        return <IoPrint color='white' />;
      case 'save':
        return <IoSave color='white' />;
      case 'excel':
        return <SiMicrosoftexcel color='white' />;
      case 'add':
        return <IoAdd color='white' />;
      case 'return':
        return <IoSwapHorizontal color='white' />;
      default:
        return '';
    }
  };

  return (
    <button
      className={`w-[24px] h-[24px] flex justify-center items-center rounded-full ${bgcolor}`}
      onClick={onClick}
    >
      {chooseIcon()}
    </button>
  );
};

export default TableBtn;
