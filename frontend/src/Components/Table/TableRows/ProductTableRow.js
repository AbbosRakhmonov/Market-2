import React from 'react'
import TableBtn from '../../Buttons/TableBtn'
import {map} from 'lodash'
export const ProductTableRow = ({
    currentPage,
    countPage,
    data,
    Edit,
    Delete,
    currency,
    currencyType,
    productminimumpage,
}) => {
    return (
        <>
            {map(data, (product, index) => (
                <tr key={product._id} className='tr'>
                    <td className='td text-center '>
                        {productminimumpage
                            ? index + 1
                            : currentPage * countPage + 1 + index}
                    </td>
                    <td className='td text-center'>
                        {product.productdata?.barcode}
                    </td>
                    <td className='td text-center'>
                        {product.category.code}{' '}
                        {product.category.name && `- ${product.category.name}`}
                    </td>
                    <td className='td text-center'>
                        {product.productdata.code}
                    </td>
                    <td className='td text-left'>{product.productdata.name}</td>
                    <td className='td text-right'>
                        {product.total.toLocaleString('ru-RU')}{' '}
                        {product.unit && product.unit.name}
                    </td>
                    <td className='td text-right'>
                        {product.price &&
                            (currency === 'UZS'
                                ? product.price.incomingpriceuzs.toLocaleString(
                                      'ru-RU'
                                  )
                                : product.price.incomingprice.toLocaleString(
                                      'ru-RU'
                                  ))}{' '}
                        {currencyType}
                    </td>
                    <td className='td text-right'>
                        {product.price &&
                            (currency === 'UZS'
                                ? product.price.sellingpriceuzs.toLocaleString(
                                      'ru-RU'
                                  )
                                : product.price.sellingprice.toLocaleString(
                                      'ru-RU'
                                  ))}{' '}
                        {currencyType}
                    </td>
                    <td className='td text-right'>
                        {product.price?.tradepriceuzs ? (
                            <>
                                {currency === 'UZS'
                                    ? product?.price?.tradepriceuzs.toLocaleString(
                                          'ru-RU'
                                      )
                                    : product?.price?.tradeprice.toLocaleString(
                                          'ru-RU'
                                      )}{' '}
                                {currencyType}
                            </>
                        ) : (
                            ''
                        )}
                    </td>
                    <td
                        className={`td text-right ${
                            (productminimumpage &&
                                'py-[0.625rem] border-r-0') ||
                            ''
                        }`}
                    >
                        {product?.minimumcount || ''}
                    </td>
                    {!productminimumpage && (
                        <td className='td py-[0.375rem] border-r-0'>
                            <div className='flex items-center justify-center'>
                                <TableBtn
                                    type={'edit'}
                                    bgcolor='bg-warning-500'
                                    onClick={() => Edit(product)}
                                />
                                <TableBtn
                                    type={'delete'}
                                    bgcolor='bg-error-500 ml-2.5'
                                    onClick={() => Delete(product)}
                                />
                            </div>
                        </td>
                    )}
                </tr>
            ))}
        </>
    )
}
