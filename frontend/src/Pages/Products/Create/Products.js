import {useEffect, useState} from 'react';
import FieldContainer from '../../../Components/FieldContainer/FieldContainer';
import Button from '../../../Components/Buttons/BtnAddRemove';
import ExportBtn from '../../../Components/Buttons/ExportBtn';
import ImportBtn from '../../../Components/Buttons/ImportBtn';
import * as XLSX from 'xlsx';
import Pagination from '../../../Components/Pagination/Pagination';
import Table from '../../../Components/Table/Table';
import SelectForm from '../../../Components/Select/SelectForm';
import FilterButtons from '../../../Components/FilterButtons/FilterButtons';
import Input from '../../../Components/Inputs/Input';
import SearchInput from '../../../Components/Inputs/SearchInput';
import {useSelector, useDispatch} from 'react-redux';
import {UzsToUsd, UsdToUzs} from '../../Currency/Currency';
import Spinner from '../../../Components/Spinner/SmallLoader';
import NotFind from '../../../Components/NotFind/NotFind';
import {
    getProducts,
    getProductsByFilter,
    addProduct,
    clearErrorProducts,
    clearSuccessAddProduct,
    clearSuccessUpdateProduct,
    clearSearchedProducts,
    clearSuccessDeleteProduct,
    updateProduct,
    deleteProduct
} from './productSlice';
import {clearErrorUnits, getUnits} from '../../Units/unitsSlice';
import {
    universalToast,
    successAddProductMessage,
    successUpdateProductMessage,
    warningEmptyInput,
    warningCurrencyRate,
    successDeleteProductMessage
} from '../../../Components/ToastMessages/ToastMessages';
import {
    regexForEmptyString,
    regexForTypeNumber,
} from '../../../Components/RegularExpressions/RegularExpressions';
import UniversalModal from "../../../Components/Modal/UniversalModal";
import Approve from "../../../Components/Modal/ModalBodys/Approve";

