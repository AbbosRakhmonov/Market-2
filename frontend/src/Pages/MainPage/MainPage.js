import React, {useEffect, useState} from 'react'
import LineChart from '../../Components/LineChart/LineChart.js'
import PieChart from '../../Components/PieChart/PieChart.js'
import DailyCircle from '../../Components/DailyCircle/DailyCircle.js'
import {useDispatch, useSelector} from 'react-redux'
import {getReports} from '../Reports/reportsSlice.js'
import {getCurrency} from '../Currency/currencySlice.js'

function MainPage() {
    const {reports, clearErrorrReports, errorReports} = useSelector(
        (state) => state.reports
    )
    const dispatch = useDispatch()
    const [startDate, setStartDate] = useState(
        new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            new Date().getDate()
        )
    )
    const [endDate, setEndDate] = useState(new Date())
    const {currencyType} = useSelector((state) => state.currency)
    useEffect(() => {
        dispatch(getCurrency())
    }, [dispatch])
    useEffect(() => {
        const body = {
            startDate: new Date(
                new Date(startDate).getFullYear(),
                new Date(startDate).getMonth(),
                new Date(startDate).getDate()
            ).toISOString(),
            endDate: endDate.toISOString(),
        }
        dispatch(getReports(body))
    }, [dispatch, startDate, endDate])
    return (
        <section
            className={
                'mainPadding pr-[2.5rem] flex flex-col gap-[5rem] overflow-y-auto overflow-x-hidden'
            }
        >
            <div className={'flex items-center justify-around gap-[3.1rem]'}>
                <DailyCircle
                    text={reports?.sale?.salecount}
                    label={'Sotuvlar soni'}
                />
                <DailyCircle
                    nth={1}
                    text={
                        currencyType === 'UZS'
                            ? reports?.sale?.saleuzs?.toLocaleString()
                            : reports?.sale?.sale?.toLocaleString()
                    }
                    label={'Sotuv summasi'}
                />
                <DailyCircle
                    nth={2}
                    text={
                        currencyType === 'UZS'
                            ? reports?.income?.incomeuzs?.toLocaleString()
                            : reports?.income?.income?.toLocaleString()
                    }
                    label={'Sof foyda'}
                />
                <DailyCircle nth={3} text={0} label={'Xarajatlar'} />
            </div>
            <div className={'h-[25rem]'}>
                <LineChart
                    label={'Oylik sotuvlar soni'}
                    arr={[100, 95, 80, 90, 110]}
                />
            </div>
            <div className={'flex gap-[5%] h-[25rem]'}>
                <div className={'w-[65%]'}>
                    <LineChart
                        label={'Oylik sotuvlar summasi'}
                        arr={[100, 95, 80, 90, 110]}
                    />
                </div>
                <div className={'w-[30%]'}>
                    <PieChart
                        arr={[
                            currencyType === 'UZS'
                                ? reports?.income?.incomeuzs?.toLocaleString()
                                : reports?.income?.income?.toLocaleString(),
                            120,
                        ]}
                    />
                </div>
            </div>
        </section>
    )
}

export default MainPage
