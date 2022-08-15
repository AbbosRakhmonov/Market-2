import React, {useState} from "react";
import FieldContainer from '../../Components/FieldContainer/FieldContainer'
import {motion} from 'framer-motion'
import BtnAddRemove from "../../Components/Buttons/BtnAddRemove";
import {warningEmptyInput} from "./../../Components/ToastMessages/ToastMessages"
function CreateDirector({handleClickBack}) {

    const errorFunction = (e) => {
        e && e.preventDefault()
        warningEmptyInput()
    }

    const [directorName, setDirectorName] = useState('')
    const [directorSurname, setDirectorSurname] = useState('')
    const [directorFatherName, setDirectorFatherName] = useState('')
    const [directorPhone, setDirectorPhone] = useState('')
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    

    return(
      <motion.form
        transition={{duration:0.5}}
        initial={{opacity:0, x:100}}
        animate={{opacity:1, x:0}}
        exit={{opacity:0, x:20}}
      >
      <div className='flex gap-[2.5rem] mb-[2.5rem]'>
          <FieldContainer
              label={`Ismi`}
              maxWidth={'grow'}
              placeholder={'misol : Jasubrek'}
              type='text'
              value={directorName}
              onChange={e => setDirectorName(e.target.value)}
              star={true}
          />
          <FieldContainer
              label={'Familiyasi'}
              maxWidth={'grow'}
              placeholder={'misol : Toshev'}
              type='text'
              value={directorSurname}
              star={true}
              onChange={e => setDirectorSurname(e.target.value)}
          />
          <FieldContainer
              label={'Otasining ismi'}
              maxWidth={'grow'}
              placeholder={'misol: Normurod'}
              type='text'
              value={directorFatherName}
              star={true}
              onChange={e => setDirectorFatherName(e.target.value)}
          />
           <FieldContainer
              label={`Telefon raqami`}
              maxWidth={'grow'}
              placeholder={'misol: 99 123 45 67'}
              type='text'
              value={directorPhone}
              star={true}
              onChange={e => setDirectorPhone(e.target.value)}
          />
      </div>
      <div className='flex gap-[2.5rem]'>
          <FieldContainer
              label={`Login`}
              maxWidth={'grow'}
              placeholder={'misol: admin5'}
              type='text'
              value={login}
              star={true}
              onChange={e => setLogin(e.target.value)}
          />
          <FieldContainer
              label={'Parol'}
              maxWidth={'grow'}
              placeholder={'misol: Jas12345'}
              type='number'
              value={password}
              star={true}
              onChange={e => setPassword(e.target.value)}
          />
          <FieldContainer
              label={'Parol takroriy'}
              maxWidth={'grow'}
              placeholder={'misol: Jas12345'}
              type='number'
              value={repeatPassword}
              star={true}
              onChange={e => setRepeatPassword(e.target.value)}
          />
      </div>
      <div className='flex justify-center mt-[2.5rem]'>
                <div>
                  <BtnAddRemove 
                    text="Yakunlash" 
                    add={true} 
                    edit={true}
                    onClick={handleClickBack}
                  />
                </div> 
      </div>
     </motion.form>
    )
}

export default CreateDirector