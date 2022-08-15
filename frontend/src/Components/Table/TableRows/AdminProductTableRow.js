import React from 'react'
import TableBtn from '../../Buttons/TableBtn'

export const AdminProductTableRow = (
    {
        currentPage,
        countPage,
        data,
        Edit,
        Delete,
        onClickTableRow
    }) => {
    return (
        <>
            {data.map((market, index) => (
                <tr key={market._id} className='tr cursor-pointer' onClick={() => onClickTableRow(market)}>
                    <td className='td text-left'>
                        {currentPage * countPage + 1 + index}
                    </td>
                    <td className='td text-center p-[0.625rem_0.875rem]'>
                        <div
                            className={'w-[2.5rem] h-[2.5rem] mx-auto rounded-full border-[2px] border-primary-700 flex items-center justify-center p-[2px]'}>
                            {market?.image ? <img src={market.image} alt={market.name}
                                                  className={'rounded-full'} /> : `${market?.name[0].toUpperCase()}`}
                        </div>
                    </td>
                    <td className='td text-left'>
                        {market?.name}
                    </td>
                    <td className='td text-left'>{market?.director?.firstname} {market?.director?.lastname}</td>
                    <td className='td text-right'>
                        {market?.phone1}
                    </td>
                    <td className='td text-center'>
                        {market?.mainmarket ?
                            <div className='w-[24px] h-[24px] mx-auto bg-[#F79009] rounded-[50%]'></div> :
                            <div className='w-[24px] h-[24px] mx-auto bg-[#12B76A] rounded-[50%]'></div>}
                    </td>
                    <td className='td py-[0.375rem] border-r-0'>
                        <div className='flex items-center justify-center'>
                            <TableBtn
                                type={'edit'}
                                bgcolor='bg-warning-500'
                                onClick={() => Edit(market)}
                            />
                            <TableBtn
                                type={'delete'}
                                bgcolor='bg-error-500 ml-2.5'
                                onClick={() => Delete(market)}
                            />
                        </div>
                    </td>
                </tr>
            ))}
        </>
    )
}