function Products() {
    const dispatch = useDispatch();
    const {
        market: {_id},
    } = useSelector((state) => state.login);
    const {errorUnits, units} = useSelector((state) => state.units);
    const {currency, currencyType} = useSelector((state) => state.currency);
    const {
        products,
        total,
        errorProducts,
        loading,
        successAddProduct,
        successUpdateProduct,
        searchedProducts,
        totalSearched,
        successDeleteProduct
    } =
        useSelector((state) => state.products);
    const [data, setData] = useState(products);
    const [codeOfProduct, setCodeOfProduct] = useState('');
    const [nameOfProduct, setNameOfProduct] = useState('');
    const [numberOfProduct, setNumberOfProduct] = useState('');
    const [unitOfProduct, setUnitOfProduct] = useState('');
    const [priceOfProduct, setPriceOfProduct] = useState('');
    const [sellingPriceOfProduct, setSellingPriceOfProduct] = useState('');
    const [searchByCode, setSearchByCode] = useState('');
    const [searchByName, setSearchByName] = useState('');
    const [showByTotal, setShowByTotal] = useState('10');
    const [currentPage, setCurrentPage] = useState(0);
    const [filteredDataTotal, setFilteredDataTotal] = useState(total);
    const [stickyForm, setStickyForm] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [deletedProduct, setDeletedProduct] = useState(null);
    const [modalBody, setModalBody] = useState(null);
    // modal toggle
    const toggleModal = () => {
        setModalVisible(!modalVisible);
    }
    // table headers
    const headers = [
        {title: '№'},
        {
            title: 'Kodi',
            filter: 'code',
        },
        {
            title: 'Nomi',
        },
        {
            title: 'Soni (dona)',
            filter: 'total',
        },
        {
            title: 'Olish',
            filter: 'incomingprice',
        },
        {
            title: 'Sotish',
            filter: 'sellingprice',
        },
        {title: ''},
    ];
    const exportHeader = [
        {
            label: '№',
            key: '_id',
        },
        {
            label: 'Kodi',
            key: 'productdata.code',
        },
        {
            label: 'Nomi',
            key: 'productdata.name',
        },
        {
            label: 'Soni (dona)',
            key: 'total',
        },
        {
            label: 'Olish (USD)',
            key: 'price.incomingprice',
        },
        {
            label: 'Sotish (USD)',
            key: 'price.sellingprice',
        },
        {
            label: 'Olish (UZS)',
            key: 'price.incomingpriceuzs',
        },
        {
            label: 'Sotish (UZS)',
            key: 'price.sellingpriceuzs',
        }
    ]

    // handle change of inputs
    const handleChangeCodeOfProduct = (e) => {
        setCodeOfProduct(e.target.value);
    };
    const handleChangeNameOfProduct = (e) => {
        setNameOfProduct(e.target.value);
    };
    const handleChangeNumberOfProduct = (e) => {
        let val = e.target.value;
        if (regexForTypeNumber.test(val)) {
            setNumberOfProduct(val);
        }
    };
    const handleChangeUnitOfProduct = (e) => {
        setUnitOfProduct(e.target.value);
    };
    const handleChangePriceOfProduct = (e) => {
        let val = e.target.value;
        if (regexForTypeNumber.test(val)) {
            setPriceOfProduct(val);
        }
    };
    const handleChangeSellingPriceOfProduct = (e) => {
        let val = e.target.value;
        if (regexForTypeNumber.test(val)) {
            setSellingPriceOfProduct(val);
        }
    };
    const filterByCode = (e) => {
        let val = e.target.value;
        let valForSearch = val.replace(/\s+/g, ' ').trim();
        setSearchByCode(val);
        (searchedProducts.length > 0 || totalSearched > 0) && dispatch(clearSearchedProducts());
        if (valForSearch === '') {
            setData(products);
            setFilteredDataTotal(total);
        } else {
            const filteredProducts = products.filter((product) => {
                return product.productdata.code.includes(valForSearch);
            });
            setData(filteredProducts);
            setFilteredDataTotal(filteredProducts.length);
        }
    };
    const filterByName = (e) => {
        let val = e.target.value;
        let valForSearch = val.toLowerCase().replace(/\s+/g, ' ').trim();
        setSearchByName(val);
        (searchedProducts.length > 0 || totalSearched > 0) && dispatch(clearSearchedProducts());
        if (valForSearch === '') {
            setData(products);
            setFilteredDataTotal(total);
        } else {
            const filteredProducts = products.filter((product) => {
                return product.productdata.name.toLowerCase().includes(valForSearch);
            });
            setData(filteredProducts);
            setFilteredDataTotal(filteredProducts.length);
        }
    };
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
                    total: numberOfProduct,
                    unit: unitOfProduct,
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
            };
            dispatch(getProductsByFilter(body));
        }
    };
    const filterByTotal = ({value}) => {
        setShowByTotal(value);
    };

    // handle submit of inputs
    const addNewProduct = (e) => {
        e.preventDefault();
        if (currency) {
            if (
                regexForEmptyString.test(codeOfProduct) ||
                regexForEmptyString.test(nameOfProduct) ||
                regexForEmptyString.test(numberOfProduct) ||
                regexForEmptyString.test(unitOfProduct) ||
                regexForEmptyString.test(priceOfProduct) ||
                regexForEmptyString.test(sellingPriceOfProduct)
            ) {
                warningEmptyInput();
            } else {
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
                        total: numberOfProduct,
                        unit: unitOfProduct,
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
                };
                dispatch(addProduct(body));
            }
        } else {
            warningCurrencyRate();
        }
    };
    const clearForm = (e) => {
        e && e.preventDefault();
        setCodeOfProduct('');
        setNameOfProduct('');
        setNumberOfProduct('');
        setUnitOfProduct('');
        setPriceOfProduct('');
        setSellingPriceOfProduct('');
        setCurrentProduct(null);
        setStickyForm(false);
    };
    const handleEdit = (e) => {
        e.preventDefault();
        if (
            regexForEmptyString.test(codeOfProduct) ||
            regexForEmptyString.test(nameOfProduct) ||
            regexForEmptyString.test(numberOfProduct) ||
            regexForEmptyString.test(unitOfProduct) ||
            regexForEmptyString.test(priceOfProduct) ||
            regexForEmptyString.test(sellingPriceOfProduct)
        ) {
            warningEmptyInput();
        } else {
            const body = {
                product: {
                    ...currentProduct,
                    name: nameOfProduct.replace(/\s+/g, ' ').trim(),
                    code: codeOfProduct.replace(/\s+/g, ' ').trim(),
                    unit: unitOfProduct,
                    priceid: currentProduct.price._id,
                    total: numberOfProduct,
                    productdata: currentProduct.productdata._id,
                    incomingprice: currencyType === 'USD' ? priceOfProduct : UsdToUzs(priceOfProduct, currency),
                    sellingprice: currencyType === 'USD' ? sellingPriceOfProduct : UsdToUzs(sellingPriceOfProduct, currency),
                    incomingpriceuzs: currencyType === 'UZS' ? priceOfProduct : UsdToUzs(priceOfProduct, currency),
                    sellingpriceuzs: currencyType === 'UZS' ? sellingPriceOfProduct : UsdToUzs(sellingPriceOfProduct, currency),
                },
                currentPage,
                countPage: showByTotal,
                search: {
                    name: searchByName.replace(/\s+/g, ' ').trim(),
                    code: searchByCode.replace(/\s+/g, ' ').trim(),
                }
            };
            dispatch(updateProduct(body));
        }
    };

    // excel
    const readExcel = (file) => {
        const promise = new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsArrayBuffer(file);

            fileReader.onload = (e) => {
                const bufferArray = e.target.result;

                const wb = XLSX.read(bufferArray, {type: 'buffer'});

                const wsname = wb.SheetNames[0];

                const ws = wb.Sheets[wsname];

                const data = XLSX.utils.sheet_to_json(ws);

                resolve(data);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });

        promise.then((d) => {
            console.log(d);
        });
    };

    // table edit and delete
    const handleEditProduct = (product) => {
        setCurrentProduct(product);
        setStickyForm(true);
    };
    const handleDeleteProduct = (product) => {
        const body = {
            _id: product._id,
            category: product.category,
            currentPage,
            countPage: showByTotal,
            search: {
                name: searchByName.replace(/\s+/g, ' ').trim(),
                code: searchByCode.replace(/\s+/g, ' ').trim(),
            },
            name: nameOfProduct.replace(/\s+/g, ' ').trim(),
            productdata: product.productdata._id
        }
        setDeletedProduct(body);
        setModalBody("approve")
        toggleModal();
    };
    const handleClickApproveToDelete = () => {
        dispatch(deleteProduct(deletedProduct));
        toggleModal();
        setTimeout(() => {
            setModalBody(null)
        }, 500);
    }
    const handleClickCancelToDelete = () => {
        toggleModal();
        setDeletedProduct(null);
        setTimeout(() => {
            setModalBody(null)
        }, 500);
    }
    const filterData = (filterKey) => {
        console.log(filterKey);
    };

    useEffect(() => {
        if (!currency) {
            warningCurrencyRate();
        } else if (currencyType === 'UZS') {
            priceOfProduct && setPriceOfProduct(UsdToUzs(priceOfProduct, currency));
            sellingPriceOfProduct &&
            setSellingPriceOfProduct(UsdToUzs(sellingPriceOfProduct, currency));
        } else {
            priceOfProduct && setPriceOfProduct(UzsToUsd(priceOfProduct, currency));
            sellingPriceOfProduct &&
            setSellingPriceOfProduct(UzsToUsd(sellingPriceOfProduct, currency));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currency, currencyType]);
    useEffect(() => {
        errorUnits && universalToast(errorUnits, 'error') && dispatch(clearErrorUnits());
        errorProducts && universalToast(errorProducts, 'error') && dispatch(clearErrorProducts());
        successAddProduct && successAddProductMessage() && dispatch(clearSuccessAddProduct()) && clearForm();
        successUpdateProduct && successUpdateProductMessage() && dispatch(clearSuccessUpdateProduct()) && clearForm() && setStickyForm(false);
        successDeleteProduct && successDeleteProductMessage() && dispatch(clearSuccessDeleteProduct());
    }, [errorUnits, errorProducts, dispatch, successAddProduct, successUpdateProduct, successDeleteProduct]);
    useEffect(() => {
        const body = {
            currentPage,
            countPage: showByTotal,
            search: {
                code: '',
                name: '',
            },
        };
        dispatch(getProducts(body));
    }, [currentPage, showByTotal, dispatch]);
    useEffect(() => {
        dispatch(getUnits());
    }, [dispatch]);
    useEffect(() => {
        setData(products);
    }, [products]);
    useEffect(() => {
        setFilteredDataTotal(total);
    }, [total]);
    useEffect(() => {
        if (currentProduct) {
            const {
                productdata: {name, code},
                price: {
                    sellingprice,
                    incomingprice,
                    sellingpriceuzs,
                    incomingpriceuzs,
                },
                unit,
                total,
            } = currentProduct;
            setCodeOfProduct(code);
            setNameOfProduct(name);
            setNumberOfProduct(total);
            setUnitOfProduct(unit._id);
            setPriceOfProduct(
                currencyType === 'UZS' ? incomingpriceuzs : incomingprice
            );
            setSellingPriceOfProduct(
                currencyType === 'UZS' ? sellingpriceuzs : sellingprice
            );
        }
    }, [currentProduct, currencyType]);

    return (
        <section>
            <UniversalModal toggleModal={toggleModal} body={modalBody} approveFunction={handleClickApproveToDelete}
                            closeModal={handleClickCancelToDelete} isOpen={modalVisible}/>
            <form
                className={`flex gap-[1.25rem] bg-background flex-col mainPadding transition ease-linear duration-200 ${
                    stickyForm ? 'stickyForm' : ''
                }`}
            >
                <div className={'flex gap-[1.25rem]'}>
                    {/* -- maxulot kodi -- */}
                    <FieldContainer
                        label={'Maxsulot kodi'}
                        placeholder={'misol: 000000'}
                        onChange={handleChangeCodeOfProduct}
                        value={codeOfProduct}
                        maxWidth={true}
                        type={'text'}
                    />

                    {/* -- maxsulotlar nomi -- */}
                    <FieldContainer
                        label={'Maxsulot nomi'}
                        placeholder={'misol: kompyuter'}
                        onChange={handleChangeNameOfProduct}
                        value={nameOfProduct}
                    />
                </div>
                <div className={'flex gap-[1.25rem] items-end'}>
                    {/* -- maxsulotlar soni -- */}
                    <FieldContainer
                        value={numberOfProduct}
                        onChange={handleChangeNumberOfProduct}
                        label={'Maxsulot soni'}
                        placeholder={'misol: 100'}
                        maxWidth={true}
                        type={'text'}
                    />

                    {/* -- o`lchov birligi -- */}
                    <FieldContainer
                        value={unitOfProduct}
                        onChange={handleChangeUnitOfProduct}
                        label={"O'lchov birligi"}
                        placeholder={'misol: kg'}
                        maxWidth={true}
                    />

                    {/* -- keltirilgan narxi -- */}
                    <FieldContainer
                        value={priceOfProduct}
                        onChange={handleChangePriceOfProduct}
                        label={'Keltirilgan narxi'}
                        placeholder={'misol: 100'}
                        maxWidth={true}
                        type={'text'}
                    />

                    {/* -- sotish narxi -- */}
                    <FieldContainer
                        value={sellingPriceOfProduct}
                        onChange={handleChangeSellingPriceOfProduct}
                        label={'Sotish narxi'}
                        placeholder={'misol: 200'}
                        maxWidth={true}
                        type={'text'}
                    />
                    <div className={'flex gap-[1.25rem] grow'}>
                        <Button
                            onClick={stickyForm ? handleEdit : addNewProduct}
                            add={true}
                            text={stickyForm ? 'Saqlash' : "Yangi maxsulot qo'shish"}
                        />
                        <Button onClick={clearForm} text={'Tozalash'}/>
                    </div>
                </div>
            </form>
            <div className={'flex justify-between items-center mainPadding'}>
                <div className={'flex gap-[1.5rem]'}>
                    {(data.length !== 0 || searchedProducts.length !== 0) &&
                        <ExportBtn data={searchedProducts.length > 0 ? searchedProducts : data}
                                   headers={exportHeader} fileName={'Maxsulotlar'}/>}
                    <ImportBtn readExcel={readExcel}/>
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
            <div className='flex items-stretch gap-[1.875rem] mainPadding'>
                <SelectForm onSelect={filterByTotal}/>
                <FilterButtons
                    label={'Maxsulot kodi'}
                    element={
                        <Input
                            placeholder={'misol: 000000'}
                            type={'text'}
                            value={searchByCode}
                            onChange={filterByCode}
                            onKeyUp={filterByCodeAndNameWhenPressEnter}
                        />
                    }
                />
                <SearchInput
                    placeholder={'qidirish...'}
                    someClasses={'grow'}
                    value={searchByName}
                    onChange={filterByName}
                    onKeyUp={filterByCodeAndNameWhenPressEnter}
                />
            </div>
            <div className='tableContainerPadding'>
                {loading ? (
                    <Spinner/>
                ) : data.length === 0 && searchedProducts.length === 0 ? (
                    <NotFind text={'Maxsulot mavjud emas'}/>
                ) : (
                    <Table
                        headers={headers}
                        Edit={handleEditProduct}
                        Delete={handleDeleteProduct}
                        page={'product'}
                        data={searchedProducts.length > 0 ? searchedProducts : data}
                        Sort={filterData}
                        currentPage={currentPage}
                        countPage={showByTotal}
                        currency={currency}
                    />
                )}
            </div>
        </section>
    );
}

export default Products;
