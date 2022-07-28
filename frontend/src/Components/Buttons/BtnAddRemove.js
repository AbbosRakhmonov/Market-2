import React from 'react'
import {BiPlus} from 'react-icons/bi'
import {MdOutlineClear} from 'react-icons/md'

const BtnAddRemove = ({onClick, text, add, maxWidth, edit}) => {
    return (
        <button
            onClick={onClick}
            className={
                add ? 'createElement' : edit ? 'edit-button' : 'clearElement'
            }
        >
            {add && !edit ? (
                <div className='plusIcon'>
                    <BiPlus />
                </div>
            ) : !add && !edit ? (
                <div className='plusIcon'>
                    <MdOutlineClear />
                </div>
            ) : (
                ''
            )}
            {text}
        </button>
    )
}

export default BtnAddRemove
