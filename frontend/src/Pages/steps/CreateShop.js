import React, { useState, useEffect } from 'react'
import FieldContainer from '../../Components/FieldContainer/FieldContainer'
import BtnCreateShop from '../../Components/Buttons/BtnCreateShop'
import {motion} from 'framer-motion'
import {warningEmptyInput} from "./../../Components/ToastMessages/ToastMessages"
import { checkEmptyString } from '../../App/globalFunctions.js'

function CreateShop({handleClickNext}) {
    
    const [shopName, setShopName] = useState('')
    const [organizationName, setOrganizationName] = useState('')
    const [addressName, setAddressName] = useState('')
    const [targetName, setTargetName] = useState('')
    const [bankName, setBankName] = useState('')
    const [innName, setInnName] = useState('')
    const [accauntNumber, setAccauntNumber] = useState('')
    const [phoneNumber1, setPhoneNumber1] = useState('')
    const [phoneNumber2, setPhoneNumber2] = useState('')
    const [phoneNumber3, setPhoneNumber3] = useState('')

    const allData = {
        shopName : shopName, 
        organizationName: organizationName,
        addressName : addressName,
        targetName : targetName,
        bankName : bankName,
        innName : innName,
        accauntNumber : accauntNumber,
        phoneNumber1 : phoneNumber1,
        phoneNumber2 : phoneNumber2,
        phoneNumber3 : phoneNumber3
    }

   const filter = checkEmptyString([shopName,phoneNumber1])
   
    const errorFunction = (e) => {
      e && e.preventDefault()
      warningEmptyInput()
    }

    return (
        <motion.section
            transition={{duration:0.5}}
            initial={{opacity:0, x:0}}
            animate={{opacity:1, x:0}}
            exit={{opacity:0, x:20}}
        >
            <div className='flex gap-[2.5rem] mb-[2.5rem]'>
                <FieldContainer
                    label={`Do'kon nomi`}
                    maxWidth={'grow'}
                    placeholder={'misol : ALO24'}
                    type='text'
                    value={shopName}
                    star={true}
                    onChange={e => setShopName(e.target.value)}
                />
                <FieldContainer
                    label={'Tashkilot nomi'}
                    maxWidth={'grow'}
                    placeholder={'misol : ALO24'}
                    type='text'
                    value={organizationName}
                    onChange={(e) => setOrganizationName(e.target.value)}
                />
                <FieldContainer
                    label={'Manzil'}
                    maxWidth={'grow'}
                    placeholder={'misol: Navoiy viloyati'}
                    type='text'
                    value={addressName}
                    onChange={(e) => setAddressName(e.target.value)}
                />
                 <FieldContainer
                    label={`Mo'ljal`}
                    maxWidth={'grow'}
                    placeholder={'misol: Guliston paliklinika yonida'}
                    type='text'
                    value={targetName}
                    onChange={(e) => setTargetName(e.target.value)}
                />
            </div>
            <div className='flex gap-[2.5rem] mb-[2.5rem]'>
                <FieldContainer
                    label={`Bank nomi`}
                    maxWidth={'grow'}
                    placeholder={'misol: ALO24'}
                    type='text'
                    value={bankName}
                    star={true}
                    onChange={(e) => setBankName(e.target.value)}
                />
                <FieldContainer
                    label={'INN'}
                    maxWidth={'grow'}
                    placeholder={'misol: 123456789'}
                    type='number'
                    value={innName}
                    onChange={(e) => setInnName(e.target.value)}
                />
                <FieldContainer
                    label={'Hisob raqam'}
                    maxWidth={'grow'}
                    placeholder={'misol: 1234567890'}
                    type='number'
                    value={accauntNumber}
                    onChange={(e) => setAccauntNumber(e.target.value)}
                />
            </div>
            <div className='flex gap-[2.5rem]'>
                <FieldContainer
                    label={'Telefon raqam 1'}
                    maxWidth={'grow'}
                    placeholder={'misol : 99 123 45 67'}
                    type='text'
                    value={phoneNumber1}
                    star={true}
                    onChange={(e) => setPhoneNumber1(e.target.value)}
                />
                <FieldContainer
                    label={'Telefon raqam 2'}
                    maxWidth={'grow'}
                    placeholder={'misol : 99 123 45 67'}
                    type='text'
                    value={phoneNumber2}
                    onChange={(e) => setPhoneNumber2(e.target.value)}
                />
                <FieldContainer
                    label={'Telefon raqam 3'}
                    maxWidth={'grow'}
                    placeholder={'misol : 99 123 45 67'}
                    type='text'
                    value={phoneNumber3}
                    onChange={(e) => setPhoneNumber3(e.target.value)}
                />
            </div>
            <div className='flex justify-center mt-[2.5rem]'>
                <div>
                    <BtnCreateShop 
                        text="Keyingi qadam" 
                        type={"shop"}    
                        onClick={(e) => !filter ?  handleClickNext(e,allData) : errorFunction(e)}
                    />  
                </div> 
            </div>
        </motion.section>
    )
}

export default CreateShop
