import {lazy} from 'react'
import {map, uniqueId} from 'lodash'
import {Route} from 'react-router-dom'
import SellersReport from './Seller/SellersReport.js'
// pages -->
const ProductReport = lazy(() => import('./ProductReport/ProductReport.js'))
const Category = lazy(() => import('./Category/Category.js'))
const Supplier = lazy(() => import('./SupplierPage/SupplierPage'))
const WareHouse = lazy(() => import('./WareHouse/WareHouse.js'))
const Inventory = lazy(() => import('./Inventory/Inventory'))
const Inventories = lazy(() => import('./Inventories/Inventories'))
const Unit = lazy(() => import('./Units/Unit.js'))
const Sales = lazy(() => import('./Sale/Sale.js'))
const RegisterSelling = lazy(() => import('./Sale/Routes/RegisterSelling.js'))
const SavedSellings = lazy(() => import('./Sale/Routes/SavedSellings.js'))
const Sellings = lazy(() => import('./Sale/Routes/Sellings.js'))
const Packman = lazy(() => import('./Packman/Packman'))
const ClientsPage = lazy(() => import('./Clients/Clients'))
const Shops = lazy(() => import('./ShopsPage/Shops'))
const Reports = lazy(() => import('./Reports/Reports.js'))
const Exchangerate = lazy(() => import('./Currency/Currency.js'))
const Sellers = lazy(() => import('./Seller/Sellers'))
const MainPage = lazy(() => import('./MainPage/MainPage'))
const Products = lazy(() => import('./Products/Create/Products'))
const Incoming = lazy(() => import('./Incomings/Incoming'))
const Incomings = lazy(() => import('./Incomings/Routes/Incomings'))
const RegisterIncoming = lazy(() =>
    import('./Incomings/Routes/RegisterIncoming')
)
const SavedIncoming = lazy(() => import('./Incomings/Routes/SavedIncomings'))
const IncomingsList = lazy(() => import('./Incomings/Routes/IncomingsList'))
const IncomingSuppliers = lazy(() =>
    import('./Incomings/Routes/IncomingSuppliers')
)
const ReportPage = lazy(() => import('./Reports/ReportPage.js'))
const Barcode = lazy(() => import('./Barcode/Barcode.js'))
const AdminProduct = lazy(() => import('./AdminProducts/AdminProduct.js'))
const Expense = lazy(() => import('./Expense/Expense.js'))
const EditProfile = lazy(() => import('./EditProfile/EditProfile.js'))
const PayDebts = lazy(() => import('./PayDebts/PayDebts.js'))
// <-- pages

const directorRoutes = [
    {
        path: '/',
        element: <MainPage />
    },
    {
        path: '/maxsulotlar/qabul/',
        element: <Incoming />,
        subRoutes: [
            {
                path: 'qabulqilish',
                element: <RegisterIncoming />
            },
            {
                path: 'qabullar',
                element: <Incomings />
            },
            {
                path: 'qabullar/:id',
                element: <IncomingSuppliers />
            },
            {
                path: 'saqlanganlar',
                element: <SavedIncoming />
            },
            {
                path: 'ruyxat',
                element: <IncomingsList />
            }
        ]
    },
    {
        path: '/maxsulotlar/maxsulotlar',
        element: <Products />
    },
    {
        path: '/maxsulotlar/hisobot',
        element: <ProductReport />
    },
    {
        path: '/maxsulotlar/kategoriyalar',
        element: <Category />
    },
    {
        path: '/maxsulotlar/ulchov',
        element: <Unit />
    },
    {
        path: '/maxsulotlar/omborxona',
        element: <WareHouse />
    },
    {
        path: '/maxsulotlar/inventarizatsiya/inventarizatsiya',
        element: <Inventory />
    },
    {
        path: '/maxsulotlar/inventarizatsiya/inventarizatsiyalar',
        element: <Inventories />
    },
    {
        path: '/sotuv/',
        element: <Sales />,
        subRoutes: [
            {
                path: 'sotish',
                element: <RegisterSelling />
            },
            {
                path: 'saqlanganlar',
                element: <SavedSellings />
            },
            {
                path: 'ruyxat',
                element: <Sellings />
            }
        ]
    },
    {
        path: '/hamkorlar/yetkazuvchilar',
        element: <Supplier />
    },
    {
        path: '/hamkorlar/agentlar',
        element: <Packman />
    },
    {
        path: '/hamkorlar/mijozlar',
        element: <ClientsPage />
    },
    {
        path: '/hamkorlar/sotuvchilar',
        element: <Sellers />
    },
    {
        path: '/hamkorlar/sotuvchilar/:id',
        element: <SellersReport />
    },
    {
        path: '/valyuta',
        element: <Exchangerate />
    },
    {
        path: '/xarajatlar',
        element: <Expense />
    },
    {
        path: '/kassa',
        element: <Reports />
    },
    {
        path: '/kassa/:id',
        element: <ReportPage />
    },
    {
        path: '/dukonlar/*',
        element: <Shops />,
        subRoutes: [
            {
                path: ':tablename/:_id',
                element: <Shops />
            },
            {
                path: 'filiallar',
                element: <Shops />
            }
        ]
    },
    {
        path: '/shaxsiy/parol',
        element: <EditProfile />
    }
]
const sellerRoutes = [
    {
        path: '/',
        element: <Sales />,
        subRoutes: [
            {
                path: '/',
                element: <RegisterSelling />
            },
            {
                path: 'saqlanganlar',
                element: <SavedSellings />
            },
            {
                path: 'ruyxat',
                element: <Sellings />
            }
        ]
    },
    {
        path: '/qarzdorlar',
        element: <PayDebts />
    }
]
const adminRoutes = [
    {
        path: '/',
        element: (
            <h1 className={'text-center text-black-700 p-[1rem]'}>
                Bunday sahifa hozircha mavjud emas
            </h1>
        )
    },
    {
        path: '/dukonlar/*',
        element: <AdminProduct />
    },
    {
        path: '/maxsulotlar',
        element: <Barcode />
    },
    {
        path: '/shaxsiy/parol',
        element: <EditProfile />
    }
]

const chooseRoute = (type) => {
    switch (type) {
        case 'director':
            return directorRoutes
        case 'seller':
            return sellerRoutes
        case 'admin':
            return adminRoutes
        default:
            return [
                {
                    path: '/',
                    element: <h1>Sahifa mavjud emas</h1>
                }
            ]
    }
}

const protectedRoutes = (type) => {
    const catchRoutes = chooseRoute(type.toLowerCase())
    return map(catchRoutes, (route) =>
        route.subRoutes ? (
            <Route
                exact
                key={uniqueId('route')}
                path={route.path}
                element={route.element}
            >
                {map(route.subRoutes, (subRoute) => (
                    <Route
                        key={uniqueId('sub-route')}
                        path={subRoute.path}
                        element={subRoute.element}
                    />
                ))}
            </Route>
        ) : (
            <Route
                exact
                key={uniqueId('route')}
                path={route.path}
                element={route.element}
            />
        )
    )
}
export default protectedRoutes
