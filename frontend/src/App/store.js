import {configureStore} from '@reduxjs/toolkit'
import LoginReducer from '../Pages/Login/loginSlice'
import CurrencyReducer from '../Pages/Currency/currencySlice'
import ProductsReducer from '../Pages/Products/Create/productSlice'
import UnitsReducer from '../Pages/Units/unitsSlice'
import SuppliersReducer from '../Pages/SupplierPage/suppliersSlice.js'
import CategoryReducer from '../Pages/Category/categorySlice'
import incomingReducer from '../Pages/Incomings/incomingSlice'
import inventoryReducer from '../Pages/Inventory/inventorySlice'
import inventoryConnectorReducer from '../Pages/Inventories/inventorieSlice.js'
import packmanReducer from '../Pages/Packman/packmanSlice'
import ExchangerateSlice from '../Pages/Exchangerate/ExchangerateSlice'
import registerSellingReducer from '../Pages/Sale/Slices/registerSellingSlice.js'
import savedSellingsReducer from '../Pages/Sale/Slices/savedSellingsSlice.js'
import clientsReducer from '../Pages/Clients/clientsSlice'
import reportsReducer from '../Pages/Checkout/checkoutSlice.js'

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
        inventories: inventoryReducer,
        inventoryConnectors: inventoryConnectorReducer,
        packmans: packmanReducer,
        exchangerate: ExchangerateSlice,
        clients: clientsReducer,
        registerSelling: registerSellingReducer,
        savedSellings: savedSellingsReducer,
        reports: reportsReducer,
    },
})
