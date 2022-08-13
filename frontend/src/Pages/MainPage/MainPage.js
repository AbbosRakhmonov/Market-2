import React from 'react'
import LineChart from '../../Components/LineChart/LineChart.js'
import PieChart from '../../Components/PieChart/PieChart.js'
import DailyCircle from '../../Components/DailyCircle/DailyCircle.js'

function MainPage() {
    return <section
        className={'mainPadding pr-[2.5rem] flex flex-col gap-[5rem] overflow-y-auto overflow-x-hidden'}>
        <div className={'flex items-center justify-around gap-[3.1rem]'}>
            <DailyCircle text={0} label={'Cheklar soni'} />
            <DailyCircle nth={1} text={0} label={'Sotuv summasi'} />
            <DailyCircle nth={2} text={0} label={'Sof foyda'} />
            <DailyCircle nth={3} text={0} label={'Xarajatlar'} />
        </div>
        <div className={'h-[25rem]'}>
            <LineChart label={'Oylik sotuvlar soni'} arr={[100, 95, 80, 90, 110]} />
        </div>
        <div className={'flex gap-[5%] h-[25rem]'}>
            <div className={'w-[65%]'}><LineChart label={'Oylik sotuvlar summasi'} arr={[100, 95, 80, 90, 110]} /></div>
            <div className={'w-[30%]'}><PieChart arr={[120, 10]} /></div>
        </div>
    </section>
}

export default MainPage
