import React from 'react'

export const DiscountInput = ({value, onChange, currency}) => {
    return (
        <div className='flex justify-between w-full items-center'>
            <div className='text-black-700 text-[0.875rem]'>Chegirma:</div>
            <div className='flex w-[11.75rem]'>
                <input
                    placeholder='misol: 100 000 000'
                    value={value}
                    onChange={onChange}
                    className='discountinput w-full'
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
