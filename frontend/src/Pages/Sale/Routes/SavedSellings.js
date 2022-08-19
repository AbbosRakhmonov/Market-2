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
import {useTranslation} from 'react-i18next'

const SavedSellings = () => {
    const {t} = useTranslation(['common'])
    const dispatch = useDispatch()
    const {savedPayments, getLoading} = useSelector(
        (state) => state.savedSellings
    )
    const {currencyType} = useSelector((state) => state.currency)
    const [modalVisible, setModalVisible] = useState(false)
    const [modalBody, setModalBody] = useState('approve')
    const [printBody, setPrintBody] = useState({})
    const [selectedPayment, setSelectedPayment] = useState(null)
    const headers = [
        {styles: 'w-[10%] text-start', filter: '', title: '№'},
        {styles: 'w-[40%]', filter: 'name', title: t('Mijoz')},
        {styles: 'w-[10%]', filter: '', title: t('Maxsulotlar')},
        {styles: 'w-[10%] text-center', filter: 'code', title: t('Jami')},
        {styles: 'w-[10%] text-center', filter: 'createdAt', title: t('Sana')},
        {styles: 'w-[10%] text-center', filter: 'createdAt', title: t('Vaqti')},
        {styles: 'w-[10%]', filter: '', title: ' '},
    ]
    const toggleModal = () => {
        setModalVisible(!modalVisible)
        setPrintBody({})
        setModalBody('')
    }
    const deletePayment = () => {
        dispatch(deleteSavedPayment({_id: selectedPayment})).then(({error}) => {
            if (!error) {
                toggleModal()
                setSelectedPayment(null)
            }
        })
    }
    const handleGetId = (id) => {
        setSelectedPayment(id)
        toggleModal()
        setModalBody('approve')
    }
    const editSavedPayment = () => {
        universalToast(t('Xizmatdan foydalanish hozircha mavjud emas'), 'info')
    }

    const handlePrintModal = (el) => {
        toggleModal()
        setModalBody('savedsalescheck')
        setPrintBody({
            createdAt: el.createdAt,
            products: el.temporary.tableProducts,
            client: {name: el.temporary.clientValue?.label},
            packman: {name: el.temporary.packmanValue.label},
        })
    }

    useEffect(() => {
        dispatch(getSavedPayments())
    }, [dispatch])

    return (
        <div className='tableContainerPadding pt-[1.25rem]'>
            <UniversalModal
                isOpen={modalVisible}
                body={modalBody}
                approveFunction={deletePayment}
                printedSelling={printBody}
                toggleModal={toggleModal}
                headerText={t(
                    'Saqlangan to`lovni o`chirishni tasdiqlaysizmi ?'
                )}
                title={t('Agar to`lov o`chsa uni tiklab bo`lmaydi !')}
            />
            {!getLoading ? (
                savedPayments.length > 0 ? (
                    <Table
                        Edit={editSavedPayment}
                        Delete={handleGetId}
                        page='temporarysale'
                        currentPage={3}
                        countPage={3}
                        data={savedPayments}
                        headers={headers}
                        currency={currencyType}
                        Print={handlePrintModal}
                    />
                ) : (
                    <NotFind
                        text={t('Saqlanganlar to`lovlar hozircha mavjud emas')}
                    />
                )
            ) : (
                <SmallLoader />
            )}
        </div>
    )
}

export default SavedSellings
