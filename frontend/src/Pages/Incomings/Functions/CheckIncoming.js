import {universalToast} from '../../../Components/ToastMessages/ToastMessages'

export const CheckIncoming = (products) => {
    for (const product of products) {
        if (product.pieces < 1) {
            return universalToast('Mahsulot sonini kirirting!', 'error')
        }
        if (product.unitprice < 1) {
            return universalToast('Mahsulot qabul narxini kirirting!', 'error')
        }
    }
    return false
}
