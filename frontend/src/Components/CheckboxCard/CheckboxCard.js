import React from 'react'

const CheckboxCard = ({text}) => {
    return (
        <div className='checkbox-card'>
            <div className='checkbox-card-paragraf'><p>{text}</p></div>
            <input type='checkbox' />
        </div>
    )
}

export default CheckboxCard