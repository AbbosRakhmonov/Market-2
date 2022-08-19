import React, { useEffect } from 'react'
import LineChart from '../../Components/LineChart/LineChart.js'
import PieChart from '../../Components/PieChart/PieChart.js'
import DailyCircle from '../../Components/DailyCircle/DailyCircle.js'
import { useDispatch, useSelector } from 'react-redux'
import { getMonthlyReport, getReports } from '../Reports/reportsSlice.js'
import { getCurrency } from '../Currency/currencySlice.js'
import { useTranslation } from 'react-i18next';
import {map} from 'lodash'

function MainPage() {
    const { t } = useTranslation(['common'])
    const dispatch = useDispatch()
    const { reports, monthlyReport } = useSelector(
        (state) => state.reports
    )
    const { currencyType } = useSelector((state) => state.currency)
    const filterMonthlyReport = () => {
        return monthlyReport ? (currencyType === 'USD' ? map(monthlyReport.salesSum,(item) => item.usd) : map(monthlyReport.salesSum,(item) => item.uzs)) : []
    }
    useEffect(() => {
        const body = {
            startDate: new Date(
                new Date().getFullYear(),
                new Date().getMonth(),
                new Date().getDate()
            ).toISOString(),
            endDate: new Date().toISOString()
        }
        dispatch(getReports(body))
        dispatch(getCurrency())
        dispatch(getMonthlyReport())
    }, [dispatch])
    return (
        <section
            className={
                'mainPadding pr-[2.5rem] flex flex-col gap-[5rem] overflow-y-auto overflow-x-hidden'
            }
        >
            <div className={'flex items-center justify-around gap-[3.1rem]'}>
                <DailyCircle
                    text={reports?.sale?.salecount}
                    label={t('Sotuvlar soni')}
                />
                <DailyCircle
                    nth={1}
                    text={
                        currencyType === 'UZS'
                            ? reports?.sale?.saleuzs?.toLocaleString("ru-Ru")
                            : reports?.sale?.sale?.toLocaleString("ru-Ru")
                    }
                    label={t('Sotuv summasi')}
                />
                <DailyCircle
                    nth={2}
                    text={
                        currencyType === 'UZS'
                            ? reports?.income?.incomeuzs?.toLocaleString("ru-Ru")
                            : reports?.income?.income?.toLocaleString("ru-Ru")
                    }
                    label={t('Sof foyda')}
                />
                <DailyCircle nth={3} text={0} label={t('Xarajatlar')} />
            </div>
            <div className={'h-[25rem]'}>
                <LineChart
                    label={t('Oylik sotuvlar soni')}
                    arr={[100, 95, 80, 90, 110]}
                />
            </div>
            <div className={'flex gap-[5%] h-[25rem]'}>
                <div className={'w-[65%]'}>
                    <LineChart
                        label={t('Oylik sotuvlar summasi')}
                        arr={[100, 95, 80, 90, 110]}
                    />
                </div>
                <div className={'w-[30%]'}>
                    <PieChart
                        arr={[
                            currencyType === 'UZS'
                                ? monthlyReport?.monthExpense?.uzs
                                : monthlyReport?.monthExpense?.usd,
                            currencyType === 'UZS'
                                ? monthlyReport?.monthProfit?.uzs
                                : monthlyReport?.monthProfit?.usd
                        ]}
                    />
                </div>
            </div>
        </section>
    )
}

export default MainPage

