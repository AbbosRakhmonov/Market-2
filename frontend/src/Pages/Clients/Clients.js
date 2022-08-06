import React, {useEffect, useState} from 'react'
import FieldContainer from '../../Components/FieldContainer/FieldContainer'
import Button from '../../Components/Buttons/BtnAddRemove'
import Pagination from '../../Components/Pagination/Pagination'
import Table from '../../Components/Table/Table'
import {useDispatch, useSelector} from 'react-redux'
import Spinner from '../../Components/Spinner/SmallLoader.js'
import NotFind from '../../Components/NotFind/NotFind.js'
import SearchForm from '../../Components/SearchForm/SearchForm'
import UniversalModal from '../../Components/Modal/UniversalModal.js'
import {
    successAddSupplierMessage,
    successDeleteSupplierMessage,
    successUpdateSupplierMessage,
    universalToast,
    warningEmptyInput,
} from '../../Components/ToastMessages/ToastMessages.js'
import {
    addClients,
    clearErrorClients,
    clearSearchedClients,
    clearSuccessAddClients,
    clearSuccessDeleteClients,
    clearSuccessUpdateClients,
    deleteClients,
    getAllPackmans,
    getClients,
    getClientsByFilter,
    updateClients,
} from './clientsSlice'
import {checkEmptyString} from '../../App/globalFunctions.js'

