import React from 'react'
import ExportBtn from '../../Components/Buttons/ExportBtn'
import Pagination from '../../Components/Pagination/Pagination'
import SelectForm from '../../Components/Select/SelectForm'
import FilterButtons from '../../Components/FilterButtons/FilterButtons'
import Input from '../../Components/Inputs/Input'
import SearchInput from '../../Components/Inputs/SearchInput'
import Table from '../../Components/Table/Table'

const ProductReport = () => {
    const onChange = () => {}

    const data = [
        {
            _id: 1,
            productdata: {
                name: 'truba',
                code: '000900',
            },
            total: 800,
            unit: {
                name: 'dona',
            },
            price: {
                incomingprice: 800,
                sellingprice: 900,
            },
        },
        {
            _id: 2,
            productdata: {
                name: 'truba',
                code: '000900',
            },
            total: 800,
            unit: {
                name: 'dona',
            },
            price: {
                incomingprice: 800,
                sellingprice: 900,
            },
        },
    ]

    const headers = [
        {
            title: '№',
        },
        {
            title: 'Maxsulot kodi',
            styles: '',
        },
        {
            title: 'Maxsulot nomi',
        },
        {
            title: 'Soni(dona)',
        },
        {
            title: 'Olish',
        },
        {
            title: 'Olish jami',
        },
        {
            title: 'Sotish',
        },
        {
            title: 'Sotish jami',
        },
        {
            title: 'Cheklar soni',
        },
        {
            title: '',
        },
    ]

    return (
        <div>
            <section>
                <div className='pagination mainPadding'>
                    <ExportBtn data={[]} headers={[]} />
                    <p className='product_name'>Maxsulot hisoboti</p>
                    <Pagination countPage={5} totalDatas={60} />
                </div>

                <div className='table_style tableContainerPadding'>
                    <Table
                        page={'productreport'}
                        data={data}
                        currentPage={0}
                        countPage={1}
                        Edit={() => {}}
                        Delete={() => {}}
                        currency='USD'
                        changeHandler={() => {}}
                        addProductCheque={() => {}}
                        productCheque={{}}
                        Print={() => {}}
                        headers={headers}
                        placeholder={'misol : 10'}
                    />
                </div>
            </section>
        </div>
    )
}

export default ProductReport
