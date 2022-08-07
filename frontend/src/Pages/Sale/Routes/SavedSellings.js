import React, {useEffect, useState} from 'react'
import Table from '../../../Components/Table/Table'
import {useDispatch, useSelector} from 'react-redux'
import {
    deleteSavedPayment,
    getSavedPayments,
} from '../Slices/savedSellingsSlice.js'
import NotFind from '../../../Components/NotFind/NotFind.js'
import SmallLoader from '../../../Components/Spinner/SmallLoader.js'
import {universalToast} from '../../../Components/ToastMessages/ToastMessages.js'
import UniversalModal from '../../../Components/Modal/UniversalModal.js'

const SavedSellings = () => {
    const dispatch = useDispatch()
    const {savedPayments, getLoading} = useSelector(
        (state) => state.savedSellings
    )
    const {currencyType} = useSelector((state) => state.currency)
    const [modalVisible, setModalVisible] = useState(false)
    const [selectedPayment, setSelectedPayment] = useState(null)
    const headers = [
        {styles: 'w-[10%] text-start', filter: '', title: '№'},
        {styles: 'w-[40%]', filter: 'name', title: 'Mijoz'},
        {styles: 'w-[10%]', filter: '', title: 'Maxsulotlar'},
        {styles: 'w-[10%] text-center', filter: 'code', title: 'Jami'},
        {styles: 'w-[10%] text-center', filter: 'createdAt', title: 'Sana'},
        {styles: 'w-[10%] text-center', filter: 'createdAt', title: 'Vaqti'},
        {styles: 'w-[10%]', filter: '', title: ' '},
    ]
    const toggleModal = () => {
        setModalVisible(!modalVisible)
    }
    const deletePayment = () => {
        dispatch(deleteSavedPayment({_id: selectedPayment})).then(() => {
            toggleModal()
            setSelectedPayment(null)
        })
    }
    const handleGetId = (id) => {
        setSelectedPayment(id)
        toggleModal()
    }
    const editSavedPayment = () => {
        universalToast('Xizmatdan foydalanish hozircha mavjud emas', 'info')
    }
    useEffect(() => {
        dispatch(getSavedPayments())
    }, [dispatch])

    return (
        <div className='tableContainerPadding pt-[1.25rem]'>
            <UniversalModal
                isOpen={modalVisible}
                body={'approve'}
                approveFunction={deletePayment}
                toggleModal={toggleModal}
                headerText={"Saqlangan to'lovni o'chirishni tasdiqlaysizmi ?"}
                title={"Agar to'lov o'chsa uni tiklab bo'lmaydi !"}
            />
            {!getLoading ? (
                savedPayments.length > 0 ? (
                    <Table
                        Edit={editSavedPayment}
                        Delete={handleGetId}
                        page='temporarysale'
                        data={savedPayments}
                        headers={headers}
                        currency={currencyType}
                    />
                ) : (
                    <NotFind
                        text={'Saqlanganlar maxsulotlar hozircha mavjud emas'}
                    />
                )
            ) : (
                <SmallLoader />
            )}
        </div>
    )
}

export default SavedSellings
