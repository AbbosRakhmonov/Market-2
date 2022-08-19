import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { universalSort, UsdToUzs, UzsToUsd } from '../../../App/globalFunctions'
import ExportBtn from '../../../Components/Buttons/ExportBtn'
import Dates from '../../../Components/Dates/Dates'
import UniversalModal from '../../../Components/Modal/UniversalModal'
import Pagination from '../../../Components/Pagination/Pagination'
import SearchForm from '../../../Components/SearchForm/SearchForm'
import Table from '../../../Components/Table/Table'
import {map,filter} from 'lodash'
import {clearSuccesDelete, clearSuccessUpdate, deleteIncoming, getIncomings, updateIncoming,excelIncomings} from '../incomingSlice'
import { useTranslation } from 'react-i18next';


const IncomingsList = () => {
    const dispatch = useDispatch()
    const { t } = useTranslation(['common'])
    const {
        market: { _id }
    } = useSelector((state) => state.login)
    const {incomings, incomingscount, successUpdate, successDelete,allIncomingsData} =
        useSelector((state) => state.incoming)
    const { currencyType, currency } = useSelector((state) => state.currency)

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
    const [sendingSearch, setSendingSearch] = useState({
        name: '',
        code: '',
        supplier: ''
    })
    const [localSearch, setLocalSearch] = useState({
        name: '',
        code: '',
        supplier: ''
    })
    const [currentPage, setCurrentPage] = useState(0)
    const [countPage, setCountPage] = useState(10)
    const [modal, setModal] = useState(false)
    const [sortItem, setSortItem] = useState({
        filter: '',
        sort: '',
        count: 0
    })

    const [editedIncoming, setEditedIncoming] = useState({})
    const [deletedIncoming, setDeletedIncoming] = useState({})
    const [currentIncoming, setCurrentIncoming] = useState([])
    const [storageCurrentIncoming, setStorageCurrentIncoming] = useState([])

    const getCurrentData = (data) => {
        let current = map(data,(incoming) => {
            return {
                ...incoming,
                sellingprice: incoming.product.price.sellingprice,
                sellingpriceuzs: incoming.product.price.sellingpriceuzs
            }
        })
        setCurrentIncoming(current)
        setStorageCurrentIncoming(current)
    }

    // add product to edit
    const addToEditedIncoming = (product) => {
        setEditedIncoming(product)
    }

    // change editing product
    const changeEditedIncoming = (e, key) => {
        let target = Number(e.target.value)
        let obj = {
            ...editedIncoming
        }

        const check = (prop) => key === prop

        const countUsd =
            currencyType === 'USD' ? target : UzsToUsd(target, currency)
        const countUzs =
            currencyType === 'UZS' ? target : UsdToUzs(target, currency)

        const changePieces = () => {
            obj.pieces = target
            obj.totalprice = target * obj.unitprice
            obj.totalpriceuzs = target * obj.unitpriceuzs
        }
        const changeUnitprice = () => {
            obj.unitprice = countUsd
            obj.unitpriceuzs = countUzs
            obj.totalprice = countUsd * obj.pieces
            obj.totalpriceuzs = countUzs * obj.pieces
        }
        const changeSellingprice = () => {
            obj.sellingprice = countUsd
            obj.sellingpriceuzs = countUzs
        }

        check('pieces') && changePieces()
        check('unitprice') && changeUnitprice()
        check('sellingprice') && changeSellingprice()

        setEditedIncoming(obj)
    }

    const updateEditedIncoming = () => {
        let isChanged = currentIncoming.some((product) => {
            return (
                product.pieces === editedIncoming.pieces &&
                product.unitprice === editedIncoming.unitprice &&
                product.sellingprice === editedIncoming.sellingprice
            )
        })
        if (!isChanged) {
            dispatch(
                updateIncoming({
                    market: _id,
                    startDate: beginDay,
                    endDate: endDay,
                    product: { ...editedIncoming }
                })
            )
        } else {
            setEditedIncoming({})
        }
    }

    // onkeyup when update
    const onKeyUpdate = (e) => {
        if (e.key === 'Enter') {
            updateEditedIncoming()
        }
    }

    // change date func
    const changeDate = (value, name) => {
        name === 'beginDay' && setBeginDay(new Date(value).toISOString())
        name === 'endDay' && setEndDay(new Date(value).toISOString())
    }

    // search by name
    const searchName = (e) => {
        let target = e.target.value.toLowerCase()
        setCurrentIncoming([
            ...filter([...storageCurrentIncoming],({ product }) =>
                product.productdata.name.toLowerCase().includes(target)
            )
        ])
        setLocalSearch({
            ...localSearch,
            name: target
        })
    }

    // search by code
    const searchCode = (e) => {
        let target = e.target.value.toLowerCase()
        setCurrentIncoming([
            ...filter([...storageCurrentIncoming],({ product }) =>
                product.productdata.code.includes(target)
            )
        ])
        setLocalSearch({
            ...localSearch,
            code: target
        })
    }

    // search supplier
    const searchSupplier = (e) => {
        let target = e.target.value.toLowerCase()
        setCurrentIncoming([
            ...filter([...storageCurrentIncoming],(product) =>
                product.supplier.name.toLowerCase().includes(target)
            )
        ])
        setLocalSearch({
            ...localSearch,
            supplier: target
        })
    }

    // sort
    const filterData = (filterKey) => {
        if (filterKey === sortItem.filter) {
            switch (sortItem.count) {
                case 1:
                    setSortItem({
                        filter: filterKey,
                        sort: '1',
                        count: 2
                    })
                    universalSort(
                        currentIncoming,
                        setCurrentIncoming,
                        filterKey,
                        1,
                        storageCurrentIncoming
                    )
                    break
                case 2:
                    setSortItem({
                        filter: filterKey,
                        sort: '',
                        count: 0
                    })
                    universalSort(
                        currentIncoming,
                        setCurrentIncoming,
                        filterKey,
                        '',
                        storageCurrentIncoming
                    )
                    break
                default:
                    setSortItem({
                        filter: filterKey,
                        sort: '-1',
                        count: 1
                    })
                    universalSort(
                        currentIncoming,
                        setCurrentIncoming,
                        filterKey,
                        -1,
                        storageCurrentIncoming
                    )
            }
        } else {
            setSortItem({
                filter: filterKey,
                sort: '-1',
                count: 1
            })
            universalSort(
                currentIncoming,
                setCurrentIncoming,
                filterKey,
                -1,
                storageCurrentIncoming
            )
        }
    }

    // search when key press
    const searchOnKeyUp = (e) => {
        if (e.key === 'Enter') {
            setSendingSearch(localSearch)
        }
    }

    const openDeleteModal = (incoming) => {
        setDeletedIncoming(incoming)
        setModal(true)
    }

    const closeModal = () => {
        setDeletedIncoming({})
        setModal(false)
    }

    const removeIncoming = () => {
        dispatch(
            deleteIncoming({
                market: _id,
                beginDay,
                endDay,
                product: { ...deletedIncoming }
            })
        )
        setModal(false)
    }

    const getIncomingsData = useCallback(() => {
        dispatch(
            getIncomings({
                market: _id,
                beginDay,
                endDay,
                currentPage,
                countPage,
                search: sendingSearch
            })
        )
    }, [dispatch, _id, beginDay, endDay, currentPage, countPage, sendingSearch])

    useEffect(() => {
        getCurrentData(incomings)
    }, [incomings])

    useEffect(() => {
        getIncomingsData()
    }, [
        getIncomingsData,
        beginDay,
        endDay,
        currentPage,
        countPage,
        sendingSearch
    ])

    useEffect(() => {
        if (successUpdate) {
            getIncomingsData()
            setEditedIncoming({})
            dispatch(clearSuccessUpdate())
        }
    }, [dispatch, getIncomingsData, successUpdate])

    useEffect(() => {
        if (successDelete) {
            getIncomingsData()
            setEditedIncoming({})
            dispatch(clearSuccesDelete())
        }
    }, [dispatch, getIncomingsData, successDelete])

    useEffect(() => {
      const body = {
            beginDay, 
            endDay ,
        }
        dispatch(excelIncomings(body))
    }, [dispatch])
    const headers = [
        {
            title: '№'
        },
        {
            title: t('Yetkazuvchi'),
            filter: 'supplier.name',
            styles: 'w-[10%]'
        },
        {
            title: t('Kodi'),
            filter: 'product.productdata.code',
            styles: 'w-[7%]'
        },
        {
            title: t('Nomi'),
            filter: 'product.productdata.name'
        },
        {
            title: t('Soni'),
            styles: 'w-[10%]'
        },
        {
            title: t('Kelish'),
            styles: 'w-[10%]'
        },
        {
            title: t('Jami'),
            styles: 'w-[15%]'
        },
        {
            title: t('Sotish'),
            styles: 'w-[10%]'
        },
        {
            title: '',
            styles: 'w-[5%]'
        }
    ]

    const incomingHeaders = [
        '№',
        t('Yetkazuvchi'),
        t('Kodi'),
        t('Nomi'),
        t('Soni'),
        t('Kelish UZS'),
        t('Kelish USD'),
        t('Jami UZS'),
        t('Jami USD'),
        t('Sotish UZS'),
        t('Sotish USD')
    ]

    return (
        <div className=''>
            <div className='mainPadding text-center'>
                <p>{t("Ro'yxat")}</p>
            </div>
            <div className='mainPadding flex items-center justify-between'>
                <ExportBtn
                    fileName={`${t("Maxsulotlar-qabul")}-${new Date().toLocaleDateString()}`}
                    headers={incomingHeaders}
                    datas={allIncomingsData}
                    pagesName='IncomingList'
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
                <Pagination
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    countPage={countPage}
                    totalDatas={incomingscount}
                />
            </div>
            <div>
                <SearchForm
                    filterBy={['total', 'code', 'delivererName', 'name']}
                    filterByName={searchName}
                    filterByTotal={(e) => setCountPage(e.value)}
                    filterByCode={searchCode}
                    filterByCodeAndNameAndCategoryWhenPressEnter={searchOnKeyUp}
                    filterByDelivererName={searchSupplier}
                />
            </div>
            <div className='mainPadding'>
                <Table
                    page={'incomings'}
                    headers={headers}
                    data={currentIncoming}
                    currentPage={currentPage}
                    countPage={countPage}
                    currency={currencyType}
                    editedIncoming={editedIncoming}
                    Edit={addToEditedIncoming}
                    changeHandler={changeEditedIncoming}
                    saveEditIncoming={updateEditedIncoming}
                    Delete={(incoming) => openDeleteModal(incoming)}
                    Sort={filterData}
                    onKeyUp={onKeyUpdate}
                    sortItem={sortItem}
                />
            </div>
            <UniversalModal
                body={'approve'}
                isOpen={modal}
                headerText={t('Mahsulotni o`chirishni tasdiqlaysizmi?')}
                title={t('O`chirilgan mahsulotni tiklashning imkoni mavjud emas!')}
                approveFunction={removeIncoming}
                closeModal={closeModal}
                toggleModal={closeModal}
            />
        </div>
    )
}

export default IncomingsList
