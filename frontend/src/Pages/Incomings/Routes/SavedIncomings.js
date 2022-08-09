import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Table from '../../../Components/Table/Table'
import { motion } from 'framer-motion'
import {
    deleteTemporary,
    getTemporary,
    setTemporaryRegister,
} from '../incomingSlice'

const SavedIncomings = () => {
    const dispatch = useDispatch()
    let navigate = useNavigate()

    const {
        market: { _id },
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
                temporaryincoming: { supplier, incomings },
            } = temp
            return {
                _id,
                createdAt,
                supplier,
                incomings: {
                    totalprice: count(incomings, 'totalprice'),
                    totalpriceuzs: count(incomings, 'totalpriceuzs'),
                    pieces: count(incomings, 'pieces'),
                },
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
                supplier: temporary.supplier,
            })
        )
        navigate('/maxsulotlar/qabul/qabulqilish')
    }

    useEffect(() => {
        dispatch(
            getTemporary({
                market: _id,
            })
        )
    }, [dispatch, _id])

    const removeTemporary = (temporary) => {
        dispatch(
            deleteTemporary({
                _id: temporary._id,
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
            styles: 'w-[8%]',
        },
        {
            title: 'Yetkazib beruvchi',
            filter: 'supplier.name',
            styles: '',
        },
        {
            title: 'Maxsulotlar',
            filter: 'incomings.pieces',
            styles: 'w-[10%]',
        },
        {
            title: 'Jami',
            filter: 'incomings.totalprice',
            styles: 'w-[10%]',
        },
        {
            title: 'Sana',
            filter: 'createdAt',
            styles: 'w-[10%]',
        },
        {
            title: 'Vaqti',
            filter: 'createdAt',
            styles: 'w-[10%]',
        },
        {
            title: '',
            styles: 'w-[10%]',
        },
    ]

    return (
        <motion.div className='mainPadding'
            key='content'
            initial='collapsed'
            animate='open'
            exit='collapsed'
            variants={{
                open: { opacity: 1, height: 'auto' },
                collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}>
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
                <div>Saqlangan qabullar mavjud emas</div>
            )}
        </motion.div>
    )
}

export default SavedIncomings
