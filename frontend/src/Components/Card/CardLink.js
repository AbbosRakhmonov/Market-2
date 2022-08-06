import React from 'react'
import {Link} from 'react-router-dom'

const CardLink = ({
    totalprice,
    pieces,
    suppliers,
    createdAt,
    currencyType,
    path,
    totalpriceuzs,
    state,
}) => {
    return (
        <Link to={path} className='grow max-w-[240px]' state={state}>
            <div className='w-full cardStyle'>
                <h1 className='headerStyle'>
                    {(currencyType === 'USD'
                        ? totalprice
                        : totalpriceuzs
                    ).toLocaleString('ru-Ru')}
                    <span className='cardSpan'>{currencyType}</span>
                </h1>

                <div className='text-[.875rem]'>
                    <div className='numberCard'>
                        <p className='paragrafCard'>Maxsulot:</p>
                        <p>{pieces.toLocaleString('ru-Ru')}</p>
                    </div>

                    <div className='numberCard'>
                        <p className='paragrafCard'> Yetkazuvchilar</p>
                        <p>{suppliers.toLocaleString('ru-Ru')}</p>
                    </div>

                    <div className='numberCard'>
                        <p className='paragrafCard'>Sana:</p>
                        <p>{new Date(createdAt).toLocaleDateString('ru-RU')}</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default CardLink
