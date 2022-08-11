import {lazy} from 'react'
import {uniqueId} from 'lodash'
import {Route} from 'react-router-dom'
// pages -->
const Category = lazy(() => import('./Category/Category.js'))
const Supplier = lazy(() => import('./SupplierPage/SupplierPage'))
const ProductReport = lazy(() => import('./ProductReport/ProductReport'))
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
const Exchangerate = lazy(() => import('./Exchangerate/Exchangerate'))
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
// <-- pages

const directorRoutes = [
    {
        path: '/',
        element: <MainPage />,
    },
    {
        path: '/maxsulotlar/qabul/',
        element: <Incoming />,
        subRoutes: [
            {
                path: 'qabulqilish',
                element: <RegisterIncoming />,
            },
            {
                path: 'qabullar',
                element: <Incomings />,
            },
            {
                path: 'qabullar/:id',
                element: <IncomingSuppliers />,
            },
            {
                path: 'saqlanganlar',
                element: <SavedIncoming />,
            },
            {
                path: 'ruyxat',
                element: <IncomingsList />,
            },
        ],
    },
    {
        path: '/maxsulotlar/yaratish/maxsulotlar',
        element: <Products />,
    },
    {
        path: '/maxsulotlar/yaratish/kategoriyalar',
        element: <Category />,
    },
    {
        path: '/maxsulotlar/yaratish/yetkazuvchilar',
        element: <Supplier />,
    },
    {
        path: '/maxsulotlar/hisobot',
        element: <ProductReport />,
    },
    {
        path: '/maxsulotlar/inventarizatsiya/inventarizatsiya',
        element: <Inventory />,
    },
    {
        path: '/maxsulotlar/inventarizatsiya/inventarizatsiyalar',
        element: <Inventories />,
    },
    {
        path: '/maxsulotlar/yaratish/ulchov',
        element: <Unit />,
    },
    {
        path: '/sotuv/',
        element: <Sales />,
        subRoutes: [
            {
                path: 'sotish',
                element: <RegisterSelling />,
            },
            {
                path: 'saqlanganlar',
                element: <SavedSellings />,
            },
            {
                path: 'ruyxat',
                element: <Sellings />,
            },
        ],
    },
    {
        path: '/hamkorlar/agentlar',
        element: <Packman />,
    },
    {
        path: '/hamkorlar/mijozlar',
        element: <ClientsPage />,
    },
    {
        path: '/hamkorlar/sotuvchilar',
        element: <Sellers />,
    },
    {
        path: '/valyuta',
        element: <Exchangerate />,
    },
    {
        path: '/kassa',
        element: <Reports />,
    },
    {
        path: '/kassa/:id',
        element: <ReportPage />,
    },
    {
        path: '/dukonlar/*',
        element: <Shops />,
        subRoutes: [
            {
                path: ':tablename/:_id',
                element: <Shops />,
            },
            {
                path: 'filiallar',
                element: <Shops />,
            },
        ],
    },
]
const sellerRoutes = [
    {
        path: '/',
        element: <Sales />,
        subRoutes: [
            {
                path: '/',
                element: <RegisterSelling />,
            },
            {
                path: 'saqlanganlar',
                element: <SavedSellings />,
            },
            {
                path: 'ruyxat',
                element: <Sellings />,
            },
        ],
    },
]

const chooseRoute = (type) => {
    switch (type) {
        case 'director':
            return directorRoutes
        case 'seller':
            return sellerRoutes
        default:
            return [
                {
                    path: '/',
                    element: <h1>Sahifa mavjud emas</h1>,
                },
            ]
    }
}

const protectedRoutes = (type) => {
    const catchRoutes = chooseRoute(type.toLowerCase())
    return catchRoutes.map((route) =>
        route.subRoutes ? (
            <Route
                exact
                key={uniqueId('route')}
                path={route.path}
                element={route.element}
            >
                {route.subRoutes.map((subRoute) => (
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
