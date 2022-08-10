import {Suspense, useEffect} from 'react'
import {Route, Routes} from 'react-router-dom'
import Navbar from '../Components/Navbar/Navbar'
import Currency from '../Components/Currency/Currency.js'
import {useDispatch, useSelector} from 'react-redux'
import {changeCurrencyType, clearError, getCurrency, getCurrencyType} from './Currency/currencySlice'
import {universalToast, warningCurrencyRate} from '../Components/ToastMessages/ToastMessages.js'
import protectedRoutes from './ProtectedRoutes.js'
import Barcode from './Barcode/Barcode.js'


const PageRoutes = () => {
    const dispatch = useDispatch()
    const {currency, currencyType, currencyError, getCurrencyLoading} =
        useSelector((state) => state.currency)
    const {user} = useSelector((state) => state.login)
    const changeCurrency = () => {
        const prevCurrencyType = currencyType === 'USD' ? 'UZS' : 'USD'
        dispatch(changeCurrencyType({currency: prevCurrencyType}))
    }
    useEffect(() => {
        dispatch(getCurrency())
        dispatch(getCurrencyType())
    }, [dispatch])
    useEffect(() => {
        if (!currency && !getCurrencyLoading) {
            warningCurrencyRate()
        }
    }, [currency, getCurrencyLoading])
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
                        {protectedRoutes(user.type)}
                        <Route path={'/admin'} element={<Barcode />} />
                    </Routes>
                </Suspense>
            </div>
        </section>
    )
}

export default PageRoutes
