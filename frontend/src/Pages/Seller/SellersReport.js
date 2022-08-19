import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'
import LinkToBack from '../../Components/LinkToBack/LinkToBack'
import Pagination from '../../Components/Pagination/Pagination'
import SearchForm from '../../Components/SearchForm/SearchForm'
import Table from '../../Components/Table/Table'
import {getSellerReports} from './sellerSlice'
import {filter} from "lodash"
const SellersReport = () => {
    const {id} = useParams()

    const dispatch = useDispatch()

    const headers = [
        {
            title: '№',
        },
        {
            title: 'Sana',
            filter: 'createdAt',
        },
        {
            title: 'ID',
            filter: 'id',
        },
        {
            title: 'Mijoz',
        },
        {
            title: 'Jami',
        },
        {
            title: 'Chegirma',
        },
        {
            title: 'Qarz',
        },
        {
            title: 'Izoh',
        },
    ]

    const {currencyType} = useSelector((state) => state.currency)
    const {sellersreport, count} = useSelector((state) => state.sellers)

    const [data, setData] = useState([])
    const [currentPage, setCurrentPage] = useState(0)
    const [countPage, setCountPage] = useState(10)
    const [search, setSearch] = useState({
        id: '',
        client: '',
    })
    const [sendingSearch, setSendingSearch] = useState({
        id: '',
        client: '',
    })
    const [startDate, setStartDate] = useState(
        new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            new Date().getDate()
        )
    )
    const [endDate, setEndDate] = useState(new Date())

    // handle change client and id
    const handleChangeId = (e) => {
        const val = e.target.value
        const valForSearch = val.replace(/\s+/g, ' ').trim()
        const filteredProducts = filter(sellersreport,(selling) => {
            return selling.id.includes(valForSearch)
        })
        setData(filteredProducts)
        setSearch({
            ...search,
            id: valForSearch,
        })
    }
    const handleChangeClient = (e) => {
        const val = e.target.value.toLowerCase()
        const filteredProducts = filter(sellersreport,(selling) => {
            return selling?.client?.name
                ? selling?.client?.name.toLowerCase().includes(val)
                : selling
        })
        setData(filteredProducts)
        setSearch({
            ...search,
            client: val,
        })
    }
    const handleChangeIdAndClientWhenPressEnter = (e) => {
        if (e.key === 'Enter') {
            setCurrentPage(0)
            setSendingSearch(search)
        }
    }

    useEffect(() => {
        let body = {
            startDate,
            endDate,
            currentPage,
            countPage,
            search: sendingSearch,
            seller: id,
        }
        dispatch(getSellerReports(body))
    }, [
        dispatch,
        startDate,
        endDate,
        currentPage,
        countPage,
        id,
        sendingSearch,
    ])

    useEffect(() => {
        setData(sellersreport)
    }, [sellersreport])

    return (
        <div className='w-full'>
            <div className='flex items-center justify-between mainPadding'>
                <LinkToBack link={'/hamkorlar/sotuvchilar'} />
            </div>
            <div className=''>
                <Pagination
                    countPage={countPage}
                    totalDatas={count || 1}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </div>
            <div className='flex w-full'>
                <SearchForm
                    filterBy={[
                        'total',
                        'startDate',
                        'endDate',
                        'id',
                        'clientName',
                    ]}
                    filterByTotal={(e) => setCountPage(e.value)}
                    startDate={startDate}
                    setStartDate={setStartDate}
                    endDate={endDate}
                    setEndDate={setEndDate}
                    searchById={search.id}
                    searchByClientName={search.client}
                    filterByClientName={handleChangeClient}
                    filterById={handleChangeId}
                    filterByClientNameWhenPressEnter={
                        handleChangeIdAndClientWhenPressEnter
                    }
                    filterByIdWhenPressEnter={
                        handleChangeIdAndClientWhenPressEnter
                    }
                />
            </div>
            <div className='mainPadding'>
                <Table
                    data={data}
                    currentPage={currentPage}
                    currency={currencyType}
                    countPage={countPage}
                    page={'saleslist'}
                    headers={headers}
                    sellers={true}
                />
            </div>
        </div>
    )
}

export default SellersReport
