import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import FieldContainer from '../../Components/FieldContainer/FieldContainer'

const Expense = () => {
    const dispatch = useDispatch()
    const {
        market: {_id},
    } = useSelector((state) => state.login)
    const {expenses, count} = useSelector((state) => state.expense)

    const [currentPage, setCurrentPage] = useState(0)
    const [countPage, setCountPage] = useState(10)
    const [startDate, setStartDate] = useState(
        new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            1
        ).toISOString()
    )
    const [endDate, setEndDate] = useState(
        new Date(new Date().setHours(26, 59, 59, 0)).toISOString()
    )

    const [expense, setExpense] = useState({
        sum: 0,
        type: '',
        comment: '',
        market: _id,
    })
    const [expenseType, setExpenseType] = useState({
        label: 'Turi',
        value: '',
    })

    return (
        <div className='pt-[1rem]'>
            <div className='flex items-center gap-[1.25rem] mainPadding'>
                <FieldContainer
                    value={expense.sum}
                    label={'Narxi'}
                    placeholder={'misol: Jasurbek'}
                    maxWidth={'w-[21.75rem]'}
                    type={'number'}
                    border={true}
                />
                <FieldContainer
                    value={expense.comment}
                    label={'Ismi'}
                    placeholder={'misol: Jasurbek'}
                    maxWidth={'w-[21.75rem]'}
                    type={'text'}
                    border={true}
                />
                <FieldContainer
                    value={expenseType}
                    label={'Agentni tanlang'}
                    placeholder={'misol: Dilso`z'}
                    select={true}
                    maxWidth={'w-[21rem]'}
                />
            </div>
        </div>
    )
}

export default Expense
