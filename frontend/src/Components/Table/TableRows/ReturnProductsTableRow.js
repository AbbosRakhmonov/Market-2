import {uniqueId,map} from 'lodash'
import React from 'react'

export const ReturnProductsTableRow = ({
                                           data,
                                           currentPage,
                                           countPage,
                                           currency
                                       }) => {
    return (
        <>
            {map(data,(connector, index) => (
                <tr className='tr' key={uniqueId('connector')}>
                    <td className='text-left td'>
                        {currentPage * countPage + 1 + index}
                    </td>
                    <td className='text-right td'>
                        {new Date(connector.createdAt).toLocaleDateString()}
                    </td>
                    <td className='text-left td'>
                        {connector.saleconnector.id}
                    </td>
                    <td className='text-left td'>
                        {connector.saleconnector?.client &&
                            connector.saleconnector?.client?.name}
                    </td>
                    <td className='text-right td'>
                        {Number(connector.count).toLocaleString()}
                    </td>
                    <td className='text-right td font-medium'>
                        {currency === 'UZS'
                            ? connector.totalpriceuzs.toLocaleString('ru-RU')
                            : connector.totalprice.toLocaleString('ru-RU')}{' '}
                        <span className='text-warning-500'>{currency}</span>
                    </td>
                    <td className='text-right td border-r-0 py-[0.625rem] font-medium'>
                        {currency === 'UZS'
                            ? connector.backuzs.toLocaleString('ru-RU')
                            : connector.back.toLocaleString('ru-RU')}{' '}
                        <span className='text-success-500'>{currency}</span>
                    </td>
                </tr>
            ))}
        </>
    )
}
