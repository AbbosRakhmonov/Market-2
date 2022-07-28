import React from 'react'
import {IoCartOutline, IoCubeOutline, IoNewspaperOutline} from 'react-icons/io5'

function FilialButtons({type, onClick}) {
    const propsType = {
        product: {
            icon: <IoNewspaperOutline className='shopIcons' />,
            bgColor: 'bg-[#12B76A]',
        },
        selling: {
            icon: <IoCartOutline className='shopIcons' />,
            bgColor: 'bg-[#F79009]',
        },
        payments: {
            icon: <IoCubeOutline className='shopIcons' />,
            bgColor: 'bg-[#00B4CC]',
        },
    }

    return (
        <button
            onClick={onClick}
            className={`shopButton ${propsType[type].bgColor}`}
        >
            {propsType[type].icon}
        </button>
    )
}

export default FilialButtons
