import React, {useEffect, useState} from 'react'
import CheckoutCards from '../../Components/CheckoutCard/CheckoutCards'
import SearchForm from '../../Components/SearchForm/SearchForm.js'
import {useDispatch, useSelector} from 'react-redux'
import {universalToast} from '../../Components/ToastMessages/ToastMessages.js'
import {uniqueId, map} from 'lodash'
import {
    clearErrorReports,
    getIncomings,
    getProducts,
    getReports,
    getReportsForTotal,
    getSaleProducts,
} from './reportsSlice.js'
import {useTranslation} from 'react-i18next'
import {motion} from 'framer-motion'
import UniversalModal from '../../Components/Modal/UniversalModal'

const Reports = () => {
    const {t} = useTranslation(['common'])

    const card = [
        {
            name: 'Savdo',
            type: 'sale',
            percentage: 99,
        },
        {
            name: 'Sof foyda',
            type: 'income',
        },
        {
            name: 'Xarajatlar',
            type: 'expenses',
        },
        {
            name: 'Naqd',
            type: 'cash',
        },
        {
            name: 'Plastik',
            type: 'card',
        },
        {
            name: 'O`tkazmalar',
            type: 'transfer',
        },
        {
            name: 'Qaytarilgan',
            type: 'backproducts',
        },
        {
            name: 'Chegirmalar',
            type: 'discounts',
        },
        {
            name: 'Qarzlar',
            type: 'debts',
        },
    ]

    const dispatch = useDispatch()
    const {
        reports,
        clearErrorrReports,
        errorReports,
        productreport,
        incomingreport,
        totalreports,
        saleproductsreport,
    } = useSelector((state) => state.reports)
    const [startDate, setStartDate] = useState(
        new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            new Date().getDate()
        )
    )
    const [endDate, setEndDate] = useState(new Date())
    const {currencyType} = useSelector((state) => state.currency)
    const [modalVisible, setModalVisible] = useState(false)
    const [modalData, setModalData] = useState(null)
    const [modalBody, setModalBody] = useState(null)

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

    useEffect(() => {
        let body = {
            startDate: new Date(
                new Date().setMonth(new Date().getMonth() - 1)
            ).toISOString(),
            endDate: new Date(),
        }
        dispatch(getProducts())
        dispatch(getIncomings(body))
        dispatch(getReportsForTotal(body))
        dispatch(getSaleProducts(body))
    }, [dispatch])

    return (
        <motion.section
            key='content'
            initial='collapsed'
            animate='open'
            exit='collapsed'
            variants={{
                open: {opacity: 1, height: 'auto'},
                collapsed: {opacity: 0, height: 0},
            }}
            transition={{duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98]}}
        >
            <SearchForm
                filterBy={['startDate', 'endDate', 'printBtn']}
                startDate={startDate}
                endDate={endDate}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
                clickPrintBtn={() => {
                    setModalVisible(true)
                    setModalBody('totalReport')
                    setModalData(null)
                }}
            />
            <div className='checkout-card mainPadding'>
                {reports &&
                    map(card, (i) => (
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
            <UniversalModal
                body={modalBody}
                toggleModal={() => {
                    setModalVisible(false)
                    setModalBody('')
                    setModalData(null)
                }}
                incomingreport={incomingreport}
                productreport={productreport}
                saleproductsreport={saleproductsreport}
                totalreports={totalreports}
                currency={currencyType}
                isOpen={modalVisible}
                headerText={
                    modalBody === 'complete' &&
                    "To'lovni amalga oshirishni tasdiqlaysizmi ?"
                }
                title={
                    modalBody === 'complete' &&
                    "To'lovni amalga oshirgach bu ma`lumotlarni o`zgaritirb bo`lmaydi !"
                }
            />
        </motion.section>
    )
}

export default Reports
