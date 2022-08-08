import React from 'react'

export const IncomeTableRow = ({data, currentPage, countPage, currency}) => {
    return (
        <>
            {data.map((income, index) => (
                <tr className='tr'>
                    <td className='text-left td'>
                        {currentPage * countPage + 1 + index}
                    </td>
                    <td className='text-right td'>
                        {new Date(income.createdAt).toLocaleString('ru-RU')}
                    </td>
                    <td className='text-right td'>{income.id}</td>
                    <td className='text-right td'>
                        {currency === 'UZS'
                            ? income.totalincomingpriceuzs.toLocaleString(
                                  'ru-RU'
                              )
                            : income.totalincomingprice.toLocaleString(
                                  'ru-RU'
                              )}{' '}
                        <span>{currency}</span>
                    </td>
                    <td className='text-right td'>
                        {currency === 'UZS'
                            ? income.totalsellingpriceuzs.toLocaleString(
                                  'ru-RU'
                              )
                            : income.totalsellingprice.toLocaleString(
                                  'ru-RU'
                              )}{' '}
                        <span>{currency}</span>
                    </td>
                    <td className='text-right td'>
                        {currency === 'UZS'
                            ? income.discountuzs.toLocaleString('ru-RU')
                            : income.discount.toLocaleString('ru-RU')}{' '}
                        <span>{currency}</span>
                    </td>
                    <td className='text-right border-r-0 td'>
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
