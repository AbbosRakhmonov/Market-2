import React from 'react'

const CardBtn = ({products, deliver, date, pieces, onClick}) => {
    return (
        <button onClick={onClick}>
            <div className='flex-[0_0_24%] cardStyle'>
                <h1 className='headerStyle'>{deliver}</h1>

                <div className='text-[.875rem]'>
                    <div className='numberCard'>
                        <p className='paragrafCard'>Maxsulot turlari:</p>
                        <p>{products.toLocaleString('ru-Ru')}</p>
                    </div>

                    <div className='numberCard'>
                        <p className='paragrafCardBtn'>Maxsulotlar soni</p>
                        <p>{pieces.toLocaleString('ru-Ru')}</p>
                    </div>

                    <div className='numberCard'>
                        <p className='paragrafCard'>Sana:</p>
                        <p>{date}</p>
                    </div>
                </div>
            </div>
        </button>
    )
}

export default CardBtn
