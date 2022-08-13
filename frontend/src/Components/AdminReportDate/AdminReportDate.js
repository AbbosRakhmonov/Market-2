import React from 'react'
import Logo from '../../Images/logo-lg.svg'

const AdminReportDate = ({ date1, date2 }) => {
    return (
        <div className='flex justify-between items-center mainPadding'>
            <p className='text-2xl font-bold'>Moliyaviy hisobat</p>
            <img src={Logo}></img>
            <div className='flex flex-col text-center leading-[2rem] text-[#00B4CC] font-bold'>
                <p className='text-4xl '>Hisobot</p>
                <div className='text-2xl'>{date1} - {date2}</div>
            </div>
        </div>
    )
}

export default AdminReportDate