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
                    <td className='text-right td'>
                        {new Date(saleconnector.createdAt).toLocaleDateString()}
                    </td>
                    <td className='text-left td'>
                        {saleconnector?.client?.name || saleconnector.id}
                    </td>
                    <td className='text-right td py-[0.625rem] font-bold'>
                        {reduceEl(
                            saleconnector.products,
                            'totalprice',
                            'totalpriceuzs'
                        ).toLocaleString('ru-Ru')}{' '}
                        {currency}
                    </td>
                    <td className='text-right td text-primary-800 font-bold'>
                        {reduceEl(
                            saleconnector.payments,
                            'cash',
                            'cashuzs'
                        ).toLocaleString('ru-Ru')}{' '}
                        {currency}
                    </td>
                    <td className='text-right td text-success-500 font-bold'>
                        {reduceEl(
                            saleconnector.payments,
                            'card',
                            'carduzs'
                        ).toLocaleString('ru-Ru')}{' '}
                        {currency}
                    </td>
                    <td className='text-right td text-warning-500 font-bold border-r-0'>
                        {reduceEl(
                            saleconnector.payments,
                            'transfer',
                            'transferuzs'
                        ).toLocaleString('ru-Ru')}{' '}
                        {currency}
                    </td>
                </tr>
            ))}
        </>
    )
}
