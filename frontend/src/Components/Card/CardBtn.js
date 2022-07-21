import React from 'react';

const CardBtn = ({ product, deliver, date }) => {
  return (
    <button>
      <div className='cardStyle'>
        <h1 className='headerStyle'>Samsung</h1>

        <div className='text-[.875rem]'>
          <div className='numberCard'>
            <p className='paragrafCard'>Maxsulot turlari:</p>
            <p>{product.toLocaleString('ru-Ru')}</p>
          </div>

          <div className='numberCard'>
            <p className='paragrafCardBtn'>Maxsulotlar soni</p>
            <p>{deliver.toLocaleString('ru-Ru')}</p>
          </div>

          <div className='numberCard'>
            <p className='paragrafCard'>Sana:</p>
            <p>{date}</p>
          </div>
        </div>
      </div>
    </button>
  );
};

export default CardBtn;
