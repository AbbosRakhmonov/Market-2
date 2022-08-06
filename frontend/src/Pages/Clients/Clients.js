import React, {useState, useEffect} from 'react'
import FieldContainer from '../../Components/FieldContainer/FieldContainer'
import Button from '../../Components/Buttons/BtnAddRemove'
import Pagination from '../../Components/Pagination/Pagination'
import Table from '../../Components/Table/Table'
import {useDispatch, useSelector} from "react-redux";
import Spinner from '../../Components/Spinner/SmallLoader.js'
import NotFind from '../../Components/NotFind/NotFind.js'
import SearchForm from '../../Components/SearchForm/SearchForm'
import UniversalModal from '../../Components/Modal/UniversalModal.js'
import {getPackmans} from './../Packman/packmanSlice'
import {
    successAddSupplierMessage,
    successDeleteSupplierMessage,
    successUpdateSupplierMessage,
    universalToast,
} from '../../Components/ToastMessages/ToastMessages.js'
import {
    addClients,
    clearErrorClients,
    clearSearchedClients,
    clearSuccessAddClients,
    clearSuccessUpdateClients,
    clearSuccessDeleteClients,
    deleteClients,
    getClients,
    getClientsByFilter,
    updateClients
} from "./clientsSlice"
const ClientsPage = () => {
   

    const dispatch = useDispatch()

    const {
        options,
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
        {title: 'Yetkazuvchi', styles: 'w-[41%] text-left'},
        {title: 'Mijoz', styles: 'w-[41%] text-left'},
        {title: '', styles: 'w-[8%] text-left'},
    ]

    // states
    const [packmanOptions, setPackmanOptions] = useState([])
    const [data, setData] = useState([])
    const [searchedData, setSearchedData] = useState()
    const [clientName, setClientName] = useState('')
    const [currentClient, setCurrentClient] = useState()
    const [deletedCLients, setDeletedClients] = useState(null)
    const [modalVisible, setModalViseble] = useState(false)
    const [stickyForm, setStickyForm] = useState(false)
    const [showByTotal, setShowByTotal] = useState('10');
    const [currentPage, setCurrentPage] = useState(0)
    const [filteredDataTotal, setFilteredDataTotal] = useState()
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
       setClientName(client.name)
       setStickyForm(true)
    }

    const handleDeleteClient = (client) => {
        setDeletedClients(client)
        toggleModal()
    }

    const handleClickApproveToDelete = () => {
        const body = {
             name : deletedCLients.name,
            _id : deletedCLients._id,
            packman : getOptions.length > 0 ? getOptions.label : "",
            currentPage,
            countPage : showByTotal,
            search : {
                name: searchByName
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
     const body = {
        name : clientName,
        packman : getOptions.length>0 ? getOptions.label : "",
        currentPage,
        countPage: showByTotal,
        search: {
            name: searchByName,
        },
     }
     dispatch(addClients(body))
    }

    const handleEdit = (e) => {
        e.preventDefault()
        const body = {
            name : clientName,
            _id : currentClient._id,
            currentPage,
            countPage : showByTotal,
            search : {
                name :searchByName
            }
        }
        dispatch(updateClients(body))
    }

    const clearForm = (e) => {
      e && e.preventDefault()
      setClientName('')
      setGetOptions('')
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
        setSearchByName(val);
        (searchedData.length > 0 || totalSearched > 0) &&
         dispatch(clearSearchedClients())
         if(val === '') {
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
        if(e.key === 'Enter'){
            const body = {
                currentPage,
                countPage: showByTotal,
                search : {
                    client :searchByName
                }
            }
            dispatch(getClientsByFilter(body))
        }
     }

     const packmansOption = packmanOptions ? packmanOptions.map((item) => {
        return {label : item.name, value : item._id}
     }) : ""

     const handleChangeOptions = (e) => {
        setGetOptions(e)  
     }

     // useEffects 
     useEffect(() => {
        if(errorClients) {
            universalToast(errorClients, "error")
            dispatch(clearErrorClients())
        }
        if(successAddClients){
            successAddSupplierMessage()
            dispatch(clearSuccessAddClients())
            clearForm()
           // 
        }
        if(successUpdateClients){
            successUpdateSupplierMessage()
            dispatch(clearSuccessUpdateClients())
            setCurrentClient('')
            setStickyForm(false)
            clearForm()
        }
        if(successDeleteClients) {
            successDeleteSupplierMessage()
            dispatch(clearSuccessDeleteClients())
            clearForm()
        }
     }, [
        dispatch,
        errorClients,
        successAddClients,
        successDeleteClients,
        successUpdateClients
     ])

     useEffect(() => {
        const body = {
            currentPage,
            countPage : showByTotal,
            search : {
                name : '',
            },
        }
        dispatch(getClients(body))
     }, [dispatch, showByTotal, currentPage])

     useEffect(() => {
      setData(clients)
     },[clients])
     
     useEffect(() => {
        setFilteredDataTotal(total)
     }, [total])

     useEffect(() => {
        setSearchedData(searchedClients)
     }, [searchedClients])
     
     useEffect(() => {
        const body = {
            currentPage,
            countPage: showByTotal,
            search: {
                name: '',
            },
        }
        dispatch(getPackmans(body))
    }, [dispatch, showByTotal, currentPage])



    useEffect(() => {
        setPackmanOptions(options)     
    }, [options])


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
                className={
                    `flex gap-[1.25rem] bg-background flex-col mainPadding transition ease-linear duration-200 ${
                        stickyForm && 'stickyForm'
                    }`
                }
            >
                <div className='supplier-style'>
                    <FieldContainer
                        value={getOptions}
                        onChange={handleChangeOptions}
                        label={'Yetkazuvchini tanlang'}
                        placeholder={'misol: Dilso`z'}
                        select={true}
                        options={packmansOption}
                        maxWidth={'w-[21rem]'}
                        border={true}
                    />

                    <FieldContainer
                        value = {clientName}
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
                                stickyForm
                                    ? `Saqlash`
                                    : `Yangi yetkazuvchi qo\`shish`
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
                filterBy={["total", "delivererName", "clientName"]}
                filterByTotal={filterByTotal}
                filterByClientNameWhenPressEnter={
                    filterByNameWhenPressEnter
                }
                searchByClientName = {searchByName}
                filterByClientName = {filterByClientName}
            />

            <div className='tableContainerPadding'>
                {
                    loading ? (
                        <Spinner/>
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
                    )
                }
                
            </div>
        </section>
    )
}

export default ClientsPage