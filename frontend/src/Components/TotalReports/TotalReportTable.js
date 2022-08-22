import React from 'react'

const TotalReportTable = ({number, currency, cost, plastic, transfer}) => {
    return (
        <table className='w-full'>
            <tbody>
                <tr className='tr-div'>
                    <td className='td-page'>Sotish soni</td>
                    <td className='td-page-two'>{number}</td>
                </tr>
                <tr className='tr-div'>
                    <td className='td-page'>Naqd</td>
                    <td className='td-page-two'>
                        {cost} <span className='font-medium'>{currency}</span>
                    </td>
                </tr>
                <tr className='tr-div'>
                    <td className='td-page'>Plastik</td>
                    <td className='td-page-two'>
                        {plastic}{' '}
                        <span className='font-medium'>{currency}</span>
                    </td>
                </tr>
                <tr className='tr-div'>
                    <td className='td-page'>O`tkazma</td>
                    <td className='td-page-two'>
                        {transfer}{' '}
                        <span className='font-medium'>{currency}</span>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}

export default TotalReportTable
