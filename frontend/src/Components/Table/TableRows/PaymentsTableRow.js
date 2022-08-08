import {uniqueId} from 'lodash'
import React from 'react'

export const PaymentsTableRow = ({
    data,
    currentPage,
    countPage,
    currency,
    type,
}) => {
    return (
        <>
            {data.map((sale, index) => (
                <tr className='tr' key={uniqueId('sale')}>
                    <td className='text-left td'>
                        {currentPage * countPage + 1 + index}
                    </td>
                    <td className='text-right td'>{sale.id}</td>
                    <td className='text-left td'>
                        {sale.client && sale.client.name}
                    </td>
                    <td className='text-right td py-[6px]'>
                        {currency === 'UZS'
                            ? (
                                  Math.round(
                                      sale.products.reduce(
                                          (summ, product) =>
                                              summ + product.totalpriceuzs,
                                          0
                                      ) * 1
                                  ) / 1
                              ).toLocaleString('ru-RU')
                            : (
                                  Math.round(
                                      sale.products.reduce(
                                          (summ, product) =>
                                              summ + product.totalprice,
                                          0
                                      ) * 1000
                                  ) / 1000
                              ).toLocaleString('ru-RU')}{' '}
                        <span className='text-success-500'>{currency}</span>
                    </td>
                    <td className='text-right border-r-0 td'>
                        {currency === 'UZS'
                            ? (
                                  Math.round(
                                      sale.payments.reduce(
                                          (summ, payment) =>
                                              summ + payment[type + 'uzs'],
                                          0
                                      ) * 1
                                  ) / 1
                              ).toLocaleString('ru-RU')
                            : (
                                  Math.round(
                                      sale.payments.reduce(
                                          (summ, payment) =>
                                              summ + payment[type],
                                          0
                                      ) * 1000
                                  ) / 1000
                              ).toLocaleString('ru-RU')}{' '}
                        <span className='text-warning-500'>{currency}</span>
                    </td>
                </tr>
            ))}
        </>
    )
}
