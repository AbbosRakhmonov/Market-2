import React from 'react'
import TableBtn from '../../Buttons/TableBtn'
import {map} from 'lodash'

export const SupplierTableRow = ({
                                     data,
                                     currentPage,
                                     countPage,
                                     Edit,
                                     Delete
                                 }) => {
    return (
        <>
            {map(data,(supplier, index) => (
                <tr key={supplier._id} className='tr'>
                    <td className='td'>
                        {currentPage * countPage + 1 + index}
                    </td>
                    <td className='td text-left'>{supplier.name}</td>
                    <td className='py-[0.375rem] td border-r-0 text-center max-w-[50px]'>
                        <div className='flex items-center justify-center'>
                            <TableBtn
                                type={'edit'}
                                bgcolor='bg-warning-500'
                                onClick={() => Edit(supplier)}
                            />
                            <TableBtn
                                type={'delete'}
                                bgcolor='bg-error-500 ml-2.5'
                                onClick={() => Delete(supplier)}
                            />
                        </div>
                    </td>
                </tr>
            ))}
        </>
    )
}
