import {universalToast} from '../../../Components/ToastMessages/ToastMessages'
import { useTranslation } from 'react-i18next';

export const CheckIncoming = (products) => {
    const {t} = useTranslation(['common'])
    for (const product of products) {
        if (product.pieces < 1) {
            return universalToast(t('Mahsulot sonini kiriting!'), 'error')
        }
        if (product.unitprice < 0.01) {
            return universalToast(t('Mahsulot qabul narxini kiriting!'), 'error')
        }
        if (product.sellingprice < product.unitprice) {
            return universalToast(
                t("Sotish narxi olish dan kam bo'lmasin"),
                'error'
            )
        }
    }
    return false
}
