import React, {useEffect, useState, useCallback} from 'react'
import * as XLSX from 'xlsx'
import Table from '../../Components/Table/Table'
import Pagination from '../../Components/Pagination/Pagination'
import SearchForm from '../../Components/SearchForm/SearchForm.js'
import { useDispatch, useSelector } from 'react-redux'
import { universalToast } from '../../Components/ToastMessages/ToastMessages.js'
import Spinner from '../../Components/Spinner/SmallLoader.js'
import NotFind from '../../Components/NotFind/NotFind.js'
import { motion } from 'framer-motion'
import {getConnectors, postInventoriesId} from './inventorieSlice.js'
function Inventories() {
    const headers = [
        { styles: 'w-[10%] text-start', title: '№' },
        { styles: 'w-[10%] text-start', filter: 'createdAt', title: 'Sana' },
        { styles: 'w-[10%] text-start', filter: 'id', title: 'ID' },
        { styles: 'text-start', title: 'Maxsulotlar' },
        { styles: 'w-[10%]', title: 'Holati' },
        { styles: 'w-[10%]', title: ' ' },
    ]

    const dispatch = useDispatch()

    const {connectors, errorConnectors, clearErrorConnectors, loading, total, dataId} =
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
    const filterByTotal = ({ value }) => {
        setShowByTotal(value)
        setCurrentPage(0)
    }

   



    // excel function
   const headersInventories = [
      "№",
      "Sana",
      "Kodi",
      "Maxsulot",
      "Dastlabki",
      "Sanoq",
      "Farqi",
      "FarqiUSD"
    ]


    const autoFillColumnWidth = (json) => {
        const cols = Object.keys(json[0])
        const maxLength = cols.reduce((acc, curr) => {
            return acc > curr.length ? acc : curr.length
        }, 0)
        return cols.map((col) => ({
            wch: maxLength,
        }))
    }
    const continueHandleClick = useCallback(
        (data) => {
            const wscols = autoFillColumnWidth(data)
            const wb = XLSX.utils.book_new()
            const ws = XLSX.utils.json_to_sheet([])
            ws['!cols'] = wscols
            XLSX.utils.sheet_add_aoa(ws, [headersInventories])
            XLSX.utils.sheet_add_json(ws, data, {
                origin: 'A2',
                skipHeader: true,
            })
            XLSX.utils.book_append_sheet(wb, ws, 'Maxsulotlar')
            XLSX.writeFile(
                wb,
                `${"Invertarizatsiyalar"}-${new Date().toLocaleDateString()}.xlsx`
            )
        },
        [ headers]
    )

    const handleClick = (e) => {
        const body = {
            id : e._id
        }
        dispatch(postInventoriesId(body))
        if (dataId.length > 0) {
                const newData = dataId.map((item, index) => ({
                    nth: index + 1,
                    data: item.createdAt,
                    code: item.productdata.code,
                    name: item.productdata.name,
                    initial: item.productcount,
                    count:item.inventorycount,
                    difference:item.inventorycount-item.productcount,
                    differenceUSD : item.inventorycount*item.price.incomingprice - item.productcount*item.price.incomingprice
                }))
                 continueHandleClick(newData)  
        } 
    }


    // excel function

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
        <motion.section
            key='content'
            initial='collapsed'
            animate='open'
            exit='collapsed'
            variants={{
                open: { opacity: 1, height: 'auto' },
                collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}>
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
                        Excel={handleClick}
                    />
                )}
            </div>
        </motion.section>
    )
}

export default Inventories
