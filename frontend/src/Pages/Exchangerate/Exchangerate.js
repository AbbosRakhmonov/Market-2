import React, {useEffect, useState} from 'react'
import FieldContainer from '../../Components/FieldContainer/FieldContainer'
import Button from '../../Components/Buttons/BtnAddRemove'
import Table from '../../Components/Table/Table'
import {useDispatch, useSelector} from 'react-redux'
import {
    successAddExchangeMessage,
    successDeleteExchangeMessage,
    successUpdateExchangeMessage,
    universalToast,
} from '../../Components/ToastMessages/ToastMessages.js'
import {
    addExchangerate,
    clearErrorExchange,
    clearSuccessAddExchange,
    clearSuccessDeleteExchange,
    clearSuccessUpdateExchange,
    deleteExchangerate,
    getExchangeAll,
    updateExchangerate,
} from './ExchangerateSlice.js'
import UniversalModal from '../../Components/Modal/UniversalModal.js'
import Spinner from '../../Components/Spinner/SmallLoader.js'
import NotFind from '../../Components/NotFind/NotFind.js'

const Exchangerate = () => {
    const dispatch = useDispatch()
    const {
        errorExchange,
        exchangerate,
        successAddExchange,
        successUpdateExchange,
        successDeleteExchange,
        loading,
    } = useSelector((state) => state.exchangerate)

    const {
        market: {_id},
    } = useSelector((state) => state.login)

    const headers = [
        {title: '№', styles: 'w-[8%] text-left'},
        {title: 'Sana', styles: 'w-[17%] text-center'},
        {title: 'Kurs', styles: 'w-[67%] text-center'},
        {title: '', styles: 'w-[8%] text-center'},
    ]

    const [data, setData] = useState(exchangerate)
    const [exchangeName, setExchangeName] = useState('')
    const [currentExchange, setCurrentExchange] = useState('')
    const [deletedExchange, setDeletedExchange] = useState(null)
    const [modalVisible, setModalVisible] = useState(false)
    const [stickyForm, setStickyForm] = useState(false)

    const toggleModal = () => setModalVisible(!modalVisible)

    const handleChangeExchangeName = (e) => {
        setExchangeName(e.target.value)
    }

    const handleEditExchange = (exchangerate) => {
        setCurrentExchange(exchangerate)
        setExchangeName(exchangerate.exchangerate)
        setStickyForm(true)
    }
    const handleDeleteExchange = (exchangerate) => {
        setDeletedExchange(exchangerate)
        toggleModal()
    }
    const handleClickApproveToDelete = () => {
        const body = {_id: deletedExchange._id}
        dispatch(deleteExchangerate(body))
        handleClickCancelToDelete()
    }
    const handleClickCancelToDelete = () => {
        setModalVisible(false)
        setDeletedExchange(null)
    }

    const addNewExchange = (e) => {
        e.preventDefault()
        const body = {exchangerate: exchangeName, market: _id}
        dispatch(addExchangerate(body))
    }

    const handleEdit = (e) => {
        e.preventDefault()
        const body = {
            exchangerate: exchangeName,
            _id: currentExchange._id,
            market: _id,
        }
        dispatch(updateExchangerate(body))
    }

    const clearForm = (e) => {
        e && e.preventDefault()
        setExchangeName('')
        setCurrentExchange(null)
        setStickyForm(false)
    }

    const handleKeyUp = (e) => {
        e.preventDefault()
        if (e.key === 'Enter') {
            addNewExchange()
        }
    }

    useEffect(() => {
        if (clearErrorExchange) {
            universalToast(errorExchange, 'error')
            dispatch(clearErrorExchange())
        }
        if (successAddExchange) {
            successAddExchangeMessage()
            dispatch(clearSuccessAddExchange())
            clearForm()
        }
        if (successUpdateExchange) {
            successUpdateExchangeMessage()
            dispatch(clearSuccessUpdateExchange())
            setCurrentExchange('')
            setStickyForm(false)
            clearForm()
        }
        if (successDeleteExchange) {
            successDeleteExchangeMessage()
            dispatch(clearSuccessDeleteExchange())
            clearForm()
        }
    }, [
        dispatch,
        errorExchange,
        successAddExchange,
        successUpdateExchange,
        successDeleteExchange,
    ])

    useEffect(() => {
        dispatch(getExchangeAll())
    }, [dispatch])

    useEffect(() => {
        setData(exchangerate)
    }, [exchangerate])

    return (
        <section>
            <UniversalModal
                headerText={`${
                    deletedExchange && deletedExchange.exchangerate
                } kurs narxini o'chirishni tasdiqlaysizmi?`}
                title="O'chirilgan kurs narxini tiklashning imkoni mavjud emas!"
                toggleModal={toggleModal}
                body={'approve'}
                approveFunction={handleClickApproveToDelete}
                closeModal={handleClickCancelToDelete}
                isOpen={modalVisible}
            />
            <form
                className={`unitFormStyle ${
                    stickyForm && 'stickyForm'
                } flex gap-[1.25rem] bg-background flex-col mainPadding transition ease-linear duration-200`}
            >
                <div className='exchangerate-style'>
                    <FieldContainer
                        value={exchangeName}
                        onChange={handleChangeExchangeName}
                        label={'Kurs narxi'}
                        placeholder={'misol: 11 000 UZS'}
                        maxWidth={'w-[30.75rem]'}
                        type={'number'}
                        border={true}
                        onKeyPress={handleKeyUp}
                    />
                    <div
                        className={'w-full flex gap-[1.25rem] grow w-[33.2rem]'}
                    >
                        <Button
                            onClick={stickyForm ? handleEdit : addNewExchange}
                            add={!stickyForm}
                            edit={stickyForm}
                            text={
                                stickyForm
                                    ? `Saqlash`
                                    : `Yangi o'lchov qo'shish`
                            }
                        />
                        <Button onClick={clearForm} text={'Tozalash'} />
                    </div>
                </div>
            </form>

            <div className='tableContainerPadding'>
                {loading ? (
                    <Spinner />
                ) : exchangerate.length === 0 ? (
                    <NotFind text={'Maxsulot mavjud emas'} />
                ) : (
                    <Table
                        page={'exchange'}
                        data={data}
                        currentPage={0}
                        countPage={10}
                        headers={headers}
                        Edit={handleEditExchange}
                        Delete={handleDeleteExchange}
                    />
                )}
            </div>
        </section>
    )
}

export default Exchangerate
