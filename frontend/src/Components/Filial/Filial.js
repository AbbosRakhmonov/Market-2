import React, {useState} from 'react'
import FilialButtons from '../FilialButtons/FilialButtons'
import Avatar from '../Avatar/Avatar.js'
import {Link, Route, Routes, useLocation, useParams} from 'react-router-dom'
import ProductReport from '../../Pages/ProductReport/ProductReport'
import Currency from '../../Pages/Currency/Currency.js'
import {AnimatePresence} from 'framer-motion'
import Sellings from '../../Pages/Sale/Routes/Sellings'

const Filial = ({
                    typecount,
                    productcount,
                    totalPrice,
                    shopname,
                    active,
                    currency,
                    director,
                    id
                }) => {
    const {tablename, _id} = useParams()
    const location = useLocation()

    const [reportOpen, setReprotOpen] = useState(true)
    const [salesOpen, setSalesOpen] = useState(true)
    const [paymentOpen, setPaymentOpen] = useState(true)

    const handleReportOpen = (e) => {
        e && e.preventDefault()
        setReprotOpen(!reportOpen)
        setSalesOpen(true)
        setPaymentOpen(true)
    }

    const handleSalesOpen = (e) => {
        e && e.preventDefault()
        setSalesOpen(!salesOpen)
         setReprotOpen(true)
         setPaymentOpen(true)
    }

    const handlePaymentOpen = (e) => {
        e && e.preventDefault()
        setPaymentOpen(!paymentOpen)
         setReprotOpen(true)
         setSalesOpen(true)
    }

    return (
        <section>
            <div
                className={`shops_card flex gap-[1.25rem] ${
                    active ? 'active_shop' : ''
                }`}
            >
                <Avatar border={true} director={director} />
                <div className='product-cost'>
                    <div
                        className={'flex flex-col items-center justify-center'}
                    >
                        <p className='product'>Maxsulotlar turi</p>
                        <p className='product-number'>{typecount}</p>
                    </div>
                    <div
                        className={'flex flex-col items-center justify-center'}
                    >
                        <p className='product'>Maxsulotlar soni</p>
                        <p className='product-number'>{productcount}</p>
                    </div>
                    <div
                        className={'flex flex-col items-center justify-center'}
                    >
                        <p className='product'>Jami</p>
                        <p className='product-total'>
                            {totalPrice.toLocaleString('ru-Ru')} {currency}
                        </p>
                    </div>
                </div>
                <div className='shop-name flex flex-col w-[13.4375rem]'>
                    <div className='shop-title'>
                        <p>{shopname}</p>
                    </div>
                    <div className={'filial-btn'}>
                        <Link
                            to={`${
                                reportOpen
                                    ? `/dukonlar/report/${id}`
                                    : '/dukonlar'
                            }`}
                            onClick={() => handleReportOpen()}
                        >
                            <FilialButtons
                                type={'product'}
                                active={_id === id && tablename === 'report'}
                            />
                        </Link>

                        <Link
                            to={`${
                                salesOpen
                                    ? `/dukonlar/sales/${id}`
                                    : '/dukonlar'
                            } `}
                            onClick={() => handleSalesOpen()}
                        >
                            <FilialButtons
                                type={'selling'}
                                active={_id === id && tablename === 'sales'}
                            />
                        </Link>
                        <Link
                            to={`${
                                paymentOpen
                                    ? `/dukonlar/payment/${id}`
                                    : '/dukonlar'
                            }`}
                            onClick={() => handlePaymentOpen()}
                        >
                            <FilialButtons
                                type={'payments'}
                                active={_id === id && tablename === 'payment'}
                            />
                        </Link>
                    </div>
                </div>
            </div>
            <AnimatePresence>
                <Routes location={location} key={location.pathname}>
                    <Route
                        path={`/:tablename/:_id`}
                        element={
                            _id === id ? (
                                tablename === 'report' ? (
                                    <ProductReport id={_id} />
                                ) : tablename === 'sales' ? (
                                    <Sellings id={_id} />
                                ) : (
                                    <Currency id={_id} />
                                )
                            ) : (
                                ''
                            )
                        }
                    />
                </Routes>
            </AnimatePresence>
        </section>
    )
}

export default Filial
