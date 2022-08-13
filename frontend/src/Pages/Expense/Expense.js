import React, {useCallback, useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import FieldContainer from '../../Components/FieldContainer/FieldContainer'
import Button from '../../Components/Buttons/BtnAddRemove'
import {clearSuccessRegister, deleteExpense, getExpense, registerExpense} from './expenseSlice'
import SearchForm from '../../Components/SearchForm/SearchForm'
import Pagination from '../../Components/Pagination/Pagination'
import Table from '../../Components/Table/Table'

const Expense = () => {
    const dispatch = useDispatch()
    const {
        market: {_id}
    } = useSelector((state) => state.login)
    const {currencyType, currency} = useSelector((state) => state.currency)
    const {expenses, count, successRegister} = useSelector(
        (state) => state.expense
    )

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
        market: _id
    })
    const [expenseType, setExpenseType] = useState({
        label: 'Turi',
        value: ''
    })

    const types = [
        {
            label: 'Naqt',
            value: 'cash'
        },
        {
            label: 'Plastik',
            value: 'card'
        },
        {
            label: 'O\'tkazma',
            value: 'transfer'
        }
    ]

    const handleChangeInput = (e, key) => {
        let target = Number(e.target.value)
        if (key === 'comment') {
            setExpense({
                ...expense,
                comment: e.target.value
            })
        } else {
            setExpense({
                ...expense,
                sum:
                    currencyType === 'USD'
                        ? target
                        : Math.round((target / currency) * 1000) / 1000,
                sumuzs:
                    currencyType === 'UZS'
                        ? target
                        : Math.round(target * currency * 1000) / 1000
            })
        }
    }

    const handleChangeSelect = (e) => {
        setExpenseType({
            label: e.label,
            value: e.value
        })
        setExpense({
            ...expense,
            type: e.value
        })
    }

    const createExpense = () => {
        let body = {
            currentPage,
            countPage,
            expense
        }
        dispatch(registerExpense(body))
    }

    const removeExpense = (expense) => {
        let body = {
            currentPage,
            countPage,
            _id: expense._id
        }
        dispatch(deleteExpense(body))
    }

    const clearForm = useCallback(() => {
        setExpense({
            sum: '',
            type: '',
            comment: '',
            market: _id
        })
        setExpenseType({
            label: 'Turi',
            value: ''
        })
    }, [_id])

    useEffect(() => {
        let body = {
            currentPage,
            countPage,
            startDate,
            endDate
        }
        dispatch(getExpense(body))
    }, [dispatch, currentPage, countPage, startDate, endDate])

    useEffect(() => {
        if (successRegister) {
            clearForm()
            dispatch(clearSuccessRegister())
        }
    }, [dispatch, successRegister, clearForm])

    const headers = [
        {
            title: '№',
            styles: 'w-[7%]'
        },
        {
            title: 'Sana',
            styles: 'w-[10%]'
        },
        {
            title: 'Summa',
            styles: 'w-[20%]'
        },
        {
            title: 'Izoh'
        },
        {
            title: 'Turi'
        },
        {
            title: '',
            styles: 'w-[5%]'
        }
    ]

    return (
        <div className='pt-[1rem]'>
            <div className='flex items-center gap-[1.25rem] mainPadding'>
                <FieldContainer
                    value={
                        currencyType === 'USD' ? expense.sum : expense.sumuzs
                    }
                    onChange={(e) => handleChangeInput(e, 'sum')}
                    label={'Narxi'}
                    placeholder={'misol: 100'}
                    maxWidth={'w-[21.75rem]'}
                    type={'number'}
                    border={true}
                />
                <FieldContainer
                    value={expense.comment}
                    onChange={(e) => handleChangeInput(e, 'comment')}
                    label={'Izoh'}
                    placeholder={'misol: yebquydim'}
                    maxWidth={'w-[21.75rem]'}
                    type={'text'}
                    border={true}
                />
                <FieldContainer
                    value={expenseType}
                    onChange={handleChangeSelect}
                    label={'Xarajat turi'}
                    placeholder={'misol: Dilso`z'}
                    select={true}
                    options={types}
                    maxWidth={'w-[21rem]'}
                />
            </div>
            <div className='mainPadding flex justify-end'>
                <div className={'flex gap-[1.25rem] w-[19.5rem]'}>
                    <Button
                        onClick={createExpense}
                        add={createExpense}
                        text={'Yangi xarajat yaratish'}
                    />
                    <Button onClick={clearForm} text={'Tozalash'} />
                </div>
            </div>
            <div className='mainPadding'>
                <Pagination
                    countPage={countPage}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalDatas={count}
                />
            </div>
            <div className='pt-[0.625rem]'>
                <SearchForm
                    filterBy={['total', 'startDate', 'endDate']}
                    setStartDate={setStartDate}
                    setEndDate={setEndDate}
                    filterByTotal={setCountPage}
                />
            </div>
            {expenses && (
                <div className='mainPadding'>
                    <Table
                        page={'expenses'}
                        headers={headers}
                        data={expenses}
                        reports={false}
                        Delete={removeExpense}
                        currentPage={currentPage}
                        countPage={countPage}
                        currency={currencyType}
                    />
                </div>
            )}
        </div>
    )
}

export default Expense
