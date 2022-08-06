import React, {useEffect, useState} from 'react'
import FieldContainer from '../../Components/FieldContainer/FieldContainer'
import Button from '../../Components/Buttons/BtnAddRemove'
import Pagination from '../../Components/Pagination/Pagination'
import Table from '../../Components/Table/Table'
import {useDispatch, useSelector} from 'react-redux'
import Spinner from '../../Components/Spinner/SmallLoader.js'
import NotFind from '../../Components/NotFind/NotFind.js'
import {
    addSupplier,
    clearErrorSuppliers,
    clearSearchedSuppliers,
    clearSuccessAddSupplier,
    clearSuccessDeleteSupplier,
    clearSuccessUpdateSupplier,
    deleteSupplier,
    getSuppliers,
    getSuppliersByFilter,
    updateSupplier,
} from './suppliersSlice.js'
import {
    successAddSupplierMessage,
    successDeleteSupplierMessage,
    successUpdateSupplierMessage,
    universalToast,
} from '../../Components/ToastMessages/ToastMessages.js'
import UniversalModal from '../../Components/Modal/UniversalModal.js'
import SearchForm from '../../Components/SearchForm/SearchForm.js'

const Supplier = () => {
    const dispatch = useDispatch()
    const {
        errorSuppliers,
        suppliers,
        successAddSupplier,
        successUpdateSupplier,
        successDeleteSupplier,
        loading,
        searchedSuppliers,
        total,
        totalSearched,
    } = useSelector((state) => state.suppliers)

    const headers = [
        {title: '№', styles: 'w-[8%] text-left'},
        {title: 'Yetkazuvchi', styles: 'w-[84%] text-left'},
        {title: '', styles: 'w-[8%] text-left'},
    ]

    // states
    const [data, setData] = useState(suppliers)
    const [searchedData, setSearchedData] = useState(searchedSuppliers)
    const [supplierName, setSupplierName] = useState('')
    const [currentSupplier, setCurrentSupplier] = useState('')
    const [deletedSupplier, setDeletedSupplier] = useState(null)
    const [modalVisible, setModalVisible] = useState(false)
    const [stickyForm, setStickyForm] = useState(false)
    const [showByTotal, setShowByTotal] = useState('10')
    const [currentPage, setCurrentPage] = useState(0)
    const [filteredDataTotal, setFilteredDataTotal] = useState(total)
    const [searchByName, setSearchByName] = useState('')

    // modal toggle
    const toggleModal = () => setModalVisible(!modalVisible)

    // handle change of inputs
    const handleChangeSupplierName = (e) => {
        setSupplierName(e.target.value)
    }

    // table edit and delete
    const handleEditSupplier = (supplier) => {
        setCurrentSupplier(supplier)
        setSupplierName(supplier.name)
        setStickyForm(true)
    }
    const handleDeleteSupplier = (supplier) => {
        setDeletedSupplier(supplier)
        toggleModal()
    }
    const handleClickApproveToDelete = () => {
        const body = {
            _id: deletedSupplier._id,
            currentPage,
            countPage: showByTotal,
            search: {
                name: searchByName,
            },
        }
        dispatch(deleteSupplier(body))
        handleClickCancelToDelete()
    }
    const handleClickCancelToDelete = () => {
        setModalVisible(false)
        setDeletedSupplier(null)
    }

    // handle submit of inputs
    const addNewSupplier = (e) => {
        e.preventDefault()
        const body = {
            name: supplierName,
            currentPage,
            countPage: showByTotal,
            search: {
                name: searchByName,
            },
        }
        dispatch(addSupplier(body))
    }

    const handleEdit = (e) => {
        e.preventDefault()
        const body = {
            name: supplierName,
            _id: currentSupplier._id,
            currentPage,
            countPage: showByTotal,
            search: {
                name: searchByName,
            },
        }
        dispatch(updateSupplier(body))
    }

    const clearForm = (e) => {
        e && e.preventDefault()
        setSupplierName('')
    }

    // filter by total
    const filterByTotal = ({value}) => {
        setShowByTotal(value)
        setCurrentPage(0)
    }

    // handle change of search inputs
    const filterByName = (e) => {
        let val = e.target.value
        let valForSearch = val.toLowerCase().replace(/\s+/g, ' ').trim()
        setSearchByName(val)
        ;(searchedData.length > 0 || totalSearched > 0) &&
            dispatch(clearSearchedSuppliers())
        if (valForSearch === '') {
            setData(suppliers)
            setFilteredDataTotal(total)
        } else {
            const filteredSuppliers = suppliers.filter((supplier) => {
                return supplier.name.toLowerCase().includes(valForSearch)
            })
            setData(filteredSuppliers)
            setFilteredDataTotal(filteredSuppliers.length)
        }
    }
    const filterByNameWhenPressEnter = (e) => {
        if (e.key === 'Enter') {
            const body = {
                currentPage,
                countPage: showByTotal,
                search: {
                    name: searchByName,
                },
            }
            dispatch(getSuppliersByFilter(body))
        }
    }

    // useEffects
    useEffect(() => {
        if (errorSuppliers) {
            universalToast(errorSuppliers, 'error')
            dispatch(clearErrorSuppliers())
        }
        if (successAddSupplier) {
            successAddSupplierMessage()
            dispatch(clearSuccessAddSupplier())
            clearForm()
        }
        if (successUpdateSupplier) {
            successUpdateSupplierMessage()
            dispatch(clearSuccessUpdateSupplier())
            setCurrentSupplier('')
            setStickyForm(false)
            clearForm()
        }
        if (successDeleteSupplier) {
            successDeleteSupplierMessage()
            dispatch(clearSuccessDeleteSupplier())
            clearForm()
        }
    }, [
        dispatch,
        errorSuppliers,
        successAddSupplier,
        successUpdateSupplier,
        successDeleteSupplier,
    ])

    useEffect(() => {
        const body = {
            currentPage,
            countPage: showByTotal,
            search: {
                name: '',
            },
        }
        dispatch(getSuppliers(body))
    }, [dispatch, showByTotal, currentPage])

    useEffect(() => {
        setData(suppliers)
    }, [suppliers])

    useEffect(() => {
        setFilteredDataTotal(total)
    }, [total])

    useEffect(() => {
        setSearchedData(searchedSuppliers)
    }, [searchedSuppliers])

    return (
        <section>
            <UniversalModal
                headerText={`${
                    deletedSupplier && deletedSupplier.name
                } yetkazib beruvchini o'chirishni tasdiqlaysizmi?`}
                title="O'chirilgan yetkazib beruvchini tiklashning imkoni mavjud emas!"
                toggleModal={toggleModal}
                body={'approve'}
                approveFunction={handleClickApproveToDelete}
                closeModal={handleClickCancelToDelete}
                isOpen={modalVisible}
            />
            <form
                className={`flex gap-[1.25rem] bg-background flex-col mainPadding transition ease-linear duration-200 ${
                    stickyForm && 'stickyForm'
                }`}
            >
                <div className='supplier-style'>
                    <FieldContainer
                        label={'Yetkazuvchi ismi'}
                        placeholder={'misol: Alo24'}
                        maxWidth={'w-[41rem]'}
                        type={'string'}
                        value={supplierName}
                        onChange={handleChangeSupplierName}
                    />
                    <div className={'flex gap-[1.25rem] grow w-[20.8125rem]'}>
                        <Button
                            add={!stickyForm}
                            edit={stickyForm}
                            text={
                                stickyForm
                                    ? `Saqlash`
                                    : `Yangi yetkazuvchi qo\`shish`
                            }
                            onClick={stickyForm ? handleEdit : addNewSupplier}
                        />
                        <Button onClick={clearForm} text={'Tozalash'} />
                    </div>
                </div>
            </form>
            <div className='pagination-supplier mainPadding'>
                <p className='supplier-title'>Yetkazuvchilar</p>
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
                filterByTotal={filterByTotal}
                filterBy={['total', 'name']}
                filterByName={filterByName}
                searchByName={searchByName}
                filterByCodeAndNameAndCategoryWhenPressEnter={
                    filterByNameWhenPressEnter
                }
            />

            <div className='tableContainerPadding'>
                {loading ? (
                    <Spinner />
                ) : data.length === 0 ? (
                    <NotFind text={'Yetkazib beruvchilar mavjud emas'} />
                ) : (
                    <Table
                        data={searchedData.length > 0 ? searchedData : data}
                        page={'supplier'}
                        currentPage={currentPage}
                        countPage={showByTotal}
                        headers={headers}
                        Edit={handleEditSupplier}
                        Delete={handleDeleteSupplier}
                    />
                )}
            </div>
        </section>
    )
}

export default Supplier
