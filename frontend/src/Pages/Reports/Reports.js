import React, { useEffect, useState } from 'react'
import CheckoutCards from '../../Components/CheckoutCard/CheckoutCards'
import SearchForm from '../../Components/SearchForm/SearchForm.js'
import { useDispatch, useSelector } from 'react-redux'
import { universalToast } from '../../Components/ToastMessages/ToastMessages.js'
import { uniqueId,map } from 'lodash'
import { clearErrorReports, getReports } from './reportsSlice.js'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

const Reports = () => {
    const { t } = useTranslation(['common'])

    const card = [
        {
            name: 'Savdo',
            type: 'sale',
            percentage: 99
        },
        {
            name: 'Sof foyda',
            type: 'income'
        },
        {
            name: 'Xarajatlar',
            type: 'expenses'
        },
        {
            name: 'Naqd',
            type: 'cash'
        },
        {
            name: 'Plastik',
            type: 'card'
        },
        {
            name: 'O`tkazmalar',
            type: 'transfer'
        },
        {
            name: 'Qaytarilgan',
            type: 'backproducts'
        },
        {
            name: 'Chegirmalar',
            type: 'discounts'
        },
        {
            name: 'Qarzlar',
            type: 'debts'
        }
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
            endDate: endDate.toISOString()
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
        <motion.section
            key='content'
            initial='collapsed'
            animate='open'
            exit='collapsed'
            variants={{
                open: { opacity: 1, height: 'auto' },
                collapsed: { opacity: 0, height: 0 }
            }}
            transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
        >
            <SearchForm
                filterBy={['startDate', 'endDate', 'printBtn']}
                startDate={startDate}
                endDate={endDate}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
            />
            <div className='checkout-card mainPadding'>
                {reports &&
                    map(card,(i) => (
                        <CheckoutCards
                            key={uniqueId('card')}
                            path={i.type}
                            name={t(i.name)}
                            type={i.type}
                            percentage={i.percentage}
                            cost={i.cost}
                            currency={currencyType}
                            report={reports && reports[i.type]}
                        />
                    ))}
            </div>
        </motion.section>
    )
}

export default Reports
