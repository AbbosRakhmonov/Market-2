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

const ReportPage = () => {
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
    const [totalPage, setTotalPage] = useState(1)
    const [sendingSearch, setSendingSearch] = useState({
        id: '',
        client: '',
    })
    const [localSearch, setLocalSearch] = useState({
        id: '',
        client: '',
    })
    const [storageData, setStorageData] = useState([])
    const [currentData, setCurrentData] = useState([])

    const searchId = (e) => {
        let target = e.target.value
        setCurrentData([
            ...storageData.filter((item) =>
                item.saleconnector.id.includes(target)
            ),
        ])
        setLocalSearch({
            ...localSearch,
            id: target,
        })
    }

    const searchClientName = (e) => {
        let target = e.target.value.toLowerCase()
        setCurrentData([
            ...storageData.filter(
                (item) =>
                    item.client &&
                    item.client.name.toLowerCase().includes(target)
            ),
        ])
        setLocalSearch({
            ...localSearch,
            client: target,
        })
    }

    const onKeySearch = (e) => {
        if (e.key === 'Enter') {
            setSendingSearch(localSearch)
        }
    }

    useEffect(() => {
        const check = (page) => id === page
        let body = {
            currentPage,
            countPage,
            startDate,
            endDate,
            market: _id,
            search: sendingSearch,
        }
        check('sale') && dispatch(getSales(body))
        check('income') && dispatch(getProfit(body))
        check('cash') && dispatch(getPaymentReport(body))
        check('card') && dispatch(getPaymentReport(body))
        check('transfer') && dispatch(getPaymentReport(body))
        check('debts') && dispatch(getDebts({market: _id}))
        check('discounts') && dispatch(getDiscounts(body))

        return () => {
            dispatch(clearDatas())
        }
    }, [
        dispatch,
        sendingSearch,
        currentPage,
        countPage,
        startDate,
        endDate,
        _id,
        id,
    ])
    useEffect(() => {
        if (id === 'cash' || id === 'card' || id === 'transfer') {
            setCurrentData([...datas.filter((item) => item[id] > 0)])
            setStorageData([...datas.filter((item) => item[id] > 0)])
        } else {
            setCurrentData(datas)
            setStorageData(datas)
        }
        return () => {
            setCurrentData([])
            setStorageData([])
        }
    }, [datas, id])

    useEffect(() => {
        count > 0 && setTotalPage(count)
    }, [count])

    return (
        <div>
            <div className='flex items-center justify-between mainPadding'>
                <LinkToBack link={'/kassa'} />
                {id !== 'debts' && (
                    <SearchForm
                        filterBy={['startDate', 'endDate']}
                        startDate={startDate}
                        endDate={endDate}
                        setStartDate={setStartDate}
                        setEndDate={setEndDate}
                    />
                )}
            </div>
            <div className='flex items-center justify-between'>
                <SearchForm
                    filterBy={
                        id === 'debts'
                            ? ['id', 'clientName']
                            : ['total', 'id', 'clientName']
                    }
                    filterByTotal={setCountPage}
                    filterById={searchId}
                    filterByClientName={searchClientName}
                    filterByIdWhenPressEnter={onKeySearch}
                    filterByClientNameWhenPressEnter={onKeySearch}
                />
                {id !== 'debts' && (
                    <Pagination
                        countPage={countPage}
                        currentPage={currentPage}
                        totalDatas={totalPage}
                        setCurrentPage={setCurrentPage}
                    />
                )}
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
export default ReportPage
