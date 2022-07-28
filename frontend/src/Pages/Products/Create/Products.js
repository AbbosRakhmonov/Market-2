import {useEffect, useState} from 'react'
import ExportBtn from '../../../Components/Buttons/ExportBtn'
import ImportBtn from '../../../Components/Buttons/ImportBtn'
import * as XLSX from 'xlsx'
import Pagination from '../../../Components/Pagination/Pagination'
import Table from '../../../Components/Table/Table'
import {useDispatch, useSelector} from 'react-redux'
import Spinner from '../../../Components/Spinner/SmallLoader'
import NotFind from '../../../Components/NotFind/NotFind'
import {
    addProduct,
    clearErrorProducts,
    clearSearchedProducts,
    clearSuccessAddProduct,
    clearSuccessDeleteProduct,
    clearSuccessUpdateProduct,
    deleteProduct,
    getProducts,
    getProductsByFilter,
    updateProduct,
} from './productSlice'
import {clearErrorUnits, getUnits} from '../../Units/unitsSlice'
import {
    successAddProductMessage,
    successDeleteProductMessage,
    successUpdateProductMessage,
    universalToast,
    warningCurrencyRate,
    warningEmptyInput,
} from '../../../Components/ToastMessages/ToastMessages'
import {
    regexForEmptyString,
    regexForTypeNumber,
} from '../../../Components/RegularExpressions/RegularExpressions'
import UniversalModal from '../../../Components/Modal/UniversalModal'
import CreateProductForm from '../../../Components/CreateProductForm/CreateProductForm'
import {getCategories} from '../../CategoryPage/categorySlice'
import {UsdToUzs, UzsToUsd} from '../../Currency/Currency'
import SearchForm from '../../../Components/SearchForm/SearchForm'

