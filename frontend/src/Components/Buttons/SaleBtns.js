import React from 'react'
import {
    BsArrowLeftRight,
    BsCashStack,
    BsFillCreditCardFill,
    BsPaperclip,
} from 'react-icons/bs'

import {BiGitCompare} from 'react-icons/bi'
import {AiOutlineTag} from 'react-icons/ai'
import {IoWalletOutline} from 'react-icons/io5'

export const SaleBtn = ({onClick, text, type}) => {
    const icons = {
        cash: <BsCashStack className='paymentsstyle' />,
        card: <BsFillCreditCardFill className='paymentsstyle' />,
        transfer: <BsArrowLeftRight className='paymentsstyle' />,
        mixed: <BiGitCompare className='paymentsstyle' />,
    }
    return (
        <>
            <button onClick={onClick} className='salestyle w-full h-[3.25rem] hover:bg-primary-700 hover:text-white-900 duration-200 shadow-lg'>
                {icons[type]}
                {text}
            </button>
        </>
    )
}

export const DiscountBtn = ({onClick, text}) => {
    return (
        <button onClick={onClick} className='discountstyle w-full h-[3.25rem] bg-warning-500 text-white-900 duration-200 shadow-lg'>
            <AiOutlineTag className='discstyle' />
            {text}
        </button>
    )
}

export const Payment = ({onClick, text}) => {
    return (
        <button onClick={onClick} className='paymentstyle w-[13.75rem]'>
            <IoWalletOutline className='paystyle' />
            {text}
        </button>
    )
}

export const PaymentClip = ({onClick, text}) => {
    return (
        <button onClick={onClick} className='payclipstyle w-[3.375rem] h-full'>
            <BsPaperclip className='' />
        </button>
    )
}
