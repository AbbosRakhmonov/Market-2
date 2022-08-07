import React, {useEffect, useState} from 'react'
import Checkbox from '../../../Components/Checkbox/Checkbox.js'
import FieldContainer from '../../../Components/FieldContainer/FieldContainer.js'
import Table from '../../../Components/Table/Table.js'
import {useSelector, useDispatch} from 'react-redux'
import {IoAttach} from 'react-icons/io5'
import CategoryCard from '../../../Components/CategoryCard/CategoryCard.js'
import NotFind from '../../../Components/NotFind/NotFind.js'
import {getAllCategories} from '../../Category/categorySlice.js'
import Spinner from '../../../Components/Spinner/SmallLoader.js'
import {getAllProducts, getClients, makePayment, savePayment} from '../Slices/registerSellingSlice.js'
import {getAllPackmans} from '../../Clients/clientsSlice.js'
import SearchInput from '../../../Components/Inputs/SearchInput.js'
import UniversalModal from '../../../Components/Modal/UniversalModal.js'
import {UsdToUzs, UzsToUsd} from '../../../App/globalFunctions.js'
import {
    universalToast, warningLessSellPayment, warningMoreDiscount,
    warningMorePayment,
    warningSaleProductsEmpty
} from '../../../Components/ToastMessages/ToastMessages.js'
import CustomerPayment from '../../../Components/Payment/CustomerPayment.js'
import {useNavigate} from 'react-router-dom'
import SmallLoader from '../../../Components/Spinner/SmallLoader.js'

