import React from 'react'
import {
    IoAdd,
    IoCreateOutline,
    IoPrint,
    IoSave,
    IoSwapHorizontal,
    IoTrashOutline,
} from 'react-icons/io5'
import {SiMicrosoftexcel} from 'react-icons/si'

    const TableBtn = ({type, onClick, bgcolor,isDisabled}) => {
    const chooseIcon = () => {
        switch (type) {
            case 'delete':
                return <IoTrashOutline color='white' size={14} />
            case 'edit':
                return <IoCreateOutline color='white' size={14} />
            case 'print':
                return <IoPrint color='white' size={14} />
            case 'save':
                return <IoSave color='white' size={14} />
            case 'excel':
                return <SiMicrosoftexcel color='white' size={14} />
            case 'add':
                return <IoAdd color='white' size={14} />
            case 'return':
                return <IoSwapHorizontal color='white' size={14} />
            default:
                return ''
        }
    }

    return (
        <button
            className={`w-[24px] h-[24px] flex justify-center items-center rounded-full ${bgcolor}`}
            onClick={onClick}
            disabled={isDisabled}
        >
            {chooseIcon()}
        </button>
    )
}

export default TableBtn
