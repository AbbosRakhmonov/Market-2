import React from 'react'

export const ExpensesTableRow = ({data, currentPage, countPage, currency}) => {
    return (
        <>
            {data.map((expense, index) => (
                <tr className='tr'>
                    <td className='text-left td'>
                        {currentPage * countPage + 1 + index}
                    </td>
                    <td className='text-right td'>
                        {expense.sum}
                        <span>{currency}</span>
                    </td>
                    <td className='text-left td'>{expense.comment}</td>
                    <td className='text-left border-r-0 py-[6px] td'>
                        {expense.type}
                    </td>
                </tr>
            ))}
        </>
    )
}
