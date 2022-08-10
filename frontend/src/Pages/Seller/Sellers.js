import React, { useEffect, useState } from 'react'
import FieldContainer from './../../Components/FieldContainer/FieldContainer';
import Button from './../../Components/Buttons/BtnAddRemove'
import Table from './../../Components/Table/Table';
import { useSelector, useDispatch } from "react-redux"
import Spinner from './../../Components/Spinner/SmallLoader'
import NotFind from './../../Components/NotFind/NotFind'
import { checkEmptyString } from '../../App/globalFunctions.js'
import { motion } from 'framer-motion'
import {
    successAddSellerMessage,
    successUpdateSellerMessage,
    universalToast,
    warningEmptyInput
} from './../../Components/ToastMessages/ToastMessages'
import {
    addSeller,
    updateSeller,
    getSellers,
    clearErrorSellers,
    clearSuccessAddSeller,
    clearSuccessUpdateSeller
} from './sellerSlice'

function Sellers() {

    const dispatch = useDispatch()

    const {
        errorSellings,
        sellers,
        loading,
        successAddSelling,
        successUpdateSelling,
    } = useSelector((state) => state.sellers)

    const {
        user
    } = useSelector((state) => state.login)

    const headers = [
        { title: '№', styles: 'w-[8%] text-left' },
        { title: 'Ismi', styles: 'w-[21%]' },
        { title: 'Familiyasi', styles: 'w-[21%]' },
        { title: 'Telefon raqami', styles: 'w-[21%]' },
        { title: 'Login', styles: 'w-[21%]' },
        { title: '', styles: 'w-[8%]' },
    ]

    const [stickyForm, setStickForm] = useState(false);
    const [data, setData] = useState([])
    const [sellerName, setSellerName] = useState('')
    const [sellerSurname, setSellerSurname] = useState('')
    const [sellerNumber, setSellerNumber] = useState('');
    const [sellerLogin, setSellerLogin] = useState('');
    const [sellerPassword, setSellerPassword] = useState('')
    const [sellerAgainPassword, setSellerAgainPassword] = useState('')
    const [currentSeller, setCurrentSeller] = useState('')

    // handle Changed inputs 
    const addNewSeller = (e) => {
        e && e.preventDefault()
        const filter = checkEmptyString([sellerName, sellerSurname, sellerNumber, sellerLogin, sellerPassword, sellerAgainPassword])
        if (filter) {
            warningEmptyInput()
        }
        if (sellerPassword !== sellerAgainPassword) {
            universalToast("Sotuvchining paroli bilan tasdiqlash paroli mos kelmadi", "warning")
        }
        if (!filter && sellerPassword === sellerAgainPassword) {
            const body = {
                login: sellerLogin,
                firstname: sellerName,
                lastname: sellerSurname,
                fathername: user.lastname,
                phone: sellerNumber,
                password: sellerPassword,
                type: "Seller",
                user: user._id,
            }
            dispatch(addSeller(body))
        }


    }

    const handleEdit = (e) => {
        e && e.preventDefault()
        const filter = checkEmptyString([sellerName, sellerSurname, sellerNumber, sellerLogin])
        if (filter) {
            warningEmptyInput()
        }
        if (sellerPassword !== sellerAgainPassword) {
            universalToast("Sotuvchining paroli bilan tasdiqlash paroli mos kelmadi", "warning")
        }
        if (!filter && sellerPassword === sellerAgainPassword) {
            const body = {
                _id: currentSeller._id,
                login: sellerLogin,
                firstname: sellerName,
                lastname: sellerSurname,
                fathername: user.lastname,
                phone: sellerNumber,
                type: "Seller",
                user: user._id,
            }
            dispatch(updateSeller(body))
        }
    }

    const clearForm = (e) => {
        e && e.preventDefault()
        setSellerName('')
        setSellerSurname('')
        setSellerNumber('')
        setSellerLogin('')
        setSellerPassword('');
        setSellerAgainPassword('');
    }

    const handleEditSeller = (seller) => {
        clearForm()
        setCurrentSeller(seller)
        setStickForm(true)
        setSellerName(seller.firstname)
        setSellerSurname(seller.lastname)
        setSellerNumber(seller.phone)
        setSellerLogin(seller.login)
    }

    useEffect(() => {
        if (errorSellings) {
            universalToast(errorSellings, 'error')
            dispatch(clearErrorSellers())
        }
        if (successAddSelling) {
            successAddSellerMessage()
            dispatch(clearSuccessAddSeller())
            clearForm()
        }
        if (successUpdateSelling) {
            successUpdateSellerMessage()
            dispatch(clearSuccessUpdateSeller())
            setStickForm(false);
            clearForm()
            setCurrentSeller("")
        }
    }, [
        dispatch,
        errorSellings,
        successAddSelling,
        successUpdateSelling
    ])

    useEffect(() => {
        dispatch(getSellers())
    }, [dispatch])

    useEffect(() => {
        setData(sellers)
    }, [sellers])



    return (
        <motion.section
            key='content'
            initial='collapsed'
            animate='open'
            exit='collapsed'
            variants={{
                open: { opacity: 1, height: 'auto' },
                collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}>
            <form
                className={`unitFormStyle  ${stickyForm && 'stickyForm'
                    } flex gap-[1.25rem] bg-background flex-col mainPadding transition ease-linear duration-200`}
            >
                <div className='exchangerate-style w-full'>
                    <FieldContainer
                        value={sellerName}
                        onChange={(e) => { setSellerName(e.target.value) }}
                        label={'Ismi'}
                        placeholder={'misol: Jasurbek'}
                        maxWidth={'w-[21.75rem]'}
                        type={'text'}
                        border={true}
                        onKeyPress={``}
                    />
                    <FieldContainer
                        value={sellerSurname}
                        onChange={(e) => { setSellerSurname(e.target.value) }}
                        label={'Familiyasi'}
                        placeholder={'Toshev'}
                        maxWidth={'w-[21.75rem]'}
                        type={'text'}
                        border={true}
                        onKeyPress={() => { }}
                    />
                    <FieldContainer
                        value={sellerNumber}
                        onChange={(e) => { setSellerNumber(e.target.value) }}
                        label={'Telefon raqami'}
                        placeholder={'+998 99 123 45 67'}
                        type={'number'}
                        border={false}
                        onKeyPress={() => { }}
                    />

                </div>


                <div className='exchangerate-style mt-[1.25rem]'>
                    <FieldContainer
                        value={sellerLogin}
                        onChange={(e) => { setSellerLogin(e.target.value) }}
                        label={'Login'}
                        placeholder={'123456'}
                        maxWidth={'12.75rem'}
                        type={'text'}
                        border={true}
                        onKeyPress={() => { }}
                    />
                    <FieldContainer
                        value={sellerPassword}
                        onChange={(e) => { setSellerPassword(e.target.value) }}
                        label={'Parol'}
                        placeholder={'123456'}
                        maxWidth={'12.75rem'}
                        type={'text'}
                        border={true}
                        onKeyPress={() => { }}
                    />
                    <FieldContainer
                        value={sellerAgainPassword}
                        onChange={(e) => { setSellerAgainPassword(e.target.value) }}
                        label={'Parolni tasdiqlash'}
                        placeholder={'123456'}
                        maxWidth={'12.75rem'}
                        type={'text'}
                        border={false}
                        onKeyPress={() => { }}
                    />
                    <div
                        className={'flex gap-[1.25rem] grow w-[19.5rem]'}
                    >
                        <Button
                            onClick={stickyForm ? handleEdit : addNewSeller}
                            add={!stickyForm}
                            edit={stickyForm}
                            text={
                                stickyForm
                                    ? `Saqlash`
                                    : `Yangi sotuvchi qo'shish`
                            }
                        />
                        <Button onClick={clearForm} text={'Tozalash'} />
                    </div>
                </div>
            </form>
            <div className='font-normal text-[1.25rem] leading-[1.875rem] text-blue-900 mainPadding'>
                <p>Sotuvchilar</p>
            </div>

            <div className='tableContainerPadding'>
                {loading ? (
                    <Spinner />
                ) : sellers.length === 0 ? (
                    <NotFind text={'Sotuvchilar mavjud emas'} />
                ) : (
                    <Table
                        page={'seller'}
                        data={data}
                        currentPage={0}
                        countPage={10}
                        headers={headers}
                        Edit={handleEditSeller}
                    />
                )}
            </div>

        </motion.section>
    )
}

export default Sellers