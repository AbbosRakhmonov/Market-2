import {useState} from "react"
import FieldContainer from "../../../Components/FieldContainer/FieldContainer";
import Button from "../../../Components/Buttons/BtnAddRemove"
import ExportBtn from "../../../Components/Buttons/ExportBtn";
import ImportBtn from "../../../Components/Buttons/ImportBtn";
import * as XLSX from "xlsx";
import {Pagination} from "../../../Components/Pagination/Pagination";
import Table from "../../../Components/Table/Table";
import SelectForm from "../../../Components/Select/SelectForm";
import FilterButtons from "../../../Components/FilterButtons/FilterButtons";
import Input from "../../../Components/Inputs/Input";
import SearchInput from "../../../Components/Inputs/SearchInput";
import {toast} from "react-toastify";

function Products() {
    const [codeOfProduct, setCodeOfProduct] = useState("");
    const [nameOfProduct, setNameOfProduct] = useState("");
    const [numberOfProduct, setNumberOfProduct] = useState("");
    const [unitOfProduct, setUnitOfProduct] = useState("");
    const [priceOfProduct, setPriceOfProduct] = useState("");
    const [sellingPriceOfProduct, setSellingPriceOfProduct] = useState("");
    const [searchByCode, setSearchByCode] = useState("");
    const [searchByName, setSearchByName] = useState("");
    const [showByTotal, setShowByTotal] = useState('10');
    const headers = [
        {title: "№"},
        {
            title: "Kodi", filter: "code"
        },
        {
            title: "Nomi"
        },
        {
            title: "Soni (dona)",
            filter: "total"
        },
        {
            title: "Olish",
            filter: "incomingprice"
        },
        {
            title: "Sotish",
            filter: "sellingprice"
        }, {title: ""}]
    const regexForTypeNumber = /^\d+$/;
    const regexForEmptyString = /^\s*$/;

    // handle change of inputs
    const handleChangeCodeOfProduct = (e) => {
        let val = e.target.value;
        if (regexForTypeNumber.test(val)) setCodeOfProduct(e.target.value);
    }
    const handleChangeNameOfProduct = (e) => {
        setNameOfProduct(e.target.value);
    }
    const handleChangeNumberOfProduct = (e) => {
        let val = e.target.value;
        if (regexForTypeNumber.test(val)) setNumberOfProduct(e.target.value);
    }
    const handleChangeUnitOfProduct = (e) => {
        setUnitOfProduct(e.target.value);
    }
    const handleChangePriceOfProduct = (e) => {
        let val = e.target.value;
        if (regexForTypeNumber.test(val)) setPriceOfProduct(e.target.value);
    }
    const handleChangeSellingPriceOfProduct = (e) => {
        let val = e.target.value;
        if (regexForTypeNumber.test(val)) setSellingPriceOfProduct(e.target.value);
    }
    const filterByCode = (e) => {
        let val = e.target.value;
        if (regexForTypeNumber.test(val)) setSearchByCode(e.target.value);
    };
    const filterByName = (e) => {
        setSearchByName(e.target.value);
    };
    const filterByTotal = ({value}) => {
        setShowByTotal(value);
    };

    // handle submit of inputs
    const addNewProduct = (e) => {
        e.preventDefault();
        if (regexForEmptyString.test(codeOfProduct) || regexForEmptyString.test(nameOfProduct) || regexForEmptyString.test(numberOfProduct) || regexForEmptyString.test(unitOfProduct) || regexForEmptyString.test(priceOfProduct) || regexForEmptyString.test(sellingPriceOfProduct)) {
            toast.error("Ma`lumotlar to`liq kiritilmagan!");
        }
    }

    const clearForm = (e) => {
        e.preventDefault();
        setCodeOfProduct("");
        setNameOfProduct("");
        setNumberOfProduct("");
        setUnitOfProduct("");
        setPriceOfProduct("");
        setSellingPriceOfProduct("");
    }
    const handleEdit = () => {
        console.log('edited')
    }

// excel
    const readExcel = (file) => {
        const promise = new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsArrayBuffer(file);

            fileReader.onload = (e) => {
                const bufferArray = e.target.result;

                const wb = XLSX.read(bufferArray, {type: "buffer"});

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
            console.log(d)
        });
    }

