import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import ExportBtn from '../../../Components/Buttons/ExportBtn'
import CardBtn from '../../../Components/Card/CardBtn'
import LinkToBack from '../../../Components/LinkToBack/LinkToBack'
import Pagination from '../../../Components/Pagination/Pagination'
import ResultIncomings from '../Components/ResultIncomings'
import {
    clearSuccesDelete,
    clearSuccessUpdate,
    deleteIncoming,
    getIncomingConnectors,
    getIncomings,
    updateIncoming,
} from '../incomingSlice'
import Table from '../../../Components/Table/Table'
import { universalSort, UsdToUzs, UzsToUsd } from '../../../App/globalFunctions'
import SearchForm from '../../../Components/SearchForm/SearchForm'
import { uniqueId } from 'lodash'
import UniversalModal from '../../../Components/Modal/UniversalModal'

const IncomingSuppliers = () => {
    const dispatch = useDispatch()
    const {
        market: { _id },
    } = useSelector((state) => state.login)
    const {
        incomings,
        incomingscount,
        incomingconnectors,
        successUpdate,
        successDelete,
    } = useSelector((state) => state.incoming)
    const { currencyType, currency } = useSelector((state) => state.currency)

    const {
        state: { date, supplier },
    } = useLocation()

    let beginDay = new Date(new Date(date).setHours(3, 0, 0, 0)).toISOString()
    let endDay = new Date(new Date(date).setHours(26, 59, 59, 59)).toISOString()

    const [currentPage, setCurrentPage] = useState(0)
    const [countPage, setCountPage] = useState(10)
    const [sendingSearch, setSendingSearch] = useState({
        name: '',
        code: '',
        supplier: supplier,
    })
    const [localSearch, setLocalSearch] = useState({
        name: '',
        code: '',
        supplier: supplier,
    })
    const [sortItem, setSortItem] = useState({
        filter: '',
        sort: '',
        count: 0,
    })

    const [incomingCard, setIncomingCard] = useState([])
    const [currentData, setCurrentData] = useState([])
    const [currentDataStorage, setCurrentDataStorage] = useState([])
    const [editedIncoming, setEditedIncoming] = useState({})
    const [deletedIncoming, setDeletedIncoming] = useState('')
    const [modal, setModal] = useState(false)

    const changeCardData = useCallback(
        (data) => {
            let groups = []
            let pieces = (arr) => arr.reduce((prev, el) => prev + el.pieces, 0)
            const currentGroup = (arr, incoming) => {
                arr[0].products += incoming.incoming.length
                arr[0].pieces += pieces(incoming.incoming)
                arr[0].totalprice += incoming.total
                arr[0].totalpriceuzs += incoming.totaluzs
            }
            const newGroup = (incoming) => {
                let obj = {
                    createdAt: new Date(
                        incoming.createdAt
                    ).toLocaleDateString(),
                    supplier: { ...incoming.supplier },
                    products: incoming.incoming.length,
                    pieces: pieces(incoming.incoming),
                    totalprice: incoming.total,
                    totalpriceuzs: incoming.totaluzs,
                }
                groups.push(obj)
            }
            const existSupplier = (element) => {
                if (element.supplier.name === supplier) {
                    if (groups.length > 0) {
                        currentGroup(groups, element)
                    } else {
                        newGroup(element)
                    }
                }
            }
            const notExistSupplier = (element) => {
                const arr = groups.filter(
                    (group) => group.supplier._id === element.supplier._id
                )
                if (arr.length > 0) {
                    currentGroup(arr, element)
                } else {
                    newGroup(element)
                }
            }

            for (let incoming of data) {
                if (supplier) {
                    existSupplier(incoming)
                } else {
                    notExistSupplier(incoming)
                }
            }
            setIncomingCard(groups)
        },
        [supplier]
    )

    // click supplier card and show the table
    const changeCurrentData = (value) => {
        setSendingSearch({
            ...sendingSearch,
            supplier: value,
        })
        setLocalSearch({
            ...localSearch,
            supplier: value,
        })
    }

    const getCurrentData = (data) => {
        let current = data.map((incoming) => {
            return {
                ...incoming,
                sellingprice: incoming.product.price.sellingprice,
                sellingpriceuzs: incoming.product.price.sellingpriceuzs,
            }
        })
        setCurrentData(current)
        setCurrentDataStorage(current)
    }

    // add product to edit
    const addToEditedIncoming = (product) => {
        setEditedIncoming(product)
    }

    // change editing product
    const changeEditedIncoming = (e, key) => {
        let target = Number(e.target.value)
        let obj = {
            ...editedIncoming,
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
        let isChanged = currentData.some((product) => {
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
                    product: { ...editedIncoming },
                })
            )
        } else {
            setEditedIncoming({})
        }
    }

    const onKeyUpdate = (e) => {
        if (e.key === 'Enter') {
            updateEditedIncoming()
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

    // search by name
    const searchName = (e) => {
        let target = e.target.value.toLowerCase()
        setCurrentData([
            ...currentDataStorage.filter(({ product }) =>
                product.productdata.name.toLowerCase().includes(target)
            ),
        ])
        setLocalSearch({
            ...localSearch,
            name: target,
        })
    }

    // search by code
    const searchCode = (e) => {
        let target = e.target.value.toLowerCase()
        setCurrentData([
            ...currentDataStorage.filter(({ product }) =>
                product.productdata.code.includes(target)
            ),
        ])
        setLocalSearch({
            ...localSearch,
            code: target,
        })
    }

    // search when key press
    const searchOnKeyUp = (e) => {
        if (e.key === 'Enter') {
            setSendingSearch(localSearch)
        }
    }

    const getIncomingsData = useCallback(() => {
        dispatch(
            getIncomings({
                market: _id,
                beginDay,
                endDay,
                currentPage,
                countPage,
                search: sendingSearch,
            })
        )
    }, [dispatch, _id, beginDay, endDay, currentPage, countPage, sendingSearch])

    const removeIncoming = () => {
        dispatch(
            deleteIncoming({
                market: _id,
                beginDay,
                endDay,
                product: { ...deletedIncoming },
            })
        )
        setModal(false)
    }

    // Sort
    const filterData = (filterKey) => {
        if (filterKey === sortItem.filter) {
            switch (sortItem.count) {
                case 1:
                    setSortItem({
                        filter: filterKey,
                        sort: '1',
                        count: 2,
                    })
                    universalSort(
                        currentData,
                        setCurrentData,
                        filterKey,
                        1,
                        currentDataStorage
                    )
                    break
                case 2:
                    setSortItem({
                        filter: filterKey,
                        sort: '',
                        count: 0,
                    })
                    universalSort(
                        currentData,
                        setCurrentData,
                        filterKey,
                        '',
                        currentDataStorage
                    )
                    break
                default:
                    setSortItem({
                        filter: filterKey,
                        sort: '-1',
                        count: 1,
                    })
                    universalSort(
                        currentData,
                        setCurrentData,
                        filterKey,
                        -1,
                        currentDataStorage
                    )
            }
        } else {
            setSortItem({
                filter: filterKey,
                sort: '-1',
                count: 1,
            })
            universalSort(
                currentData,
                setCurrentData,
                filterKey,
                -1,
                currentDataStorage
            )
        }
    }

    useEffect(() => {
        getIncomingsData()
    }, [getIncomingsData])

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
            dispatch(clearSuccesDelete())
        }
    }, [dispatch, getIncomingsData, successDelete])

    useEffect(() => {
        dispatch(
            getIncomingConnectors({
                market: _id,
                beginDay,
                endDay,
            })
        )
    }, [dispatch, _id, beginDay, endDay])

    useEffect(() => {
        changeCardData(incomingconnectors)
    }, [incomingconnectors, changeCardData])

    useEffect(() => {
        getCurrentData(incomings)
    }, [incomings])

    const headers = [
        {
            title: '№',
        },
        {
            title: 'Yetkazuvchi',
            styles: 'w-[10%]',
        },
        {
            title: 'Kodi',
            filter: 'product.productdata.code',
            styles: 'w-[7%]',
        },
        {
            title: 'Nomi',
            filter: 'product.productdata.name',
        },
        {
            title: 'Soni',
            styles: 'w-[10%]',
        },
        {
            title: 'Kelish',
            styles: 'w-[10%]',
        },
        {
            title: 'Jami',
            styles: 'w-[15%]',
        },
        {
            title: 'Sotish',
            styles: 'w-[10%]',
        },
        {
            title: '',
            styles: 'w-[5%]',
        },
    ]

    const incomingSupplierHeaders =[
        "№",
        "Yetkazuvchi",
        "Kodi",
        "Nomi",
        "Soni",
        "KelishUZS",
        "KelishUSD",
        "JamiUZS",
        "JamiUSD",
        "SotishUZS",
        "SotishUSD"
    ]

    return (
        <div className=''
            key='content'
            initial='collapsed'
            animate='open'
            exit='collapsed'
            variants={{
                open: { opacity: 1, height: 'auto' },
                collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}>
            <div className='flex items-center justify-between mainPadding'>
                <LinkToBack link={'/maxsulotlar/qabul/qabullar'} />
                <ResultIncomings
                    connectors={incomingCard}
                    currencyType={currencyType}
                />
            </div>
            <div className='flex flex-wrap gap-[1%] mainPadding'>
                {incomingCard.length > 0 &&
                    incomingCard.map((incoming) => (
                        <CardBtn
                            date={incoming.createdAt}
                            deliver={incoming.supplier.name}
                            products={incoming.products}
                            pieces={incoming.pieces}
                            onClick={() =>
                                changeCurrentData(incoming.supplier.name)
                            }
                            key={uniqueId('card')}
                        />
                    ))}
            </div>
            <div className='mainPadding flex items-center justify-between'>
                <ExportBtn 
                 fileName={`Maxsulotlar-qabul-qabullar-${new Date().toLocaleDateString()}`}
                 headers={incomingSupplierHeaders}
                 datas={currentData}
                 pagesName="IncomingSuppliers"
                />
                <span>Ro`yxat</span>
                <Pagination
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    countPage={countPage}
                    totalDatas={incomingscount}
                />
            </div>
            <div>
                <SearchForm
                    filterBy={['total', 'code', 'name']}
                    filterByName={searchName}
                    filterByTotal={(e) => setCountPage(e.value)}
                    filterByCode={searchCode}
                    filterByCodeAndNameAndCategoryWhenPressEnter={searchOnKeyUp}
                />
            </div>
            <div className='mainPadding'>
                <Table
                    page={'incomings'}
                    headers={headers}
                    data={currentData}
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
                headerText={"Mahsulotni o'chirishni tasdiqlaysizmi?"}
                title={"O'chirilgan mahsulotni tiklashning imkoni mavjud emas!"}
                approveFunction={removeIncoming}
                closeModal={closeModal}
                toggleModal={closeModal}
            />
        </div>
    )
}

export default IncomingSuppliers
