import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Table from '../../../Components/Table/Table'
import { deleteTemporary, getTemporary, setTemporaryRegister } from '../incomingSlice'
import { useTranslation } from 'react-i18next';

const SavedIncomings = () => {
    const { t } = useTranslation(['common'])
    const dispatch = useDispatch()
    let navigate = useNavigate()

    const {
        market: { _id }
    } = useSelector((state) => state.login)
    const { currencyType } = useSelector((state) => state.currency)
    const { temporaries } = useSelector((state) => state.incoming)

    const [currentTemporaryData, setCurrentTemporaryData] = useState([])

    const changeTemporaryData = useCallback((data) => {
        const count = (arr, key) =>
            arr.reduce((prev, item) => prev + item[key], 0)
        const temporary = data.map((temp) => {
            let {
                _id,
                createdAt,
                temporaryincoming: { supplier, incomings }
            } = temp
            return {
                _id,
                createdAt,
                supplier,
                incomings: {
                    totalprice: count(incomings, 'totalprice'),
                    totalpriceuzs: count(incomings, 'totalpriceuzs'),
                    pieces: count(incomings, 'pieces')
                }
            }
        })
        setCurrentTemporaryData(temporary)
    }, [])

    const sendTemporayToRegister = (temporary) => {
        const incomings = temporaries.filter(
            (temp) => temp._id === temporary._id
        )[0]
        dispatch(
            setTemporaryRegister({
                _id: temporary._id,
                incomings: incomings.temporaryincoming.incomings,
                supplier: temporary.supplier
            })
        )
        navigate('/maxsulotlar/qabul/qabulqilish')
    }

    useEffect(() => {
        dispatch(
            getTemporary({
                market: _id
            })
        )
    }, [dispatch, _id])

    const removeTemporary = (temporary) => {
        dispatch(
            deleteTemporary({
                _id: temporary._id
            })
        )
    }

    useEffect(() => {
        changeTemporaryData(temporaries)
    }, [temporaries, changeTemporaryData])

    // Tableheader
    const headers = [
        {
            title: '№',
            styles: 'w-[8%]'
        },
        {
            title: t('Yetkazib beruvchi'),
            filter: 'supplier.name',
            styles: ''
        },
        {
            title: t('Maxsulotlar'),
            filter: 'incomings.pieces',
            styles: 'w-[10%]'
        },
        {
            title: t('Jami'),
            filter: 'incomings.totalprice',
            styles: 'w-[10%]'
        },
        {
            title: t('Sana'),
            filter: 'createdAt',
            styles: 'w-[10%]'
        },
        {
            title: t('Vaqti'),
            filter: 'createdAt',
            styles: 'w-[10%]'
        },
        {
            title: '',
            styles: 'w-[10%]'
        }
    ]

    return (
        <div className='mainPadding'>
            {currentTemporaryData.length > 0 ? (
                <Table
                    page={'temporaryincoming'}
                    headers={headers}
                    data={currentTemporaryData}
                    currency={currencyType}
                    Edit={sendTemporayToRegister}
                    Delete={removeTemporary}
                />
            ) : (
                <div>{t("Saqlangan qabullar mavjud emas")}</div>
            )}
        </div>
    )
}

export default SavedIncomings
