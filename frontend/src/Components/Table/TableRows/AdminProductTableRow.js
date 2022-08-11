import React from 'react'
import TableBtn from '../../Buttons/TableBtn'

export const AdminProductTableRow = ({
    currentPage,
    countPage,
    data,
    Edit,
    Delete,
}) => {
    return (
        <>
            {data.map((product, index) => (
                <tr key={product._id} className='tr'>
                    <td className='td text-left'>
                        {currentPage * countPage + 1 + index}
                    </td>
                    <td className='td text-center'>
                        {product.logo}
                    </td>
                    <td className='td text-left'>
                        {product.shopName}
                    </td>
                    <td className='td text-left'>{product.director}</td>
                    <td className='td text-right'>
                        {product.phone}
                    </td>
                    <td className='td text-center'>
                        {product.type}
                    </td>
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
                </tr>
            ))}
        </>
    )
}
