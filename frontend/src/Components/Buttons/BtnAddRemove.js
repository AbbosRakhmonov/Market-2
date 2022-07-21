import React from 'react';
import {BiPlus} from 'react-icons/bi';
import {MdOutlineClear} from 'react-icons/md';

const BtnAddRemove = ({onClick, text, add, maxWidth}) => {
    return (
        <button
            onClick={onClick}
            className={add ? 'createElement' : 'clearElement'}
        >
            {add ? (
                <BiPlus className='plusIcon'/>
            ) : (
                <MdOutlineClear className='plusIcon'/>
            )}
            {text}
        </button>
    );
};

export default BtnAddRemove;
