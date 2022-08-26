import React, {useEffect, useState} from 'react'
import {motion} from 'framer-motion'
import {useDispatch, useSelector} from 'react-redux'
import ExportBtn from '../../Components/Buttons/ExportBtn.js'
import Pagination from '../../Components/Pagination/Pagination.js'
import {useTranslation} from 'react-i18next'
import Table from '../../Components/Table/Table.js'
import Spinner from '../../Components/Spinner/SmallLoader.js'
import NotFind from '../../Components/NotFind/NotFind.js'
import SearchForm from '../../Components/SearchForm/SearchForm.js'
import {clearSearchedProducts, getProductReports} from './productreportSlice.js'
import {filter} from 'lodash'
import Dates from '../../Components/Dates/Dates.js'


function ProductReport() {
    const dispatch = useDispatch()
    const {t} = useTranslation(['common'])
    const exportProductHead = [
        t('№'),
        t('Nomi'),
        t('Kodi'),
        t('Sana'),
        t('Sotuvchi'),
        t('Mijoz'),
        t('Soni'),
        t('Narxi'),
        t('Jami')
    ]

    const headers = [
        {
            title: t('№')
        },
        {
            title: t('Nomi')
        },
        {
            title: t('Kodi')
        },
        {
            title: t('Sana')
        },
        {
            title: t('Sotuvchi')
        },
        {
            title: t('Mijoz')
        },
        {
            title: t('Soni')
        },
        {
            title: t('Narxi')
        },
        {
            title: t('Jami')
        }
    ]
    const {
        loading,
        allProducts,
        products,
        searchedProducts,
        total,
        totalSearched
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
        new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            1
        ).toISOString()
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
            const filteredProducts = filter(products, (product) => {
                return product.productdata.name
                    .toLowerCase()
                    .includes(valForSearch)
            })
            setData(filteredProducts)
            setFilteredDataTotal(filteredProducts.length)
        }
    }
    useEffect(() => {
        const body = {
            startDate: new Date(
                new Date().getFullYear(),
                new Date().getMonth(),
                1
            ).toISOString(),
            endDate: new Date(
                new Date().getFullYear(),
                new Date().getMonth(),
                1
            ).toISOString(),
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
    const changeDate = (value, name) => {
        name === 'beginDay' && setBeginDay(new Date(value).toISOString())
        name === 'endDay' && setEndDay(new Date(value).toISOString())
    }
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
            <div className={'mainPadding'}>
                <p className='product_name text-center'>{t('Omborxona')}</p>
            </div>
            <div className='pagination mainPadding'>
                <ExportBtn
                    datas={allProducts}
                    headers={exportProductHead}
                    fileName={'Maxsulotlar hisoboti'}
                    pagesName='WareHouse'
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