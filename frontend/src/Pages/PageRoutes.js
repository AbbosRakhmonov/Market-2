import {Suspense, useEffect} from 'react'
import {Routes} from 'react-router-dom'
import Navbar from '../Components/Navbar/Navbar'
import Currency from '../Components/Currency/Currency.js'
import {useDispatch, useSelector} from 'react-redux'
import {changeCurrencyType, clearError, getCurrency, getCurrencyType} from './Currency/currencySlice'
import {universalToast, warningCurrencyRate} from '../Components/ToastMessages/ToastMessages.js'
import protectedRoutes from './ProtectedRoutes.js'


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
        <motion.section className={'flex bg-background relative overflow-x-hidden'}
            key='content'
            initial='collapsed'
            animate='open'
            exit='collapsed'
            variants={{
                open: { opacity: 1, height: 'auto' },
                collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}>
            <Currency currency={currencyType} onClick={changeCurrency} />
            <Navbar />
            <div className={'grow h-screen overflow-y-auto'}>
                <Suspense fallback={'loading'}>
                    <Routes>
                        {protectedRoutes(user.type)}
                    </Routes>
                </Suspense>
            </div>
        </motion.section>
    )
}

export default PageRoutes
