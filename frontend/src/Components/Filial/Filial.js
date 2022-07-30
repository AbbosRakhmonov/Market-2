import React from 'react'
import FilialButtons from '../FilialButtons/FilialButtons'

const Filial = ({
    typecount,
    productcount,
    totalPrice,
    shopname,
    active,
    currency,
}) => {
    return (
        <div className={`shops_card ${active ? 'active_shop' : ''}`}>
            <div className='product-cost'>
                <div>
                    <p className='product'>Maxsulotlar turi</p>
                    <p className='product-number'>{typecount}</p>
                </div>
                <div>
                    <p className='product'>Maxsulotlar soni</p>
                    <p className='product-number'>{productcount}</p>
                </div>
                <div>
                    <p className='product'>Jami</p>
                    <p className='product-total'>
                        {totalPrice.toLocaleString('ru-Ru')} {currency}
                    </p>
                </div>
            </div>
            <div className='shop-name'>
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
