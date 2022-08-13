import React from 'react'

const AdminReportTable = ({number, currency, cost, plastic, transfer}) => {
    return (
        <table className='w-full'>
            <tr className='tr-div'>
                <td className='td-page'>Sotish soni</td>
                <td className='td-page-two'>{number}</td>
            </tr>
            <tr className='tr-div'>
                <td className='td-page'>Naqd</td>
                <td className='td-page-two'>{cost} {currency}</td>
            </tr>
            <tr className='tr-div'>
                <td className='td-page'>Plastik</td>
                <td className='td-page-two'>{plastic} {currency}</td>
            </tr>
            <tr className='tr-div'>
                <td className='td-page'>O`tkazma</td>
                <td className='td-page-two'>{transfer} {currency}</td>
            </tr>
        </table>
    )
}

export default AdminReportTable