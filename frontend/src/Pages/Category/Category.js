import React, {useEffect, useState} from 'react'
import FieldContainer from '../../Components/FieldContainer/FieldContainer.js'
import Button from '../../Components/Buttons/BtnAddRemove.js'
import SearchForm from '../../Components/SearchForm/SearchForm.js'
import Spinner from '../../Components/Spinner/SmallLoader.js'
import NotFind from '../../Components/NotFind/NotFind.js'
import Table from '../../Components/Table/Table.js'
import {useDispatch, useSelector} from 'react-redux'
import {regexForTypeNumber} from '../../Components/RegularExpressions/RegularExpressions.js'
import {checkEmptyString, universalSort} from '../../App/globalFunctions.js'
import UniversalModal from '../../Components/Modal/UniversalModal.js'
import {
    successAddCategoryMessage,
    successDeleteCategoryMessage,
    successUpdateCategoryMessage,
    universalToast,
    warningCategory,
    warningEmptyInput,
} from '../../Components/ToastMessages/ToastMessages.js'
import {
    addCategory,
    clearErrorAddCategory,
    clearErrorDeleteCategory,
    clearErrorGetAllCategories,
    clearErrorUpdateCategory,
    clearSearchedCategories,
    clearSuccessAddCategory,
    clearSuccessDeleteCategory,
    clearSuccessUpdateCategory,
    deleteCategory,
    getCategories,
    getCategoriesByFilter,
    updateCategory,
} from './categorySlice.js'
import Pagination from '../../Components/Pagination/Pagination.js'

