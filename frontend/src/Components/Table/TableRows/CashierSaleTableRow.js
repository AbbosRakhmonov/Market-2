import {uniqueId} from 'lodash'
import React from 'react'

export const CashierSaleTableRow = ({
    data,
    currentPage,
    countPage,
    currency,
}) => {
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
                        {saleconnector.saleconnector.id}
                    </td>
                    <td className='text-left td'>
                        {saleconnector?.client?.name}
                    </td>
                    <td className='text-right td py-[0.625rem] font-medium'>
                        {(currency === 'USD'
                            ? saleconnector.payment.totalprice
                            : saleconnector.payment.totalpriceuzs
                        ).toLocaleString('ru-Ru')}{' '}
                        {currency}
                    </td>
                    <td className='text-right td font-medium'>
                        {(currency === 'USD'
                            ? saleconnector.payment.cash
                            : saleconnector.payment.cashuzs
                        ).toLocaleString('ru-Ru')}{' '}
                        <span className='text-primary-800'>{currency}</span>
                    </td>
                    <td className='text-right td font-medium'>
                        {(currency === 'USD'
                            ? saleconnector.payment.card
                            : saleconnector.payment.carduzs
                        ).toLocaleString('ru-Ru')}{' '}
                        <span className='text-success-500'>{currency}</span>
                    </td>
                    <td className='text-right td font-medium border-r-0'>
                        {(currency === 'USD'
                            ? saleconnector.payment.transfer
                            : saleconnector.payment.transferuzs
                        ).toLocaleString('ru-Ru')}{' '}
                        <span className='text-warning-500'>{currency}</span>
                    </td>
                </tr>
            ))}
        </>
    )
}
