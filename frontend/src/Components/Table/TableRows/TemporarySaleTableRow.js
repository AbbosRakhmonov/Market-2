import {uniqueId,map} from 'lodash'
import React from 'react'
import TableBtn from '../../Buttons/TableBtn'
import {useNavigate} from 'react-router-dom'

export const TemporarySaleTableRow = ({data, Delete, currency, Print}) => {
    const navigate = useNavigate()
    const linkToSale = (temporary) => {
        navigate('/sotuv/sotish', {state: {temporary: {...temporary}}})
    }
    return (
        <>
            {map(data,({_id, temporary, createdAt}, index) => (
                <tr className='tr' key={uniqueId('sale')}>
                    <td className='td'>{1 + index}</td>
                    <td className='td text-left'>
                        {temporary.userValue ||
                            temporary.clientValue.label ||
                            temporary.packmanValue.label ||
                            'Mijoz ismi kiritilmagan'}
                    </td>
                    <td className='td text-right'>
                        {temporary.tableProducts.length}
                    </td>
                    <td className='text-success-500 td text-right'>
                        {currency === 'USD'
                            ? temporary.totalPrice.toLocaleString('ru-RU')
                            : temporary.totalPriceUzs.toLocaleString('ru-RU')}
                        {currency}
                    </td>
                    <td className='td text-right'>
                        {new Date(createdAt).toLocaleDateString()}
                    </td>
                    <td className='td text-right'>
                        {new Date(createdAt).toLocaleTimeString()}
                    </td>
                    <td className='td py-[6px] border-r-0'>
                        <div className='flex items-center justify-center gap-[0.625rem]'>
                            <TableBtn
                                type={'print'}
                                bgcolor={'bg-primary-800'}
                                onClick={() =>
                                    Print({_id, temporary, createdAt})
                                }
                            />
                            <TableBtn
                                type={'edit'}
                                bgcolor={'bg-warning-500'}
                                onClick={() => linkToSale({...temporary, _id})}
                            />
                            <TableBtn
                                type={'delete'}
                                bgcolor={'bg-error-500'}
                                onClick={() => Delete(_id)}
                            />
                        </div>
                    </td>
                </tr>
            ))}
        </>
    )
}
