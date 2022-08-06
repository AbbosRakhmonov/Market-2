import React from 'react'

const ResultIncomings = ({connectors, styles, currencyType}) => {
    const price =
        currencyType === 'USD'
            ? connectors
                  .reduce((prev, item) => prev + item.totalprice, 0)
                  .toLocaleString('ru-RU')
            : connectors
                  .reduce((prev, item) => prev + item.totalpriceuzs, 0)
                  .toLocaleString('ru-RU')

    return (
        <div className={`productTypeBlock ${styles}`}>
            <div className='productType'>
                Maxsulotlar soni:{' '}
                <span className='ml-[0.5rem] font-[400] text-black-900'>
                    {connectors
                        .reduce((prev, item) => prev + item.products, 0)
                        .toLocaleString('ru-RU')}
                </span>
            </div>
            <div className='productSumAll'>
                Jami :{' '}
                <span className='ml-[0.5rem] font-[400] text-black-900'>
                    {price} {currencyType}
                </span>
            </div>
        </div>
    )
}

export default ResultIncomings
