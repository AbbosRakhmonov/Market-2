import React from 'react'
import TableBtn from '../../Buttons/TableBtn'

export const ExpensesTableRow = ({
    data,
    currentPage,
    countPage,
    currency,
    reports,
    Delete,
}) => {
    const typeofexpense = (type) => {
        switch (type) {
            case 'cash':
                return 'Naqt'
            case 'card':
                return 'Plastik'
            case 'transfer':
                return "O'tkazma"
        }
    }

    return (
        <>
            {data.map((expense, index) => (
                <tr className='tr' key={expense._id}>
                    <td className='text-left td'>
                        {currentPage * countPage + 1 + index}
                    </td>
                    <td className='text-right td'>
                        {new Date(expense.createdAt).toLocaleDateString()}
                    </td>
                    <td className='text-right td font-medium'>
                        {currency === 'USD' ? expense.sum : expense.sumuzs}{' '}
                        <span>{currency}</span>
                    </td>
                    <td className='text-left td'>{expense.comment}</td>
                    <td className='text-left py-[6px] td'>
                        {typeofexpense(expense.type)}
                    </td>
                    {!reports && (
                        <td className='border-r-0 py-[6px] td'>
                            <div className='flex items-center justify-center'>
                                <TableBtn
                                    type={'delete'}
                                    bgcolor={'bg-error-500'}
                                    onClick={() => Delete(expense)}
                                />
                            </div>
                        </td>
                    )}
                </tr>
            ))}
        </>
    )
}
