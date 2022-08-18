import React from 'react'
import TableBtn from '../../Buttons/TableBtn'
import {map} from 'lodash'
export const CategoryTableRow = ({
                                     data,
                                     currentPage,
                                     countPage,
                                     Edit,
                                     Delete
                                 }) => {
    return (
        <>
            {map(data,(category, index) => (
                <tr key={category._id} className='tr'>
                    <td className='td'>
                        {currentPage * countPage + 1 + index}
                    </td>
                    <td className='td'>{category.code}</td>
                    <td className='td'>{category.name}</td>
                    <td className='td border-r-0 text-center max-w-[50px] py-[0.375rem]'>
                        <div className='flex items-center justify-center'>
                            <TableBtn
                                type={'edit'}
                                bgcolor='bg-warning-500'
                                onClick={() => Edit(category)}
                            />
                            <TableBtn
                                type={'delete'}
                                bgcolor='bg-error-500 ml-2.5'
                                onClick={() => Delete(category)}
                            />
                        </div>
                    </td>
                </tr>
            ))}
        </>
    )
}
