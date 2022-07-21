import React from 'react';
import { Link } from 'react-router-dom';

const CardLink = ({ cost, product, deliver, date, valyuta, id }) => {
  return (
    <Link to={`/${id}`}>
      <div className='cardStyle'>
        <h1 className='headerStyle'>
          {cost.toLocaleString('ru-Ru')}
          <span className='cardSpan'>{valyuta}</span>
        </h1>

        <div className='text-[.875rem]'>
          <div className='numberCard'>
            <p className='paragrafCard'>Maxsulot turlari:</p>
            <p>{product.toLocaleString('ru-Ru')}</p>
          </div>

          <div className='numberCard'>
            <p className='paragrafCard'> Yetkazuvchilar</p>
            <p>{deliver.toLocaleString('ru-Ru')}</p>
          </div>

          <div className='numberCard'>
            <p className='paragrafCard'>Sana:</p>
            <p>{date}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CardLink;
