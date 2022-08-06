import React from 'react'

const CheckoutCards = ({type, onClick, percentage, name, cost, active}) => {
    const chooseCardName = `cardContainer ${
        type === 'trade' ||
        type === 'profit' ||
        type === 'cash' ||
        type === 'plastic' ||
        type === 'transfers'
            ? 'tradeCard'
            : type === 'expenses' || type == 'debts'
            ? 'debts'
            : type === 'returned'
            ? 'returnedCard'
            : type === 'discount'
            ? 'discountCard'
            : ''
    } ${active ? 'activeCard' : ''}`

    return (
        <button onClick={onClick}>
            <span className={chooseCardName}>
                <span className='tradeIn'>
                    <span className={type === 'profit' ? 'hidden' : 'parcentageWidth'}>
                    <span
                        className={
                            type === 'profit' ? 'hidden' : 'percentageCircle'
                        }
                    >
                        <span> {percentage} </span>
                    </span>

                    </span>
                    <span className='w-full'>
                        <span
                            className={
                                type === 'profit' ? 'checkName' : 'checkoutName'
                            }
                        >
                            <p className='text-[1.5rem]'>{name}</p>
                            <p className='text-[1.25rem] '>$</p>
                        </span>
                        <div>
                            <p className='costCard float-right'>
                                {cost.toLocaleString('ru-Ru')}
                            </p>
                        </div>
                    </span>
                </span>
            </span>
        </button>
    )
}

export default CheckoutCards
