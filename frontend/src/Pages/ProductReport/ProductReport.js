import React, {useEffect, useState} from 'react'
import {motion} from 'framer-motion'
import {useDispatch, useSelector} from 'react-redux'
import ExportBtn from '../../Components/Buttons/ExportBtn.js'
import Pagination from '../../Components/Pagination/Pagination.js'
import {useTranslation} from 'react-i18next'
import Table from '../../Components/Table/Table.js'
import Spinner from '../../Components/Spinner/SmallLoader.js'
import SmallLoader from '../../Components/Spinner/SmallLoader.js'
import NotFind from '../../Components/NotFind/NotFind.js'
import SearchForm from '../../Components/SearchForm/SearchForm.js'
import {
    clearSearchedProducts,
    getAllProductReports,
    getProductReports,
    getProductReportsByFilter
} from './productreportSlice.js'
import {filter, map} from 'lodash'
import Dates from '../../Components/Dates/Dates.js'
import {exportExcel} from '../../App/globalFunctions.js'


function ProductReport() {
    const dispatch = useDispatch()
    const {t} = useTranslation(['common'])

    const headers = [
        {
            title: t('№')
        },
        {
            title: t('Sana')
        },
        {
            title: t('Mijoz')
        },
        {
            title: t('Kodi')
        },
        {
            title: t('Nomi')
        },
        {
            title: t('Soni')
        },
        {
            title: t('Narxi')
        },
        {
            title: t('Jami')
        },
        {
            title: t('Sotuvchi')
        }
    ]
    const {
        loading,
        products,
        searchedProducts,
        total,
        totalSearched,
        loadingExcel
    } = useSelector(state => state.productReport)
    const [data, setData] = useState(products)
    const [searchedData, setSearchedData] = useState(searchedProducts)
    const [filteredDataTotal, setFilteredDataTotal] = useState(total)
    const [showByTotal, setShowByTotal] = useState('10')
    const [currentPage, setCurrentPage] = useState(0)
    const [searchByCode, setSearchByCode] = useState('')
    const [searchByName, setSearchByName] = useState('')
    const [searchByClient, setSearchByClient] = useState('')
    const [searchBySeller, setSearchBySeller] = useState('')
    const [beginDay, setBeginDay] = useState(
        new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            1
        ).toISOString()
    )

    const [endDay, setEndDay] = useState(
        new Date(new Date().setHours(23, 59, 59, 0)).toISOString()
    )
    const filterByTotal = ({value}) => {
        setShowByTotal(value)
        setCurrentPage(0)
    }
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
            const filteredProducts = filter(products, (product) => {
                return product.product.productdata.code.includes(valForSearch)
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
            const filteredProducts = filter(products, (product) => {
                return product.product.productdata.name
                    .toLowerCase()
                    .includes(valForSearch)
            })
            setData(filteredProducts)
            setFilteredDataTotal(filteredProducts.length)
        }
    }
    const filterByClient = (e) => {
        let val = e.target.value
        let valForSearch = val.toLowerCase().replace(/\s+/g, ' ').trim()
        setSearchByClient(val)
        ;(searchedData.length > 0 || totalSearched > 0) &&
        dispatch(clearSearchedProducts())
        if (valForSearch === '') {
            setData(products)
            setFilteredDataTotal(total)
        } else {
            const filteredProducts = filter(products, (product) => {
                return product.saleconnector.client?.name.toLowerCase().includes(valForSearch)
            })
            setData(filteredProducts)
            setFilteredDataTotal(filteredProducts.length)
        }
    }
    const filterBySeller = (e) => {
        let val = e.target.value
        let valForSearch = val.toLowerCase().replace(/\s+/g, ' ').trim()
        setSearchBySeller(val)
        ;(searchedData.length > 0 || totalSearched > 0) &&
        dispatch(clearSearchedProducts())
        if (valForSearch === '') {
            setData(products)
            setFilteredDataTotal(total)
        } else {
            const filteredProducts = filter(products, (product) => {
                return product.user.firstname.toLowerCase().includes(valForSearch)
            })
            setData(filteredProducts)
            setFilteredDataTotal(filteredProducts.length)
        }
    }
    const filterWhenPressEnter = (e) => {
        if (e.key === 'Enter') {
            setCurrentPage(0)
            const body = {
                startDate: beginDay,
                endDate: endDay,
                currentPage: currentPage,
                countPage: showByTotal,
                search: {
                    codeofproduct: searchByCode.replace(/\s+/g, ' ').trim(),
                    nameofproduct: searchByName.replace(/\s+/g, ' ').trim(),
                    nameofclient: searchByClient.replace(/\s+/g, ' ').trim(),
                    nameofseller: searchBySeller.replace(/\s+/g, ' ').trim()
                }
            }
            dispatch(getProductReportsByFilter(body))
        }
    }
    const changeDate = (value, name) => {
        name === 'beginDay' && setBeginDay(new Date(value).toISOString())
        name === 'endDay' && setEndDay(new Date(value).toISOString())
        const body = {
            startDate: name === 'beginDay' ? new Date(value).toISOString() : beginDay,
            endDate: name === 'endDay' ? new Date(value).toISOString() : endDay,
            currentPage: currentPage,
            countPage: showByTotal,
            search: {
                codeofproduct: searchByCode.replace(/\s+/g, ' ').trim(),
                nameofproduct: searchByName.replace(/\s+/g, ' ').trim(),
                nameofclient: searchByClient.replace(/\s+/g, ' ').trim(),
                nameofseller: searchBySeller.replace(/\s+/g, ' ').trim()
            }
        }
        dispatch(getProductReports(body))
    }
    const exportData = () => {
        let fileName = 'Maxsulotlar hisoboti'
        const exportProductHead = [
            t('№'),
            t('Sana'),
            t('Mijoz'),
            t('Maxsulot Kodi'),
            t('Maxsulot Nomi'),
            t('Soni'),
            t('Maxsulot Narxi (USD)'),
            t('Maxsulot Narxi (UZS)'),
            t('Jami (USD)'),
            t('Jami (UZS)')
        ]
        const body = {
            startDate: beginDay,
            endDate: endDay,
            search: {
                codeofproduct: searchByCode.replace(/\s+/g, ' ').trim(),
                nameofproduct: searchByName.replace(/\s+/g, ' ').trim(),
                nameofclient: searchByClient.replace(/\s+/g, ' ').trim(),
                nameofseller: searchBySeller.replace(/\s+/g, ' ').trim()
            }
        }
        dispatch(getAllProductReports(body)).then(({error, payload: {products}}) => {
            if (!error) {
                const data = map(products, (product, index) => ({
                    nth: index + 1,
                    sana: `${new Date(product.createdAt).toLocaleDateString('ru-Ru')} ${new Date(product.createdAt).toLocaleTimeString('ru-Ru', {
                        hourCycle: 'h24'
                    })}`,
                    client: product.saleconnector?.client ? product.saleconnector.client.name : product.saleconnector?.id,
                    code: product.product.productdata.code,
                    name: product.product.productdata.name,
                    soni: product.pieces,
                    narxiUSD: product.unitprice,
                    narxiUZS: product.unitpriceuzs,
                    jamiUSD: product.totalprice,
                    jamiUZS: product.totalpriceuzs
                }))
                exportExcel(data, fileName, exportProductHead)
            }
        })
    }
    useEffect(() => {
        const body = {
            startDate: new Date(
                new Date().getFullYear(),
                new Date().getMonth(),
                1
            ).toISOString(),
            endDate: new Date(new Date().setHours(23, 59, 59, 0)).toISOString(),
            currentPage: currentPage,
            countPage: showByTotal,
            search: {
                codeofproduct: '',
                nameofproduct: '',
                nameofclient: '',
                nameofseller: ''
            }
        }
        dispatch(getProductReports(body))
    }, [currentPage, showByTotal, dispatch])
    useEffect(() => {
        setData(products)
    }, [products])
    useEffect(() => {
        setSearchedData(searchedProducts)
    }, [searchedProducts])
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
                open: {opacity: 1, height: 'auto'},
                collapsed: {opacity: 0, height: 0}
            }}
            transition={{duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98]}}
        >
            {loadingExcel && (
                <div
                    className='fixed backdrop-blur-[2px] z-[100] left-0 top-0 right-0 bottom-0 bg-white-700 flex flex-col items-center justify-center w-full h-full'>
                    <SmallLoader />
                </div>
            )}
            <div className={'mainPadding'}>
                <p className='product_name text-center'>{t('Omborxona')}</p>
            </div>
            <div className='pagination mainPadding'>
                <ExportBtn
                    onClick={exportData}
                />
                <div className='flex gap-[10px]'>
                    <Dates
                        label={t('dan')}
                        value={new Date(beginDay)}
                        onChange={(value) => changeDate(value, 'beginDay')}
                        maxWidth={'max-w-[9.6875rem]'}
                    />
                    <Dates
                        label={t('gacha')}
                        value={new Date(endDay)}
                        onChange={(value) => changeDate(value, 'endDay')}
                        maxWidth={'max-w-[9.6875rem]'}
                    />
                </div>
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
                filterBy={['total', 'code', 'name', 'clientName', 'sellerName']}
                filterByTotal={filterByTotal}
                searchByCode={searchByCode}
                searchByName={searchByName}
                searchByClientName={searchByClient}
                searchBySellerName={searchBySeller}
                filterByCode={filterByCode}
                filterByName={filterByName}
                filterByClientName={filterByClient}
                filterBySellerName={filterBySeller}
                filterByClientNameWhenPressEnter={filterWhenPressEnter}
                filterBySellerNameWhenPressEnter={filterWhenPressEnter}
                filterByCodeAndNameAndCategoryWhenPressEnter={filterWhenPressEnter}
            />
            <div className={'tableContainerPadding'}>
                {loading ? (
                    <Spinner />
                ) : data.length === 0 && searchedData.length === 0 ? (
                    <NotFind text={t('Maxsulotlar mavjud emas')} />
                ) : (
                    <Table
                        page={'dailyreport'}
                        data={searchedData.length > 0 ? searchedData : data}
                        currentPage={currentPage}
                        countPage={showByTotal}
                        headers={headers}
                    />
                )}
            </div>
        </motion.section>
    )
}

export default ProductReport