import React from 'react'
import CheckoutCards from '../../Components/CheckoutCard/CheckoutCards'

const Checkout = (onClick) => {
    const data = [
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
            name: 'Chegirmalat',
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

    return (
        <section>
            <div className='checkout-card mainPadding'>
                {data.map((i) => (
                    <CheckoutCards
                        name={i.name}
                        type={i.type}
                        onClick={onClick}
                        percentage={i.percentage}
                        cost={i.cost}
                    />
                ))}
            </div>
        </section>
    )
}

export default Checkout
