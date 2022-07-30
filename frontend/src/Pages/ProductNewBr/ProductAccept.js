import React from 'react'
import CardLink from '../../Components/Card/CardLink'
import {uniqueId} from 'lodash'

function IncomingProduct() {
    const cardArr = [
        {
            cost: 450000000,
            valyuta: 'UZS',
            product: 999999,
            deliver: 999999,
            date: '26.09.2022',
        },
        {
            cost: 550000000,
            valyuta: 'EUR',
            product: 888888,
            deliver: 888888,
            date: '25.09.2022',
        },
        {
            cost: 650000000,
            valyuta: 'RUB',
            product: 777777,
            deliver: 888888,
            date: '14.06.2022',
        },
        {
            cost: 750000000,
            valyuta: 'JPY',
            product: 999999,
            deliver: 999999,
            date: '30.09.2022',
        },
    ]

    return (
        <section>
            <div className='productTypeBlock mainPadding'>
                <div className='productType'>
                    Maxsulot turlari :{' '}
                    <span className='ml-[0.5rem] font-[400] text-black-900'>
                        999 999 999
                    </span>
                </div>
                <div className='productSumAll'>
                    Jami :{' '}
                    <span className='ml-[0.5rem] font-[400] text-black-900'>
                        999 999 999 UZS
                    </span>
                </div>
            </div>
            <div className='flex justify-between duration-200 mainPadding'>
                {cardArr.map((value, index) => {
                    return (
                        <CardLink
                            key={uniqueId('card')}
                            cost={value.cost}
                            valyuta={value.valyuta}
                            product={value.product}
                            deliver={value.deliver}
                            date={value.date}
                            id={index + 1}
                        />
                    )
                })}
            </div>
        </section>
    )
}

export default IncomingProduct
