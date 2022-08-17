import React, {useEffect, useState} from 'react'
import ExportBtn from '../../../Components/Buttons/ExportBtn.js'
import Pagination from '../../../Components/Pagination/Pagination.js'
import Table from '../../../Components/Table/Table.js'
import SearchForm from '../../../Components/SearchForm/SearchForm.js'
import {useDispatch, useSelector} from 'react-redux'
import Spinner from '../../../Components/Spinner/SmallLoader.js'
import NotFind from '../../../Components/NotFind/NotFind.js'
import {motion} from 'framer-motion'
import {
    clearSearchedSellings,
    getSellings,
    getSellingsByFilter,
    excelAllSellings
} from '../Slices/sellingsSlice.js'
import {regexForTypeNumber} from '../../../Components/RegularExpressions/RegularExpressions.js'
import UniversalModal from '../../../Components/Modal/UniversalModal.js'

const Sellings = () => {
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
        {
            title: '',
            styles: 'w-[7rem]',
        },
    ]
    const dispatch = useDispatch()
    const {currencyType} = useSelector((state) => state.currency)
    const {
        sellings,
        searchedSellings,
        getSellingsLoading,
        total,
        totalSearched,
        excelAllData
    } = useSelector((state) => state.sellings)
    const [data, setData] = useState(sellings)
    const [filteredDataTotal, setFilteredDataTotal] = useState(total)
    const [searchedData, setSearchedData] = useState(searchedSellings)
    const [showByTotal, setShowByTotal] = useState('10')
    const [currentPage, setCurrentPage] = useState(0)
    const [search, setSearch] = useState({
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
    const [printedSelling, setPrintedSelling] = useState(null)
    const [modalVisible, setModalVisible] = useState(false)

    // filter by total
    const filterByTotal = ({value}) => {
        setShowByTotal(value)
        setCurrentPage(0)
    }

    // handle change client and id
    const handleChangeId = (e) => {
        const val = e.target.value
        const valForSearch = val.replace(/\s+/g, ' ').trim()
        regexForTypeNumber.test(val) && setSearch({...search, id: val})
        ;(searchedData.length > 0 || totalSearched > 0) &&
            dispatch(clearSearchedSellings())
        if (valForSearch === '') {
            setData(sellings)
            setFilteredDataTotal(total)
        } else {
            const filteredProducts = sellings.filter((selling) => {
                return selling.id.includes(valForSearch)
            })
            setData(filteredProducts)
            setFilteredDataTotal(filteredProducts.length)
        }
    }
    const handleChangeClient = (e) => {
        const val = e.target.value
        const valForSearch = val.toLowerCase().replace(/\s+/g, ' ').trim()
        setSearch({...search, client: val})
        ;(searchedData.length > 0 || totalSearched > 0) &&
            dispatch(clearSearchedSellings())
        if (valForSearch === '') {
            setData(sellings)
            setFilteredDataTotal(total)
        } else {
            const filteredProducts = sellings.filter((selling) => {
                return (
                    selling?.client?.name
                        .toLowerCase()
                        .includes(valForSearch) ||
                    selling?.packman?.name.toLowerCase().includes(valForSearch)
                )
            })
            setData(filteredProducts)
            setFilteredDataTotal(filteredProducts.length)
        }
    }
    const handleChangeIdAndClientWhenPressEnter = (e) => {
        if (e.key === 'Enter') {
            setCurrentPage(0)
            const body = {
                currentPage,
                countPage: showByTotal,
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString(),
                search: search,
            }
            dispatch(getSellingsByFilter(body))
        }
    }

    const toggleModal = () => {
        setModalVisible(!modalVisible)
        setPrintedSelling(null)
    }

    const sellingHeaders = [
        '№',
        'ID',
        'Mijoz',
        'Jami UZS',
        'Jami USD',
        'Chegirma UZS',
        'Chegirma USD',
        'Qarz UZS',
        'Qarz USD',
    ]

    const handleClickPrint = (selling) => {
        setPrintedSelling(selling)
        setModalVisible(true)
    }

    // effects
    useEffect(() => {
        setData(sellings)
    }, [sellings])
    useEffect(() => {
        setSearchedData(searchedSellings)
    }, [searchedSellings])
    useEffect(() => {
        setFilteredDataTotal(total)
    }, [total])
    useEffect(() => {
        const body = {
            currentPage,
            countPage: showByTotal,
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
            search: {
                id: '',
                client: '',
            },
        }
        dispatch(getSellings(body))
    }, [currentPage, showByTotal, startDate, endDate, dispatch])

    useEffect(() => {
      const body = {
        startDate,
        endDate,
        search
      }
      dispatch(excelAllSellings(body))
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
            <UniversalModal
                printedSelling={printedSelling}
                currency={currencyType}
                body={'allChecks'}
                isOpen={modalVisible}
                toggleModal={toggleModal}
            />
            <div className='pagination mainPadding'>
                <ExportBtn
                    headers={sellingHeaders}
                    datas={excelAllData}
                    fileName={`Sotuvlar-${new Date().toLocaleDateString()}`}
                    pagesName='Sellings'
                />
                <p className='flex items-center'>Sotuvlar</p>
                {(filteredDataTotal !== 0 || totalSearched !== 0) && (
                    <Pagination
                        countPage={Number(showByTotal)}
                        totalDatas={totalSearched || filteredDataTotal}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                )}
            </div>
            <SearchForm
                filterBy={['total', 'startDate', 'endDate', 'id', 'clientName']}
                filterByTotal={filterByTotal}
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
                filterByIdWhenPressEnter={handleChangeIdAndClientWhenPressEnter}
            />
            <div className='tableContainerPadding'>
                {getSellingsLoading ? (
                    <Spinner />
                ) : data.length === 0 && searchedData.length === 0 ? (
                    <NotFind text={"Ro'yxat mavjud emas..."} />
                ) : (
                    <Table
                        data={data}
                        currentPage={currentPage}
                        currency={currencyType}
                        countPage={showByTotal}
                        page={'saleslist'}
                        headers={headers}
                        Print={handleClickPrint}
                    />
                )}
            </div>
        </motion.section>
    )
}

export default Sellings
