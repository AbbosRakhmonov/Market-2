import React from 'react'
import {motion} from 'framer-motion'

import {
    IoArrowForward,
    IoClose,
    IoAdd,
    IoCheckmark,
    IoArrowBack,
} from 'react-icons/io5'

function Exchanges({
    dataObject,
    centerIcon,
    onClick,
    closeActive,
    added,
    fulled,
    returnedFunction,
    currency,
}) {
    const iconsType = {
        closeProduct: {
            icon: (
                <IoClose
                    size={'0.875rem'}
                    className='duration-500 text-white-900 w-[0.875rem]'
                />
            ),
            bgIconColor: 'duration-500 bg-[#F04438] border-[#F04438]',
            bgCardColor: 'duration-500 bg-white-900 border-[#A9C0EF]',
        },
        allProducts: {
            icon: (
                <IoArrowForward
                    size={'0.875rem'}
                    className='duration-500 text-white-900'
                />
            ),
            bgIconColor: 'duration-500 bg-[#86A7E9] border-[#86A7E9]',
            bgCardColor: 'duration-500 bg-[#EFF4F2] border-[#A9C0EF]',
        },
        addProduct: {
            icon: (
                <IoAdd
                    size={'0.875rem'}
                    className='duration-500 text-white-900 w-[0.875rem]'
                />
            ),
            bgIconColor: 'duration-500 bg-[#F79009] border-[#F79009]',
            bgCardColor: 'duration-500 bg-[#FEF0C7] border-[#F79009]',
        },
        checkProduct: {
            icon: (
                <IoCheckmark
                    size={'0.875rem'}
                    className='duration-500 text-white-900 w-[0.875rem]'
                />
            ),
            bgIconColor: 'duration-500 bg-[#12B76A] border-[#12B76A]',
            bgCardColor: 'duration-500 bg-[#D1FADF] border-[#12B76A]',
        },
    }

    return (
        <motion.div
            initial={{y: '100%'}}
            animate={{y: '0%'}}
            transition={{delay: 0, ease: 'linear'}}
            className={`duration-500 product-exchanges-card ${
                closeActive
                    ? iconsType['closeProduct'].bgCardColor
                    : fulled
                    ? iconsType['checkProduct'].bgCardColor
                    : added
                    ? iconsType['addProduct'].bgCardColor
                    : iconsType['allProducts'].bgCardColor
            }`}
        >
            <motion.div
                animate={{rotate: 360}}
                transition={{duration: 0.5}}
                className={`duration-500 product-exchanges-card-top-icons ${
                    closeActive
                        ? iconsType['closeProduct'].bgIconColor
                        : fulled
                        ? iconsType['checkProduct'].bgIconColor
                        : added
                        ? iconsType['addProduct'].bgIconColor
                        : iconsType['allProducts'].bgIconColor
                }`}
                onClick={
                    dataObject?.number > 0
                        ? () => onClick(dataObject)
                        : () => {}
                }
            >
                {closeActive
                    ? iconsType['closeProduct'].icon
                    : fulled
                    ? iconsType['checkProduct'].icon
                    : added
                    ? iconsType['addProduct'].icon
                    : iconsType['allProducts'].icon}
            </motion.div>

            {centerIcon && (
                <div
                    className='duration-500 product-exchanges-card-center-icons'
                    onClick={() => returnedFunction(dataObject)}
                >
                    <IoArrowBack
                        size={'0.875rem'}
                        className='text-white-900 w-[0.875rem]'
                    />
                </div>
            )}
            <h3 className='product-exchanges-card-text'>{dataObject?.name}</h3>
            <div className='duration-500 product-exchanges-card-body'>
                <div className='flex flex-col w-full'>
                    <div className='mb-[0.625rem] product-exchanges-card-body-text'>
                        Kodi :
                        <span className='product-exchanges-span bg-[#F79009]'>
                            {dataObject?.code}
                        </span>
                    </div>
                    <div className='product-exchanges-card-body-text'>
                        Olish :
                        <span className='product-exchanges-span bg-[#86A7E9]'>
                            {currency === 'UZS'
                                ? dataObject?.get.toLocaleString('ru-Ru')
                                : dataObject?.getUSD.toLocaleString('ru-Ru')}
                        </span>
                    </div>
                </div>
                <div className='flex flex-col w-full'>
                    <div className='mb-[0.625rem] product-exchanges-card-body-text'>
                        Soni :
                        <span className='product-exchanges-span bg-[#00B4CC]'>
                            {dataObject?.number.toLocaleString('ru-Ru')}
                        </span>
                    </div>
                    <div className='product-exchanges-card-body-text'>
                        Sotish :
                        <span className='product-exchanges-span bg-[#32D583]'>
                            {currency === 'UZS'
                                ? dataObject?.sell.toLocaleString('ru-Ru')
                                : dataObject?.sellUSD.toLocaleString('ru-Ru')}
                        </span>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default Exchanges