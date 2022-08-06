import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import SelectInput from '../../../Components/SelectInput/SelectInput'
import Table from '../../../Components/Table/Table'
import {
    addIncoming,
    addTemporary,
    getProducts,
    getSuppliers,
} from '../incomingSlice'
import {getCurrency, getCurrencyType} from '../../Currency/currencySlice'
import {ConfirmBtn, SaveBtn} from '../../../Components/Buttons/SaveConfirmBtn'
import {CheckIncoming} from '../Functions/CheckIncoming'
import UniversalModal from '../../../Components/Modal/UniversalModal'

const RegisterIncoming = () => {
    const dispatch = useDispatch()
    const {
        market: {_id},
        user,
    } = useSelector((state) => state.login)
    const {currency, currencyType} = useSelector((state) => state.currency)
    const {suppliers, products} = useSelector((state) => state.incoming)

    // states
    const [suppliersData, setSuppliersData] = useState([])
    const [productsData, setProductsData] = useState([])
    const [supplier, setSupplier] = useState({})
    const [incomings, setIncomings] = useState([])
    const [incomingModal, setIncomingModal] = useState({})
    const [modal, setModal] = useState(false)

    // functions for onchange of select
    const selectSupplier = (e) => {
        setSupplier(...suppliers.filter((supplier) => supplier._id === e.value))
        if (incomings.length > 0) {
            setIncomings([
                ...incomings.map((product) => {
                    return {
                        ...product,
                        supplier: {
                            _id: e.value,
                            name: e.label,
                        },
                    }
                }),
            ])
        }
    }

    const selectProduct = (e) => {
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
            ...products.filter((product) => product._id === value),
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
            supplier: {...supplier},
        })
        setModal(true)
    }
    // change product in modalincoming. function
    const changeModalIncoming = (e, property) => {
        let target = Number(e.target.value)
        const check = (key) => key === property
        const changepieces = () => {
            const obj = {
                ...incomingModal,
                pieces: target,
                totalprice: target * incomingModal.unitprice,
                totalpriceuzs: target * incomingModal.unitprice * currency,
            }
            setIncomingModal(obj)
        }
        const changeunitprice = () => {
            const obj = {
                ...incomingModal,
                unitprice: target,
                unitpriceuzs: target * currency,
                totalprice: target * incomingModal.pieces,
                totalpriceuzs: target * incomingModal.pieces * currency,
            }
            setIncomingModal(obj)
        }
        const changesellingprice = () => {
            const obj = {
                ...incomingModal,
                sellingprice: target,
                sellingpriceuzs: target * currency,
            }
            setIncomingModal(obj)
        }

        check('pieces') && changepieces()
        check('unitprice') && changeunitprice()
        check('sellingprice') && changesellingprice()
    }

    // add modalincoming to incomings
    const addProductToIncomings = () => {
        setIncomings([incomingModal, ...incomings])
        setModal(false)
    }

    // change product in incomings
    const changeIncomings = (e, key, id) => {
        const target = Number(e.target.value)
        const check = (property) => key === property
        let currentUsd =
            currencyType === 'USD'
                ? target
                : ((target / currency) * 1000) / 1000
        let currentUzs =
            currencyType === 'USD'
                ? target * currency
                : ((target / currency) * 1000) / 1000

        const changepieces = (obj) => {
            obj.pieces = target
            obj.totalprice = target * obj.unitprice
            obj.totalpriceuzs = target * obj.unitpriceuzs
        }

        const changeunitprice = (obj) => {
            obj.unitprice = currentUsd
            obj.unitpriceuzs = currentUzs
            obj.totalprice = currentUsd * obj.pieces
            obj.totalpriceuzs = currentUzs * obj.pieces
        }

        const changesellingprice = (obj) => {
            obj.sellingprice = currentUsd
            obj.sellingpriceuzs = currentUzs
        }

        let products = incomings.map((incoming) => {
            if (incoming._id === id) {
                check('pieces') && changepieces(incoming)
                check('unitprice') && changeunitprice(incoming)
                check('sellingprice') && changesellingprice(incoming)
                return incoming
            }
            return incoming
        })
        setIncomings(products)
    }

    // change datas for react-select //
    const changeSuppliersData = (data) => {
        const suppliers = data.map((supplier) => {
            return {
                label: supplier.name,
                value: supplier._id,
            }
        })
        setSuppliersData(suppliers)
    }

    const changeProductsData = (data) => {
        const products = data.map((product) => {
            return {
                label: product.productdata.name,
                value: product._id,
            }
        })
        setProductsData(products)
    }

    const deleteIncoming = (product) => {
        const filter = incomings.filter(
            (incoming) => incoming._id !== product._id
        )
        setIncomings(filter)
    }

    // request functions
    const createIncoming = () => {
        const postincoming = incomings.map((incoming) => {
            delete incoming._id
            return incoming
        })
        if (!CheckIncoming(postincoming)) {
            dispatch(
                addIncoming({
                    products: [...postincoming],
                    user: user._id,
                })
            )
            setIncomings([])
        }
    }

    const createTemporary = () => {
        dispatch(
            addTemporary({
                market: _id,
                temporaryincoming: {
                    supplier,
                    incomings,
                },
            })
        )
        setIncomings([])
    }

    // Tableheader
    const headers = [
        {
            title: '№',
            styles: 'w-[8%]',
        },
        {
            title: 'Kodi',
            styles: 'w-[10%]',
        },
        {
            title: 'Nomi',
        },
        {
            title: 'Soni',
            styles: 'w-[10%]',
        },
        {
            title: 'Narxi',
            styles: 'w-[10%]',
        },
        {
            title: 'Avvalgi narxi',
            styles: 'w-[15%]',
        },
        {
            title: 'Jami',
            styles: 'w-[15%]',
        },
        {
            title: 'Sotish',
            styles: 'w-[15%]',
        },
        {
            title: '',
            styles: 'w-[5%]',
        },
    ]

    useEffect(() => {
        suppliers.length < 1 && dispatch(getSuppliers(_id))
        suppliers.length > 0 && changeSuppliersData(suppliers)
    }, [dispatch, _id, suppliers])

    useEffect(() => {
        products.length < 1 && dispatch(getProducts({market: _id}))
        products.length > 0 && changeProductsData(products)
    }, [dispatch, _id, products])

    useEffect(() => {
        dispatch(getCurrency)
        dispatch(getCurrencyType)
    }, [dispatch])

    return (
        <section>
            <div className='flex items-center mainPadding'>
                <div className='w-full pr-[1.25rem] border-r border-blue-100'>
                    <SelectInput
                        options={suppliersData}
                        onSelect={selectSupplier}
                    />
                </div>
                <div className='w-full pl-[1.25rem]'>
                    <SelectInput
                        options={productsData}
                        onSelect={selectProduct}
                        disabled={supplier._id ? false : true}
                    />
                </div>
            </div>
            <p className='text-[1.25rem] text-blue-900 mainPadding'>
                Yetkazib beruvchi :
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
                        text={'Saqlash'}
                        onClick={() => createTemporary()}
                    />
                    <ConfirmBtn
                        text={'Tasdiqlash'}
                        onClick={() => {
                            createIncoming()
                        }}
                    />
                </div>
            </div>
            <UniversalModal
                headerText={'Its modal!'}
                title={'wfwwvwrb'}
                isOpen={modal}
                body={'registerincomingbody'}
                product={incomingModal}
                closeModal={() => setModal(false)}
                changeProduct={changeModalIncoming}
                approveFunction={addProductToIncomings}
            />
        </section>
    )
}

export default RegisterIncoming
