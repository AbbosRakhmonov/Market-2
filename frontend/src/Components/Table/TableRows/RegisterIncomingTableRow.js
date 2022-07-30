import React from 'react'
import TableBtn from '../../Buttons/TableBtn'
import TableInput from '../../Inputs/TableInput'
export const RegisterIncomingTableRow = ({
    changeHandler,
    data,
    Delete,
    currency,
}) => {
    const propertyprice = currency === 'USD' ? 'unitprice' : 'unitpriceuzs'

    return (
        <>
            {data.map((product, index) => (
                <tr key={product.product._id} className='tr'>
                    <td className='py-0 td text-left'>{index + 1}</td>
                    <td className='py-0 td text-right'>
                        {product.product.code}
                    </td>
                    <td className='py-0 td text-left'>
                        {product.product.name}
                    </td>
                    <td className='py-1 td'>
                        <TableInput
                            onChange={(e) => changeHandler(e, 'pieces', index)}
                            type={'number'}
                            value={product.pieces}
                        />
                    </td>
                    <td className='py-1 td'>
                        <TableInput
                            onChange={(e) =>
                                changeHandler(e, propertyprice, index)
                            }
                            type={'number'}
                            value={
                                currency === 'USD'
                                    ? product.unitprice
                                    : product.unitpriceuzs
                            }
                        />
                    </td>
                    <td className='py-0 td text-error-500 text-right'>
                        {currency === 'USD'
                            ? product.oldprice
                            : product.oldpriceuzs}{' '}
                        {currency}
                    </td>
                    <td className='py-0 td text-right'>
                        {currency === 'USD'
                            ? product.totalprice
                            : product.totalpriceuzs}{' '}
                        {currency}
                    </td>
                    <td className='py-0 td border-r-0'>
                        <div className='flex justify-center items-center'>
                            <TableBtn
                                type={'delete'}
                                bgcolor={'bg-error-500'}
                                onClick={() => Delete(index)}
                            />
                        </div>
                    </td>
                </tr>
            ))}
        </>
    )
}
