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
    addProductsFromExcel,
    clearErrorProducts,
    clearSearchedProducts,
    clearSuccessAddProduct,
    clearSuccessDeleteProduct,
    clearSuccessUpdateProduct,
    deleteProduct,
    getCodeOfCategory,
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
    warningCategory,
    warningCurrencyRate,
    warningEmptyInput,
} from '../../../Components/ToastMessages/ToastMessages'
import {regexForTypeNumber} from '../../../Components/RegularExpressions/RegularExpressions'
import UniversalModal from '../../../Components/Modal/UniversalModal'
import CreateProductForm from '../../../Components/CreateProductForm/CreateProductForm'
import {
    clearErrorGetAllCategories,
    getAllCategories,
} from '../../Category/categorySlice'
import {
    checkEmptyString,
    universalSort,
    UsdToUzs,
    UzsToUsd,
} from '../../../App/globalFunctions'
import SearchForm from '../../../Components/SearchForm/SearchForm'
import {clearError} from '../../Currency/currencySlice'

function Products() {
    const dispatch = useDispatch()
    const {
        market: {_id},
    } = useSelector((state) => state.login)
    const {errorUnits, units} = useSelector((state) => state.units)
    const {allcategories, errorGetCategories} = useSelector(
        (state) => state.category
    )
    const {currency, currencyType, currencyError, currencyLoading} =
        useSelector((state) => state.currency)
    const {
        products,
        total,
        errorProducts,
        loading,
        successAddProduct,
        successUpdateProduct,
        lastProductCode,
        searchedProducts,
        totalSearched,
        successDeleteProduct,
    } = useSelector((state) => state.products)
    const [data, setData] = useState(products)
    const [searchedData, setSearchedData] = useState(searchedProducts)
    const [codeOfProduct, setCodeOfProduct] = useState('')
    const [nameOfProduct, setNameOfProduct] = useState('')
    const [numberOfProduct, setNumberOfProduct] = useState('')
    const [unitOfProduct, setUnitOfProduct] = useState('')
    const [priceOfProduct, setPriceOfProduct] = useState('')
    const [sellingPriceOfProduct, setSellingPriceOfProduct] = useState('')
    const [priceOfProductUsd, setPriceOfProductsUsd] = useState('')
    const [sellingPriceOfProductUsd, setSellingPriceOfProductUsd] = useState('')
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
    const [createdData, setCreatedData] = useState([])
    const [sorItem, setSorItem] = useState({
        filter: '',
        sort: '',
        count: 0,
    })

    // modal toggle
    const toggleModal = () => setModalVisible(!modalVisible)

    // table headers
    const headers = [
        {title: '№'},
        {
            title: 'Kategoriyasi',
            filter: 'category.code',
        },
        {title: 'Kodi', filter: 'productdata.code'},
        {title: 'Nomi', filter: 'productdata.name'},
        {
            title: 'Soni',
            filter: 'total',
        },
        {
            title: 'Olish',
            filter:
                currencyType === 'UZS'
                    ? 'price.incomingpriceuzs'
                    : 'price.incomingprice',
        },
        {
            title: 'Sotish',
            filter:
                currencyType === 'UZS'
                    ? 'price.sellingpriceuzs'
                    : 'price.sellingprice',
        },
        {title: ''},
    ]
    const exportHeader = [
        '№',
        'Mahsulot kategoriyasi',
        'Mahsulot kodi',
        'Mahsulot nomi',
        'Soni',
        "O'lchov birligi",
        'Kelish narxi USD',
        'Kelish narxi UZS',
        'Sotish narxi USD',
        'Sotish narxi UZS',
    ]
    const importHeaders = [
        {name: 'Kategoriyasi', value: 'category'},
        {name: 'Kodi', value: 'code'},
        {name: 'Nomi', value: 'name'},
        {name: "O'lchov birligi", value: 'unit'},
        {name: 'Soni', value: 'total'},
        {name: 'Kelish narxi USD', value: 'incomingprice'},
        {name: 'Kelish narxi UZS', value: 'incomingpriceuzs'},
        {name: 'Sotish narxi USD', value: 'sellingprice'},
        {name: 'Sotish narxi UZS', value: 'sellingpriceuzs'},
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
            if (currencyType === 'UZS') {
                setPriceOfProduct(val)
                setPriceOfProductsUsd(UzsToUsd(val, currency))
            } else {
                setPriceOfProductsUsd(val)
                setPriceOfProduct(UsdToUzs(val, currency))
            }
        }
    }
    const handleChangeSellingPriceOfProduct = (e) => {
        let val = e.target.value
        if (regexForTypeNumber.test(val)) {
            if (currencyType === 'UZS') {
                setSellingPriceOfProduct(val)
                setSellingPriceOfProductUsd(UzsToUsd(val, currency))
            } else {
                setSellingPriceOfProductUsd(val)
                setSellingPriceOfProduct(UsdToUzs(val, currency))
            }
        }
    }
    const handleChangeUnitOfProduct = (option) => {
        setUnitOfProduct(option)
    }
    const handleChangeCategoryOfProduct = (option) => {
        setCategoryOfProduct(option)
        const body = {
            categoryId: option.value,
        }
        dispatch(getCodeOfCategory(body))
    }

    // handle change of search inputs
    const filterByCode = (e) => {
        let val = e.target.value
        let valForSearch = val.replace(/\s+/g, ' ').trim()
        setSearchByCode(val)
        ;(searchedData.length > 0 || totalSearched > 0) &&
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
        let valForSearch = val.replace(/\s+/g, ' ').trim()
        setSearchByCategory(val)
        ;(searchedData.length > 0 || totalSearched > 0) &&
            dispatch(clearSearchedProducts())
        if (valForSearch === '') {
            setData(products)
            setFilteredDataTotal(total)
        } else {
            const filteredProducts = products.filter((product) => {
                return product.category.code.includes(valForSearch)
            })
            setData(filteredProducts)
            setFilteredDataTotal(filteredProducts.length)
        }
    }
    const filterByName = (e) => {
        let val = e.target.value
        let valForSearch = val.toLowerCase().replace(/\s+/g, ' ').trim()
        setSearchByName(val)
        ;(searchedData.length > 0 || totalSearched > 0) &&
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
    const filterByCodeAndNameAndCategoryWhenPressEnter = (e) => {
        if (e.key === 'Enter') {
            setCurrentPage(0)
            const body = {
                currentPage: 0,
                countPage: showByTotal,
                search: {
                    name: searchByName.replace(/\s+/g, ' ').trim(),
                    code: searchByCode.replace(/\s+/g, ' ').trim(),
                    category: searchByCategory.replace(/\s+/g, ' ').trim(),
                },
                product: {
                    code: codeOfProduct,
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
                        name: searchByName.replace(/\s+/g, ' ').trim(),
                        code: searchByCode.replace(/\s+/g, ' ').trim(),
                        category: searchByCategory.replace(/\s+/g, ' ').trim(),
                    },
                    product: {
                        code: codeOfProduct,
                        name: nameOfProduct.replace(/\s+/g, ' ').trim(),
                        total: numberOfProduct,
                        unit: unitOfProduct.value,
                        category: categoryOfProduct.value,
                        market: _id,
                        incomingprice: priceOfProductUsd,
                        sellingprice: sellingPriceOfProductUsd,
                        incomingpriceuzs: priceOfProduct,
                        sellingpriceuzs: sellingPriceOfProduct,
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
        setPriceOfProductsUsd('')
        setSellingPriceOfProductUsd('')
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
                    code: codeOfProduct,
                    category: categoryOfProduct.value,
                    unit: unitOfProduct.value,
                    priceid: currentProduct.price._id,
                    productdata: currentProduct.productdata._id,
                    incomingprice: priceOfProductUsd,
                    sellingprice: sellingPriceOfProductUsd,
                    incomingpriceuzs: priceOfProduct,
                    sellingpriceuzs: sellingPriceOfProduct,
                    total: numberOfProduct,
                },
                currentPage,
                countPage: showByTotal,
                search: {
                    name: searchByName.replace(/\s+/g, ' ').trim(),
                    code: searchByCode.replace(/\s+/g, ' ').trim(),
                    category: searchByCategory.replace(/\s+/g, ' ').trim(),
                },
            }
            dispatch(updateProduct(body))
        }
    }

    // excel
    const readExcel = (file) => {
        const fileTypes = ['xls', 'xlsx']
        if (fileTypes.includes(file.name.split('.').pop())) {
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
                    universalToast('Ошибка при загрузке файла', 'error')
                    reject(error)
                }
            }).then((data) => {
                if (data.length > 0) {
                    setExcelData(data)
                    setModalBody('import')
                    toggleModal()
                } else {
                    universalToast('Jadvalda ma`lumot mavjud emas', 'error')
                }
            })
        } else {
            universalToast("Fayl formati noto'g'ri", 'error')
        }
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
                category: searchByCategory.replace(/\s+/g, ' ').trim(),
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
        handleClickCancelToDelete()
    }
    const handleClickCancelToDelete = () => {
        setModalVisible(false)
        setDeletedProduct(null)
        setTimeout(() => {
            setModalBody(null)
        }, 500)
    }
    const handleClickApproveToImport = () => {
        const oldKeys = Object.keys(excelData[0])
        const newData = createdData.map((item) => {
            const newItem = {}
            for (const key in item) {
                newItem[key] = item[key]
            }
            return newItem
        })
        newData.forEach((item) =>
            oldKeys.forEach(
                (key) => item.hasOwnProperty(key) && delete item[key]
            )
        )
        const body = {
            products: [...newData],
            currentPage,
            countPage: showByTotal,
            search: {
                name: searchByName.replace(/\s+/g, ' ').trim(),
                code: searchByCode.replace(/\s+/g, ' ').trim(),
                category: searchByCategory.replace(/\s+/g, ' ').trim(),
            },
        }
        dispatch(addProductsFromExcel(body))
    }
    const handleClickCancelToImport = () => {
        setModalVisible(false)
        setTimeout(() => {
            setModalBody(null)
        }, 500)
    }
    const filterData = (filterKey) => {
        if (filterKey === sorItem.filter) {
            switch (sorItem.count) {
                case 1:
                    setSorItem({
                        filter: filterKey,
                        sort: '1',
                        count: 2,
                    })
                    universalSort(
                        searchedData.length > 0 ? searchedData : data,
                        searchedData.length > 0 ? setSearchedData : setData,
                        filterKey,
                        1,
                        searchedData.length > 0 ? searchedProducts : products
                    )
                    break
                case 2:
                    setSorItem({
                        filter: filterKey,
                        sort: '',
                        count: 0,
                    })
                    universalSort(
                        searchedData.length > 0 ? searchedData : data,
                        searchedData.length > 0 ? setSearchedData : setData,
                        filterKey,
                        '',
                        searchedData.length > 0 ? searchedProducts : products
                    )
                    break
                default:
                    setSorItem({
                        filter: filterKey,
                        sort: '-1',
                        count: 1,
                    })
                    universalSort(
                        searchedData.length > 0 ? searchedData : data,
                        searchedData.length > 0 ? setSearchedData : setData,
                        filterKey,
                        -1,
                        searchedData.length > 0 ? searchedProducts : products
                    )
            }
        } else {
            setSorItem({
                filter: filterKey,
                sort: '-1',
                count: 1,
            })
            universalSort(
                searchedData.length > 0 ? searchedData : data,
                searchedData.length > 0 ? setSearchedData : setData,
                filterKey,
                -1,
                searchedData ? searchedProducts : products,
                searchedData.length > 0
            )
        }
    }

    useEffect(() => {
        if (!currency && !currencyLoading) {
            warningCurrencyRate()
        }
        if (errorUnits) {
            universalToast(errorUnits, 'error')
            dispatch(clearErrorUnits())
        }
        if (errorProducts) {
            universalToast(errorProducts, 'error')
            dispatch(clearErrorProducts())
        }

        if (successAddProduct) {
            successAddProductMessage()
            dispatch(clearSuccessAddProduct())
            clearForm()
            handleClickCancelToImport()
        }

        if (successUpdateProduct) {
            successUpdateProductMessage()
            dispatch(clearSuccessUpdateProduct())
            clearForm()
            setStickyForm(false)
        }

        if (successDeleteProduct) {
            successDeleteProductMessage()
            dispatch(clearSuccessDeleteProduct())
        }
        if (errorGetCategories) {
            warningCategory()
            dispatch(clearErrorGetAllCategories())
        }
        if (currencyError) {
            universalToast(currencyError, 'error')
            dispatch(clearError())
        }
    }, [
        errorUnits,
        errorProducts,
        dispatch,
        successAddProduct,
        successUpdateProduct,
        successDeleteProduct,
        errorGetCategories,
        currencyError,
        currencyLoading,
        currency,
    ])
    useEffect(() => {
        const body = {
            currentPage,
            countPage: showByTotal,
            search: {
                name: searchByName.replace(/\s+/g, ' ').trim(),
                code: searchByCode.replace(/\s+/g, ' ').trim(),
                category: searchByCategory.replace(/\s+/g, ' ').trim(),
            },
        }
        dispatch(getProducts(body))
        //    eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, showByTotal, dispatch])
    useEffect(() => {
        dispatch(getUnits())
        dispatch(getAllCategories())
    }, [dispatch])
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
            setPriceOfProduct(incomingpriceuzs)
            setSellingPriceOfProduct(sellingpriceuzs)
            setPriceOfProductsUsd(incomingprice)
            setSellingPriceOfProductUsd(sellingprice)
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
            allcategories.map((category) => ({
                value: category._id,
                label:
                    category.code +
                    `${category.name ? ` - ${category.name}` : ''}`,
            }))
        )
    }, [allcategories])
    useEffect(() => {
        if (lastProductCode) {
            setCodeOfProduct(lastProductCode)
        }
    }, [lastProductCode])
    useEffect(() => {
        setSearchedData(searchedProducts)
    }, [searchedProducts])
    return (
        <section>
            {/* Modal */}
            <UniversalModal
                toggleModal={toggleModal}
                body={modalBody}
                headerText={
                    modalBody === 'approve' &&
                    "Mahsulotni o'chirishni tasdiqlaysizmi?"
                }
                title={
                    modalBody === 'approve' &&
                    "O'chirilgan mahsulotni tiklashning imkoni mavjud emas!"
                }
                approveFunction={
                    modalBody === 'approve'
                        ? handleClickApproveToDelete
                        : handleClickApproveToImport
                }
                closeModal={
                    modalBody === 'approve'
                        ? handleClickCancelToDelete
                        : handleClickCancelToImport
                }
                isOpen={modalVisible}
                excelData={excelData}
                headers={importHeaders}
                createdData={createdData}
                setCreatedData={setCreatedData}
            />

            {/* Form */}
            <CreateProductForm
                nameOfProduct={nameOfProduct}
                unitOfProduct={unitOfProduct}
                categoryOfProduct={categoryOfProduct}
                codeOfProduct={codeOfProduct}
                priceOfProduct={
                    currencyType === 'UZS' ? priceOfProduct : priceOfProductUsd
                }
                sellingPriceOfProduct={
                    currencyType === 'UZS'
                        ? sellingPriceOfProduct
                        : sellingPriceOfProductUsd
                }
                numberOfProduct={numberOfProduct}
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
                    <ExportBtn
                        datas ={data}
                        headers={exportHeader}
                        fileName={'Maxsulotlar'}
                        pagesName="Products"
                    />
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
                filterBy={['total', 'category', 'code', 'name', 'doubleDate']}
                filterByCode={filterByCode}
                filterByCodeAndNameAndCategoryWhenPressEnter={
                    filterByCodeAndNameAndCategoryWhenPressEnter
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
                ) : data.length === 0 && searchedData.length === 0 ? (
                    <NotFind text={'Maxsulot mavjud emas'} />
                ) : (
                    <Table
                        currencyType={currencyType}
                        headers={headers}
                        Edit={handleEditProduct}
                        Delete={handleDeleteProduct}
                        page={'product'}
                        data={searchedData.length > 0 ? searchedData : data}
                        Sort={filterData}
                        sortItem={sorItem}
                        currentPage={currentPage}
                        countPage={showByTotal}
                        currency={currencyType}
                    />
                )}
            </div>
        </section>
    )
}

export default Products
