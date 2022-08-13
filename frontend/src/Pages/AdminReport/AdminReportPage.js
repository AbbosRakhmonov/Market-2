import React from 'react'
import AdminReportDate from '../../Components/AdminReportDate/AdminReportDate'
import AdminReportTable from '../../Components/AdminReportTable/AdminReportTable'
import AdminReport from './../../Components/AdminReport/AdminReport'

const AdminReportPage = () => {
    return (
        <section className='a4 w-[27cm] bg-[white]'>
            <AdminReportDate date1={'13.09.22'} date2={'13.10.22'} />
            <div className='mt-[-3rem]'>
                <AdminReport text1={'Sotilganlar soni'} text2={'Umumiy savdo'} text3={'Umumiy xarajatlar'}
                             redText={true} number1={0} number2={0} number3={123456} currency={'USD'} head={true} />
            </div>
            <div className='flex mainPadding'>
                <div className='flex-[0_0_60%]'>
                    <AdminReportTable number={0} cost={0} plastic={0} transfer={0} currency={'USD'} />
                </div>
                <div className='flex flex-[0_0_40%] flex-col justify-center items-center leading-[2.1rem]'>
                    <p className='text-[36px] text-[#61BD7B] font-bold'>USD</p>
                    <p className='text-2xl font-medium text-[#00B4CC]'>Sof foyda</p>
                </div>

            </div>
            <AdminReport label1={'Sotilgan maxsulotlar hisoboti'} number1={0} number2={14} number3={158}
                         text1={'Sotish soni'} text2={'Tovar turlarining umumiy soni'}
                         text3={'Tovarlarning umumiy soni'} />
            <AdminReport label1={'Keltirilgan maxsulotlar hisoboti'} label2={'Tushumlar miqdori'} currencycost={0}
                         number1={0} number2={5} number3={749} text1={'Jami tushumlar'}
                         text2={'Tovar turlarining umumiy soni'} text3={'Tovarlarning umumiy soni'} currency={'USD'}
                         all={true} />
            <AdminReport label1={'Omborxona hisoboti'} number1={0} number2={5} number3={1207.767}
                         text1={'Tobarlarning umumiy soni'} text2={'Tovarlarning umumiy soni'}
                         text3={'Ombordagi tovarlarning umumiy miqdori'} currency={'USD'} end={true} />
        </section>
    )
}

export default AdminReportPage