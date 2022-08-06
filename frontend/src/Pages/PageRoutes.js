import {lazy, Suspense, useEffect} from 'react'
import {Route, Routes} from 'react-router-dom'
import Navbar from '../Components/Navbar/Navbar'
import Incoming from './Incomings/Incoming'
import RegisterIncoming from './Incomings/Routes/RegisterIncoming'
import Incomings from './Incomings/Routes/Incomings'
import SavedIncoming from './Incomings/Routes/SavedIncomings'
import IncomingsList from './Incomings/Routes/IncomingsList'
import Category from './Category/Category.js'
import {useDispatch, useSelector} from 'react-redux'
import {changeCurrencyType, clearError, getCurrency, getCurrencyType} from './Currency/currencySlice'
import Supplier from './SupplierPage/SupplierPage'
import ProductReport from './ProductReport/ProductReport'
import Inventory from './Inventory/Inventory'
import Inventories from './Inventories/Inventories'
import Unit from './Units/Unit.js'
import Currency from '../Components/Currency/Currency.js'
import Sale from './Sale/Sale.js'
import RegisterSelling from './Sale/Routes/RegisterSelling.js'
import SavedSellings from './Sale/Routes/SavedSellings.js'
import Sellings from './Sale/Routes/Sellings.js'
import Packman from './Packman/Packman'
import ClientsPage from './Clients/Clients'
import Exchangerate from './Exchangerate/Exchangerate.js'
import {universalToast, warningCurrencyRate} from '../Components/ToastMessages/ToastMessages.js'
import Shops from './ShopsPage/Shops'
import Checkout from './Checkout/Checkout'

//pages
const MainPage = lazy(() => import('./MainPage/MainPage'))
const Products = lazy(() => import('./Products/Create/Products'))

const PageRoutes = () => {
    const dispatch = useDispatch()
    const {currency, currencyType, currencyError, currencyLoading} =
        useSelector((state) => state.currency)
    const changeCurrency = () => {
        const prevCurrencyType = currencyType === 'USD' ? 'UZS' : 'USD'
        dispatch(changeCurrencyType({currency: prevCurrencyType}))
    }
    useEffect(() => {
        dispatch(getCurrency())
        dispatch(getCurrencyType())
    }, [dispatch])
    useEffect(() => {
        if (!currency && !currencyLoading) {
            warningCurrencyRate()
        }
    }, [currency, currencyLoading])
    useEffect(() => {
        if (currencyError) {
            universalToast(currencyError, 'error')
            dispatch(clearError())
        }
    }, [currencyError, dispatch])

    return (
        <section className={'flex bg-background relative overflow-x-hidden'}>
            <Currency currency={currencyType} onClick={changeCurrency} />
            <Navbar />
            <div className={'grow h-screen overflow-y-auto'}>
                <Suspense fallback={'loading'}>
                    <Routes>
                        <Route path='/' element={<MainPage />} />
                        <Route
                            path='/maxsulotlar/yaratish/maxsulotlar'
                            element={<Products />}
                        />
                        <Route
                            path='/maxsulotlar/qabul/'
                            element={<Incoming />}
                        >
                            <Route
                                path='qabulqilish'
                                element={<RegisterIncoming />}
                            />
                            <Route path='qabullar' element={<Incomings />} />
                            <Route
                                path='saqlanganlar'
                                element={<SavedIncoming />}
                            />
                            <Route path='ruyxat' element={<IncomingsList />} />
                        </Route>
                        <Route
                            path='/maxsulotlar/yaratish/kategoriyalar'
                            element={<Category />}
                        />
                        <Route
                            path='/maxsulotlar/yaratish/yetkazuvchilar'
                            element={<Supplier />}
                        />
                        <Route
                            path='/maxsulotlar/hisobot'
                            element={<ProductReport />}
                        />
                        <Route
                            path='/maxsulotlar/inventarizatsiya/inventarizatsiya'
                            element={<Inventory />}
                        />
                        <Route
                            path='/maxsulotlar/inventarizatsiya/inventarizatsiyalar'
                            element={<Inventories />}
                        />
                        <Route
                            path='/maxsulotlar/yaratish/ulchov'
                            element={<Unit />}
                        />
                        <Route path='/sotuv/sotish/' element={<Sale />}>
                            <Route path='sotuv' element={<RegisterSelling />} />
                            <Route
                                path='saqlanganlar'
                                element={<SavedSellings />}
                            />
                            <Route path='ruyxat' element={<Sellings />} />
                        </Route>

                        <Route path='/sotuv/agentlar' element={<Packman />} />

                        <Route
                            path='/sotuv/mijozlar'
                            element={<ClientsPage />}
                        />

                        <Route path='/valyuta' element={<Exchangerate />} />
                        <Route path='/kassa' element={<Checkout />} />
                        <Route path='/kassa' element={<Checkout />} />

                        <Route path='/dukonlar/' element={<Shops />}>
                            <Route path=':tablename/:_id' element={<Shops />} />
                        </Route>
                    </Routes>
                </Suspense>
            </div>
        </section>
    )
}

export default PageRoutes