const ClientsPage = () => {
    const dispatch = useDispatch()

    const {
        packmans,
        errorClients,
        clients,
        successAddClients,
        successUpdateClients,
        successDeleteClients,
        loading,
        searchedClients,
        total,
        totalSearched,
    } = useSelector((state) => state.clients)

    const headers = [
        {title: '№', styles: 'w-[8%] text-left'},
        {title: 'Agent', styles: 'w-[41%] text-left'},
        {title: 'Mijoz', styles: 'w-[41%] text-left'},
        {title: '', styles: 'w-[8%] text-left'},
    ]

    // states
    const [packmanOptions, setPackmanOptions] = useState([])
    const [data, setData] = useState([])
    const [searchedData, setSearchedData] = useState()
    const [clientName, setClientName] = useState('')
    const [packman, setPackman] = useState(null)
    const [currentClient, setCurrentClient] = useState()
    const [deletedCLients, setDeletedClients] = useState(null)
    const [modalVisible, setModalViseble] = useState(false)
    const [stickyForm, setStickyForm] = useState(false)
    const [showByTotal, setShowByTotal] = useState('10')
    const [currentPage, setCurrentPage] = useState(0)
    const [filteredDataTotal, setFilteredDataTotal] = useState(total)
    const [searchByName, setSearchByName] = useState('')
    const [getOptions, setGetOptions] = useState('')
    // modal toggle
    const toggleModal = () => setModalViseble(!modalVisible)

    // handle change of input
    const handleChangeClientName = (e) => {
        setClientName(e.target.value)
    }

    // table edit and delete
    const handleEditClients = (client) => {
        setCurrentClient(client)
        client.packman &&
            setPackman({label: client.packman.name, value: client.packman._id})
        setClientName(client.name)
        setStickyForm(true)
    }

    const handleDeleteClient = (client) => {
        setDeletedClients(client)
        toggleModal()
    }

    const handleClickApproveToDelete = () => {
        const body = {
            name: deletedCLients.name,
            _id: deletedCLients._id,
            packman: deletedCLients.packman,
            currentPage,
            countPage: showByTotal,
            search: {
                name: searchByName,
            },
        }
        dispatch(deleteClients(body))
        handleClickCancelToDelete()
    }

    const handleClickCancelToDelete = () => {
        setModalViseble(false)
        setDeletedClients(null)
    }
    // handle submit of inputs
    const addNewClients = (e) => {
        e.preventDefault()
        const filter = checkEmptyString([clientName])
        if (filter) {
            warningEmptyInput()
        } else {
            const body = {
                name: clientName,
                packman: (packman && packman.value) || null,
                currentPage,
                countPage: showByTotal,
                search: {
                    name: searchByName,
                },
            }
            dispatch(addClients(body))
        }
    }

    const handleEdit = (e) => {
        e.preventDefault()
        const body = {
            name: clientName,
            _id: currentClient._id,
            packman: (packman && packman.value) || null,
            currentPage,
            countPage: showByTotal,
            search: {
                name: searchByName,
            },
        }
        dispatch(updateClients(body))
    }

    const clearForm = (e) => {
        e && e.preventDefault()
        setClientName('')
        setGetOptions('')
        setPackman(null)
        setStickyForm(false)
    }

    // filter by total
    const filterByTotal = ({value}) => {
        setShowByTotal(value)
        setCurrentPage(0)
    }

    // handle change of search inputs
    const filterByClientName = (e) => {
        let val = e.target.value
        let valForSearch = val.toLowerCase().replace(/\s+/g, ' ').trim()
        setSearchByName(val)
        ;(searchedData.length > 0 || totalSearched > 0) &&
            dispatch(clearSearchedClients())
        if (val === '') {
            setData(clients)
            setFilteredDataTotal(total)
        } else {
            const filteredClients = clients.filter((client) => {
                return client.name.toLowerCase().includes(valForSearch)
            })
            setData(filteredClients)
            setFilteredDataTotal(filteredClients.length)
        }
    }

    const filterByNameWhenPressEnter = (e) => {
        if (e.key === 'Enter') {
            const body = {
                currentPage,
                countPage: showByTotal,
                search: {
                    client: searchByName,
                },
            }
            dispatch(getClientsByFilter(body))
        }
    }

    const handleChangeOptions = (e) => {
        setPackman(e)
    }

    // useEffects
    useEffect(() => {
        if (errorClients) {
            universalToast(errorClients, 'error')
            dispatch(clearErrorClients())
        }
        if (successAddClients) {
            successAddSupplierMessage()
            dispatch(clearSuccessAddClients())
            clearForm()
            //
        }
        if (successUpdateClients) {
            successUpdateSupplierMessage()
            dispatch(clearSuccessUpdateClients())
            setCurrentClient('')
            setStickyForm(false)
            clearForm()
        }
        if (successDeleteClients) {
            successDeleteSupplierMessage()
            dispatch(clearSuccessDeleteClients())
            clearForm()
        }
    }, [
        dispatch,
        errorClients,
        successAddClients,
        successDeleteClients,
        successUpdateClients,
    ])
    useEffect(() => {
        dispatch(getAllPackmans())
    }, [dispatch])

    useEffect(() => {
        const body = {
            currentPage,
            countPage: showByTotal,
            search: {
                name: '',
            },
        }
        dispatch(getClients(body))
    }, [dispatch, showByTotal, currentPage])

    useEffect(() => {
        setData(clients)
    }, [clients])

    useEffect(() => {
        setFilteredDataTotal(total)
    }, [total])

    useEffect(() => {
        setSearchedData(searchedClients)
    }, [searchedClients])

    useEffect(() => {
        const options = packmans.map((packman) => {
            return {label: packman.name, value: packman._id}
        })
        setPackmanOptions(options)
    }, [packmans])

    return (
        <section>
            <UniversalModal
                headerText={`${
                    deletedCLients && deletedCLients.name
                } ismli mijozni o'chirishni tasdiqlaysizmi?`}
                title="O'chirilgan mijozni tiklashning imkoni mavjud emas!"
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
                        value={packman}
                        onChange={handleChangeOptions}
                        label={'Agentni tanlang'}
                        placeholder={'misol: Dilso`z'}
                        select={true}
                        options={packmanOptions}
                        maxWidth={'w-[21rem]'}
                        border={true}
                    />

                    <FieldContainer
                        value={clientName}
                        label={'Mijoz ismi'}
                        placeholder={'misol: Navro`z'}
                        maxWidth={'w-[21rem]'}
                        type={'string'}
                        onChange={handleChangeClientName}
                    />
                    <div className={'flex gap-[1.25rem] grow w-[18.3125rem]'}>
                        <Button
                            add={!stickyForm}
                            edit={stickyForm}
                            text={
                                stickyForm ? `Saqlash` : `Yangi agent qo\`shish`
                            }
                            onClick={stickyForm ? handleEdit : addNewClients}
                        />
                        <Button onClick={clearForm} text={'Tozalash'} />
                    </div>
                </div>
            </form>

            <div className='pagination-supplier mainPadding'>
                <p className='supplier-title'>Mijozlar</p>
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
                filterBy={['total', 'delivererName', 'clientName']}
                filterByTotal={filterByTotal}
                filterByClientNameWhenPressEnter={filterByNameWhenPressEnter}
                searchByClientName={searchByName}
                filterByClientName={filterByClientName}
            />

            <div className='tableContainerPadding'>
                {loading ? (
                    <Spinner />
                ) : data.length === 0 ? (
                    <NotFind text={'Mijozlar mavjud emas'} />
                ) : (
                    <Table
                        data={searchedData.length > 0 ? searchedData : data}
                        page={'client'}
                        currentPage={currentPage}
                        countPage={showByTotal}
                        headers={headers}
                        Edit={handleEditClients}
                        Delete={handleDeleteClient}
                    />
                )}
            </div>
        </section>
    )
}

export default ClientsPage
