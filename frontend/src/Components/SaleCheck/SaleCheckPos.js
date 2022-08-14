import React, {forwardRef} from 'react'
import {useSelector} from 'react-redux'

export const SaleCheckPos = forwardRef((props, ref) => {
    const {product} = props
    const {user, market} = useSelector((state) => state.login)
    const {currencyType} = useSelector((state) => state.currency)
    const calculateDebt = (total, payment, discount = 0) => {
        return (total - payment - discount).toLocaleString('ru-Ru')
    }
    return (
        <div
            ref={ref}
            className={
                'bg-white-900 p-4 rounded-md reciept w-full uppercase text-[7pt]'
            }
        >
            <div className='flex justify-between'>
                <span>Do'kon:</span>
                <span>{market.name}</span>
            </div>
            <div className='flex justify-between'>
                <span>Sotuvchi:</span>
                <span>
                    {user.firstname} {user.lastname}
                </span>
            </div>
            <div className='flex justify-between'>
                <span>Mijoz:</span>
                <span>
                    {product?.client?.name || product?.packman?.name || ''}
                </span>
            </div>
            <div className='flex justify-between'>
                <span>ID:</span>
                <span>{product?.saleconnector?.id}</span>
            </div>
            <div className='flex justify-between'>
                <span>Chek:</span>
                <span> {product?.id}</span>
            </div>
            <div className='flex justify-between'>
                <span>
                    Vaqt: {new Date(product?.createdAt).toLocaleTimeString()}
                </span>
                <span>
                    Sana: {new Date(product?.createdAt).toLocaleDateString()}
                </span>
            </div>
            <br />
            <hr className='text-opacity-50' />
            <br />
            {product?.products.map((item, index) => {
                return (
                    <div key={index}>
                        <div className='text-[7pt] font-bold'>
                            {index + 1}. {item?.product?.productdata?.code}{' '}
                            {item?.product?.productdata?.name}
                        </div>
                        <div className='flex justify-between text-[7pt]'>
                            <span>
                                {item?.pieces}*
                                {currencyType === 'USD'
                                    ? item?.unitprice
                                    : item?.unitpriceuzs}{' '}
                                {currencyType}
                            </span>
                            <span>
                                {currencyType === 'USD'
                                    ? item?.totalprice
                                    : item?.totalpriceuzs}{' '}
                                {currencyType}
                            </span>
                        </div>
                    </div>
                )
            })}
            <br />
            <ul>
                <li className='flex justify-between text-[7pt] border-b border-b-black-300'>
                    Jami:{' '}
                    <span>
                        {currencyType === 'USD'
                            ? product?.payment?.totalprice
                            : product?.payment?.totalpriceuzs}{' '}
                        {currencyType}
                    </span>
                </li>
                <li className='flex justify-between text-[7pt] border-b border-b-black-300'>
                    Chegirma:{' '}
                    <span>
                        {product?.hasOwnProperty('discount')
                            ? currencyType === 'USD'
                                ? product?.discount.discount
                                : product?.discount.discountuzs
                            : 0}{' '}
                        {currencyType}
                    </span>
                </li>
                <li className='flex justify-between text-[7pt] border-b border-b-black-300'>
                    {' '}
                    To'langan:{' '}
                    <span>
                        {currencyType === 'USD'
                            ? product?.payment?.payment
                            : product?.payment?.paymentuzs}{' '}
                        {currencyType}
                    </span>
                </li>
                <li className='flex justify-between text-[7pt] border-b border-b-black-300'>
                    {' '}
                    Qarz:{' '}
                    <span>
                        {currencyType === 'USD'
                            ? calculateDebt(
                                  product?.payment?.totalprice,
                                  product?.payment?.payment,
                                  product?.discount?.discount
                              )
                            : calculateDebt(
                                  product?.payment?.totalpriceuzs,
                                  product?.payment?.paymentuzs,
                                  product?.discount?.discountuzs
                              )}{' '}
                        {currencyType}
                    </span>
                </li>
            </ul>
        </div>
    )
})
