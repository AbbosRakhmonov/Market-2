import React from 'react'
import TableBtn from '../../Buttons/TableBtn'
import TableInput from '../../Inputs/TableInput'

export const RegisterIncomingTableRow = ({
    changeHandler,
    data,
    currentPage,
    countPage,
    Delete,
    currency,
}) => {
    return (
        <>
            {data.map((incoming, index) => (
                <tr key={incoming.product._id} className='tr'>
                    <td className='py-0 td text-left'>
                        {currentPage * countPage + 1 + index}
                    </td>
                    <td className='py-0 td text-left'>
                        {incoming.product.code}
                    </td>
                    <td className='py-0 td text-left'>
                        {incoming.product.name}
                    </td>
                    <td className='py-1 td'>
                        <TableInput
                            onChange={(e) =>
                                changeHandler(e, 'count', incoming.product._id)
                            }
                            type={'number'}
                        />
                    </td>
                    <td className='py-1 td'>
                        <TableInput
                            onChange={(e) =>
                                changeHandler(e, 'price', incoming.product._id)
                            }
                            type={'number'}
                        />
                    </td>
                    <td className='py-0 td text-error-500 text-right'>
                        {incoming.previousprice} {currency}
                    </td>
                    <td className='py-0 td text-right'>
                        {incoming.total} {currency}
                    </td>
                    <td className='py-0 td border-r-0'>
                        <div className='flex justify-center items-center'>
                            <TableBtn
                                type={'delete'}
                                bgcolor={'bg-error-500'}
                                onClick={() => Delete(incoming)}
                            />
                        </div>
                    </td>
                </tr>
            ))}
        </>
    )
}