function Products() {
    const dispatch = useDispatch()
    const {
        market: {_id},
    } = useSelector((state) => state.login)
    const {errorUnits, units} = useSelector((state) => state.units)
    const {categories} = useSelector((state) => state.category)
    const {currency, currencyType, currencyLoading} = useSelector(
        (state) => state.currency
    )
    const {
        products,
        total,
        errorProducts,
        loading,
        successAddProduct,
        successUpdateProduct,
        searchedProducts,
        totalSearched,
        successDeleteProduct,
    } = useSelector((state) => state.products)
    const [data, setData] = useState(products)
    const [codeOfProduct, setCodeOfProduct] = useState('')
    const [nameOfProduct, setNameOfProduct] = useState('')
    const [numberOfProduct, setNumberOfProduct] = useState('')
    const [unitOfProduct, setUnitOfProduct] = useState('')
    const [priceOfProduct, setPriceOfProduct] = useState('')
    const [sellingPriceOfProduct, setSellingPriceOfProduct] = useState('')
    const [categoryOfProduct, setCategoryOfProduct] = useState('')
    const [searchByCode, setSearchByCode] = useState('')
    const [searchByName, setSearchByName] = useState('')
    const [searchByCategory, setSearchByCategory] = useState('')
    const [showByTotal, setShowByTotal] = useState('10')
    const [currentPage, setCurrentPage] = useState(0)
    const [filteredDataTotal, setFilteredDataTotal] = useState(total)
    const [stickyForm, setStickyForm] = useState(false)
    const [currentProduct, setCurrentProduct] = useState(null)
    const [modalVisible, setModalVisible] = useState(false)
    const [deletedProduct, setDeletedProduct] = useState(null)
    const [modalBody, setModalBody] = useState(null)
    const [unitOptions, setUnitOptions] = useState([])
    const [categoryOptions, setCategoryOptions] = useState([])
    const [excelData, setExcelData] = useState([])

    // modal toggle
    const toggleModal = () => setModalVisible(!modalVisible)

    // check empty string
    const checkEmptyString = (values) => {
        return values.some((value) => regexForEmptyString.test(value))
    }

    // table headers
    const headers = [
        {title: '№'},
        {title: 'Kodi', filter: 'code'},
        {title: 'Nomi'},
        {
            title: 'Soni (dona)',
            filter: 'total',
        },
        {title: 'Olish', filter: 'incomingprice'},
        {title: 'Sotish', filter: 'sellingprice'},
        {title: ''},
    ]
    const exportHeader = [
        {label: '№', key: '_id'},
        {label: 'Kodi', key: 'productdata.code'},
        {
            label: 'Nomi',
            key: 'productdata.name',
        },
        {
            label: 'Kategoriya kodi',
            key: 'category.code',
        },
        {
            label: 'Kategoriya nomi',
            key: 'category.name',
        },
        {label: 'Soni (dona)', key: 'total'},
        {
            label: 'Olish (USD)',
            key: 'price.incomingprice',
        },
        {label: 'Sotish (USD)', key: 'price.sellingprice'},
        {
            label: 'Olish (UZS)',
            key: 'price.incomingpriceuzs',
        },
        {label: 'Sotish (UZS)', key: 'price.sellingpriceuzs'},
    ]

    // handle change of inputs
    const handleChangeCodeOfProduct = (e) => {
        let val = e.target.value
        if (regexForTypeNumber.test(val)) {
            setCodeOfProduct(val)
        }
    }
    const handleChangeNameOfProduct = (e) => {
        setNameOfProduct(e.target.value)
    }
    const handleChangeNumberOfProduct = (e) => {
        let val = e.target.value
        if (regexForTypeNumber.test(val)) {
            setNumberOfProduct(val)
        }
    }
    const handleChangePriceOfProduct = (e) => {
        let val = e.target.value
        if (regexForTypeNumber.test(val)) {
            setPriceOfProduct(val)
        }
    }
    const handleChangeSellingPriceOfProduct = (e) => {
        let val = e.target.value
        if (regexForTypeNumber.test(val)) {
            setSellingPriceOfProduct(val)
        }
    }
    const handleChangeUnitOfProduct = (option) => {
        setUnitOfProduct(option)
    }
    const handleChangeCategoryOfProduct = (option) => {
        setCategoryOfProduct(option)
    }

    // handle change of search inputs
    const filterByCode = (e) => {
        let val = e.target.value
        let valForSearch = val.replace(/\s+/g, ' ').trim()
        setSearchByCode(val)
        ;(searchedProducts.length > 0 || totalSearched > 0) &&
            dispatch(clearSearchedProducts())
        if (valForSearch === '') {
            setData(products)
            setFilteredDataTotal(total)
        } else {
            const filteredProducts = products.filter((product) => {
                return product.productdata.code.includes(valForSearch)
            })
            setData(filteredProducts)
            setFilteredDataTotal(filteredProducts.length)
        }
    }
    const filterByCategory = (e) => {
        let val = e.target.value
        let valForSearch = val.toLowerCase().replace(/\s+/g, ' ').trim()
        setSearchByCategory(val)
        ;(searchedProducts.length > 0 || totalSearched > 0) &&
            dispatch(clearSearchedProducts())
        if (valForSearch === '') {
            setData(products)
            setFilteredDataTotal(total)
        } else {
            const filteredProducts = products.filter((product) => {
                return (
                    product.category.code.includes(valForSearch) ||
                    product.category.name.toLowerCase().includes(valForSearch)
                )
            })
            setData(filteredProducts)
            setFilteredDataTotal(filteredProducts.length)
        }
    }
    const filterByName = (e) => {
        let val = e.target.value
        let valForSearch = val.toLowerCase().replace(/\s+/g, ' ').trim()
        setSearchByName(val)
        ;(searchedProducts.length > 0 || totalSearched > 0) &&
            dispatch(clearSearchedProducts())
        if (valForSearch === '') {
            setData(products)
            setFilteredDataTotal(total)
        } else {
            const filteredProducts = products.filter((product) => {
                return product.productdata.name
                    .toLowerCase()
                    .includes(valForSearch)
            })
            setData(filteredProducts)
            setFilteredDataTotal(filteredProducts.length)
        }
    }
    const filterByCodeAndNameWhenPressEnter = (e) => {
        if (e.key === 'Enter') {
            const body = {
                currentPage,
                countPage: showByTotal,
                search: {
                    code: searchByCode.replace(/\s+/g, ' ').trim(),
                    name: searchByName.replace(/\s+/g, ' ').trim(),
                },
                product: {
                    code: codeOfProduct.replace(/\s+/g, ' ').trim(),
                    name: nameOfProduct.replace(/\s+/g, ' ').trim(),
                    unit: unitOfProduct.value,
                    market: _id,
                },
            }
            dispatch(getProductsByFilter(body))
        }
    }

    // filter by total
    const filterByTotal = ({value}) => {
        setShowByTotal(value)
        setCurrentPage(0)
    }

    // handle submit of inputs
    const addNewProduct = (e) => {
        e.preventDefault()
        if (currency) {
            const filter = checkEmptyString([
                codeOfProduct,
                nameOfProduct,
                unitOfProduct,
                categoryOfProduct,
                priceOfProduct,
                sellingPriceOfProduct,
            ])
            if (filter) {
                warningEmptyInput()
            } else {
                const body = {
                    currentPage,
                    countPage: showByTotal,
                    category: categoryOfProduct.value,
                    search: {
                        code: searchByCode.replace(/\s+/g, ' ').trim(),
                        name: searchByName.replace(/\s+/g, ' ').trim(),
                    },
                    product: {
                        code: codeOfProduct.replace(/\s+/g, ' ').trim(),
                        name: nameOfProduct.replace(/\s+/g, ' ').trim(),
                        total: numberOfProduct,
                        unit: unitOfProduct.value,
                        market: _id,
                        incomingprice:
                            currencyType === 'UZS'
                                ? UzsToUsd(priceOfProduct, currency)
                                : priceOfProduct,
                        sellingprice:
                            currencyType === 'UZS'
                                ? UzsToUsd(sellingPriceOfProduct, currency)
                                : sellingPriceOfProduct,
                        incomingpriceuzs:
                            currencyType === 'UZS'
                                ? priceOfProduct
                                : UsdToUzs(priceOfProduct, currency),
                        sellingpriceuzs:
                            currencyType === 'UZS'
                                ? sellingPriceOfProduct
                                : UsdToUzs(sellingPriceOfProduct, currency),
                    },
                }
                dispatch(addProduct(body))
            }
        } else {
            warningCurrencyRate()
        }
    }
    const clearForm = (e) => {
        e && e.preventDefault()
        setCodeOfProduct('')
        setNameOfProduct('')
        setNumberOfProduct('')
        setPriceOfProduct('')
        setSellingPriceOfProduct('')
        setUnitOfProduct('')
        setCategoryOfProduct('')
        setCurrentProduct(null)
        setStickyForm(false)
    }
    const handleEdit = (e) => {
        e.preventDefault()
        const filter = checkEmptyString([
            codeOfProduct,
            nameOfProduct,
            unitOfProduct,
            categoryOfProduct,
            priceOfProduct,
            sellingPriceOfProduct,
        ])
        if (filter) {
            warningEmptyInput()
        } else {
            const body = {
                product: {
                    ...currentProduct,
                    name: nameOfProduct.replace(/\s+/g, ' ').trim(),
                    code: codeOfProduct.replace(/\s+/g, ' ').trim(),
                    category: categoryOfProduct.value,
                    unit: unitOfProduct.value,
                    priceid: currentProduct.price._id,
                    productdata: currentProduct.productdata._id,
                    incomingprice:
                        currencyType === 'UZS'
                            ? UzsToUsd(priceOfProduct, currency)
                            : priceOfProduct,
                    sellingprice:
                        currencyType === 'UZS'
                            ? UzsToUsd(sellingPriceOfProduct, currency)
                            : sellingPriceOfProduct,
                    incomingpriceuzs:
                        currencyType === 'UZS'
                            ? priceOfProduct
                            : UsdToUzs(priceOfProduct, currency),
                    sellingpriceuzs:
                        currencyType === 'UZS'
                            ? sellingPriceOfProduct
                            : UsdToUzs(sellingPriceOfProduct, currency),
                    total: numberOfProduct,
                },
                currentPage,
                countPage: showByTotal,
                search: {
                    name: searchByName.replace(/\s+/g, ' ').trim(),
                    code: searchByCode.replace(/\s+/g, ' ').trim(),
                },
            }
            dispatch(updateProduct(body))
        }
    }

    // excel
    const readExcel = (file) => {
        new Promise((resolve, reject) => {
            const fileReader = new FileReader()
            fileReader.readAsArrayBuffer(file)

            fileReader.onload = (e) => {
                const bufferArray = e.target.result

                const wb = XLSX.read(bufferArray, {
                    type: 'buffer',
                })

                const wsname = wb.SheetNames[0]

                const ws = wb.Sheets[wsname]

                const data = XLSX.utils.sheet_to_json(ws)

                resolve(data)
            }

            fileReader.onerror = (error) => {
                reject(error)
            }
        })
            .then((data) => {
                setExcelData(data)
                setModalBody('import')
                toggleModal()
            })
            .catch((err) => {
                console.log(err)
                universalToast('Ошибка при загрузке файла', 'error')
            })
    }

    // table edit and delete
    const handleEditProduct = (product) => {
        setCurrentProduct(product)
        setStickyForm(true)
    }
    const handleDeleteProduct = (product) => {
        const body = {
            ...product,
            currentPage,
            countPage: showByTotal,
            search: {
                name: searchByName.replace(/\s+/g, ' ').trim(),
                code: searchByCode.replace(/\s+/g, ' ').trim(),
            },
            name: nameOfProduct.replace(/\s+/g, ' ').trim(),
            productdata: product.productdata._id,
        }
        setDeletedProduct(body)
        setModalBody('approve')
        toggleModal()
    }
    const handleClickApproveToDelete = () => {
        dispatch(deleteProduct(deletedProduct))
        toggleModal()
        setTimeout(() => {
            setModalBody(null)
        }, 500)
    }
    const handleClickCancelToDelete = () => {
        toggleModal()
        setDeletedProduct(null)
        setTimeout(() => {
            setModalBody(null)
        }, 500)
    }
    const filterData = (filterKey) => {
        console.log(filterKey)
    }

    useEffect(() => {
        if (!currency && loading) {
            warningCurrencyRate()
        } else if (currencyType === 'UZS') {
            priceOfProduct &&
                setPriceOfProduct(UsdToUzs(priceOfProduct, currency))
            sellingPriceOfProduct &&
                setSellingPriceOfProduct(
                    UsdToUzs(sellingPriceOfProduct, currency)
                )
        } else {
            priceOfProduct &&
                setPriceOfProduct(UzsToUsd(priceOfProduct, currency))
            sellingPriceOfProduct &&
                setSellingPriceOfProduct(
                    UzsToUsd(sellingPriceOfProduct, currency)
                )
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currency, currencyType, currencyLoading])
    useEffect(() => {
        errorUnits &&
            universalToast(errorUnits, 'error') &&
            dispatch(clearErrorUnits())
        errorProducts &&
            universalToast(errorProducts, 'error') &&
            dispatch(clearErrorProducts())
        successAddProduct &&
            successAddProductMessage() &&
            dispatch(clearSuccessAddProduct()) &&
            clearForm()
        successUpdateProduct &&
            successUpdateProductMessage() &&
            dispatch(clearSuccessUpdateProduct()) &&
            clearForm() &&
            setStickyForm(false)
        successDeleteProduct &&
            successDeleteProductMessage() &&
            dispatch(clearSuccessDeleteProduct())
    }, [
        errorUnits,
        errorProducts,
        dispatch,
        successAddProduct,
        successUpdateProduct,
        successDeleteProduct,
    ])
    useEffect(() => {
        const body = {
            currentPage,
            countPage: showByTotal,
            search: {
                code: '',
                name: '',
            },
        }
        dispatch(getProducts(body))
        dispatch(getUnits())
        dispatch(getCategories())
    }, [currentPage, showByTotal, dispatch])
    useEffect(() => {
        setData(products)
    }, [products])
    useEffect(() => {
        setFilteredDataTotal(total)
    }, [total])
    useEffect(() => {
        if (currentProduct) {
            const {
                productdata: {name, code},
                unit,
                total,
                category,
                price: {
                    sellingprice,
                    incomingprice,
                    sellingpriceuzs,
                    incomingpriceuzs,
                },
            } = currentProduct
            setCodeOfProduct(code)
            setNameOfProduct(name)
            setNumberOfProduct(total)
            setUnitOfProduct({
                value: unit._id,
                label: unit.name,
            })
            setCategoryOfProduct({
                value: category._id,
                label: `${category.code} - ${category.name}`,
            })
            setPriceOfProduct(
                currencyType === 'UZS' ? incomingpriceuzs : incomingprice
            )
            setSellingPriceOfProduct(
                currencyType === 'UZS' ? sellingpriceuzs : sellingprice
            )
        }
    }, [currentProduct, currencyType])
    useEffect(() => {
        setUnitOptions(
            units.map((unit) => ({
                value: unit._id,
                label: unit.name,
            }))
        )
    }, [units])
    useEffect(() => {
        setCategoryOptions(
            categories.map((category) => ({
                value: category._id,
                label: `${category.code} - ${category.name}`,
            }))
        )
    }, [categories])

    return (
        <section>
            {/* Modal */}
            <UniversalModal
                toggleModal={toggleModal}
                body={modalBody}
                approveFunction={handleClickApproveToDelete}
                closeModal={handleClickCancelToDelete}
                isOpen={modalVisible}
            />

            {/* Form */}
            <CreateProductForm
                nameOfProduct={nameOfProduct}
                unitOfProduct={unitOfProduct}
                categoryOfProduct={categoryOfProduct}
                codeOfProduct={codeOfProduct}
                sellingPriceOfProduct={sellingPriceOfProduct}
                numberOfProduct={numberOfProduct}
                priceOfProduct={priceOfProduct}
                handleChangeSellingPriceOfProduct={
                    handleChangeSellingPriceOfProduct
                }
                handleChangePriceOfProduct={handleChangePriceOfProduct}
                handleChangeNumberOfProduct={handleChangeNumberOfProduct}
                stickyForm={stickyForm}
                clearForm={clearForm}
                handleEdit={handleEdit}
                addNewProduct={addNewProduct}
                handleChangeCodeOfProduct={handleChangeCodeOfProduct}
                handleChangeNameOfProduct={handleChangeNameOfProduct}
                handleChangeUnitOfProduct={handleChangeUnitOfProduct}
                handleChangeCategoryOfProduct={handleChangeCategoryOfProduct}
                pageName={'products'}
                unitOptions={unitOptions}
                categoryOptions={categoryOptions}
            />
            <div className={'flex justify-between items-center mainPadding'}>
                <div className={'flex gap-[1.5rem]'}>
                    {(data.length !== 0 || searchedProducts.length !== 0) && (
                        <ExportBtn
                            data={
                                searchedProducts.length > 0
                                    ? searchedProducts
                                    : data
                            }
                            headers={exportHeader}
                            fileName={'Maxsulotlar'}
                        />
                    )}
                    <ImportBtn readExcel={readExcel} />
                </div>
                <h3 className={'text-blue-900 text-[xl] leading-[1.875rem]'}>
                    Maxsulotlar
                </h3>
                {(filteredDataTotal !== 0 || totalSearched !== 0) && (
                    <Pagination
                        countPage={Number(showByTotal)}
                        totalDatas={totalSearched || filteredDataTotal}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                )}
            </div>
            <SearchForm
                filterBy={['code', 'name', 'total', 'category']}
                filterByCode={filterByCode}
                filterByCodeAndNameWhenPressEnter={
                    filterByCodeAndNameWhenPressEnter
                }
                filterByName={filterByName}
                filterByTotal={filterByTotal}
                searchByCode={searchByCode}
                searchByName={searchByName}
                searchByCategory={searchByCategory}
                filterByCategory={filterByCategory}
            />
            <div className='tableContainerPadding'>
                {loading ? (
                    <Spinner />
                ) : data.length === 0 && searchedProducts.length === 0 ? (
                    <NotFind text={'Maxsulot mavjud emas'} />
                ) : (
                    <Table
                        headers={headers}
                        Edit={handleEditProduct}
                        Delete={handleDeleteProduct}
                        page={'product'}
                        data={
                            searchedProducts.length > 0
                                ? searchedProducts
                                : data
                        }
                        Sort={filterData}
                        currentPage={currentPage}
                        countPage={showByTotal}
                        currency={currency}
                    />
                )}
            </div>
        </section>
    )
}

export default Products
