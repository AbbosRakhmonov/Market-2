import React, {useCallback, useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useLocation} from 'react-router-dom'
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
import {UsdToUzs, UzsToUsd} from '../../../App/globalFunctions'
import SearchForm from '../../../Components/SearchForm/SearchForm'
import {uniqueId} from 'lodash'
import UniversalModal from '../../../Components/Modal/UniversalModal'

const IncomingSuppliers = () => {
    const dispatch = useDispatch()
    const {
        market: {_id},
    } = useSelector((state) => state.login)
    const {
        incomings,
        incomingscount,
        incomingconnectors,
        successUpdate,
        successDelete,
    } = useSelector((state) => state.incoming)
    const {currencyType, currency} = useSelector((state) => state.currency)

    const {
        state: {date, supplier},
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
            const currentGroup = (ind, incoming) => {
                groups[ind].products += incoming.incoming.length
                groups[ind].pieces += pieces(incoming.incoming)
                groups[ind].totalprice += incoming.total
                groups[ind].totalpriceuzs += incoming.totaluzs
            }
            const newGroup = (incoming) => {
                let obj = {
                    createdAt: new Date(
                        incoming.createdAt
                    ).toLocaleDateString(),
                    supplier: {...incoming.supplier},
                    products: incoming.incoming.length,
                    pieces: pieces(incoming.incoming),
                    totalprice: incoming.total,
                    totalpriceuzs: incoming.totaluzs,
                }
                groups.push(obj)
            }
            const findindex = (incoming) => {
                if (supplier) {
                    return groups.findIndex(
                        (group) =>
                            group.supplier && group.supplier.name === supplier
                    )
                } else {
                    return groups.findIndex(
                        (group) =>
                            group.supplier &&
                            group.supplier._id === incoming.supplier._id
                    )
                }
            }

            data.forEach((incoming) => {
                let ind = findindex(incoming)
                if (ind >= 0) {
                    currentGroup(ind, incoming)
                } else {
                    newGroup(incoming)
                }
            })
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
                    product: {...editedIncoming},
                })
            )
        } else {
            setEditedIncoming({})
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
            ...currentDataStorage.filter(({product}) =>
                product.name.toLowerCase().includes(target)
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
            ...currentDataStorage.filter(({product}) =>
                product.code.includes(target)
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
                product: {...deletedIncoming},
            })
        )
        setModal(false)
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
            filter: 'product code',
            styles: 'w-[7%]',
        },
        {
            title: 'Nomi',
            filter: 'product name',
        },
        {
            title: 'Soni',
            filter: 'pieces',
            styles: 'w-[10%]',
        },
        {
            title: 'Kelish',
            filter: 'unitprice',
            styles: 'w-[10%]',
        },
        {
            title: 'Jami',
            filter: 'totalprice',
            styles: 'w-[15%]',
        },
        {
            title: 'Sotish',
            filter: 'price sellingprice',
            styles: 'w-[10%]',
        },
        {
            title: '',
            styles: 'w-[5%]',
        },
    ]

    return (
        <div className=''>
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
                <ExportBtn />
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