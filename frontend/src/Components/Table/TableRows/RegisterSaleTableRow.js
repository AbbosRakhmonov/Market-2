import React, {useEffect, useState} from 'react'
import TableBtn from '../../Buttons/TableBtn'
import TableInput from '../../Inputs/TableInput'
import {map} from 'lodash'
import {IoEye, IoEyeOff} from 'react-icons/io5'
export const RegisterSaleTableRow = ({
    data,
    Delete,
    changeHandler,
    currency,
}) => {
    const [showIncomingPrice, setShowIncomingPrice] = useState([])
    const changeShow = (i) => {
        const price = [...showIncomingPrice]
        price[i] = !price[i]
        setShowIncomingPrice([...price])
    }
    useEffect(() => {
        setShowIncomingPrice(map(data, () => false))
    }, [data])
    return (
        <>
            {map(data, (product, index) => (
                <tr className='tr' key={'salerow-' + index + 1}>
                    <td className='text-left td'>{index + 1}</td>
                    <td className='text-right td'>{product.product.code}</td>
                    <td className='text-left td'>{product.product.name}</td>
                    <td className='text-right td'>
                        <TableInput
                            value={product.pieces}
                            onChange={(e) =>
                                changeHandler(
                                    product.product._id,
                                    e.target.value,
                                    'pieces'
                                )
                            }
                            type={'number'}
                        />
                    </td>
                    <td className='text-right td'>
                        <TableInput
                            value={
                                currency !== 'UZS'
                                    ? product.unitprice
                                    : product.unitpriceuzs
                            }
                            onChange={(e) =>
                                changeHandler(
                                    product.product._id,
                                    e.target.value,
                                    'unitprice'
                                )
                            }
                            type={'number'}
                        />
                    </td>
                    <td className='text-right td'>
                        {currency !== 'UZS'
                            ? product.totalprice.toLocaleString('ru-Ru')
                            : product.totalpriceuzs.toLocaleString(
                                  'ru-Ru'
                              )}{' '}
                        {currency}
                    </td>
                    <td className='td'>
                        <div className='flex items-center justify-center'>
                            <TableBtn
                                type={'delete'}
                                bgcolor={'bg-error-500'}
                                onClick={() => Delete(index)}
                            />
                        </div>
                    </td>
                    <td className='td border-r-0 text-success-500'>
                        <div className='flex justify-between'>
                            <button onClick={() => changeShow(index)}>
                                {showIncomingPrice[index] ? (
                                    <IoEye />
                                ) : (
                                    <IoEyeOff />
                                )}
                            </button>
                            <span className='min-w-fit'>
                                {showIncomingPrice[index]
                                    ? currency === 'UZS'
                                        ? product.incomingpriceuzs.toLocaleString(
                                              'ru-Ru'
                                          ) + ' UZS'
                                        : product.incomingprice.toLocaleString(
                                              'ru-Ru'
                                          ) + ' USD'
                                    : ''}
                            </span>
                        </div>
                    </td>
                </tr>
            ))}
        </>
    )
}
