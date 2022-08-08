import {uniqueId} from 'lodash'
import React from 'react'

export const DiscountTableRow = ({data, currentPage, countPage, currency}) => {
    return (
        <>
            {data.map((discount, index) => (
                <tr className='tr' key={uniqueId('discount')}>
                    <td className='text-left td'>
                        {currentPage * countPage + 1 + index}
                    </td>
                    <td className='text-right td'>
                        {new Date(discount.createdAt).toLocaleDateString()}
                    </td>
                    <td className='text-left td'>
                        {discount.client && discount.client.name}
                    </td>
                    <td className='text-right td'>
                        {currency === 'UZS'
                            ? (
                                  Math.round(discount.totaluzs * 1) / 1
                              ).toLocaleString('ru-RU')
                            : (
                                  Math.round(discount.total * 1000) / 1000
                              ).toLocaleString('ru-RU')}{' '}
                        <span>{currency}</span>
                    </td>
                    <td className='text-right td border-r-0'>
                        {currency === 'UZS'
                            ? (
                                  Math.round(discount.discountuzs * 1) / 1
                              ).toLocaleString('ru-RU')
                            : (
                                  Math.round(discount.discount * 1000) / 1000
                              ).toLocaleString('ru-RU')}{' '}
                        <span>{currency}</span>
                    </td>
                </tr>
            ))}
        </>
    )
}
