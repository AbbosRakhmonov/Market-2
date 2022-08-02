import React from 'react'
import TableBtn from '../../Buttons/TableBtn'
import TableInput from '../../Inputs/TableInput'

export const RegisterSaleTableRow = (
    {
        data,
        Delete,
        changeHandler,
        currency
    }) => {
    return (
        <>
            {data.map((product, index) => (
                <tr className='tr' key={'salerow-' + index + 1}>
                    <td className='text-left td'>
                        {index + 1}
                    </td>
                    <td className='text-right td'>{product.product.code}</td>
                    <td className='text-left td'>{product.product.name}</td>
                    <td className='text-right td'>
                        <TableInput
                            value={product.pieces}
                            onChange={(e) => changeHandler(product.product._id, e.target.value, 'pieces')}
                            type={'number'}
                        />
                    </td>
                    <td className='text-right td'>
                        <TableInput
                            value={currency !== 'UZS' ? product.unitprice : product.unitpriceuzs}
                            onChange={(e) => changeHandler(product.product._id, e.target.value, 'unitprice')}
                            type={'number'}
                        />
                    </td>
                    <td className='text-right td'>
                        {currency !== 'UZS' ? (product.totalprice).toLocaleString("ru-Ru") : (product.totalpriceuzs).toLocaleString("ru-Ru")} {currency}
                    </td>
                    <td className='td border-r-0'>
                        <div className='flex items-center justify-center'>
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
