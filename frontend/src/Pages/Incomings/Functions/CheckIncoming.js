import {universalToast} from '../../../Components/ToastMessages/ToastMessages'

export const CheckIncoming = (products) => {
    for (const product of products) {
        if (product.pieces < 1) {
            return universalToast('Mahsulot sonini kirirting!', 'error')
        }
        if (product.unitprice < 0.01) {
            return universalToast('Mahsulot qabul narxini kirirting!', 'error')
        }
        if (product.sellingprice < product.unitprice) {
            return universalToast(
                "Sotish narxi olish dan kam bo'lmasin",
                'error'
            )
        }
    }
    return false
}
