import React, {useEffect, useState} from 'react'
import Button from '../../Components/Buttons/BtnAddRemove'
import Table from '../../Components/Table/Table'
import FieldContainer from '../../Components/FieldContainer/FieldContainer'
import Pagination from '../../Components/Pagination/Pagination'
import SearchForm from '../../Components/SearchForm/SearchForm'
import {useDispatch, useSelector} from 'react-redux'
import UniversalModal from '../../Components/Modal/UniversalModal'
import Spinner from '../../Components/Spinner/SmallLoader'
import NotFind from '../../Components/NotFind/NotFind'
import {
    successAddPackmanMessage,
    successDeletePackmanMessage,
    successUpdatePackmanMessage,
    universalToast,
    warningEmptyInput,
} from '../../Components/ToastMessages/ToastMessages'
import {
    addPackman,
    clearErrorPackmans,
    clearSearchedPackmans,
    clearSuccessAddPackmans,
    clearSuccessDeletePackmans,
    clearSuccessUpdatePackmans,
    deletePackman,
    getPackmans,
    getPackmansByFilter,
    updatePackman,
} from './packmanSlice'
import {checkEmptyString} from '../../App/globalFunctions.js'

function Packman() {
    const dispatch = useDispatch()
    const {
        errorPackmans,
        packmans,
        successAddPackman,
        successUpdatePackman,
        successDeletePackman,
        loading,
        searchedPackmans,
        total,
        totalSearched,
    } = useSelector((state) => state.packmans)

    const headers = [
        {styles: 'w-[10%] text-start', filter: '', title: '№'},
        {styles: 'w-[80%] text-start', filter: '', title: 'Agentlar'},
        {styles: 'w-[10%]', filter: '', title: ' '},
    ]

    //states
    const [data, setData] = useState([])
    const [searchedData, setSearchedData] = useState('')
    const [packmanName, setPackmanName] = useState('')
    const [currentPackman, setCurrentPackman] = useState('')
    const [deletedPackman, setDeletedPackman] = useState(null)
    const [modalVisible, setModalVisible] = useState(false)
    const [stickyForm, setStickyForm] = useState(false)
    const [showByTotal, setShowByTotal] = useState('10')
    const [currentPage, setCurrentPage] = useState(0)
    const [filteredDataTotal, setFilteredDataTotal] = useState(total)
    const [searchByName, setSearchByName] = useState('')

    // modal toggle
    const toggleModal = () => setModalVisible(!modalVisible)

    // handle changed input
    const handleChangePackmanName = (e) => {
        setPackmanName(e.target.value)
    }

    // table edit and delete
    const handleEditPackman = (packman) => {
        setCurrentPackman(packman)
        setPackmanName(packman.name)
        setStickyForm(true)
    }
    const handleDeletePackman = (packman) => {
        setDeletedPackman(packman)
        toggleModal()
    }

    const handleClickApproveToDelete = () => {
        const body = {
            _id: deletedPackman._id,
            currentPage,
            countPage: showByTotal,
            search: {
                name: searchByName.replace(/\s+/g, ' ').trim(),
            },
        }
        dispatch(deletePackman(body))
        handleClickCancelToDelete()
    }

    const handleClickCancelToDelete = () => {
        setModalVisible(false)
        setDeletedPackman(null)
    }

    // handle change of inputs

    const addNewPackman = (e) => {
        e.preventDefault()
        const filter = checkEmptyString([packmanName])
        if (filter) {
            warningEmptyInput()
        } else {
            const body = {
                name: packmanName,
                currentPage,
                countPage: showByTotal,
                search: {
                    name: searchByName.replace(/\s+/g, ' ').trim(),
                },
            }
            dispatch(addPackman(body))
            setPackmanName('')
        }
    }

    const handleEdit = (e) => {
        e.preventDefault()
        const filter = checkEmptyString([packmanName])
        if (filter) {
            warningEmptyInput()
        } else {
            const body = {
                name: packmanName,
                _id: currentPackman._id,
                currentPage,
                countPage: showByTotal,
                search: {
                    name: searchByName.replace(/\s+/g, ' ').trim(),
                },
                market: currentPackman.market,
            }
            dispatch(updatePackman(body))
        }
    }

    const clearForm = (e) => {
        e && e.preventDefault()
        setPackmanName('')
        setStickyForm(false)
        setDeletedPackman(null)
        setCurrentPackman(null)
    }

    //filter by total
    const filterByTotal = ({value}) => {
        setShowByTotal(value)
        setCurrentPage(0)
    }

    // handle change of search inputs
    const filterByName = (e) => {
        let val = e.target.value
        setSearchByName(val)
        let valForSearch = val.toLowerCase().replace(/\s+/g, ' ').trim()
        ;(searchedData.length > 0 || totalSearched > 0) &&
            dispatch(clearSearchedPackmans())
        if (valForSearch === '') {
            setData(packmans)
            setFilteredDataTotal(total)
        } else {
            const filteredPackmans = packmans.filter((packman) => {
                return packman.name.toLowerCase().includes(valForSearch)
            })
            setData(filteredPackmans)
            setFilteredDataTotal(filteredPackmans.length)
        }
    }

    const filterByNameWhenPressEnter = (e) => {
        if (e.key === 'Enter') {
            const body = {
                currentPage,
                countPage: showByTotal,
                search: {
                    name: searchByName.replace(/\s+/g, ' ').trim(),
                },
            }
            dispatch(getPackmansByFilter(body))
        }
    }

    // useEffects
    useEffect(() => {
        if (errorPackmans) {
            universalToast(errorPackmans, 'error')
            dispatch(clearErrorPackmans())
        }
        if (successAddPackman) {
            successAddPackmanMessage()
            dispatch(clearSuccessAddPackmans())
            clearForm()
        }
        if (successUpdatePackman) {
            successUpdatePackmanMessage()
            dispatch(clearSuccessUpdatePackmans())
            setCurrentPackman('')
            setStickyForm(false)
            clearForm()
        }
        if (successDeletePackman) {
            successDeletePackmanMessage()
            dispatch(clearSuccessDeletePackmans())
            clearForm()
        }
    }, [
        dispatch,
        errorPackmans,
        successAddPackman,
        successUpdatePackman,
        successDeletePackman,
    ])

    useEffect(() => {
        const body = {
            currentPage,
            countPage: showByTotal,
            search: {
                name: searchByName.replace(/\s+/g, ' ').trim(),
            },
        }
        dispatch(getPackmans(body))
        //    eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, showByTotal, currentPage])

    useEffect(() => {
        setData(packmans)
    }, [packmans])

    useEffect(() => {
        setFilteredDataTotal(total)
    }, [total])

    useEffect(() => {
        setSearchedData(searchedPackmans)
    }, [searchedPackmans])

    return (
        <section>
            <UniversalModal
                headerText={`${
                    deletedPackman && deletedPackman.name
                } ismli agentni o'chirishni tasdiqlaysizmi?`}
                title="O'chirilgan agentni tiklashning imkoni mavjud emas!"
                toggleModal={toggleModal}
                body={'approve'}
                approveFunction={handleClickApproveToDelete}
                closeModal={handleClickCancelToDelete}
                isOpen={modalVisible}
            />
            <form className={`sale-deliver-form ${stickyForm && 'stickyForm'}`}>
                <FieldContainer
                    onChange={handleChangePackmanName}
                    value={packmanName}
                    label={'Agentning ismi'}
                    placeholder={'misol: Jasurbek'}
                    maxWidth={'w-[43.75rem]'}
                    type={'string'}
                />
                <div className={'flex gap-[1.25rem] grow items-end'}>
                    <Button
                        add={!stickyForm}
                        edit={stickyForm}
                        text={stickyForm ? `Saqlash` : "Yangi agent qo'shish"}
                        onClick={stickyForm ? handleEdit : addNewPackman}
                    />
                    <Button text={'Tozalash'} onClick={clearForm} />
                </div>
            </form>
            <div className='inverterizationHead mainPadding'>
                <div className='inverterizationText'>Agentlar</div>
                <div>
                    {(filteredDataTotal !== 0 || totalSearched !== 0) && (
                        <Pagination
                            countPage={Number(showByTotal)}
                            totalDatas={totalSearched || filteredDataTotal}
                            setCurrentPage={setCurrentPage}
                            currentPage={currentPage}
                        />
                    )}
                </div>
            </div>

            <SearchForm
                filterBy={['total', 'name']}
                filterByTotal={filterByTotal}
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
                    <NotFind text={'Agentlar mavjud emas'} />
                ) : (
                    <Table
                        page='packman'
                        currentPage={currentPage}
                        countPage={showByTotal}
                        data={searchedData.length > 0 ? searchedData : data}
                        headers={headers}
                        Delete={handleDeletePackman}
                        Edit={handleEditPackman}
                    />
                )}
            </div>
        </section>
    )
}

export default Packman
