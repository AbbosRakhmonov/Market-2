import React, {useEffect, useRef, useState} from 'react'
import ExportBtn from '../../Components/Buttons/ExportBtn'
import Pagination from '../../Components/Pagination/Pagination'
import Table from '../../Components/Table/Table'
import {motion} from 'framer-motion'
import SearchForm from '../../Components/SearchForm/SearchForm.js'
import {useDispatch, useSelector} from 'react-redux'
import Spinner from '../../Components/Spinner/SmallLoader.js'
import NotFind from '../../Components/NotFind/NotFind.js'
import {
    clearSearchedProducts,
    getProducts,
    getProductsByFilter,
} from '../Products/Create/productSlice.js'
import {useReactToPrint} from 'react-to-print'
import {BarCode} from '../../Components/BarCode/BarCode.js'
import {universalSort} from '../../App/globalFunctions.js'

const ProductReport = () => {
    const headers = [
        {
            title: '№',
        },
        {
            title: 'Maxsulot kodi',
            filter: 'productdata.code',
        },
        {
            title: 'Maxsulot nomi',
            filter: 'productdata.name',
        },
        {
            title: 'Soni(dona)',
            filter: 'product.total',
        },
        {
            title: 'Olish',
            filter: 'price.incomingprice',
        },
        {
            title: 'Olish jami',
        },
        {
            title: 'Sotish',
            filter: 'price.sellingprice',
        },
        {
            title: 'Sotish jami',
        },
        {
            title: 'Cheklar soni',
        },
        {
            title: '',
        },
    ]

    const dispatch = useDispatch()
    const {products, total, loading, searchedProducts, totalSearched} =
        useSelector((state) => state.products)
    const {currencyType} = useSelector((state) => state.currency)
    const {
        market: {name},
    } = useSelector((state) => state.login)
    const [data, setData] = useState(products)
    const [searchedData, setSearchedData] = useState(searchedProducts)
    const [filteredDataTotal, setFilteredDataTotal] = useState(total)
    const [showByTotal, setShowByTotal] = useState('10')
    const [currentPage, setCurrentPage] = useState(0)
    const [searchByCode, setSearchByCode] = useState('')
    const [searchByName, setSearchByName] = useState('')

    const [productForCheque, setProductForCheque] = useState(null)
    const [productForCheques, setProductForCheques] = useState(null)
    const [countOfCheque, setCountOfCheque] = useState(null)
    const [countOfCheques, setCountOfCheques] = useState(null)
    const [sorItem, setSorItem] = useState({
        filter: '',
        sort: '',
        count: 0,
    })

    // handle change of search inputs
    const filterByCode = (e) => {
        let val = e.target.value
        let valForSearch = val.replace(/\s+/g, ' ').trim()
        setSearchByCode(val)
        ;(searchedData.length > 0 || totalSearched > 0) &&
            dispatch(clearSearchedProducts())
        if (valForSearch === '') {
            setData(products)
            setFilteredDataTotal(total)
        } else {
            const filteredProducts = products.filter((product) => {
                return product.productdata.code.includes(valForSearch)
            })
            setData(filteredProducts)
            setFilteredDataTotal(filteredProducts.length)
        }
    }
    const filterByName = (e) => {
        let val = e.target.value
        let valForSearch = val.toLowerCase().replace(/\s+/g, ' ').trim()
        setSearchByName(val)
        ;(searchedData.length > 0 || totalSearched > 0) &&
            dispatch(clearSearchedProducts())
        if (valForSearch === '') {
            setData(products)
            setFilteredDataTotal(total)
        } else {
            const filteredProducts = products.filter((product) => {
                return product.productdata.name
                    .toLowerCase()
                    .includes(valForSearch)
            })
            setData(filteredProducts)
            setFilteredDataTotal(filteredProducts.length)
        }
    }

    // filter by total
    const filterByTotal = ({value}) => {
        setShowByTotal(value)
        setCurrentPage(0)
    }

    const filterData = (filterKey) => {
        if (filterKey === sorItem.filter) {
            switch (sorItem.count) {
                case 1:
                    setSorItem({
                        filter: filterKey,
                        sort: '1',
                        count: 2,
                    })
                    universalSort(
                        searchedData.length > 0 ? searchedData : data,
                        searchedData.length > 0 ? setSearchedData : setData,
                        filterKey,
                        1,
                        searchedData.length > 0 ? searchedProducts : products
                    )
                    break
                case 2:
                    setSorItem({
                        filter: filterKey,
                        sort: '',
                        count: 0,
                    })
                    universalSort(
                        searchedData.length > 0 ? searchedData : data,
                        searchedData.length > 0 ? setSearchedData : setData,
                        filterKey,
                        '',
                        searchedData.length > 0 ? searchedProducts : products
                    )
                    break
                default:
                    setSorItem({
                        filter: filterKey,
                        sort: '-1',
                        count: 1,
                    })
                    universalSort(
                        searchedData.length > 0 ? searchedData : data,
                        searchedData.length > 0 ? setSearchedData : setData,
                        filterKey,
                        -1,
                        searchedData.length > 0 ? searchedProducts : products
                    )
            }
        } else {
            setSorItem({
                filter: filterKey,
                sort: '-1',
                count: 1,
            })
            universalSort(
                searchedData.length > 0 ? searchedData : data,
                searchedData.length > 0 ? setSearchedData : setData,
                filterKey,
                -1,
                searchedData ? searchedProducts : products,
                searchedData.length > 0
            )
        }
    }

    // handle print
    const componentRef = useRef()

    const handleChequeCounts = (e) => {
        setCountOfCheques(parseInt(e.target.value))
        setProductForCheques(searchedData.length > 0 ? searchedData : data)
    }

    const handleChequeCount = (e, product) => {
        setCountOfCheque(parseInt(e.target.value))
        setProductForCheque(product)
    }

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    })

    const handlePrintToProduct = async () => {
        await handlePrint()
        setCountOfCheque(null)
        setCountOfCheques(null)
        setProductForCheque(null)
        setProductForCheques(null)
    }

    const filterByCodeAndNameAndCategoryWhenPressEnter = (e) => {
        if (e.key === 'Enter') {
            setCurrentPage(0)
            const body = {
                currentPage: 0,
                countPage: showByTotal,
                search: {
                    name: searchByName.replace(/\s+/g, ' ').trim(),
                    code: searchByCode.replace(/\s+/g, ' ').trim(),
                },
            }
            dispatch(getProductsByFilter(body))
        }
    }

    useEffect(() => {
        const body = {
            currentPage,
            countPage: showByTotal,
            search: {
                code: '',
                name: '',
                category: '',
            },
        }
        dispatch(getProducts(body))
    }, [currentPage, showByTotal, dispatch])
    useEffect(() => {
        setData(products)
    }, [products])

    useEffect(() => {
        setFilteredDataTotal(total)
    }, [total])

    useEffect(() => {
        setSearchedData(searchedProducts)
    }, [searchedProducts])

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
            <div className='pagination mainPadding'>
                <ExportBtn data={[]} headers={[]} />
                <p className='product_name'>Maxsulot hisoboti</p>
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
                filterBy={['total', 'code', 'name', 'checks', 'printBtn']}
                filterByCode={filterByCode}
                filterByName={filterByName}
                searchByCode={searchByCode}
                searchByName={searchByName}
                filterByTotal={filterByTotal}
                filterByCodeAndNameAndCategoryWhenPressEnter={
                    filterByCodeAndNameAndCategoryWhenPressEnter
                }
                clickPrintBtn={handlePrintToProduct}
                setNumberOfChecks={handleChequeCounts}
            />
            <div className='tableContainerPadding'>
                {loading ? (
                    <Spinner />
                ) : data.length === 0 && searchedData.length === 0 ? (
                    <NotFind text={'Maxsulotlar mavjud emas'} />
                ) : (
                    <Table
                        page={'productreport'}
                        data={searchedData.length > 0 ? searchedData : data}
                        currentPage={currentPage}
                        countPage={showByTotal}
                        currency={currencyType}
                        headers={headers}
                        Sort={filterData}
                        sortItem={sorItem}
                        placeholder={'misol : 10'}
                        productCheque={{}}
                        changeHandler={handleChequeCount}
                        Print={handlePrintToProduct}
                    />
                )}
            </div>
            <div className='hidden'>
                <BarCode
                    currency={currencyType}
                    componentRef={componentRef}
                    countOfCheque={countOfCheque}
                    countOfCheques={countOfCheques}
                    productForCheque={productForCheque}
                    productForCheques={productForCheques}
                    marketName={name}
                />
            </div>
        </motion.section>
    )
}

export default ProductReport
