import React from 'react'
import TableBtn from '../../Buttons/TableBtn'
import TableInput from '../../Inputs/TableInput'

export const IncomingsTableRow = ({
    editedIncoming,
    currency,
    saveEditIncoming,
    changeHandler,
    Delete,
    Edit,
    currentPage,
    countPage,
    data,
}) => {
    return (
        <>
            {data.map((incoming, index) => (
                <tr className='tr' key={incoming._id}>
                    <td className='text-left td'>
                        {currentPage * countPage + 1 + index}
                    </td>
                    <td className='td text-left'>{incoming.brand.name}</td>
                    <td className='td text-right'>
                        {incoming.productdata.code}
                    </td>
                    <td className='td text-left'>
                        {incoming.productdata.name}
                    </td>
                    <td className='td text-right'>
                        {(editedIncoming._id === incoming._id && (
                            <TableInput
                                value={editedIncoming.total}
                                onChange={(e) => changeHandler(e, 'total')}
                            />
                        )) || (
                            <span>
                                {incoming.total}{' '}
                                <span className='text-warning-500'>
                                    {incoming.unit.name}
                                </span>
                            </span>
                        )}
                    </td>
                    <td className='td text-right'>
                        {(editedIncoming._id === incoming._id && (
                            <TableInput
                                value={editedIncoming.price.incomingprice}
                                onChange={(e) =>
                                    changeHandler(e, 'incomingprice')
                                }
                                type={'number'}
                            />
                        )) || (
                            <span>
                                {incoming.price.incomingprice}{' '}
                                <span className='text-primary-800'>
                                    {currency}
                                </span>
                            </span>
                        )}
                    </td>
                    <td className='text-success-500 td text-right'>
                        {incoming.totalprice} {currency}
                    </td>
                    <td className='td text-right'>
                        {(editedIncoming._id === incoming._id && (
                            <TableInput
                                value={editedIncoming.price.sellingprice}
                                onChange={(e) =>
                                    changeHandler(e, 'sellingprice')
                                }
                                type={'number'}
                            />
                        )) || (
                            <span>
                                {incoming.price.sellingprice}{' '}
                                <span className='text-primary-800'>
                                    {currency}
                                </span>
                            </span>
                        )}
                    </td>
                    <td className='td border-r-0 py-[6px]'>
                        <div className='flex justify-center items-center gap-[0.625rem]'>
                            {editedIncoming._id === incoming._id ? (
                                <>
                                    <TableBtn
                                        type={'save'}
                                        bgcolor={'bg-success-500'}
                                        onClick={() =>
                                            saveEditIncoming(incoming)
                                        }
                                    />
                                </>
                            ) : (
                                <>
                                    <TableBtn
                                        type={'edit'}
                                        bgcolor={'bg-warning-500'}
                                        onClick={() => Edit(incoming)}
                                    />
                                </>
                            )}
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
