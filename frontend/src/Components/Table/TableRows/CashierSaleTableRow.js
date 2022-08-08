import {uniqueId} from 'lodash'
import React from 'react'

export const CashierSaleTableRow = ({
    data,
    currentPage,
    countPage,
    currency,
}) => {
    const result = (prev, usd, uzs) => {
        return currency === 'USD' ? prev + usd : prev + uzs
    }

    const reduceEl = (arr, usd, uzs) => {
        return arr.reduce((prev, item) => {
            return result(prev, item[usd], item[uzs])
        }, 0)
    }

    return (
        <>
            {data.map((saleconnector, index) => (
                <tr className='tr' key={uniqueId('sales')}>
                    <td className='text-left td'>
                        {currentPage * countPage + 1 + index}
                    </td>
                    <td className='text-left td'>{saleconnector.id}</td>
                    <td className='text-left td'>
                        {saleconnector?.client?.name ||
                            saleconnector?.packman?.name}
                    </td>
                    <td className='text-success-500 text-right td'>
                        {reduceEl(
                            saleconnector.products,
                            'totalprice',
                            'totalpriceuzs'
                        ).toLocaleString('ru-Ru')}{' '}
                        {currency}
                    </td>
                    <td className='text-warning-500 text-right td'>
                        {reduceEl(
                            saleconnector.discounts,
                            'discount',
                            'discountuzs'
                        ).toLocaleString('ru-Ru')}{' '}
                        {currency}
                    </td>
                    <td className='text-error-500 text-right td'>
                        {(
                            reduceEl(
                                saleconnector.products,
                                'totalprice',
                                'totalpriceuzs'
                            ) -
                            reduceEl(
                                saleconnector.payments,
                                'payment',
                                'paymentuzs'
                            ) -
                            reduceEl(
                                saleconnector.discounts,
                                'discount',
                                'discountuzs'
                            )
                        ).toLocaleString('ru-Ru')}{' '}
                        {currency}
                    </td>
                </tr>
            ))}
        </>
    )
}
