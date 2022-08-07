import React from 'react'

const CheckoutCards = ({
    type,
    onClick,
    percentage,
    name,
    cost,
    active,
    currency,
    report,
}) => {
    const chooseCardName = `cardContainer ${
        type === 'sale' ||
        type === 'income' ||
        type === 'cash' ||
        type === 'card' ||
        type === 'transfer'
            ? 'tradeCard'
            : type === 'expenses' || type === 'debts'
            ? 'debts'
            : type === 'backproducts'
            ? 'returnedCard'
            : type === 'discounts'
            ? 'discountCard'
            : ''
    } ${active ? 'activeCard' : ''}`

    return (
        <button onClick={onClick}>
            <span className={chooseCardName}>
                <span className='tradeIn'>
                    <span
                        className={
                            type === 'income' ? 'hidden' : 'parcentageWidth'
                        }
                    >
                        <span
                            className={
                                type === 'income'
                                    ? 'hidden'
                                    : 'percentageCircle'
                            }
                        >
                            <span> {report[type + 'count']} </span>
                        </span>
                    </span>
                    <span className='w-full'>
                        <span
                            className={
                                type === 'income' ? 'checkName' : 'checkoutName'
                            }
                        >
                            <p className='text-[1.5rem]'>{name}</p>
                            <p className='text-[1.25rem] '>{currency}</p>
                        </span>
                        <div>
                            <p className='costCard float-right'>
                                {currency === 'UZS'
                                    ? report[type + 'uzs'].toLocaleString(
                                          'ru-Ru'
                                      )
                                    : report[type].toLocaleString('ru-Ru')}
                            </p>
                        </div>
                    </span>
                </span>
            </span>
        </button>
    )
}

export default CheckoutCards
