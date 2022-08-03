import React from 'react'

export const Body = ({product, currency, marketName}) => {
    return (
        <div className='w-[40mm] break-after-page font-sans h-[65mm] times'>
            <div className='w-[65mm] rotate-90 mt-20 -ml-0 text-xl'>
                <div className='text-center font-bold text-2xl'>
                    <span>"{marketName}"</span>
                    <hr />
                </div>
                <div>
                    <div className='text-center text-lg'>
                        Наименование:
                        <br />{' '}
                        <span className='font-bold'>
                            {product.productdata && product.productdata.name}
                        </span>
                    </div>
                    <div className='text-2xl font-bold text-center'>
                        <span>{product.price ? 'Цена:' : ''}</span>{' '}
                        <span>
                            {(product.price &&
                                (currency === 'UZS'
                                    ? product.price.sellingpriceuzs.toLocaleString(
                                          'ru-RU'
                                      )
                                    : product.price.sellingprice.toLocaleString(
                                          'ru-RU'
                                      )) +
                                    ' ' +
                                    currency) ||
                                ''}
                        </span>
                    </div>
                    <div className='flex justify-center'>
                        {/* <svg ref={inputRef} className='h-[23mm] w-[80mm]'  /> */}
                    </div>
                    <div className='flex justify-between text-xl'>
                        <div>
                            Код:{' '}
                            {product.productdata && product.productdata.code}
                        </div>
                        <div>{new Date().toLocaleDateString()}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