const RegisterSelling = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {user} = useSelector(state => state.login)
    const {currencyType, currency} = useSelector(state => state.currency)
    const {allcategories, loading} = useSelector(state => state.category)
    const {allProducts, clients, loadingMakePayment} = useSelector(state => state.registerSelling)
    const {packmans} = useSelector(state => state.clients)
    const [filteredProducts, setFilteredProducts] = useState([])
    const [selectedProduct, setSelectedProduct] = useState('')
    const [checked, setChecked] = useState(false)
    const [tableProducts, setTableProducts] = useState([])
    const [filteredCategories, setFilteredCategories] = useState(allcategories)
    const [activeCategory, setActiveCategory] = useState(null)
    const [searchCategory, setSearchCategory] = useState('')
    const [optionPackman, setOptionPackman] = useState([])
    const [packmanValue, setPackmanValue] = useState('')
    const [optionClient, setOptionClient] = useState([])
    const [clientValue, setClientValue] = useState('')
    const [userValue, setUserValue] = useState('')
    const [modalVisible, setModalVisible] = useState(false)
    const [currentProduct, setCurrentProduct] = useState(null)
    const [paymentModalVisible, setPaymentModalVisible] = useState(false)
    const [paymentType, setPaymentType] = useState('cash')
    const [paymentCash, setPaymentCash] = useState('')
    const [paymentCashUzs, setPaymentCashUzs] = useState('')
    const [paymentCard, setPaymentCard] = useState('')
    const [paymentCardUzs, setPaymentCardUzs] = useState('')
    const [paymentTransfer, setPaymentTransfer] = useState('')
    const [paymentTransferUzs, setPaymentTransferUzs] = useState('')
    const [paymentDiscount, setPaymentDiscount] = useState('')
    const [paymentDiscountUzs, setPaymentDiscountUzs] = useState('')
    const [paymentDiscountPercent, setPaymentDiscountPercent] = useState('')
    const [hasDiscount, setHasDiscount] = useState(false)
    const [discountSelectOption, setDiscountSelectOption] = useState({label: '%', value: '%'})
    const [paymentDebt, setPaymentDebt] = useState(0)
    const [paymentDebtUzs, setPaymentDebtUzs] = useState(0)
    const [allPayment, setAllPayment] = useState(0)
    const [allPaymentUzs, setAllPaymentUzs] = useState(0)
    const [paid, setPaid] = useState(0)
    const [paidUzs, setPaidUzs] = useState(0)
    const [modalBody, setModalBody] = useState('')
    const [modalData, setModalData] = useState(null)
    const headers = [
        {title: '№'},
        {title: 'Kodi'},
        {title: 'Nomi'},
        {title: 'Soni'},
        {title: 'Narxi'},
        {title: 'Jami', styles: 'w-[10rem]'},
        {title: ''}
    ]
    const toggleModal = () => {
        setModalBody('')
        setModalVisible(!modalVisible)
        setSelectedProduct('')
        setTimeout(() => {
            setCurrentProduct(null)
        }, 500)
    }

    // payment
    const togglePaymentModal = (bool) => {
        bool ? setPaymentModalVisible(!paymentModalVisible) : setPaymentModalVisible(bool)
        setPaymentType('cash')
        setHasDiscount(false)
        setPaymentDiscount('')
        setPaymentDiscountUzs('')
        setPaymentDiscountPercent('')
        setPaymentDebt(0)
        setPaymentDebtUzs(0)
        setDiscountSelectOption({label: '%', value: '%'})
    }
    const toggleCheckModal = () => {
        setModalVisible(!modalVisible)
        setModalBody('')
        setModalData(null)
    }
    const convertToUsd = (value) => Math.round(value * 1000) / 1000
    const convertToUzs = (value) => Math.round(value)
    const handleClickPayment = () => {
        if (tableProducts.length) {
            const all = tableProducts.reduce((acc, cur) => convertToUsd((acc + cur.totalprice)), 0)
            const allUzs = tableProducts.reduce((acc, cur) => convertToUzs((acc + cur.totalpriceuzs)), 0)
            setAllPayment(all)
            setAllPaymentUzs(allUzs)
            setPaymentCash(all)
            setPaymentCashUzs(allUzs)
            setPaid(all)
            setPaidUzs(allUzs)
            setPaymentModalVisible(true)
        } else {
            warningSaleProductsEmpty()
        }
    }
    const handleChangePaymentType = (type) => {
        const all = allPayment - Number(paymentDiscount)
        const allUzs = allPaymentUzs - Number(paymentDiscountUzs)
        if (paymentType !== type) {
            setPaymentType(type)
            switch (type) {
                case 'cash':
                    setPaymentCash(all)
                    setPaymentCashUzs(allUzs)
                    setPaymentCard('')
                    setPaymentCardUzs('')
                    setPaymentTransfer('')
                    setPaymentTransferUzs('')
                    setPaid(all)
                    setPaidUzs(allUzs)
                    setPaymentDebt(0)
                    setPaymentDebtUzs(0)
                    break
                case 'card':
                    setPaymentCard(all)
                    setPaymentCardUzs(allUzs)
                    setPaymentCash('')
                    setPaymentCashUzs('')
                    setPaymentTransfer('')
                    setPaymentTransferUzs('')
                    setPaid(all)
                    setPaidUzs(allUzs)
                    setPaymentDebt(0)
                    setPaymentDebtUzs(0)
                    break
                case 'transfer':
                    setPaymentTransfer(all)
                    setPaymentTransferUzs(allUzs)
                    setPaymentCash('')
                    setPaymentCashUzs('')
                    setPaymentCard('')
                    setPaymentCardUzs('')
                    setPaid(all)
                    setPaidUzs(allUzs)
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
                    setPaymentDebt(allPayment - Number(paymentDiscount))
                    setPaymentDebtUzs(allPaymentUzs - Number(paymentDiscountUzs))
                    break
            }

        }
    }
    const writePayment = (value, type) => {
        const maxSum = allPayment - Number(paymentDiscount)
        const maxSumUzs = allPaymentUzs - Number(paymentDiscountUzs)
        if (currencyType === 'USD') {
            if (type === 'cash') {
                const all = Number(value) + Number(paymentCard) + Number(paymentTransfer)
                const allUzs = Number(paymentCashUzs) + Number(paymentCardUzs) + Number(paymentTransferUzs)
                if (all <= maxSum) {
                    setPaymentCash(value)
                    setPaymentCashUzs(UsdToUzs(value, currency))
                    setPaymentDebt(convertToUsd((maxSum - all)))
                    setPaymentDebtUzs(UsdToUzs((maxSum - all), currency))
                    setPaid(all)
                    setPaidUzs(allUzs)
                } else {
                    warningMorePayment()
                }
            } else if (type === 'card') {
                const all = Number(value) + Number(paymentCash) + Number(paymentTransfer)
                const allUzs = Number(paymentCashUzs) + Number(paymentCardUzs) + Number(paymentTransferUzs)
                if (all <= maxSum) {
                    setPaymentCard(value)
                    setPaymentCardUzs(UsdToUzs(value, currency))
                    setPaymentDebt(convertToUsd(maxSum - all))
                    setPaymentDebtUzs(UsdToUzs((maxSum - all), currency))
                    setPaid(all)
                    setPaidUzs(allUzs)
                } else {
                    warningMorePayment()
                }
            } else {
                const all = Number(value) + Number(paymentCash) + Number(paymentCard)
                const allUzs = Number(paymentCashUzs) + Number(paymentCardUzs) + Number(paymentTransferUzs)
                if (all <= maxSum) {
                    setPaymentTransfer(value)
                    setPaymentTransferUzs(UsdToUzs(value, currency))
                    setPaymentDebt(convertToUsd(maxSum - all))
                    setPaymentDebtUzs(UsdToUzs((maxSum - all), currency))
                    setPaid(all)
                    setPaidUzs(allUzs)
                } else {
                    warningMorePayment()
                }
            }
        } else {
            if (type === 'cash') {
                const all = Number(value) + Number(paymentCardUzs) + Number(paymentTransferUzs)
                const allUsd = Number(paymentCash) + Number(paymentCard) + Number(paymentTransfer)
                if (all <= maxSumUzs) {
                    setPaymentCashUzs(value)
                    setPaymentCash(UzsToUsd(value, currency))
                    setPaymentDebt(UzsToUsd((maxSumUzs - all), currency))
                    setPaymentDebtUzs(convertToUzs(maxSumUzs - all))
                    setPaid(allUsd)
                    setPaidUzs(all)
                } else {
                    warningMorePayment()
                }
            } else if (type === 'card') {
                const all = Number(value) + Number(paymentCashUzs) + Number(paymentTransferUzs)
                if (all <= maxSumUzs) {
                    setPaymentCard(UzsToUsd(value, currency))
                    setPaymentCardUzs(value)
                    setPaymentDebt(UzsToUsd((maxSumUzs - all), currency))
                    setPaymentDebtUzs(convertToUzs(maxSumUzs - all))
                    setPaid(UzsToUsd(all, currency))
                    setPaidUzs(all)
                } else {
                    warningMorePayment()
                }
            } else {
                const all = Number(value) + Number(paymentCashUzs) + Number(paymentCardUzs)
                const allUsd = Number(paymentCash) + Number(paymentCard) + Number(paymentTransfer)
                if (all <= maxSumUzs) {
                    setPaymentTransfer(UzsToUsd(value, currency))
                    setPaymentTransferUzs(value)
                    setPaymentDebt(UzsToUsd((maxSumUzs - all), currency))
                    setPaymentDebtUzs(convertToUzs(maxSumUzs - all))
                    setPaid(allUsd)
                    setPaidUzs(all)
                } else {
                    warningMorePayment()
                }
            }
        }
    }
    const handleChangeDiscount = (value) => {
        const allPaymentAfterDiscount = Math.round((allPayment * 5 / 100) * 10) / 10
        const allPaymentUzsAfterDiscount = Math.round((allPaymentUzs * 5 / 100) * 10) / 10
        if (discountSelectOption.value === 'USD') {
            if (value > allPaymentAfterDiscount) {
                warningMoreDiscount(`${allPaymentAfterDiscount} USD`)
            } else {
                setPaymentDiscount(value)
                setPaymentDiscountUzs(UsdToUzs(value, currency))
                setPaymentDiscountPercent(Math.round(allPayment * value / 100 * 10) / 10)
                setPaymentDebt(allPayment - value)
                setPaymentDebtUzs(UsdToUzs(allPayment - value, currency))
            }
        } else if (discountSelectOption.value === 'UZS') {
            if (value > allPaymentUzsAfterDiscount) {
                warningMoreDiscount(`${allPaymentUzsAfterDiscount} UZS`)
            } else {
                setPaymentDiscountUzs(value)
                setPaymentDiscount(UzsToUsd(value, currency))
                setPaymentDiscountPercent(Math.round(allPaymentUzs * value / 100 * 10) / 10)
                setPaymentDebt(UzsToUsd(allPaymentUzs - value, currency))
                setPaymentDebtUzs(allPaymentUzs - value)
            }
        } else {
            if (value > 5) {
                warningMoreDiscount('5%')
            } else {
                const discountUsd = Math.round((allPayment * value / 100) * 10) / 10
                const discountUzs = Math.round((allPaymentUzs * value / 100) * 10) / 10
                setPaymentDiscountPercent(value)
                setPaymentDiscount(discountUsd)
                setPaymentDiscountUzs(discountUzs)
                setPaymentDebt(convertToUsd(allPayment - discountUsd))
                setPaymentDebtUzs(convertToUzs(allPaymentUzs - discountUzs))
                setPaid(allPayment - discountUsd)
                setPaidUzs(allPaymentUzs - discountUzs)
            }
        }
        setPaymentCash('')
        setPaymentCashUzs('')
        setPaymentCard('')
        setPaymentCardUzs('')
        setPaymentTransfer('')
        setPaymentTransferUzs('')
        setPaid(0)
        setPaidUzs(0)
    }

    const handleChangePaymentInput = (value, key) => {
        writePayment(value, key)
    }
    const handleClickDiscountBtn = () => {
        setHasDiscount(!hasDiscount)
        if (paymentType === 'cash') {
            setPaymentCash(allPayment)
            setPaymentCashUzs(allPaymentUzs)
            setPaid(allPayment)
            setPaidUzs(allPaymentUzs)
        } else if (paymentType === 'card') {
            setPaymentCard(allPayment)
            setPaymentCardUzs(allPaymentUzs)
            setPaid(allPayment)
            setPaidUzs(allPaymentUzs)
        } else if (paymentType === 'transfer') {
            setPaymentTransfer(allPayment)
            setPaymentTransferUzs(allPaymentUzs)
            setPaid(allPayment)
            setPaidUzs(allPaymentUzs)
        } else {
            setPaymentCash('')
            setPaymentCashUzs('')
            setPaymentCard('')
            setPaymentCardUzs('')
            setPaymentTransfer('')
            setPaymentTransferUzs('')
            setPaid(0)
            setPaidUzs(0)
            setPaymentDebt(allPayment)
            setPaymentDebtUzs(allPaymentUzs)
        }
        setPaymentDiscount('')
        setPaymentDiscountUzs('')
        setPaymentDiscountPercent('')
    }
    const handleChangeDiscountSelectOption = (option) => {
        if (discountSelectOption.value !== option.value) {
            setDiscountSelectOption(option)
            setPaymentDiscount('')
            setPaymentDiscountUzs('')
            setPaymentDiscountPercent('')
            setPaymentCash('')
            setPaymentCashUzs('')
            setPaymentCard('')
            setPaymentCardUzs('')
            setPaymentTransfer('')
            setPaymentTransferUzs('')
            setPaymentDebt(allPayment)
            setPaymentDebtUzs(allPaymentUzs)
            setPaid(0)
            setPaidUzs(0)
        }

    }
    const clearAll = (bool) => {
        setPaymentCash('')
        setPaymentCashUzs('')
        setPaymentCard('')
        setPaymentCardUzs('')
        setPaymentTransfer('')
        setPaymentTransferUzs('')
        setPaymentDebt(0)
        setPaymentDebtUzs(0)
        setPaid(0)
        setPaidUzs(0)
        setTableProducts([])
        setClientValue('')
        setPackmanValue('')
        setOptionPackman([{
            label: 'Tanlang',
            value: ''
        }, ...packmans.map((pack) => ({
            value: pack._id,
            label: pack.name
        }))])
        setOptionClient([{
            label: 'Barchasi',
            value: ''
        }, ...clients.map(client => ({
            value: client._id,
            label: client.name
        }))])
        setUserValue('')
        setChecked(false)
        setActiveCategory(null)
        setCurrentProduct(null)
        setSearchCategory('')
        togglePaymentModal(bool)
    }
    const handleClickPay = () => {
        setModalBody('complete')
        setModalVisible(true)
    }
    const handleClosePay = () => {
        setModalVisible(false)
        setTimeout(() => {
            setModalBody('')
        }, 500)
    }
    const handleApprovePay = () => {
        handleClosePay()
        const body = {
            saleproducts: tableProducts,
            client: {
                _id: clientValue ? clientValue.value : null,
                name: clientValue ? clientValue.label : userValue,
                packman: clientValue?.packman
            },
            packman: packmanValue ? {
                _id: packmanValue.value,
                name: packmanValue.label
            } : null,
            discount: {
                discount: Number(paymentDiscount),
                discountuzs: Number(paymentDiscountUzs),
                procient: Number(paymentDiscountPercent),
                isProcient: !!paymentDiscountPercent
            },
            payment: {
                totalprice: Number(allPayment),
                totalpriceuzs: Number(allPaymentUzs),
                type: paymentType,
                cash: Number(paymentCash),
                cashuzs: Number(paymentCashUzs),
                card: Number(paymentCard),
                carduzs: Number(paymentCardUzs),
                transfer: Number(paymentTransfer),
                transferuzs: Number(paymentTransferUzs),
                discount: Number(paymentDiscount),
                discountuzs: Number(paymentDiscountUzs)
            },
            debt: {
                debt: Number(paymentDebt),
                debtuzs: Number(paymentDebtUzs),
                comment: ''
            },
            user: user._id
        }
        dispatch(makePayment(body)).then(({payload}) => {
            setModalData(payload)
            setTimeout(() => {
                setModalBody('checkSell')
                setModalVisible(true)
                clearAll()
            }, 500)
        })
    }
    const handleClickSave = () => {
        if (tableProducts.length > 0) {
            const all = tableProducts.reduce((acc, cur) => convertToUsd((acc + cur.totalprice)), 0)
            const allUzs = tableProducts.reduce((acc, cur) => convertToUzs((acc + cur.totalpriceuzs)), 0)
            const body = {
                temporary: {
                    saleconnectorid: null,
                    clientValue,
                    packmanValue,
                    userValue,
                    tableProducts,
                    totalPrice: all,
                    totalPriceUzs: allUzs
                }
            }
            dispatch(savePayment(body)).then(() => {
                clearAll(false)
                navigate('/sotuv/sotish/saqlanganlar')
            })
        }
    }
    const handleClickPrint = () => {
    }
    // bu yerda boshqa funksiyalar
    const handleChange = (id, value, key) => {
        // get index of product in tableProducts
        switch (key) {
            case 'unitprice':
                handleChangeProductUnitPriceTable(id, value)
                break
            case 'pieces':
                handleChangeProductNumberTable(id, value)
                break
            default:
                break
        }

    }
    const handleDelete = (index) => {
        tableProducts.splice(index, 1)
        setTableProducts([...tableProducts])
    }
    const handleChangeChecked = () => {
        if (checked) {
            setUserValue('')
            setPackmanValue('')
            setClientValue('')
        }
        setChecked(!checked)
    }
    const handleClickCategory = (id) => {
        if (activeCategory === id) {
            setActiveCategory(null)
        } else {
            setActiveCategory(id)
            setSearchCategory('')
            setFilteredCategories(allcategories)
        }
    }
    const handleSearchCategory = (e) => {
        const str = e.target.value
        setSearchCategory(str)
        const searchedStr = str.replace(/\s+/g, ' ').trim()
        const filterData = allcategories.filter(obj => obj.name ? obj.name.toLowerCase().includes(searchedStr) || obj.code.includes(searchedStr) : obj.code.includes(searchedStr))
        setFilteredCategories(str !== '' ? filterData : allcategories)
    }
    const handleChangeSelectedProduct = (option) => {
        const hasProduct = tableProducts.filter(obj => obj.product._id === option.value).length > 0
        if (!hasProduct) {
            setSelectedProduct(option)
            const product = allProducts.find(obj => obj._id === option.value)
            setCurrentProduct({
                total: product.total,
                product: {
                    _id: product._id,
                    code: product.productdata.code,
                    name: product.productdata.name
                },
                totalprice: product.price.sellingprice,
                totalpriceuzs: product.price.sellingpriceuzs,
                pieces: 1,
                incomingprice: product.price.incomingprice,
                incomingpriceuzs: product.price.incomingpriceuzs,
                unitprice: product.price.sellingprice,
                unitpriceuzs: product.price.sellingpriceuzs
            })
            setModalVisible(true)
            setModalBody('sell')
        } else {
            universalToast('Maxsulot ro\'yxatda mavjud !', 'error')
        }
    }
    const handleChangePackmanValue = (option) => {
        setPackmanValue(option)
        const pack = packmans.filter(pack => pack._id === option.value)[0]
        if (pack && pack.hasOwnProperty('clients')) {
            setOptionClient(pack.clients.map(client => ({
                label: client.name,
                value: client._id,
                packman: pack
            })))
        } else {
            setOptionClient([{
                label: 'Tanlang',
                value: ''
            }, ...clients.map(client => ({
                label: client.name,
                value: client._id,
                packman: client?.packman
            }))])
        }
        setClientValue('')
        setUserValue('')
    }
    const handleChangeClientValue = (option) => {
        setClientValue(option)
        const client = clients.filter(client => client._id === option.value)[0]
        if (client && client.hasOwnProperty('packman')) {
            setPackmanValue(({
                label: client.packman.name,
                value: client.packman._id
            }))
        }
        option.value ? setUserValue(option.label) : setUserValue('')
    }
    const handleChangeUserValue = (e) => {
        setUserValue(e.target.value)
    }
    const handleChangeProductUnitPrice = (value) => {
        setCurrentProduct({
            ...currentProduct,
            unitprice: currencyType === 'USD' ? value : UzsToUsd(value, currency),
            unitpriceuzs: currencyType === 'UZS' ? value : UsdToUzs(value, currency),
            totalprice: currencyType === 'USD' ? value * currentProduct.pieces : UzsToUsd(value * currentProduct.pieces, currency),
            totalpriceuzs: currencyType === 'UZS' ? value * currentProduct.pieces : UsdToUzs(value * currentProduct.pieces, currency)
        })
    }
    const handleChangeProductNumber = (value) => {
        setCurrentProduct({
            ...currentProduct,
            pieces: value,
            totalprice: currencyType === 'USD' ? value * currentProduct.unitprice : UzsToUsd(value * currentProduct.unitpriceuzs, currency),
            totalpriceuzs: currencyType === 'UZS' ? value * currentProduct.unitpriceuzs : UsdToUzs(value * currentProduct.unitprice, currency)
        })
    }
    const handleChangeProductUnitPriceTable = (id, value) => {
        const newRelease = tableProducts.map(prevProduct => prevProduct.product._id === id ? ({
            ...prevProduct,
            unitprice: currencyType === 'USD' ? value : UzsToUsd(value, currency),
            unitpriceuzs: currencyType === 'UZS' ? value : UsdToUzs(value, currency),
            totalprice: currencyType === 'USD' ? value * prevProduct.pieces : UzsToUsd(value * prevProduct.pieces, currency),
            totalpriceuzs: currencyType === 'UZS' ? value * prevProduct.pieces : UsdToUzs(value * prevProduct.pieces, currency)
        }) : prevProduct)
        setTableProducts(newRelease)
    }
    const handleChangeProductNumberTable = (id, value) => {
        const newRelease = tableProducts.map(prevProduct => prevProduct.product._id === id ? ({
            ...prevProduct,
            pieces: value,
            totalprice: currencyType === 'USD' ? value * prevProduct.unitprice : UzsToUsd(value * prevProduct.unitpriceuzs, currency),
            totalpriceuzs: currencyType === 'UZS' ? value * prevProduct.unitpriceuzs : UsdToUzs(value * prevProduct.unitprice, currency)
        }) : prevProduct)
        setTableProducts(newRelease)
    }
    const handleChangeProduct = (value, key) => {
        switch (key) {
            case 'unitprice':
                handleChangeProductUnitPrice(value)
                break
            case 'pieces':
                handleChangeProductNumber(value)
                break
            default:
                return null
        }
    }
    const handleAddProduct = () => {
        if (currentProduct) {
            if ((currencyType === 'USD' && currentProduct.incomingprice < currentProduct.unitprice) ||
                (currencyType === 'UZS' && currentProduct.incomingpriceuzs < currentProduct.unitpriceuzs)) {
                setTableProducts([...tableProducts, currentProduct])
                toggleModal()
            } else {
                warningLessSellPayment()
            }
        }
    }
    useEffect(() => {
        if (activeCategory) {
            const filteredData = allProducts.filter(product => product.category._id === activeCategory)
            setFilteredProducts(
                filteredData.map((product) => ({
                    value: product._id,
                    label: `${product.productdata.code} - ${product.productdata.name}`
                }))
            )
        } else {
            setFilteredProducts(
                allProducts.map((product) => ({
                    value: product._id,
                    label: `${product.productdata.code} - ${product.productdata.name}`
                }))
            )
        }
    }, [activeCategory, allProducts])
    useEffect(() => {
        dispatch(getAllPackmans())
        dispatch(getClients())
        dispatch(getAllProducts())
        dispatch(getAllCategories())
    }, [dispatch])
    useEffect(() => {
        setFilteredCategories(allcategories)
    }, [allcategories])
    useEffect(() => {
        setOptionPackman([{
            label: 'Tanlang',
            value: ''
        }, ...packmans.map((packman) => ({
            value: packman._id,
            label: packman.name
        }))])
    }, [packmans])
    useEffect(() => {
        setOptionClient([{
            label: 'Barchasi',
            value: ''
        }, ...clients.map(client => ({
            value: client._id,
            label: client.name
        }))])
    }, [clients])
    return <div className={'flex grow relative overflow-auto'}>
        {loadingMakePayment &&
            <div
                className='fixed backdrop-blur-[2px] z-[100] left-0 top-0 right-0 bottom-0 bg-white-700 flex flex-col items-center justify-center w-full h-full'>
                <SmallLoader />
            </div>}
        <CustomerPayment
            type={paymentType}
            active={paymentModalVisible}
            togglePaymentModal={togglePaymentModal}
            changePaymentType={handleChangePaymentType}
            onChange={handleChangePaymentInput}
            client={userValue || clientValue.label || packmanValue.label}
            allPayment={currencyType === 'USD' ? allPayment : allPaymentUzs}
            card={currencyType === 'USD' ? paymentCard : paymentCardUzs}
            cash={currencyType === 'USD' ? paymentCash : paymentCashUzs}
            debt={currencyType === 'USD' ? paymentDebt : paymentDebtUzs}
            discount={currencyType === 'USD' ? discountSelectOption.value === 'USD' ? paymentDiscount : paymentDiscountPercent : discountSelectOption.value === 'UZS' ? paymentDiscountUzs : paymentDiscountPercent}
            handleChangeDiscount={handleChangeDiscount}
            hasDiscount={hasDiscount}
            transfer={currencyType === 'USD' ? paymentTransfer : paymentTransferUzs}
            handleClickDiscountBtn={handleClickDiscountBtn}
            discountSelectOption={discountSelectOption}
            handleChangeDiscountSelectOption={handleChangeDiscountSelectOption}
            paid={currencyType === 'USD' ? paid : paidUzs}
            handleClickPay={handleClickPay}
        />
        <UniversalModal
            body={modalBody}
            toggleModal={modalBody === 'sell' ? toggleModal : modalBody === 'complete' ? handleClosePay : toggleCheckModal}
            approveFunction={modalBody === 'sell' ? handleAddProduct : modalBody === 'complete' ? handleApprovePay : handleClickPrint}
            isOpen={modalVisible}
            product={modalBody === 'sell' ? currentProduct : modalData}
            headers={headers}
            headerText={modalBody === 'complete' && 'To\'lovni amalga oshirishni tasdiqlaysizmi ?'}
            title={modalBody === 'complete' && 'To\'lovni amalga oshirgach bu ma`lumotlarni o`zgaritirb bo`lmaydi !'}
            changeProduct={handleChangeProduct}
        />
        <div className='flex flex-col grow mainPadding gap-[1.25rem] overflow-auto'>
            <form>
                <Checkbox id={'register-selling'} onChange={handleChangeChecked} value={checked} label={'Mijoz'} />
                <div className={'flex gap-[1.25rem] mt-[1rem]'}>
                    <FieldContainer placeholder={'Santexniklar'} maxWidth={'w-[14.676875rem]'} disabled={!checked}
                                    border={true}
                                    select={true} value={packmanValue} options={optionPackman}
                                    onChange={handleChangePackmanValue} />
                    <FieldContainer placeholder={'Xaridor'} maxWidth={'w-[14.676875rem]'} disabled={!checked}
                                    border={true}
                                    select={true} value={clientValue} options={optionClient}
                                    onChange={handleChangeClientValue} />
                    <FieldContainer placeholder={'Amaldagi xaridor'} disabled={!checked} value={userValue}
                                    onChange={handleChangeUserValue} />
                </div>
            </form>
            <form>
                <FieldContainer
                    select={true}
                    placeholder={'misol: kompyuter'}
                    value={selectedProduct}
                    label={'Maxsulotlar'}
                    onChange={handleChangeSelectedProduct}
                    options={filteredProducts} />
            </form>
            <Table
                page={'registersale'}
                data={tableProducts}
                headers={headers}
                currency={currencyType}
                Delete={handleDelete}
                changeHandler={handleChange}
            />
        </div>
        <div
            className='register-selling-right min-w-[20.25rem] bg-white-400 backdrop-blur-[3.125rem] rounded-[0.25rem] flex flex-col gap-[1.25rem]'>
            <div className='flex flex-col grow gap-[1.25rem]'>
                <SearchInput
                    placeholder={'kategoriyani qidirish...'}
                    value={searchCategory}
                    onChange={handleSearchCategory}
                    onKeyUp={() => {
                    }}
                />
                <div className='grow relative overflow-auto'>
                    <div className='cards-container absolute left-0 right-[0.125rem] top-0 bottom-0'>
                        {
                            loading ? <div
                                className='tableContainerPadding'>
                                <Spinner />
                            </div> : filteredCategories.length > 0 ? filteredCategories.map(category =>
                                    <CategoryCard
                                        key={category._id}
                                        id={category._id}
                                        activeCategory={category._id === activeCategory}
                                        title={category.name}
                                        code={category.code}
                                        products={category.products.length}
                                        onClick={handleClickCategory} />) :
                                <NotFind text={'Kategoriya mavjud emas'} />
                        }
                    </div>
                </div>
            </div>
            <div className={'flex gap-[0.625rem]'}>
                <button type={'button'} className={'register-selling-right-accept-btn'}
                        onClick={handleClickPayment}>To'lov
                </button>
                <button type={'button'} onClick={handleClickSave} className={'register-selling-right-deny-btn'}>
                    <IoAttach size={'1.5rem'} />
                </button>
            </div>
        </div>
    </div>
}

export default RegisterSelling
