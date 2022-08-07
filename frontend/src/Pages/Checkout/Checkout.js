import React, {useEffect, useState} from 'react'
import CheckoutCards from '../../Components/CheckoutCard/CheckoutCards'
import SearchForm from '../../Components/SearchForm/SearchForm.js'
import {useDispatch, useSelector} from 'react-redux'
import {universalToast} from '../../Components/ToastMessages/ToastMessages.js'
import {getConnectors} from '../Inventories/inventorieSlice.js'
import {uniqueId} from 'lodash'

const Checkout = () => {
    const card = [
        {
            name: 'Savdo',
            type: 'trade',
            percentage: 99,
            cost: 123456789,
        },
        {
            name: 'Sof foyda',
            type: 'profit',
            percentage: 99,
            cost: 123456789,
        },
        {
            name: 'Xarajatlar',
            type: 'debts',
            percentage: 99,
            cost: 123456789,
        },
        {
            name: 'Naqd',
            type: 'cash',
            percentage: 99,
            cost: 123456789,
        },
        {
            name: 'Plastik',
            type: 'plastic',
            percentage: 99,
            cost: 123456789,
        },
        {
            name: 'O`tkazmalar',
            type: 'transfers',
            percentage: 99,
            cost: 123456789,
        },
        {
            name: 'Qaytarilgan',
            type: 'returned',
            percentage: 99,
            cost: 123456789,
        },
        {
            name: 'Chegirmalar',
            type: 'discount',
            percentage: 99,
            cost: 123456789,
        },
        {
            name: 'Qarzlar',
            type: 'debts',
            percentage: 99,
            cost: 123456789,
        },
    ]
    const dispatch = useDispatch()
    const {reports, clearErrorrReports, loading, errorReports} = useSelector(
        (state) => state.reports
    )
    const [data, setData] = useState(reports)

    const [startDate, setStartDate] = useState(
        new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            new Date().getDate()
        )
    )
    const [endDate, setEndDate] = useState(new Date())

    useEffect(() => {
        const body = {
            startDate: new Date(
                new Date(startDate).getFullYear(),
                new Date(startDate).getMonth(),
                new Date(startDate).getDate()
            ).toISOString(),
            endDate: endDate.toISOString(),
        }
        dispatch(getConnectors(body))
    }, [dispatch, startDate, endDate])

    useEffect(() => {
        if (errorReports) {
            universalToast(errorReports, 'error')
            dispatch(clearErrorrReports())
        }
    }, [dispatch, clearErrorrReports, errorReports])

    return (
        <section>
            <SearchForm
                filterBy={['startDate', 'endDate', 'printBtn']}
                startDate={startDate}
                endDate={endDate}
            />
            <div className='checkout-card mainPadding'>
                {card.map((i) => (
                    <CheckoutCards
                        key={uniqueId('card')}
                        name={i.name}
                        type={i.type}
                        percentage={i.percentage}
                        cost={i.cost}
                    />
                ))}
            </div>
        </section>
    )
}

export default Checkout
