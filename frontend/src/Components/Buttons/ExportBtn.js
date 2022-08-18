import React, {useCallback} from 'react'
import Excel from '../../Images/Excel.svg'
import {universalToast} from '../ToastMessages/ToastMessages'
import * as XLSX from 'xlsx'
import { useTranslation } from 'react-i18next';

function ExportBtn({headers, fileName, datas, pagesName}) {

    const {t} = useTranslation(['common'])

    const autoFillColumnWidth = (json) => {
        const cols = Object.keys(json[0])
        const maxLength = cols.reduce((acc, curr) => {
            return acc > curr.length ? acc : curr.length
        }, 0)
        return cols.map(() => ({
            wch: maxLength
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
                skipHeader: true
            })
            XLSX.utils.book_append_sheet(wb, ws, 'Maxsulotlar')
            XLSX.writeFile(
                wb,
                `${fileName}-${new Date().toLocaleDateString()}.xlsx`
            )
        },
        [fileName, headers]
    )
    const handleClick = () => {
        if (datas.length > 0) {
            switch (pagesName) {
                case 'Products' :
                    const newData = datas.map((item, index) => ({
                        nth: index + 1,
                        category: item.category.code,
                        code: item.productdata.code,
                        name: item.productdata.name,
                        total: item.total,
                        unit: item.unit.name,
                        incomingprice: item.price.incomingprice,
                        incomingpriceuzs: item.price.incomingpriceuzs,
                        sellingprice: item.price.sellingprice,
                        sellingpriceuzs: item.price.sellingpriceuzs
                    }))
                    continueHandleClick(newData)
                    break

                case 'ProductReport' :
                    const ReportData = datas.map((item, index) => ({
                        nth: index + 1,
                        code: item.productdata.code,
                        name: item.productdata.name,
                        total: item.total + item.unit.name,
                        incomingprice: item.price.incomingprice,
                        incomingpriceuzs: item.price.incomingpriceuzs,
                        incomingpricealluzs: item.price.incomingpriceuzs * item.total,
                        incomingpriceallusd: item.price.incomingprice * item.total,
                        sellingprice: item.price.sellingprice,
                        sellingpriceuzs: item.price.sellingpriceuzs,
                        sellingalluzs: item.price.sellingpriceuzs * item.total,
                        sellingallusd: item.price.sellingprice * item.total
                    }))
                    continueHandleClick(ReportData)
                    break

                case 'Sellings' :
                    const SellingData = datas.map((item, index) => ({
                        nth: index + 1,
                        id: item.id,
                        client: item?.client?.name || item?.packman?.name,
                        alluzs: item.products[0].totalpriceuzs,
                        allusd: item.products[0].totalprice,
                        discount: item.discounts.length > 0 ? item.discounts.map((discount) => {
                            return discount
                        }) : 0,
                        discountusd: item.discounts.length > 0 ? item.discounts.map((discount) => {
                            return discount
                        }) : 0,
                        debd: (item.products[0].totalpriceuzs - item.payments[0].paymentuzs - item.discounts.length > 0 ? item.discounts.map((discount) => {
                            return discount.discount
                        }) : 0),
                        debdusd: (item.products[0].totalprice - item.payments[0].payment - item.discounts.length > 0 ? item.discounts.map((discount) => {
                            return discount.discount
                        }) : 0)
                    }))
                    continueHandleClick(SellingData)
                    break

                case 'IncomingList' :
                    const IncomingData = datas.map((item, index) => ({
                        nth: index + 1,
                        supplier: item.supplier?.name,
                        code: item.product?.productdata?.code,
                        name: item.product?.productdata?.name,
                        count: item.pieces + ' ' + item.unit?.name,
                        unit: item.unitpriceuzs,
                        unitusd: item.unitprice,
                        all: item.totalpriceuzs,
                        allusd: item.totalprice,
                    }))
                    continueHandleClick(IncomingData)
                    break

                case 'IncomingSuppliers' :
                    const IncomingSupplierData = datas.map((item, index) => ({
                        nth: index + 1,
                        supplier: item.supplier.name,
                        code: item.product.productdata.code,
                        name: item.product.productdata.name,
                        count: item.pieces + ' ' + item.unit.name,
                        unit: item.unitpriceuzs,
                        unitusd: item.unitprice,
                        all: item.totalpriceuzs,
                        allusd: item.totalprice,
                    }))
                    continueHandleClick(IncomingSupplierData)
                    break

                case 'barcode':
                    const BarcodeData = datas.map((item, index) => ({
                        nth: index + 1,
                        code: item.barcode,
                        name: item.name
                    }))
                    continueHandleClick(BarcodeData)
                    break
                default:
                    break
            }

        } else {
            universalToast('Jadvalda ma\'lumot yoq', 'error')
        }
    }

    return (
        <button className={'exportButton'} onClick={handleClick}>
            {t('Eksport')}
            <span className={'btn-icon bg-white-900 p-[8px]'}>
                <img src={Excel} alt='excel icon' />
            </span>
        </button>
    )
}

export default ExportBtn