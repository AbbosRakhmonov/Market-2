import React from 'react';

const CheckoutCards = ({ type, onClick, percentage, name, cost, active }) => {
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
  } ${active ? 'activeCard' : ''}`;

  return (
    <button onClick={onClick}>
      <div className={chooseCardName}>
        <div className='tradeIn'>
          <div className={(type === 'profit' ? 'hidden' : 'percentageCircle')}>
            <p> {percentage} </p>
          </div>
          <div>
            <div className={(type === 'profit' ? 'checkName' : 'checkoutName')}>
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
