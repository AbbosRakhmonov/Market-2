import React from 'react'
import FilialButtons from '../FilialButtons/FilialButtons'
import Avatar from '../Avatar/Avatar.js'

const Filial = ({
    typecount,
    productcount,
    totalPrice,
    shopname,
    active,
    currency,
    director,
}) => {
    return (
        <div
            className={`shops_card flex gap-[1.25rem] ${
                active ? 'active_shop' : ''
            }`}
        >
            <Avatar border={true} director={director} />
            <div className='product-cost'>
                <div className={'flex flex-col items-center justify-center'}>
                    <p className='product'>Maxsulotlar turi</p>
                    <p className='product-number'>{typecount}</p>
                </div>
                <div className={'flex flex-col items-center justify-center'}>
                    <p className='product'>Maxsulotlar soni</p>
                    <p className='product-number'>{productcount}</p>
                </div>
                <div className={'flex flex-col items-center justify-center'}>
                    <p className='product'>Jami</p>
                    <p className='product-total'>
                        {totalPrice.toLocaleString('ru-Ru')} {currency}
                    </p>
                </div>
            </div>
            <div className='shop-name flex flex-col w-[13.4375rem]'>
                <div className='shop-title'>
                    <p>{shopname}</p>
                </div>
                <div className={'filial-btn'}>
                    <FilialButtons type={'product'} />
                    <FilialButtons type={'selling'} />
                    <FilialButtons type={'payments'} />
                </div>
            </div>
        </div>
    )
}

export default Filial
