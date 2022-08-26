import React from 'react'
import {map, uniqueId} from 'lodash'
import {useSelector} from 'react-redux'

function DailyReport({data}) {
    const {currencyType} = useSelector(state => state.currency)
    return (
        <>
            {map(data, (dailyReport, index) => {
                const {
                    name,
                    code,
                    count,
                    date,
                    sellingPriceUzs,
                    sellingPriceUsd,
                    paymentUzs,
                    paymentUsd,
                    client,
                    seller
                } = dailyReport
                return (
                    <tr className='tr' key={uniqueId('daily-report-row')}>
                        <td className='text-left td'>{index + 1}</td>
                        <td className='text-right td'>{name}</td>
                        <td className='text-right td'>{code}</td>
                        <td className='td flex justify-between'>{new Date(date).toLocaleDateString('ru-RU')} {new Date(date).toLocaleTimeString('ru-RU', {
                            hour: '2-digit',
                            minute: '2-digit',
                            hourCycle: 'h24'
                        })}</td>
                        <td className='text-left td'>{seller}</td>
                        <td className='text-left td'>{client}</td>
                        <td className='text-left td'>{count}</td>
                        <td className='text-right td font-medium'>{currencyType === 'UZS' ? sellingPriceUzs.toLocaleString('ru-RU') : sellingPriceUsd.toLocaleString('ru-RU')}</td>
                        <td className='text-right td font-medium'>{currencyType === 'UZS' ? paymentUzs.toLocaleString('ru-RU') : paymentUsd.toLocaleString('ru-RU')}</td>
                    </tr>
                )
            })}
        </>
    )
}

export default DailyReport