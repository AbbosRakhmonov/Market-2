import {lazy, Suspense, useEffect} from 'react'
import {Route, Routes} from 'react-router-dom'
import Navbar from '../Components/Navbar/Navbar'
import Incoming from './Incomings/Incoming'
import RegisterIncoming from './Incomings/Routes/RegisterIncoming'
import Incomings from './Incomings/Routes/Incomings'
import SavedIncoming from './Incomings/Routes/SavedIncomings'
import IncomingsList from './Incomings/Routes/IncomingsList'
import CategoryPage from './CategoryPage/CategoryPage'
import {useDispatch} from 'react-redux'
import {getCurrency, getCurrencyType} from './Currency/currencySlice'
import Supplier from './SupplierPage/SupplierPage'
import ProductReport from './ProductReport/ProductReport'
import Inventory from './Inventory/Inventory'
import Inventories from './Inventories/Inventories'
import Unit from './UnitPages/Unit'
import Currency from '../Components/Currency/Currency.js'
import Sale from './Sale/Sale.js'
import RegisterSelling from './Sale/Routes/RegisterSelling.js'
import SavedSellings from './Sale/Routes/SavedSellings.js'
import Sellings from './Sale/Routes/Sellings.js'
import SaleDelivers from './SalesPage/SaleDelivers'
import ClientsPage from './Clients/Clients'
//pages
const MainPage = lazy(() => import('./MainPage/MainPage'))
const Products = lazy(() => import('./Products/Create/Products'))

const PageRoutes = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getCurrency())
        dispatch(getCurrencyType())
    }, [dispatch])
    return (
        <section className={'flex bg-background relative overflow-auto'}>
            <Currency currency={'UZS'} />
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
                            element={<CategoryPage />}
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


                       <Route
                            path='/sotuv/santexniklar'
                            element={<SaleDelivers />}
                        />
                        
                       <Route
                            path='/sotuv/mijozlar'
                            element={<ClientsPage />}
                        />
                    </Routes>
                </Suspense>
            </div>
        </section>
    )
}

export default PageRoutes
