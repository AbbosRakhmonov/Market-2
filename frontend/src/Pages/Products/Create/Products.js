import { useEffect, useState } from 'react';
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
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { UzsToUsd, UsdToUzs } from '../../Currency/Currency';
import { clearErrorProducts } from './productSlice';
import Spinner from '../../../Components/Spinner/SmallLoader';
import NotFind from '../../../Components/NotFind/NotFind';
import { getProducts, addProduct } from './productSlice';
import { clearErrorUnits, getUnits } from '../../Units/unitsSlice';

function Products() {
  const dispatch = useDispatch();
  const {
    market: { _id },
  } = useSelector((state) => state.login);
  const { errorUnits, units } = useSelector((state) => state.units);
  const { currency, currencyType } = useSelector((state) => state.currency);
  const { products, total, errorProducts, loading } = useSelector(
    (state) => state.products
  );
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
  // table headers
  const headers = [
    { title: '№' },
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
    { title: '' },
  ];

  // regex for check type number and non empty string
  const regexForTypeNumber = /^[0-9]*\.?[0-9]*$/;
  const regexForEmptyString = /^\s*$/;

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
    let valForSearch = val.toLowerCase().replace(/\s+/g, ' ').trim();
    setSearchByCode(val);
    if (valForSearch === '') {
      setData(data);
    } else {
      const filteredProducts = products.filter((product) => {
        return product.code.toLowerCase().includes(valForSearch);
      });
      setData(filteredProducts);
    }
  };
  const filterByName = (e) => {
    let val = e.target.value;
    let valForSearch = val.toLowerCase().replace(/\s+/g, ' ').trim();
    setSearchByName(val);
    if (valForSearch === '') {
      setData(data);
    } else {
      const filteredProducts = products.filter((product) => {
        return product.name.toLowerCase().includes(valForSearch);
      });
      setData(filteredProducts);
    }
  };
  const filterByNameWhenEnter = (e) => {
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
      dispatch(getProducts(body));
    }
  };
  const filterByTotal = ({ value }) => {
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
        toast.error('Ma`lumotlar to`liq kiritilmagan!');
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
        setTimeout(() => {
          clearForm(e);
        }, 500);
      }
    } else {
      toast.error('Valyuta kursi kiritilmagan!');
    }
  };
  const clearForm = (e) => {
    e.preventDefault();
    setCodeOfProduct('');
    setNameOfProduct('');
    setNumberOfProduct('');
    setUnitOfProduct('');
    setPriceOfProduct('');
    setSellingPriceOfProduct('');
  };
  const handleEdit = () => {
    console.log('edited');
  };

  // excel
  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;

        const wb = XLSX.read(bufferArray, { type: 'buffer' });

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
  const editProduct = (product) => {
    console.log(product);
  };
  const deleteProduct = (product) => {
    console.log(product);
  };
  const filterData = (filterKey) => {
    console.log(filterKey);
  };

  useEffect(() => {
    if (!currency) {
      toast.error('Valyuta kursi kiritilmagan!');
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
    errorUnits && toast.error(errorUnits) && dispatch(clearErrorUnits());
    errorProducts &&
      toast.error(errorProducts) &&
      dispatch(clearErrorProducts());
  }, [errorUnits, errorProducts, dispatch]);
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
  return (
    <section>
      <form className={'flex gap-[1.25rem] flex-col'}>
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
              onClick={addNewProduct}
              add={true}
              text={"Yangi maxsulot qo'shish"}
            />
            <Button onClick={clearForm} text={'Tozalash'} />
          </div>
        </div>
      </form>
      <div className={'flex justify-between items-center my-[2.5rem]'}>
        <div className={'flex gap-[1.5rem]'}>
          <ExportBtn data={[]} headers={[]} />
          <ImportBtn readExcel={readExcel} />
        </div>
        <h3 className={'text-blue-900 text-[xl] leading-[1.875rem]'}>
          Maxsulotlar
        </h3>
        {total ? (
          <Pagination
            countPage={Number(showByTotal)}
            totalDatas={total}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        ) : (
          ''
        )}
      </div>
      <div className='flex items-stretch gap-[1.875rem] mb-[1.25rem]'>
        <SelectForm onSelect={filterByTotal} />
        <FilterButtons
          label={'Maxsulot kodi'}
          element={
            <Input
              placeholder={'misol: 000000'}
              type={'text'}
              value={searchByCode}
              onChange={filterByCode}
            />
          }
        />
        <SearchInput
          placeholder={'qidirish...'}
          someClasses={'grow'}
          value={searchByName}
          onChange={filterByName}
          onKeyUp={filterByNameWhenEnter}
        />
      </div>
      {loading ? (
        <Spinner />
      ) : data.length === 0 ? (
        <NotFind text={'Maxsulot mavjud emas'} />
      ) : (
        <Table
          headers={headers}
          Edit={editProduct}
          Delete={deleteProduct}
          page={'product'}
          data={data}
          Sort={filterData}
          currentPage={currentPage}
          countPage={showByTotal}
          currency={currency}
        />
      )}
    </section>
  );
}

export default Products;
