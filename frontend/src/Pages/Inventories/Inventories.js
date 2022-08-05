import React, {useEffect, useState} from 'react'
import Table from '../../Components/Table/Table'
import Pagination from '../../Components/Pagination/Pagination'
import SearchForm from '../../Components/SearchForm/SearchForm.js'
import {useDispatch, useSelector} from 'react-redux'
import {universalToast} from '../../Components/ToastMessages/ToastMessages.js'
import Spinner from '../../Components/Spinner/SmallLoader.js'
import NotFind from '../../Components/NotFind/NotFind.js'
import {getConnectors} from './inventorieSlice.js'

function Inventories() {
    const headers = [
        {styles: 'w-[10%] text-start', title: '№'},
        {styles: 'w-[10%] text-start', filter: 'createdAt', title: 'Sana'},
        {styles: 'w-[10%] text-start', filter: 'id', title: 'ID'},
        {styles: 'text-start', title: 'Maxsulotlar'},
        {styles: 'w-[10%]', title: 'Holati'},
        {styles: 'w-[10%]', title: ' '},
    ]

    const dispatch = useDispatch()
    const {connectors, errorConnectors, clearErrorConnectors, loading, total} =
        useSelector((state) => state.inventoryConnectors)
    const [data, setData] = useState(connectors)
    const [showByTotal, setShowByTotal] = useState('10')
    const [currentPage, setCurrentPage] = useState(0)
    const [filteredDataTotal, setFilteredDataTotal] = useState(total)
    const [startDate, setStartDate] = useState(
        new Date(new Date().getFullYear(), new Date().getMonth(), 1)
    )
    const [endDate, setEndDate] = useState(new Date())

    // filter by total
    const filterByTotal = ({value}) => {
        setShowByTotal(value)
        setCurrentPage(0)
    }

    useEffect(() => {
        if (errorConnectors) {
            universalToast(errorConnectors, 'error')
            dispatch(clearErrorConnectors())
        }
    }, [dispatch, clearErrorConnectors, errorConnectors])
    useEffect(() => {
        const body = {
            currentPage,
            countPage: showByTotal,
            startDate: new Date(
                new Date(startDate).getFullYear(),
                new Date(startDate).getMonth(),
                new Date(startDate).getDate()
            ).toISOString(),
            endDate: endDate.toISOString(),
        }
        dispatch(getConnectors(body))
    }, [currentPage, showByTotal, dispatch, startDate, endDate])
    useEffect(() => {
        setData(connectors)
    }, [connectors])
    useEffect(() => {
        setFilteredDataTotal(total)
    }, [total])
    return (
        <section>
            <div className='inventoriesHead mainPadding'>
                <div className='font-[400] text-[1.25rem] text-blue-900'>
                    Invertarizatsiyalar
                </div>
                <div>
                    {filteredDataTotal !== 0 && (
                        <Pagination
                            countPage={Number(showByTotal)}
                            totalDatas={filteredDataTotal}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                        />
                    )}
                </div>
            </div>
            <SearchForm
                filterBy={['total', 'startDate', 'endDate']}
                filterByTotal={filterByTotal}
                setEndDate={setEndDate}
                setStartDate={setStartDate}
                startDate={startDate}
                endDate={endDate}
            />
            <div className='tableContainerPadding'>
                {loading ? (
                    <Spinner />
                ) : data.length === 0 ? (
                    <NotFind text={'Invnentarizatsiyalar mavjud emas!'} />
                ) : (
                    <Table
                        page='inventories'
                        currentPage={currentPage}
                        countPage={showByTotal}
                        data={data}
                        headers={headers}
                    />
                )}
            </div>
        </section>
    )
}

export default Inventories
