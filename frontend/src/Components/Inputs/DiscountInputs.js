import React from 'react'

export const DiscountInput = ({value, onChange, currency}) => {
    return (
        <div className='flex justify-around'>
            <div className='flex items-center justify-center'>Chegirma:</div>
            <div className='inline-block'>
                <input
                    placeholder='Chegirma'
                    value={value}
                    onChange={onChange}
                    className='discountinput'
                />

                <select className='discountselect'>
                    <option value={currency}>UZS</option>
                    {/* UZS ning o'rniga "currency" chaqirib olinadi */}
                    <option value={'%'}>%</option>
                </select>
            </div>
        </div>
    )
}
