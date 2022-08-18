import {uniqueId, map} from 'lodash'
import React from 'react'

export const CashierSaleTableRow = ({
                                        data,
                                        currentPage,
                                        countPage,
                                        currency
                                    }) => {
    const calculateTotalPrice = (datas, property) => {
        return datas.reduce((summ, data) => summ + data[property], 0)
    }

    return (
        <>
            {map(data,(saleconnector, index) => (
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
                                ? calculateTotalPrice(
                                    saleconnector.products,
                                    'totalprice'
                                )
                                : calculateTotalPrice(
                                    saleconnector.products,
                                    'totalpriceuzs'
                                )
                        ).toLocaleString('ru-Ru')}{' '}
                        {currency}
                    </td>
                    <td className='text-right td font-medium'>
                        {(currency === 'USD'
                                ? Number(saleconnector?.payment?.cash || 0)
                                : Number(saleconnector?.payment?.cashuzs || 0)
                        ).toLocaleString('ru-Ru')}{' '}
                        <span className='text-primary-800'>{currency}</span>
                    </td>
                    <td className='text-right td font-medium'>
                        {(currency === 'USD'
                                ? Number(saleconnector?.payment?.card || 0)
                                : Number(saleconnector?.payment?.carduzs || 0)
                        ).toLocaleString('ru-Ru')}{' '}
                        <span className='text-success-500'>{currency}</span>
                    </td>
                    <td className='text-right td font-medium border-r-0'>
                        {(currency === 'USD'
                                ? Number(saleconnector?.payment?.transfer || 0)
                                : Number(saleconnector?.payment?.transferuzs || 0)
                        ).toLocaleString('ru-Ru')}{' '}
                        <span className='text-warning-500'>{currency}</span>
                    </td>
                </tr>
            ))}
        </>
    )
}
