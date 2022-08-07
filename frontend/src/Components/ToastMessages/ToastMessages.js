import { toast } from 'react-toastify'

// Long toast message with header and body
const toastWithHeader = (header, message) => (
    <div>
        <h1 className={'text-sm mb-1'}>{header}</h1>
        <p className={'text-xs'}>{message}</p>
    </div>
)

// Success Messages
export const successLoggedIn = () =>
    toast.success(
        toastWithHeader(
            'Xush kelibsiz',
            'Kirish muvaffaqiyatli amalga oshirildi!'
        )
    )
export const successAddProductMessage = () =>
    toast.success('Maxsulot muvaffaqiyatli yaratildi!')
export const successUpdateProductMessage = () =>
    toast.success('Maxsulot muvaffaqiyatli o\'zgartirildi!')
export const successDeleteProductMessage = () =>
    toast.success('Maxsulot muvaffaqiyatli o\'chirildi!')

export const successAddUnitMessage = () =>
    toast.success("O'lchov birligi muvaffaqiyatli yaratildi!")
export const successUpdateUnitMessage = () =>
    toast.success("O'lchov birligi muvaffaqiyatli o'zgartirildi!")
export const successDeleteUnitMessage = () =>
    toast.success("O'lchov birligi muvaffaqiyatli o'chirildi!")

export const successAddSupplierMessage = () =>
    toast.success('Yetkazib beruvchi muvaffaqiyatli yaratildi!')
export const successUpdateSupplierMessage = () =>
    toast.success("Yetkazib beruvchi muvaffaqiyatli o'zgartirildi!")
export const successDeleteSupplierMessage = () =>
    toast.success("Yetkazib beruvchi muvaffaqiyatli o'chirildi!")

// Exchange rate massages
export const successAddExchangeMessage = () =>
    toast.success('Valyuta kursi muvaffaqiyatli yaratildi !')
export const successUpdateExchangeMessage = () =>
    toast.success("Valyuta kursi muvaffaqiyatli o'zgartirildi !")
export const successDeleteExchangeMessage = () =>
    toast.success("Valyuta kursi muvaffaqiyatli o'chirildi !")


export const successUpdateInventoryMessage = () =>
    toast.success('Inventarizatsiya muvaffaqqiyatli saqlandi!')
export const successCompleteInventoryMessage = () =>
    toast.success('Inventarizatsiya muvaffaqqiyatli yakunlandi!')

export const successAddPackmanMessage = () =>
    toast.success('Agent muvaffaqiyatli yaratildi!')
export const successUpdatePackmanMessage = () =>
    toast.success("Agent muvaffaqiyatli o'zgartirildi!")
export const successDeletePackmanMessage = () =>
    toast.success("Agent muvaffaqiyatli o'chirildi!")

export const successAddCategoryMessage = () =>
    toast.success('Kategoriya muvaffaqiyatli yaratildi!')
export const successUpdateCategoryMessage = () =>
    toast.success("Kategoriya muvaffaqiyatli o'zgartirildi!")
export const successDeleteCategoryMessage = () =>
    toast.success("Kategoriya muvaffaqiyatli o'chirildi!")

export const successDeleteTemporary = () => toast.success('Saqlangan sotuv muvaffaqiyatli o\'chirildi!')
export const successSavedTemporary = () => toast.success('Sotuv muvaffaqiyatli saqlandi!')

// Warning Messages
export const warningEmptyInput = () =>
    toast.warn("Ma'lumotlar to'liq kiritilmagan!")
export const warningCurrencyRate = () =>
    toast.warn('Valyuta kursi kiritilmagan!')
export const warningCategory = () => {
    toast.warn('Kategoriyalar mavjud emas!')
}
export const warningSaleProductsEmpty = () => toast.warn('Maxsulot mavjud emas !')
export const warningMorePayment = () => toast.warn('To\'lov summasidan ortiq summa kiritib bo\'lmaydi')
export const warningMoreDiscount = (val) => toast.warn(`${val} dan ortiq chegirma kiritib bo'lmaydi`)
export const warningLessSellPayment = () => toast.warn('Sotish narxi kelish narxidan past bo\'lmasligi kerak')

// Error Messages
export const errorNetwork = () =>
    toast.error(
        toastWithHeader(
            'Xatolik',
            "Internet bilan bog'lanishda xatolik yuz berdi!"
        )
    )

// Universal Messages
export const universalToast = (message, type) => toast[type](message)
