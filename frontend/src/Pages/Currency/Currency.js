import React from 'react'

export const UsdToUzs = (val, currency) => {
    console.log(val * currency)
    return Math.round(val * currency)
}
export const UzsToUsd = (val, currency) => {
    console.log(Math.round((val / currency) * 1000) / 1000)
    return Math.round((val / currency) * 1000) / 1000
}

function Currency(props) {
    return <div>Currency Changer</div>
}

export default Currency
