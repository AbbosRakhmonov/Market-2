import React, {forwardRef} from 'react'
import {useSelector} from 'react-redux'
import {uniqueId, map} from 'lodash'
export const SaleCheck = forwardRef((props, ref) => {
    const {product} = props
    const {market} = useSelector((state) => state.login)
    const {currencyType} = useSelector((state) => state.currency)
    const calculateDebt = (total, payment, discount = 0) => {
        return (total - payment - discount).toLocaleString('ru-Ru')
    }

    return (
        <div ref={ref} className={'bg-white-900 p-4 rounded-md'}>
            <div className='flex pb-2 justify-between border-b-[0.8px] border-black-700'>
                <ul className='w-[35%]'>
                    <li className='check-ul-li'>
                        Do'kon:
                        <span className='check-ul-li-span'>{market.name}</span>
                    </li>
                    <li className='check-ul-li'>
                        Telefon:
                        <span className='check-ul-li-span'>
                            {market.phone1}
                        </span>
                    </li>
                    <li className='check-ul-li'>
                        Manzil:
                        <span className='check-ul-li-span'>
                            {market?.address}
                        </span>
                    </li>
                    <li className='check-ul-li'>
                        Sana:
                        <span className='check-ul-li-span'>
                            {new Date(product?.createdAt).toLocaleDateString()}
                        </span>
                    </li>
                    <li className='check-ul-li'>
                        Mijoz:{' '}
                        <span className='check-ul-li-span'>
                            {product?.client?.name ||
                                product?.packman?.name ||
                                ''}
                        </span>
                    </li>
                </ul>
                <div className='check-ul-li flex-col'>
                    <div className={'grow text-center'}>
                        <h2 className='check-text-style mb-5'>
                            Sotuv:{' '}
                            <span className={'ml-2'}>
                                {product?.saleconnector.id}
                            </span>
                        </h2>
                        <h2 className='check-text-style'>
                            Chek: {product?.id}
                        </h2>
                    </div>
                    <div className='check-ul-li justify-end'>
                        <p>
                            Sotuvchi:{' '}
                            <span className='check-ul-li-span'>
                                {product?.user?.firstname}{' '}
                                {product?.user?.lastname}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
            <div className='mt-4'>
                <table className='border-collapse border border-slate-400 w-full break-inside-auto'>
                    <thead>
                        <tr className={'break-inside-avoid break-after-auto'}>
                            <td className='check-table-rtr'>№</td>
                            <td className='check-table-rtr'>Kodi</td>
                            <td className='check-table-rtr'>Maxsulot</td>
                            <td className='check-table-rtr'>Soni</td>
                            <td className='check-table-rtr'>Narxi (dona)</td>
                            <td className='check-table-rtr'>Jami</td>
                        </tr>
                    </thead>
                    <tbody>
                        {map(product?.products, (item, index) => {
                            return (
                                <tr key={uniqueId('saleCheck')}>
                                    <td className='p-1 border text-center text-[0.875rem] font-bold'>
                                        {index + 1}
                                    </td>
                                    <td className='check-table-body text-center'>
                                        {item?.product?.productdata?.code}
                                    </td>
                                    <td className='check-table-body text-start'>
                                        {item?.product?.productdata?.name}
                                    </td>
                                    <td className='check-table-body'>
                                        {item?.pieces}
                                    </td>
                                    <td className='check-table-body'>
                                        {currencyType === 'USD'
                                            ? item?.unitprice
                                            : item?.unitpriceuzs}{' '}
                                        {currencyType}
                                    </td>
                                    <td className='check-table-body'>
                                        {currencyType === 'USD'
                                            ? item?.totalprice
                                            : item?.totalpriceuzs}{' '}
                                        {currencyType}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <div className='border-t-[0.8px] border-black-700 w-full my-[1rem]'></div>
            <ul>
                <li className='check-ul-li-foot border-t-0'>
                    Jami:{' '}
                    <span>
                        {currencyType === 'USD'
                            ? product?.payment?.totalprice
                            : product?.payment?.totalpriceuzs}{' '}
                        {currencyType}
                    </span>
                </li>
                <li className='check-ul-li-foot'>
                    {' '}
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
                <li className='check-ul-li-foot'>
                    {' '}
                    To'langan:{' '}
                    <span>
                        {currencyType === 'USD'
                            ? product?.payment?.payment
                            : product?.payment?.paymentuzs}{' '}
                        {currencyType}
                    </span>
                </li>
                <li className='check-ul-li-foot'>
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