// table edit and delete
    const editProduct = (product) => {
        console.log(product)
    };
    const deleteProduct = (product) => {
        console.log(product)
    };
    const filterData = (filterKey) => {
        console.log(filterKey)
    }
    return (
        <section>
            <form className={'flex gap-[1.25rem] flex-col'}>
                <div className={'flex gap-[1.25rem]'}>
                    {/* -- maxulot kodi -- */}
                    <FieldContainer label={"Maxsulot kodi"} placeholder={"misol: 000000"}
                                    onChange={handleChangeCodeOfProduct} value={codeOfProduct} maxWidth={true}
                                    type={'number'}/>

                    {/* -- maxsulotlar nomi -- */}
                    <FieldContainer label={"Maxsulot nomi"} placeholder={"misol: kompyuter"}
                                    onChange={handleChangeNameOfProduct} value={nameOfProduct}/>
                </div>
                <div className={'flex gap-[1.25rem] items-end'}>
                    {/* -- maxsulotlar soni -- */}
                    <FieldContainer value={numberOfProduct} onChange={handleChangeNumberOfProduct}
                                    label={"Maxsulot soni"} placeholder={"misol: 100"} maxWidth={true} type={'number'}/>

                    {/* -- o`lchov birligi -- */}
                    <FieldContainer value={unitOfProduct} onChange={handleChangeUnitOfProduct}
                                    label={"O'lchov birligi"} placeholder={"misol: kg"} maxWidth={true}/>

                    {/* -- keltirilgan narxi -- */}
                    <FieldContainer value={priceOfProduct} onChange={handleChangePriceOfProduct}
                                    label={"Keltirilgan narxi"} placeholder={"misol: 100"} maxWidth={true}
                                    type={'number'}/>

                    {/* -- sotish narxi -- */}
                    <FieldContainer value={sellingPriceOfProduct} onChange={handleChangeSellingPriceOfProduct}
                                    label={"Sotish narxi"} placeholder={"misol: 200"} maxWidth={true} type={'number'}/>
                    <div className={'flex gap-[1.25rem] grow'}>
                        <Button onClick={addNewProduct} add={true} text={"Yangi maxsulot qo'shish"}/>
                        <Button onClick={clearForm} text={"Tozalash"}/>
                    </div>
                </div>
            </form>
            <div className={'flex justify-between items-center my-[2.5rem]'}>
                <div className={'flex gap-[1.5rem]'}>
                    <ExportBtn data={[]} headers={[]}/>
                    <ImportBtn readExcel={readExcel}/>
                </div>
                <h3 className={'text-blue-900 text-[xl] leading-[1.875rem]'}>Maxsulotlar</h3>
                <Pagination countPage={10} currentPage={0} totalDatas={100}/>
            </div>
            <div className="flex items-stretch gap-[1.875rem] mb-[1.25rem]">
                <SelectForm onSelect={filterByTotal}/>
                <FilterButtons label={'Maxsulot kodi'}
                               element={<Input placeholder={'misol: 000000'} type={'number'} value={searchByCode}
                                               onChange={filterByCode}/>}/>
                <SearchInput placeholder={'qidirish...'} someClasses={"grow"} value={searchByName}
                             onChange={filterByName}/>
            </div>
            <Table headers={headers} Edit={editProduct} Delete={deleteProduct} page={'product'} data={[
                {
                    _id: 1,
                    productdata: {
                        code: "000000",
                        name: "kompyuter",
                    },
                    total: 200,
                    unit: {
                        name: "kg"
                    },
                    price: {
                        incomingprice: 100,
                        sellingprice: 200
                    }
                },
                {
                    _id: 2,
                    productdata: {
                        code: "000001",
                        name: "kompyuter",
                    },
                    total: 200,
                    unit: {
                        name: "kg"
                    },
                    price: {
                        incomingprice: 100,
                        sellingprice: 200
                    }

                }
            ]} Sort={filterData}/>
        </section>
    );
}

export default Products;