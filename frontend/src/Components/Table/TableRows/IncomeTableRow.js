import {uniqueId} from 'lodash'
import React from 'react'

export const IncomeTableRow = ({data, currentPage, countPage, currency}) => {
    return (
        <>
            {data.map((income, index) => (
                <tr className='tr' key={uniqueId('income')}>
                    <td className='text-left td'>
                        {currentPage * countPage + 1 + index}
                    </td>
                    <td className='text-right td'>
                        {new Date(income.createdAt).toLocaleDateString()}
                    </td>
                    <td className='text-left td'>{income.id}</td>
                    <td className='text-right td font-bold text-error-500'>
                        {currency === 'UZS'
                            ? income.totalincomingpriceuzs.toLocaleString(
                                  'ru-RU'
                              )
                            : income.totalincomingprice.toLocaleString(
                                  'ru-RU'
                              )}{' '}
                        <span>{currency}</span>
                    </td>
                    <td className='text-right td font-bold text-primary-800'>
                        {currency === 'UZS'
                            ? income.totalsellingpriceuzs.toLocaleString(
                                  'ru-RU'
                              )
                            : income.totalsellingprice.toLocaleString(
                                  'ru-RU'
                              )}{' '}
                        <span>{currency}</span>
                    </td>
                    <td className='text-right td py-[0.625rem] font-bold text-warning-500'>
                        {currency === 'UZS'
                            ? income.totaldiscountuzs.toLocaleString('ru-RU')
                            : income.totaldiscount.toLocaleString('ru-RU')}{' '}
                        <span>{currency}</span>
                    </td>
                    <td className='text-right border-r-0 td font-bold text-success-500'>
                        {currency === 'UZS'
                            ? income.profituzs.toLocaleString('ru-RU')
                            : income.profit.toLocaleString('ru-RU')}{' '}
                        <span>{currency}</span>
                    </td>
                </tr>
            ))}
        </>
    )
}
