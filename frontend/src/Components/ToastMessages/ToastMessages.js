import {toast} from "react-toastify";

// Long toast message with header and body
const toastWithHeader = (header, message) => (
    <div>
        <h1 className={'text-sm mb-1'}>{header}</h1>
        <p className={'text-xs'}>{message}</p>
    </div>
);

// Success Messages
export const successLoggedIn = () => toast.success(toastWithHeader("Xush kelibsiz", "Kirish muvaffaqiyatli amalga oshirildi !"));
export const successAddProduct = () => toast.success("Maxsulot muvaffaqiyatli yaratildi !");
export const successUpdateProduct = () => toast.success("O'zgartirish muvaffaqiyatli amalga oshirildi !");

// Warning Messages
export const warningEmptyInput = () => toast.warn("Ma'lumotlar to'liq kiritilmagan !");
export const warningCurrencyRate = () => toast.warn("Valyuta kursi kiritilmagan !");

// Error Messages
export const errorNetwork = () => toast.error(toastWithHeader("Xatolik", "Internet bilan bog'lanishda xatolik yuz berdi !"))

// Universal Messages
export const universalToast = (message, type) => toast[type](message);
