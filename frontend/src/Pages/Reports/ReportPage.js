import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'
import LinkToBack from '../../Components/LinkToBack/LinkToBack'
import Pagination from '../../Components/Pagination/Pagination'
import SearchForm from '../../Components/SearchForm/SearchForm'
import Table from '../../Components/Table/Table'
import {
    clearDatas,
    getDebts,
    getDiscounts,
    getPaymentReport,
    getProfit,
    getSales,
} from './reportsSlice'
import {ReportsTableHeaders} from './ReportsTableHeaders'

export const ReportPage = () => {
    const {id} = useParams()

    const dispatch = useDispatch()

    const {market: _id} = useSelector((state) => state.login)
    const {datas, count} = useSelector((state) => state.reports)
    const {currencyType} = useSelector((state) => state.currency)

    const [startDate, setStartDate] = useState(
        new Date(new Date().getFullYear(), new Date().getMonth(), 1)
    )
    const [endDate, setEndDate] = useState(new Date())
    const [currentPage, setCurrentPage] = useState(0)
    const [countPage, setCountPage] = useState(10)

    const [currentData, setCurrentData] = useState([])

    useEffect(() => {
        const check = (page) => id === page
        let body = {
            currentPage,
            countPage,
            startDate,
            endDate,
            market: _id,
        }
        check('sale') && dispatch(getSales(body))
        check('income') && dispatch(getProfit(body))
        check('cash') && dispatch(getPaymentReport(body))
        check('card') && dispatch(getPaymentReport(body))
        check('transfer') && dispatch(getPaymentReport(body))
        check('debts') && dispatch(getDebts(body))
        check('discounts') && dispatch(getDiscounts(body))

        return () => {
            dispatch(clearDatas())
        }
    }, [dispatch, currentPage, countPage, startDate, endDate, _id, id])

    useEffect(() => {
        if (id === 'cash' || id === 'card' || id === 'transfer') {
            setCurrentData([...datas.filter((item) => item[id] > 0)])
        } else {
            setCurrentData(datas)
        }
        return () => {
            setCurrentData([])
        }
    }, [datas, id])

    return (
        <div>
            <div className='flex items-center justify-between mainPadding'>
                <LinkToBack link={'/kassa'} />
                <SearchForm
                    filterBy={['startDate', 'endDate']}
                    startDate={startDate}
                    endDate={endDate}
                    setStartDate={setStartDate}
                    setEndDate={setEndDate}
                />
            </div>
            <div className='mainPadding flex items-center justify-end'>
                <Pagination
                    countPage={countPage}
                    currentPage={currentPage}
                    totalDatas={count}
                    setCurrentPage={setCurrentPage}
                />
            </div>
            <div className='mainPadding'>
                {currentData.length > 0 && (
                    <Table
                        page={id}
                        headers={ReportsTableHeaders(id)}
                        data={currentData}
                        currentPage={currentPage}
                        countPage={countPage}
                        currency={currencyType}
                        type={id}
                    />
                )}
            </div>
        </div>
    )
}
