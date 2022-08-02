import {configureStore} from '@reduxjs/toolkit'
import LoginReducer from '../Pages/Login/loginSlice'
import CurrencyReducer from '../Pages/Currency/currencySlice'
import ProductsReducer from '../Pages/Products/Create/productSlice'
import UnitsReducer from '../Pages/Units/unitsSlice'
import SuppliersReducer from '../Pages/SupplierPage/suppliersSlice.js'
import CategoryReducer from '../Pages/CategoryPage/categorySlice'
import incomingReducer from '../Pages/Incomings/incomingSlice'

export default configureStore({
    devTools: process.env.NODE_ENV === 'development',
    reducer: {
        login: LoginReducer,
        currency: CurrencyReducer,
        products: ProductsReducer,
        units: UnitsReducer,
        suppliers: SuppliersReducer,
        category: CategoryReducer,
        incoming: incomingReducer,
    },
})
