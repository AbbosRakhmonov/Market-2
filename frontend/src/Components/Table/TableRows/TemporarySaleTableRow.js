import {uniqueId} from 'lodash'
import React from 'react'
import TableBtn from '../../Buttons/TableBtn'

export const TemporarySaleTableRow = ({
    data,
    currentPage,
    countPage,
    Edit,
    Delete,
    currency,
}) => {
    return (
        <>
            {data.map((sale, index) => (
                <tr className='tr' key={uniqueId('sale')}>
                    <td className='td'>
                        {currentPage * countPage + 1 + index}
                    </td>
                    <td className='td text-left'>
                        {sale.client.name || sale.client.id}
                    </td>
                    <td className='td text-right'>
                        {sale.sales.reduce(
                            (prev, product) => prev + product.pieces,
                            0
                        )}
                    </td>
                    <td className='text-success-500 td text-right'>
                        {sale.sales.reduce(
                            (prev, product) => prev + product.totalprice,
                            0
                        )}{' '}
                        {currency}
                    </td>
                    <td className='td text-right'>
                        {sale.createdAt.toLocaleDateString()}
                    </td>
                    <td className='td text-right'>
                        {sale.createdAt.toLocaleTimeString()} PM
                    </td>
                    <td className='td py-[6px] border-r-0'>
                        <div className='flex items-center justify-center gap-[0.625rem]'>
                            <TableBtn
                                type={'edit'}
                                bgcolor={'bg-warning-500'}
                                onClick={() => Edit(sale)}
                            />
                            <TableBtn
                                type={'delete'}
                                bgcolor={'bg-error-500'}
                                onClick={() => Delete(sale)}
                            />
                        </div>
                    </td>
                </tr>
            ))}
        </>
    )
}
