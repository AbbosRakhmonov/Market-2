import React from 'react'
import Excel from '../../Images/Excel.svg'
import {useTranslation} from 'react-i18next'

function ExportBtn({onClick}) {
    const {t} = useTranslation(['common'])
    // const handleClick = () => {
    //     if (datas.length > 0) {
    //         switch (pagesName) {
    //             case 'Products':
    //                 const newData = map(datas, (item, index) => ({
    //                     nth: index + 1,
    //                     barcode: item.productdata.barcode,
    //                     category: item.category.code,
    //                     code: item.productdata.code,
    //                     name: item.productdata.name,
    //                     total: item.total,
    //                     unit: item?.unit?.name,
    //                     incomingprice: item?.price?.incomingprice,
    //                     incomingpriceuzs: item?.price?.incomingpriceuzs,
    //                     sellingprice: item?.price?.sellingprice,
    //                     sellingpriceuzs: item?.price?.sellingpriceuzs
    //                 }))
    //                 continueHandleClick(newData)
    //                 break
    //
    //             case 'Category':
    //                 const categoryData = map(datas, (item, index) => ({
    //                     nth: index + 1,
    //                     code: item.code,
    //                     name: item.name
    //                 }))
    //                 continueHandleClick(categoryData)
    //                 break
    //
    //             case 'WireHouse':
    //                 const ReportData = map(datas, (item, index) => ({
    //                     nth: index + 1,
    //                     code: item?.productdata?.code,
    //                     name: item?.productdata?.name,
    //                     total: item.total + item?.unit?.name,
    //                     incomingprice: item?.price?.incomingprice,
    //                     incomingpriceuzs: item?.price?.incomingpriceuzs,
    //                     incomingpricealluzs:
    //                         item?.price?.incomingpriceuzs * item.total,
    //                     incomingpriceallusd:
    //                         item?.price?.incomingprice * item.total,
    //                     sellingprice: item?.price?.sellingprice,
    //                     sellingpriceuzs: item?.price?.sellingpriceuzs,
    //                     sellingalluzs:
    //                         item?.price?.sellingpriceuzs * item.total,
    //                     sellingallusd: item?.price?.sellingprice * item.total
    //                 }))
    //                 continueHandleClick(ReportData)
    //                 break
    //
    //             case 'Sellings':
    //                 const SellingData = map(datas, (item, index) => ({
    //                     nth: index + 1,
    //                     id: item.id,
    //                     client: item?.client?.name || item?.packman?.name,
    //                     alluzs: item.products[0].totalpriceuzs,
    //                     allusd: item.products[0].totalprice,
    //                     discount:
    //                         item.discounts.length > 0
    //                             ? item.discounts.map((discount) => {
    //                                 return discount
    //                             })
    //                             : 0,
    //                     discountusd:
    //                         item.discounts.length > 0
    //                             ? item.discounts.map((discount) => {
    //                                 return discount
    //                             })
    //                             : 0,
    //                     debd:
    //                         item.products[0].totalpriceuzs -
    //                         item.payments[0].paymentuzs -
    //                         item.discounts.length >
    //                         0
    //                             ? item.discounts.map((discount) => {
    //                                 return discount.discount
    //                             })
    //                             : 0,
    //                     debdusd:
    //                         item.products[0].totalprice -
    //                         item.payments[0].payment -
    //                         item.discounts.length >
    //                         0
    //                             ? item.discounts.map((discount) => {
    //                                 return discount.discount
    //                             })
    //                             : 0
    //                 }))
    //                 continueHandleClick(SellingData)
    //                 break
    //
    //             case 'IncomingList':
    //                 const IncomingData = map(datas, (item, index) => ({
    //                     nth: index + 1,
    //                     supplier: item.supplier?.name,
    //                     code: item.product?.productdata?.code,
    //                     name: item.product?.productdata?.name,
    //                     count: item.pieces + ' ' + item.unit?.name,
    //                     unit: item.unitpriceuzs,
    //                     unitusd: item.unitprice,
    //                     all: item.totalpriceuzs,
    //                     allusd: item.totalprice
    //                 }))
    //                 continueHandleClick(IncomingData)
    //                 break
    //
    //             case 'IncomingSuppliers':
    //                 const IncomingSupplierData = map(datas, (item, index) => ({
    //                     nth: index + 1,
    //                     supplier: item.supplier.name,
    //                     code: item.product.productdata.code,
    //                     name: item.product.productdata.name,
    //                     count: item.pieces + ' ' + item.unit.name,
    //                     unit: item.unitpriceuzs,
    //                     unitusd: item.unitprice,
    //                     all: item.totalpriceuzs,
    //                     allusd: item.totalprice
    //                 }))
    //                 continueHandleClick(IncomingSupplierData)
    //                 break
    //
    //             case 'barcode':
    //                 const BarcodeData = map(datas, (item, index) => ({
    //                     nth: index + 1,
    //                     code: item.barcode,
    //                     name: item.name
    //                 }))
    //                 continueHandleClick(BarcodeData)
    //                 break
    //             default:
    //                 break
    //         }
    //     } else {
    //         universalToast('Jadvalda ma\'lumot yoq', 'error')
    //     }
    // }
    return (
        <button className={'exportButton'} onClick={onClick}>
            {t('Eksport')}
            <span className={'btn-icon bg-white-900 p-[8px]'}>
                <img src={Excel} alt='excel icon' />
            </span>
        </button>
    )
}

export default ExportBtn
