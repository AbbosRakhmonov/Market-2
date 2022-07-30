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
            addProductToIncomings(e.value)
        }
    }

    // add to incomings. func
    const addProductToIncomings = (value) => {
        const product = [
            ...products.filter((product) => product._id === value),
        ][0]
        let obj = {
            ...product,
        }
        setIncomings([
            ...incomings,
            {
                oldprice: obj.price.incomingprice,
                oldpriceuzs: obj.price.incomingpriceuzs,
                product: {...obj.productdata, _id: obj._id},
                pieces: 0,
                unitprice: 0,
                unitpriceuzs: 0,
                totalprice: 0,
                totalpriceuzs: 0,
                user: user._id,
                unit: obj.unit,
                supplier: {...supplier},
            },
        ])
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

    // other functions
    const changeAddedIncoming = (e, property, ind) => {
        let target = Number(e.target.value)
        const returnUsd = (item) => {
            return {
                ...item,
                [property]: target,
                unitpriceuzs:
                    property === 'unitprice'
                        ? target * currency
                        : item.unitpriceuzs,
                totalprice:
                    property === 'pieces'
                        ? target * item.unitprice
                        : target * item.pieces,
                totalpriceuzs:
                    (property === 'pieces'
                        ? target * item.unitpriceuzs
                        : target * item.pieces) * currency,
            }
        }
        const returnUzs = (item) => {
            return {
                ...item,
                [property]: target,
                unitprice:
                    property === 'unitpriceuzs'
                        ? ((target / currency) * 1000) / 1000
                        : item.unitprice,
                totalprice:
                    property === 'pieces'
                        ? target * item.unitprice
                        : (((target / currency) * 1000) / 1000) * item.pieces,
                totalpriceuzs:
                    property === 'pieces'
                        ? target * item.unitpriceuzs
                        : target * item.pieces,
            }
        }
        setIncomings([
            ...incomings.map((item, index) => {
                if (index === ind) {
                    if (currencyType === 'USD') {
                        return returnUsd(item)
                    }
                    return returnUzs(item)
                }
                return item
            }),
        ])
    }

    const deleteIncoming = (ind) => {
        setIncomings([...incomings.filter((_, index) => index !== ind)])
    }

    // request functions
    const createIncoming = () => {
        if (!CheckIncoming(incomings)) {
            dispatch(
                addIncoming({
                    products: [...incomings],
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
            <div className='flex items-center mb-[1.25rem]'>
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
            <p className='text-[1.25rem] text-blue-900 mb-[1.25rem]'>
                Yetkazib beruvchi :
            </p>
            <div className={`${incomings.length > 0 ? '' : 'hidden'}`}>
                <Table
                    page={'registerincoming'}
                    headers={headers}
                    data={incomings}
                    currency={currencyType}
                    changeHandler={changeAddedIncoming}
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
        </section>
    )
}

export default RegisterIncoming
