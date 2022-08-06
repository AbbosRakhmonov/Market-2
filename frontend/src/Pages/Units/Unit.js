import React, {useEffect, useState} from 'react'
import Button from '../../Components/Buttons/BtnAddRemove.js'
import Table from '../../Components/Table/Table.js'
import FieldContainer from '../../Components/FieldContainer/FieldContainer.js'
import {useDispatch, useSelector} from 'react-redux'
import {
    successAddUnitMessage,
    successDeleteUnitMessage,
    successUpdateUnitMessage,
    universalToast,
} from '../../Components/ToastMessages/ToastMessages.js'
import {
    addUnit,
    clearErrorUnits,
    clearSuccessAddUnit,
    clearSuccessDeleteUnit,
    clearSuccessUpdateUnit,
    deleteUnit,
    getUnits,
    updateUnit,
} from './unitsSlice.js'
import UniversalModal from '../../Components/Modal/UniversalModal.js'
import Spinner from '../../Components/Spinner/SmallLoader.js'
import NotFind from '../../Components/NotFind/NotFind.js'

function Unit() {
    const dispatch = useDispatch()
    const {
        errorUnits,
        units,
        successAddUnit,
        successUpdateUnit,
        successDeleteUnit,
        loading,
    } = useSelector((state) => state.units)
    const headers = [
        {styles: 'w-[10%] text-start', filter: '', title: '№'},
        {
            styles: 'w-[80%] text-start',
            filter: '',
            title: "O'lchov birligi nomi",
        },
        {styles: 'w-[10%]', filter: '', title: ' '},
    ]

    // states
    const [data, setData] = useState(units)
    const [unitName, setUnitName] = useState('')
    const [currentUnit, setCurrentUnit] = useState('')
    const [deletedUnit, setDeletedUnit] = useState(null)
    const [modalVisible, setModalVisible] = useState(false)
    const [stickyForm, setStickyForm] = useState(false)

    // modal toggle
    const toggleModal = () => setModalVisible(!modalVisible)

    // handle change of inputs
    const handleChangeUnitName = (e) => {
        setUnitName(e.target.value)
    }

    // table edit and delete
    const handleEditUnit = (unit) => {
        setCurrentUnit(unit)
        setUnitName(unit.name)
        setStickyForm(true)
    }
    const handleDeleteUnit = (unit) => {
        setDeletedUnit(unit)
        toggleModal()
    }
    const handleClickApproveToDelete = () => {
        const body = {_id: deletedUnit._id}
        dispatch(deleteUnit(body))
        handleClickCancelToDelete()
    }
    const handleClickCancelToDelete = () => {
        setModalVisible(false)
        setDeletedUnit(null)
    }

    // handle submit of inputs
    const addNewUnit = (e) => {
        e.preventDefault()
        const body = {name: unitName}
        dispatch(addUnit(body))
    }

    const handleEdit = (e) => {
        e.preventDefault()
        const body = {
            name: unitName,
            _id: currentUnit._id,
        }
        dispatch(updateUnit(body))
    }

    const clearForm = (e) => {
        e && e.preventDefault()
        setUnitName('')
    }

    // useEffects
    useEffect(() => {
        if (errorUnits) {
            universalToast(errorUnits, 'error')
            dispatch(clearErrorUnits())
        }
        if (successAddUnit) {
            successAddUnitMessage()
            dispatch(clearSuccessAddUnit())
            clearForm()
        }
        if (successUpdateUnit) {
            successUpdateUnitMessage()
            dispatch(clearSuccessUpdateUnit())
            setCurrentUnit('')
            setStickyForm(false)
            clearForm()
        }
        if (successDeleteUnit) {
            successDeleteUnitMessage()
            dispatch(clearSuccessDeleteUnit())
            clearForm()
        }
    }, [
        dispatch,
        errorUnits,
        successAddUnit,
        successUpdateUnit,
        successDeleteUnit,
    ])

    useEffect(() => {
        dispatch(getUnits())
    }, [dispatch])

    useEffect(() => {
        setData(units)
    }, [units])

    return (
        <section>
            <UniversalModal
                headerText={`${
                    deletedUnit && deletedUnit.name
                } o'lchov birligini o'chirishni tasdiqlaysizmi?`}
                title="O'chirilgan o'lchov birligini tklashning imkoni mavjud emas!"
                toggleModal={toggleModal}
                body={'approve'}
                approveFunction={handleClickApproveToDelete}
                closeModal={handleClickCancelToDelete}
                isOpen={modalVisible}
            />
            <form className={`unitFormStyle ${stickyForm && 'stickyForm'}`}>
                <FieldContainer
                    onChange={handleChangeUnitName}
                    value={unitName}
                    label={"O'lchov birligini kiriting"}
                    placeholder={'misol: kg'}
                    maxWidth={'w-[43.75rem]'}
                />

                <div className={'flex gap-[1.25rem] grow items-end'}>
                    <Button
                        add={!stickyForm}
                        edit={stickyForm}
                        text={stickyForm ? `Saqlash` : `Yangi o'lchov qo'shish`}
                        onClick={stickyForm ? handleEdit : addNewUnit}
                    />
                    <Button text={'Tozalash'} onClick={clearForm} />
                </div>
            </form>

            <div className='mainPadding text-[1.25rem] text-blue-900'>
                O'lchov birliklari
            </div>

            <div className='tableContainerPadding'>
                {loading ? (
                    <Spinner />
                ) : data.length === 0 ? (
                    <NotFind text={"O'lchov birliklari mavjud emas"} />
                ) : (
                    <Table
                        page='unit'
                        data={data}
                        headers={headers}
                        currentPage={0}
                        countPage={0}
                        Delete={handleDeleteUnit}
                        Edit={handleEditUnit}
                    />
                )}
            </div>
        </section>
    )
}

export default Unit
