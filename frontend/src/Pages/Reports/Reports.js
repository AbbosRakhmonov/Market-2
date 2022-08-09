import React, { useEffect, useState } from 'react'
import CheckoutCards from '../../Components/CheckoutCard/CheckoutCards'
import SearchForm from '../../Components/SearchForm/SearchForm.js'
import { useDispatch, useSelector } from 'react-redux'
import { universalToast } from '../../Components/ToastMessages/ToastMessages.js'
import { uniqueId } from 'lodash'
import { clearErrorReports, getReports } from './reportsSlice.js'
import { useTranslation } from 'react-i18next'

const Reports = () => {

    const { t } = useTranslation(["common"])

    const card = [
        {
            name: `${t('Savdo')}`,
            type: 'sale',
            percentage: 99,
        },
        {
            name: `${t('Sof foyda')}`,
            type: 'income',
        },
        {
            name: `${t('Xarajatlar')}`,
            type: 'expenses',
        },
        {
            name: `${t('Naqd')}`,
            type: 'cash',
        },
        {
            name: `${t('Plastik')}`,
            type: 'card',
        },
        {
            name: `${t('O`tkazmalar')}`,
            type: 'transfer',
        },
        {
            name: `${t('Qaytarilgan')}`,
            type: 'backproducts',
        },
        {
            name: `${t('Chegirmalar')}`,
            type: 'discounts',
        },
        {
            name: `${t('Qarzlar')}`,
            type: 'debts',
        },
    ]

    const dispatch = useDispatch()
    const { reports, clearErrorrReports, errorReports } = useSelector(
        (state) => state.reports
    )
    const [startDate, setStartDate] = useState(
        new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            new Date().getDate()
        )
    )
    const [endDate, setEndDate] = useState(new Date())
    const { currencyType } = useSelector((state) => state.currency)

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
    useEffect(() => {
        if (errorReports) {
            universalToast(errorReports, 'error')
            dispatch(clearErrorReports())
        }
    }, [dispatch, clearErrorrReports, errorReports])

    return (
        <section>
            <SearchForm
                filterBy={['startDate', 'endDate', 'printBtn']}
                startDate={startDate}
                endDate={endDate}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
            />
            <div className='checkout-card mainPadding'>
                {reports &&
                    card.map((i) => (
                        <CheckoutCards
                            key={uniqueId('card')}
                            name={i.name}
                            type={i.type}
                            percentage={i.percentage}
                            cost={i.cost}
                            currency={currencyType}
                            report={reports && reports[i.type]}
                        />
                    ))}
            </div>
        </section>
    )
}

export default Reports
