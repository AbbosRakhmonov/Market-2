import React from 'react'
import TableBtn from '../../Buttons/TableBtn'
import TableInput from '../../Inputs/TableInput'

export const InventoryTableRow = ({
    data,
    currentPage,
    countPage,
    changeHandler,
    inputDisabled,
    Delete,
}) => {
    return (
        <>
            {data.map((product, index) => (
                <tr key={product._id} className='tr'>
                    <td className='td text-left'>
                        {currentPage * countPage + 1 + index}
                    </td>
                    <td className='td text-left'>{product.productdata.code}</td>
                    <td className='td text-left'>{product.productdata.name}</td>
                    <td className='td text-right'>{product.total}</td>
                    <td className='py-1 td'>
                        <TableInput
                            disabled={inputDisabled}
                            onChange={(e) => changeHandler(e)}
                            type={'number'}
                        />
                    </td>
                    <td className='td text-error-500 text-right'>
                        {product.difference}{' '}
                        <span className='text-error-500'>
                            {product.unit.name}
                        </span>
                    </td>
                    <td className='py-1 td'>
                        <TableInput
                            disabled={inputDisabled}
                            onChange={(e) => changeHandler(e)}
                            type={'text'}
                        />
                    </td>
                    <td className='py-0 td'>
                        <div className='flex justify-center items-center'>
                            <TableBtn
                                type={'save'}
                                bgcolor={'bg-success-500'}
                                onClick={() => Delete(product)}
                            />
                        </div>
                    </td>
                </tr>
            ))}
        </>
    )
}