const Category = () => {
    const headers = [
        {
            title: '№',
            styles: 'w-[10%]',
        },
        {
            title: 'Kategoriya kodi',
            filter: 'code',
            styles: 'w-[16%]',
        },
        {
            title: 'Kategoriya nomi',
            filter: 'name',
            styles: 'w-[64%]',
        },
        {
            title: '',
        },
    ]
    const dispatch = useDispatch()
    const {
        categories,
        errorGetCategories,
        searchedCategories,
        loading,
        total,
        totalSearched,
        errorAddCategory,
        successAddCategory,
        successUpdateCategory,
        errorUpdateCategory,
        successDeleteCategory,
        errorDeleteCategory,
    } = useSelector((state) => state.category)
    const [data, setData] = useState(categories)
    const [searchedData, setSearchedData] = useState(searchedCategories)
    const [codeOfCategory, setCodeOfCategory] = useState('')
    const [nameOfCategory, setNameOfCategory] = useState('')
    const [searchByCode, setSearchByCode] = useState('')
    const [searchByName, setSearchByName] = useState('')
    const [showByTotal, setShowByTotal] = useState('10')
    const [currentPage, setCurrentPage] = useState(0)
    const [filteredDataTotal, setFilteredDataTotal] = useState(total)
    const [stickyForm, setStickyForm] = useState(false)
    const [sorItem, setSorItem] = useState({
        filter: '',
        sort: '',
        count: 0,
    })
    const [currentCategory, setCurrentCategory] = useState(null)
    const [deletedCategory, setDeletedCategory] = useState(null)
    const [modalVisible, setModalVisible] = useState(false)

    // modal toggle
    const toggleModal = () => setModalVisible(!modalVisible)

    // handle change of inputs
    const handleChangeCodeOfCategory = (e) => {
        let val = e.target.value
        if (regexForTypeNumber.test(val)) {
            setCodeOfCategory(val)
        }
    }
    const handleChangeNameOfCategory = (e) => {
        setNameOfCategory(e.target.value)
    }

    // filter by total
    const filterByTotal = ({value}) => {
        setShowByTotal(value)
        setCurrentPage(0)
    }

    // table edit and delete
    const handleEditCategory = (category) => {
        setCurrentCategory(category)
        setCodeOfCategory(category.code)
        setNameOfCategory(category.name)
        setStickyForm(true)
    }

    const handleEdit = (e) => {
        e.preventDefault()
        const body = {
            currentPage,
            countPage: showByTotal,
            search: {
                name: searchByName.replace(/\s+/g, ' ').trim(),
                code: searchByCode.replace(/\s+/g, ' ').trim(),
            },
            category: {
                name: nameOfCategory,
                code: codeOfCategory,
                _id: currentCategory._id,
            },
        }
        dispatch(updateCategory(body))
    }

    const handleDeleteCategory = (category) => {
        const body = {
            ...category,
            currentPage,
            countPage: showByTotal,
            search: {
                name: searchByName.replace(/\s+/g, ' ').trim(),
                code: searchByCode.replace(/\s+/g, ' ').trim(),
            },
        }
        setDeletedCategory(body)
        toggleModal()
    }
    const handleClickApproveToDelete = () => {
        dispatch(deleteCategory(deletedCategory))
        handleClickCancelToDelete()
    }
    const handleClickCancelToDelete = () => {
        setModalVisible(false)
        setDeletedCategory(null)
    }

    // handle submit of inputs
    const addNewcategory = (e) => {
        e.preventDefault()
        const filter = checkEmptyString([codeOfCategory, nameOfCategory])
        if (filter) {
            warningEmptyInput()
        } else {
            const body = {
                currentPage,
                countPage: showByTotal,
                category: {
                    name: nameOfCategory,
                    code: codeOfCategory,
                },
                search: {
                    name: searchByName.replace(/\s+/g, ' ').trim(),
                    code: searchByCode.replace(/\s+/g, ' ').trim(),
                },
            }
            dispatch(addCategory(body))
        }
    }

    const clearForm = (e) => {
        e && e.preventDefault()
        setCodeOfCategory('')
        setNameOfCategory('')
        setCurrentCategory(null)
        setStickyForm(false)
    }

    // handle change of search inputs
    const filterByCode = (e) => {
        let val = e.target.value
        let valForSearch = val.replace(/\s+/g, ' ').trim()
        setSearchByCode(val)
        ;(searchedData.length > 0 || totalSearched > 0) &&
            dispatch(clearSearchedCategories())
        if (valForSearch === '') {
            setData(categories)
            setFilteredDataTotal(total)
        } else {
            const filteredCategories = categories.filter((category) => {
                return category.code.includes(valForSearch)
            })
            setData(filteredCategories)
            setFilteredDataTotal(filteredCategories.length)
        }
    }
    const filterByName = (e) => {
        let val = e.target.value
        let valForSearch = val.toLowerCase().replace(/\s+/g, ' ').trim()
        setSearchByName(val)
        ;(searchedData.length > 0 || totalSearched > 0) &&
            dispatch(clearSearchedCategories())
        if (valForSearch === '') {
            setData(categories)
            setFilteredDataTotal(total)
        } else {
            const filteredCategories = categories.filter((category) => {
                return (
                    category.name &&
                    category.name.toLowerCase().includes(valForSearch)
                )
            })
            setData(filteredCategories)
            setFilteredDataTotal(filteredCategories.length)
        }
    }
    const filterByCodeAndNameWhenPressEnter = (e) => {
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
            dispatch(getCategoriesByFilter(body))
        }
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
                        searchedData.length > 0
                            ? searchedCategories
                            : categories
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
                        searchedData.length > 0
                            ? searchedCategories
                            : categories
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
                        searchedData.length > 0
                            ? searchedCategories
                            : categories
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
                searchedData ? searchedCategories : categories,
                searchedData.length > 0
            )
        }
    }

    useEffect(() => {
        if (errorGetCategories) {
            warningCategory()
            dispatch(clearErrorGetAllCategories())
        }
        if (errorAddCategory) {
            universalToast(errorAddCategory, 'error')
            dispatch(clearErrorAddCategory())
        }
        if (successAddCategory) {
            successAddCategoryMessage()
            dispatch(clearSuccessAddCategory())
            clearForm()
        }

        if (successUpdateCategory) {
            successUpdateCategoryMessage()
            dispatch(clearSuccessUpdateCategory())
            clearForm()
        }
        if (errorUpdateCategory) {
            universalToast(errorUpdateCategory, 'error')
            dispatch(clearErrorUpdateCategory())
        }

        if (errorDeleteCategory) {
            universalToast(errorDeleteCategory, 'error')
            dispatch(clearErrorDeleteCategory())
        }
        if (successDeleteCategory) {
            successDeleteCategoryMessage()
            dispatch(clearSuccessDeleteCategory())
        }
    }, [
        dispatch,
        errorGetCategories,
        errorAddCategory,
        successAddCategory,
        successUpdateCategory,
        errorUpdateCategory,
        errorDeleteCategory,
        successDeleteCategory,
    ])
    useEffect(() => {
        const body = {
            currentPage,
            countPage: showByTotal,
            search: {
                name: searchByName.replace(/\s+/g, ' ').trim(),
                code: searchByCode.replace(/\s+/g, ' ').trim(),
            },
        }
        dispatch(getCategories(body))
    }, [currentPage, showByTotal, dispatch])
    useEffect(() => {
        setData(categories)
    }, [categories])
    useEffect(() => {
        setFilteredDataTotal(total)
    }, [total])
    useEffect(() => {
        setSearchedData(searchedCategories)
    }, [searchedCategories])

    return (
        <section>
            <UniversalModal
                body='approve'
                toggleModal={toggleModal}
                headerText={`${
                    deletedCategory && deletedCategory.code
                } - kategoriyani o'chirishni tasdiqlaysizmi?`}
                title={
                    "O'chirilgan kategoriyalarni tiklashning imkoni mavjud emas!"
                }
                approveFunction={handleClickApproveToDelete}
                closeModal={handleClickCancelToDelete}
                isOpen={modalVisible}
            />
            <form
                className={`flex gap-[1.25rem] bg-background flex-col mainPadding transition ease-linear duration-200 ${
                    stickyForm ? 'stickyForm' : ''
                }`}
            >
                <div className='supplier-style'>
                    <FieldContainer
                        value={codeOfCategory}
                        onChange={handleChangeCodeOfCategory}
                        label={'Kategoriya kodi'}
                        placeholder={'misol: 101'}
                        maxWidth={'w-[9rem]'}
                        border={true}
                    />
                    <FieldContainer
                        value={nameOfCategory}
                        label={'Kategoriya nomi'}
                        placeholder={'misol: Alo24'}
                        maxWidth={'w-[29rem]'}
                        type={'string'}
                        onChange={handleChangeNameOfCategory}
                    />
                    <div className={'flex gap-[1.25rem] grow'}>
                        <Button
                            onClick={stickyForm ? handleEdit : addNewcategory}
                            add={!stickyForm}
                            edit={stickyForm}
                            text={
                                stickyForm
                                    ? 'Saqlash'
                                    : "Yangi kategoriya qo'shish"
                            }
                        />
                        <Button onClick={clearForm} text={'Tozalash'} />
                    </div>
                </div>
            </form>
            <div className='pagination-supplier mainPadding'>
                <p className='supplier-title'>Kategoriyalar</p>
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
                filterBy={['total', 'category', 'name']}
                filterByTotal={filterByTotal}
                filterByCategory={filterByCode}
                filterByName={filterByName}
                filterByCodeAndNameAndCategoryWhenPressEnter={
                    filterByCodeAndNameWhenPressEnter
                }
            />

            <div className='tableContainerPadding'>
                {loading ? (
                    <Spinner />
                ) : data.length === 0 && searchedData.length === 0 ? (
                    <NotFind text={'Maxsulot mavjud emas'} />
                ) : (
                    <Table
                        headers={headers}
                        Edit={handleEditCategory}
                        Delete={handleDeleteCategory}
                        page={'category'}
                        data={searchedData.length > 0 ? searchedData : data}
                        Sort={filterData}
                        sortItem={sorItem}
                        currentPage={currentPage}
                        countPage={showByTotal}
                    />
                )}
            </div>
        </section>
    )
}

export default Category
