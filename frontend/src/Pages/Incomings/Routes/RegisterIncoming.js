import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import SelectInput from '../../../Components/SelectInput/SelectInput'
import Table from '../../../Components/Table/Table'
import {
    addIncoming,
    addTemporary,
    clearSuccessAdd,
    clearSuccessTemporary,
    clearTemporary,
    deleteTemporary,
    getProducts,
    getSuppliers
} from '../incomingSlice'
import {ConfirmBtn, SaveBtn} from '../../../Components/Buttons/SaveConfirmBtn'
import UniversalModal from '../../../Components/Modal/UniversalModal'
import {UsdToUzs, UzsToUsd} from '../../../App/globalFunctions'
import {useNavigate} from 'react-router-dom'
import {useTranslation} from 'react-i18next'
import {filter, map} from 'lodash'
import {
    universalToast,
    warningCurrencyRate,
    warningMorePayment,
    warningSaleProductsEmpty
} from '../../../Components/ToastMessages/ToastMessages'
import CustomerPayment from '../../../Components/Payment/CustomerPayment.js'

const RegisterIncoming = () => {
    const {t} = useTranslation(['common'])
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {
        market: {_id},
        user
    } = useSelector((state) => state.login)
    const {currency, currencyType} = useSelector((state) => state.currency)
    const {suppliers, products, successAdd, successTemporary, temporary} =
        useSelector((state) => state.incoming)

    // states
    const [suppliersData, setSuppliersData] = useState([])
    const [productsData, setProductsData] = useState([])
    const [supplier, setSupplier] = useState({})
    const [incomings, setIncomings] = useState([])
    const [incomingModal, setIncomingModal] = useState({})
    const [temporaryIncomings, setTemporaryIncomings] = useState([])
    const [selectSupplierValue, setSelectSupplierValue] = useState('')
    const [selectProductValue, setSelectProductValue] = useState('')

    // sale states
    const [paymentModalVisible, setPaymentModalVisible] = useState(false)
    const [paymentType, setPaymentType] = useState('cash')
    const [paymentCash, setPaymentCash] = useState('')
    const [paymentCashUzs, setPaymentCashUzs] = useState('')
    const [paymentCard, setPaymentCard] = useState('')
    const [paymentCardUzs, setPaymentCardUzs] = useState('')
    const [paymentTransfer, setPaymentTransfer] = useState('')
    const [paymentTransferUzs, setPaymentTransferUzs] = useState('')
    const [paymentDebt, setPaymentDebt] = useState(0)
    const [paymentDebtUzs, setPaymentDebtUzs] = useState(0)
    const [allPayment, setAllPayment] = useState(0)
    const [allPaymentUzs, setAllPaymentUzs] = useState(0)
    const [paid, setPaid] = useState(0)
    const [paidUzs, setPaidUzs] = useState(0)
    const [modalBody, setModalBody] = useState('registerincomingbody')
    const [modalVisible, setModalVisible] = useState(false)
    const [exchangerate, setExchangerate] = useState(currency)
    const [saleComment, setSaleComment] = useState('')
    let delay = null

    // functions for onchange of select
    const selectSupplier = (e) => {
        setSelectSupplierValue({
            label: e.label,
            value: e.value
        })
        setSupplier(...filter([...suppliers], (supplier) => supplier._id === e.value))
        if (incomings.length > 0) {
            setIncomings([
                ...map([...incomings], (product) => {
                    return {
                        ...product,
                        supplier: {
                            _id: e.value,
                            name: e.label
                        }
                    }
                })
            ])
        }
    }

    const selectProduct = (e) => {
        setSelectProductValue({
            label: e.label,
            value: e.value
        })
        if (
            !incomings.some(
                (incoming) =>
                    incoming._id === e.value &&
                    incoming.supplier._id === supplier._id
            )
        ) {
            addIncomingToModal(e.value)
        }
    }

    // add to product to modalincoming. function
    const addIncomingToModal = (value) => {
        const product = [
            ...filter([...products], (product) => product._id === value)
        ][0]
        setIncomingModal({
            _id: product._id,
            oldprice: product.price.incomingprice,
            oldpriceuzs: product.price.incomingpriceuzs,
            product: {...product.productdata, _id: product._id},
            pieces: 0,
            unitprice: 0,
            unitpriceuzs: 0,
            totalprice: 0,
            totalpriceuzs: 0,
            user: user._id,
            unit: product.unit,
            sellingprice: product.price.sellingprice,
            sellingpriceuzs: product.price.sellingpriceuzs,
            procient: 0,
            supplier: {...supplier}
        })
        setModalBody('registerincomingbody')
        setModalVisible(true)
    }

    // add modalincoming to incomings
    const addProductToIncomings = () => {
        setIncomings([incomingModal, ...incomings])
        toggleModal()
    }

    // change product in incomings
    const changeIncomings = (e, key, id) => {
        const target = Number(e.target.value)
        const check = (property) => key === property

        const product = (!id && {
            ...incomingModal
        }) || {...filter([...incomings], (incoming) => incoming._id === id)[0]}

        const countUsd =
            currencyType === 'USD' ? target : UzsToUsd(target, currency)
        const countUzs =
            currencyType === 'UZS' ? target : UsdToUzs(target, currency)

        const countProcient = (price) =>
            currencyType === 'UZS'
                ? Math.round((price / 100) * target) + price
                : Math.round((price / 100) * target * 1000) / 1000 + price

        const changepieces = (obj) => {
            obj.pieces = target
            obj.totalprice = target * obj.unitprice
            obj.totalpriceuzs = target * obj.unitpriceuzs
        }

        const changeunitprice = (obj) => {
            obj.unitprice = countUsd
            obj.unitpriceuzs = countUzs
            obj.totalprice = countUsd * obj.pieces
            obj.totalpriceuzs = countUzs * obj.pieces
        }

        const changesellingprice = (obj) => {
            obj.sellingprice = countUsd
            obj.sellingpriceuzs = countUzs
            obj.procient = 0
        }

        const changeProcient = (obj) => {
            obj.procient = target
            obj.sellingprice = countProcient(obj.unitprice)
            obj.sellingpriceuzs = countProcient(obj.unitpriceuzs)
        }

        check('pieces') && changepieces(product)
        check('unitprice') && changeunitprice(product)
        check('sellingprice') && changesellingprice(product)
        check('procient') && changeProcient(product)

        if (id) {
            setIncomings([
                ...map([...incomings], (incoming) => {
                    if (incoming._id === id) {
                        return product
                    }
                    return incoming
                })
            ])
        } else {
            setIncomingModal(product)
        }
    }

    // change datas for react-select //
    const changeSuppliersData = (data) => {
        const suppliers = map(data, (supplier) => {
            return {
                label: supplier.name,
                value: supplier._id
            }
        })
        setSuppliersData(suppliers)
    }

    const changeProductsData = (data) => {
        const products = map(data, (product) => {
            return {
                label: product.productdata.code + ' - ' + product.productdata.name,
                value: product._id
            }
        })
        setProductsData(products)
    }

    const deleteIncoming = (product) => {
        const f = filter(incomings, (incoming) => incoming._id !== product._id)
        setIncomings(f)
        const temps = filter(
            temporaryIncomings,
            (temp) => temp._id !== product._id
        )
        setTemporaryIncomings(temporary)
        if (temps.length === 0) {
            dispatch(clearTemporary())
        }
    }

    const CheckIncoming = (products) => {
        for (const product of products) {
            if (product.pieces < 1) {
                return universalToast(t('Mahsulot sonini kiriting!'), 'warning')
            }
            if (product.unitprice < 0.01) {
                return universalToast(
                    t('Mahsulot qabul narxini kiriting!'),
                    'warning'
                )
            }
            if (product.sellingprice < product.unitprice) {
                return universalToast(
                    t('Sotish narxi olish dan kam bo\'lmasin'),
                    'warning'
                )
            }
        }
        return false
    }

    // request functions
    const createIncoming = () => {
        const postincoming = map(incomings, (incoming) => {
            let obj = {...incoming}
            delete obj._id
            delete obj.procient
            return obj
        })

        if (!CheckIncoming(postincoming)) {
            if (incomings.length) {
                const all = incomings.reduce(
                    (acc, cur) => convertToUsd(acc + cur.totalprice),
                    0
                )
                const allUzs = incomings.reduce(
                    (acc, cur) => convertToUzs(acc + cur.totalpriceuzs),
                    0
                )
                setAllPayment(all)
                setAllPaymentUzs(allUzs)
                setPaymentCash(all)
                setPaymentCashUzs(allUzs)
                setPaid(all)
                setPaidUzs(allUzs)
                setPaymentModalVisible(true)
                currentEchangerate(allUzs, all)
            } else {
                !currency ? warningCurrencyRate() : warningSaleProductsEmpty()
            }
        }
    }

    const removeTemporary = () => {
        if (
            temporary.incomings &&
            temporary.incomings.length > 0 &&
            temporaryIncomings.length > 0
        ) {
            dispatch(
                deleteTemporary({
                    _id: temporary._id
                })
            )
            dispatch(clearTemporary())
        }
    }

    const createTemporary = () => {
        dispatch(
            addTemporary({
                market: _id,
                temporaryincoming: {
                    supplier,
                    incomings
                }
            })
        ).then(() => {
            setSelectSupplierValue({
                label: t('Yetkazib beruvchi'),
                value: ''
            })
            setSelectProductValue({
                label: t('Mahsulotlar'),
                value: ''
            })
        })
    }

    // Tableheader
    const headers = [
        {
            title: t('№'),
            styles: 'w-[8%]'
        },
        {
            title: t('Kodi'),
            styles: 'w-[10%]'
        },
        {
            title: t('Nomi')
        },
        {
            title: t('Soni'),
            styles: 'w-[10%]'
        },
        {
            title: t('Narxi'),
            styles: 'w-[10%]'
        },
        {
            title: t('Avvalgi narxi'),
            styles: 'w-[15%]'
        },
        {
            title: t('Jami'),
            styles: 'w-[15%]'
        },
        {
            title: t('Sotish'),
            styles: 'w-[15%]'
        },
        {
            title: '',
            styles: 'w-[5%]'
        }
    ]

    // sales functions
    const toggleModal = () => {
        setModalVisible(!modalVisible)
        setTimeout(() => {
            setModalBody('')
        }, 500)
    }
    const convertToUsd = (value) => Math.round(value * 1000) / 1000
    const convertToUzs = (value) => Math.round(value)
    const currentEchangerate = (uzs, usd) => {
        setExchangerate(convertToUzs(uzs / usd))
    }
    // payment
    const togglePaymentModal = (bool) => {
        bool
            ? setPaymentModalVisible(!paymentModalVisible)
            : setPaymentModalVisible(bool)
        setPaymentType('cash')
        setPaymentDebt(0)
        setPaymentDebtUzs(0)
    }
    const handleChangePaymentType = (type) => {
        if (paymentType !== type) {
            setPaymentType(type)
            switch (type) {
                case 'cash':
                    setPaymentCash(allPayment)
                    setPaymentCashUzs(allPaymentUzs)
                    setPaymentCard('')
                    setPaymentCardUzs('')
                    setPaymentTransfer('')
                    setPaymentTransferUzs('')
                    setPaid(allPayment)
                    setPaidUzs(allPaymentUzs)
                    setPaymentDebt(0)
                    setPaymentDebtUzs(0)
                    break
                case 'card':
                    setPaymentCard(allPayment)
                    setPaymentCardUzs(allPaymentUzs)
                    setPaymentCash('')
                    setPaymentCashUzs('')
                    setPaymentTransfer('')
                    setPaymentTransferUzs('')
                    setPaid(allPayment)
                    setPaidUzs(allPaymentUzs)
                    setPaymentDebt(0)
                    setPaymentDebtUzs(0)
                    break
                case 'transfer':
                    setPaymentTransfer(allPayment)
                    setPaymentTransferUzs(allPaymentUzs)
                    setPaymentCash('')
                    setPaymentCashUzs('')
                    setPaymentCard('')
                    setPaymentCardUzs('')
                    setPaid(allPayment)
                    setPaidUzs(allPaymentUzs)
                    setPaymentDebt(0)
                    setPaymentDebtUzs(0)
                    break
                default:
                    setPaymentCash('')
                    setPaymentCashUzs('')
                    setPaymentCard('')
                    setPaymentCardUzs('')
                    setPaymentTransfer('')
                    setPaymentTransferUzs('')
                    setPaid(0)
                    setPaidUzs(0)
                    setPaymentDebt(allPayment)
                    setPaymentDebtUzs(
                        allPaymentUzs
                    )
                    break
            }
        }
    }
    const handleChangePaymentInput = (value, key) => {
        writePayment(value, key)
    }
    const writePayment = (value, type) => {
        const maxSum = Math.abs(allPayment)
        const maxSumUzs = Math.abs(allPaymentUzs)
        if (currencyType === 'USD') {
            if (type === 'cash') {
                const all =
                    Number(value) +
                    Number(paymentCard) +
                    Number(paymentTransfer)
                const allUzs =
                    Number(UsdToUzs(value, exchangerate)) +
                    Number(paymentCardUzs) +
                    Number(paymentTransferUzs)
                if (all <= maxSum) {
                    setPaymentCash(value)
                    setPaymentCashUzs(UsdToUzs(value, exchangerate))
                    setPaymentDebt(convertToUsd(maxSum - all))
                    setPaymentDebtUzs(convertToUzs(maxSumUzs - allUzs))
                    setPaid(all)
                    setPaidUzs(allUzs)
                } else {
                    warningMorePayment()
                }
            } else if (type === 'card') {
                const all =
                    Number(value) +
                    Number(paymentCash) +
                    Number(paymentTransfer)
                const allUzs =
                    Number(paymentCashUzs) +
                    Number(UsdToUzs(value, exchangerate)) +
                    Number(paymentTransferUzs)
                if (all <= maxSum) {
                    setPaymentCard(value)
                    setPaymentCardUzs(UsdToUzs(value, exchangerate))
                    setPaymentDebt(convertToUsd(maxSum - all))
                    setPaymentDebtUzs(convertToUzs(maxSumUzs - allUzs))
                    setPaid(all)
                    setPaidUzs(allUzs)
                } else {
                    warningMorePayment()
                }
            } else {
                const all =
                    Number(value) + Number(paymentCash) + Number(paymentCard)
                const allUzs =
                    Number(paymentCashUzs) +
                    Number(paymentCardUzs) +
                    Number(UsdToUzs(value, exchangerate))
                if (all <= maxSum) {
                    setPaymentTransfer(value)
                    setPaymentTransferUzs(UsdToUzs(value, exchangerate))
                    setPaymentDebt(convertToUsd(maxSum - all))
                    setPaymentDebtUzs(convertToUzs(maxSumUzs - allUzs))
                    setPaid(all)
                    setPaidUzs(allUzs)
                } else {
                    warningMorePayment()
                }
            }
        } else {
            if (type === 'cash') {
                const all =
                    Number(value) +
                    Number(paymentCardUzs) +
                    Number(paymentTransferUzs)
                const allUsd =
                    Number(UzsToUsd(value, exchangerate)) +
                    Number(paymentCard) +
                    Number(paymentTransfer)
                if (all <= maxSumUzs) {
                    setPaymentCashUzs(value)
                    setPaymentCash(UzsToUsd(value, exchangerate))
                    setPaymentDebt(convertToUsd(maxSum - allUsd))
                    setPaymentDebtUzs(convertToUzs(maxSumUzs - all))
                    setPaid(allUsd)
                    setPaidUzs(all)
                } else {
                    warningMorePayment()
                }
            } else if (type === 'card') {
                const all =
                    Number(value) +
                    Number(paymentCashUzs) +
                    Number(paymentTransferUzs)
                const allUsd =
                    Number(paymentCash) +
                    Number(UzsToUsd(value, exchangerate)) +
                    Number(paymentTransfer)
                if (all <= maxSumUzs) {
                    setPaymentCard(UzsToUsd(value, exchangerate))
                    setPaymentCardUzs(value)
                    setPaymentDebt(convertToUsd(maxSum - allUsd))
                    setPaymentDebtUzs(convertToUzs(maxSumUzs - all))
                    setPaid(UzsToUsd(all, exchangerate))
                    setPaidUzs(all)
                } else {
                    warningMorePayment()
                }
            } else {
                const all =
                    Number(value) +
                    Number(paymentCashUzs) +
                    Number(paymentCardUzs)
                const allUsd =
                    Number(paymentCash) +
                    Number(paymentCard) +
                    Number(UzsToUsd(value, exchangerate))
                if (all <= maxSumUzs) {
                    setPaymentTransfer(UzsToUsd(value, exchangerate))
                    setPaymentTransferUzs(value)
                    setPaymentDebt(convertToUsd(maxSum - allUsd))
                    setPaymentDebtUzs(convertToUzs(maxSumUzs - all))
                    setPaid(allUsd)
                    setPaidUzs(all)
                } else {
                    warningMorePayment()
                }
            }
        }
    }
    const handleClickPay = () => {
        if (delay === null) {
            delay = window.setTimeout(() => {
                delay = null
                setModalBody('complete')
                setModalVisible(true)
            }, 300)
        }
    }
    const handleDoubleClick = () => {
        window.clearTimeout(delay)
        delay = null
        handleApprovePay()
    }
    const handleApprovePay = () => {
        const postincoming = map(incomings, (incoming) => {
            let obj = {...incoming}
            delete obj._id
            delete obj.procient
            return obj
        })
        dispatch(
            addIncoming({
                products: [...postincoming],
                user: user._id,
                payment: {
                    totalprice: Number(allPayment),
                    totalpriceuzs: Number(allPaymentUzs),
                    type: paymentType,
                    cash: Number(paymentCash),
                    cashuzs: Number(paymentCashUzs),
                    card: Number(paymentCard),
                    carduzs: Number(paymentCardUzs),
                    transfer: Number(paymentTransfer),
                    transferuzs: Number(paymentTransferUzs)
                }
            })
        ).then(
            ({error}) => !error && navigate('/maxsulotlar/qabul/qabullar')
        )
        removeTemporary()
    }
    const changeComment = (e) => {
        setSaleComment(e)
    }

    useEffect(() => {
        suppliers.length < 1 && dispatch(getSuppliers(_id))
        suppliers.length > 0 && changeSuppliersData(suppliers)
    }, [dispatch, _id, suppliers])

    useEffect(() => {
        products.length < 1 && dispatch(getProducts({market: _id}))
        products.length > 0 && changeProductsData(products)
    }, [dispatch, _id, products])

    useEffect(() => {
        if (successAdd) {
            setIncomings([])
            dispatch(clearSuccessAdd())
        }
    }, [dispatch, successAdd])

    useEffect(() => {
        if (successTemporary) {
            setIncomings([])
            dispatch(clearSuccessTemporary())
        }
    }, [dispatch, successTemporary])

    useEffect(() => {
        if (Object.keys(temporary).length > 0) {
            setSupplier(temporary.supplier)
            setIncomings(temporary.incomings)
            setTemporaryIncomings(temporary.incomings)
            setSelectSupplierValue({
                label: temporary.supplier.name,
                value: temporary.supplier._id
            })
        }
    }, [temporary, dispatch])

    useEffect(() => {
        return () => {
            dispatch(clearTemporary())
            setIncomings([])
            setTemporaryIncomings([])
            setSupplier({})
        }
    }, [dispatch])

    return (
        <div className={'relative grow overflow-auto'}>
            <CustomerPayment
                returned={true}
                type={paymentType}
                active={paymentModalVisible}
                togglePaymentModal={togglePaymentModal}
                changePaymentType={handleChangePaymentType}
                onChange={handleChangePaymentInput}
                client={''}
                allPayment={currencyType === 'USD' ? allPayment : allPaymentUzs}
                card={currencyType === 'USD' ? paymentCard : paymentCardUzs}
                cash={currencyType === 'USD' ? paymentCash : paymentCashUzs}
                debt={currencyType === 'USD' ? paymentDebt : paymentDebtUzs}
                hasDiscount={false}
                transfer={
                    currencyType === 'USD'
                        ? paymentTransfer
                        : paymentTransferUzs
                }
                paid={currencyType === 'USD' ? paid : paidUzs}
                handleClickPay={handleClickPay}
                changeComment={changeComment}
                saleComment={saleComment}
                onDoubleClick={handleDoubleClick}
            />
            <div className='flex items-center mainPadding'>
                <div className='w-full pr-[1.25rem] border-r border-blue-100'>
                    <SelectInput
                        options={suppliersData}
                        onSelect={selectSupplier}
                        value={selectSupplierValue}
                        placeholder={t('Yetkazib beruvchi')}
                    />
                </div>
                <div className='w-full pl-[1.25rem]'>
                    <SelectInput
                        value={selectProductValue}
                        options={productsData}
                        onSelect={selectProduct}
                        isDisabled={!supplier._id}
                        placeholder={t('Maxsulotlar')}
                    />
                </div>
            </div>
            <p className='text-[1.25rem] text-blue-900 mainPadding'>
                {t('Yetkazib beruvchi')}: {supplier.name}
            </p>
            <div
                className={`${incomings.length > 0 ? 'mainPadding' : 'hidden'}`}
            >
                <Table
                    page={'registerincoming'}
                    headers={headers}
                    data={incomings}
                    currency={currencyType}
                    changeHandler={changeIncomings}
                    Delete={deleteIncoming}
                />
                <div className='flex items-center justify-end gap-[0.625rem] pt-[1.25rem]'>
                    <SaveBtn
                        text={t('Saqlash')}
                        onClick={() => createTemporary()}
                    />
                    <ConfirmBtn
                        text={t('Tasdiqlash')}
                        onClick={() => {
                            createIncoming()
                        }}
                    />
                </div>
            </div>
            <UniversalModal
                isOpen={modalVisible}
                body={modalBody}
                headerText={t('To\'lovni amalga oshirishni tasdiqlaysizmi ?')}
                title={t('To\'lovni amalga oshirgach bu ma`lumotlarni o`zgaritirb bo`lmaydi !')}
                product={incomingModal}
                toggleModal={toggleModal}
                changeProduct={changeIncomings}
                approveFunction={modalBody === 'complete' ? handleApprovePay : addProductToIncomings}
                currency={currencyType}
            />
        </div>
    )
}

export default RegisterIncoming
