import React, {useCallback, useEffect} from 'react'
import Excel from '../../Images/Excel.svg'
import * as XLSX from 'xlsx'
import {useDispatch, useSelector} from 'react-redux'
import {
    clearUploadExcel,
    getProductsAll,
} from '../../Pages/Products/Create/productSlice'

function ExportBtn({headers, fileName}) {
    const dispatch = useDispatch()
    const {allProducts, errorProducts} = useSelector((state) => state.products)
    const autoFillColumnWidth = (json) => {
        const cols = Object.keys(json[0])
        const maxLength = cols.reduce((acc, curr) => {
            return acc > curr.length ? acc : curr.length
        }, 0)
        return cols.map((col) => ({
            wch: maxLength,
        }))
    }
    const continueHandleClick = useCallback(
        (data) => {
            const wscols = autoFillColumnWidth(data)
            const wb = XLSX.utils.book_new()
            const ws = XLSX.utils.json_to_sheet([])
            ws['!cols'] = wscols
            XLSX.utils.sheet_add_aoa(ws, [headers])
            XLSX.utils.sheet_add_json(ws, data, {
                origin: 'A2',
                skipHeader: true,
            })
            XLSX.utils.book_append_sheet(wb, ws, 'Maxsulotlar')
            XLSX.writeFile(
                wb,
                `${fileName}-${new Date().toLocaleDateString()}.xlsx`
            )
            dispatch(clearUploadExcel())
        },
        [dispatch, fileName, headers]
    )

    const handleClick = () => {
        dispatch(getProductsAll())
    }
    useEffect(() => {
        if (!errorProducts && allProducts.length > 0) {
            const newData = allProducts.map((item, index) => ({
                nth: index + 1,
                category: item.category.code,
                code: item.productdata.code,
                name: item.productdata.name,
                total: item.total,
                unit: item.unit.name,
                incomingprice: item.price.incomingprice,
                incomingpriceuzs: item.price.incomingpriceuzs,
                sellingprice: item.price.sellingprice,
                sellingpriceuzs: item.price.sellingpriceuzs,
            }))
            !errorProducts && continueHandleClick(newData)
        }
    }, [allProducts, continueHandleClick, errorProducts])
    return (
        <button className={'exportButton'} onClick={handleClick}>
            Eksport
            <span className={'btn-icon bg-white-900 p-[8px]'}>
                <img src={Excel} alt='excel icon' />
            </span>
        </button>
    )
}

export default ExportBtn
