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
    getSuppliers,
} from '../incomingSlice'
import {ConfirmBtn, SaveBtn} from '../../../Components/Buttons/SaveConfirmBtn'
import {CheckIncoming} from '../Functions/CheckIncoming'
import UniversalModal from '../../../Components/Modal/UniversalModal'
import {UsdToUzs, UzsToUsd} from '../../../App/globalFunctions'
import {useNavigate} from 'react-router-dom'

const RegisterIncoming = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {
        market: {_id},
        user,
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
    const [modal, setModal] = useState(false)
    const [temporaryIncomings, setTemporaryIncomings] = useState([])

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
            procient: 0,
            supplier: {...supplier},
        })
        setModal(true)
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

        const product = (!id && {
            ...incomingModal,
        }) || {...incomings.filter((incoming) => incoming._id === id)[0]}

        const countUsd =
            currencyType === 'USD' ? target : UzsToUsd(target, currency)
        const countUzs =
            currencyType === 'UZS' ? target : UsdToUzs(target, currency)

        const countProcient = (price) =>
            currencyType === 'UZS'
                ? Math.round((price / 100) * target) / 1 + price
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
                ...incomings.map((incoming) => {
                    if (incoming._id === id) {
                        return product
                    }
                    return incoming
                }),
            ])
        } else {
            setIncomingModal(product)
        }
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
        const temps = temporaryIncomings.filter(
            (temp) => temp._id !== product._id
        )
        setTemporaryIncomings(temporary)
        if (temps.length === 0) {
            dispatch(clearTemporary())
        }
    }

    // request functions
    const createIncoming = () => {
        const postincoming = incomings.map((incoming) => {
            let obj = {...incoming}
            delete obj._id
            delete obj.procient
            return obj
        })

        console.log(postincoming)
        if (!CheckIncoming(postincoming)) {
            dispatch(
                addIncoming({
                    products: [...postincoming],
                    user: user._id,
                })
            ).then(() => navigate('/maxsulotlar/qabul/qabullar'))
            removeTemporary()
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
                    _id: temporary._id,
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
                    incomings,
                },
            })
        )
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
                        isDisabled={supplier._id ? false : true}
                    />
                </div>
            </div>
            <p className='text-[1.25rem] text-blue-900 mainPadding'>
                Yetkazib beruvchi: {supplier.name}
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
                changeProduct={changeIncomings}
                approveFunction={addProductToIncomings}
                currency={currencyType}
            />
        </section>
    )
}

export default RegisterIncoming
