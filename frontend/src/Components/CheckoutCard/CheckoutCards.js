import React from 'react';

const CheckoutCards = ({
  trade,
  profit,
  expenses,
  cash,
  plastic,
  transfers,
  returned,
  discount,
  debts,
  onClick,
  percentage,
  name,
  cost,
  active,
}) => {
  return (
    <button onClick={onClick}>
      <div
        className={`cardContainer ${
          trade || profit || cash || plastic || transfers
            ? 'tradeCard'
            : expenses || debts
            ? 'debts'
            : returned
            ? 'returnedCard'
            : discount
            ? 'discountCard'
            : ''
        } ${active ? 'activeCard' : ''}`}
      >
        <div className='tradeIn'>
          <div className={profit ? 'hidden' : 'percentageCircle'}>
            <p> {percentage} </p>
          </div>
          <div>
            <div className={profit ? 'checkName' : 'checkoutName'}>
              <p className='text-[1.5rem]'>{name}</p>
              <p className='text-[1.25rem] '>$</p>
            </div>
            <div>
              <p className='costCard float-right'>
                {cost.toLocaleString('ru-Ru')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
};

export default CheckoutCards;
