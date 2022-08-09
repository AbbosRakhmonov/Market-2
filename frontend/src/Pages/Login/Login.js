import { useEffect, useState } from 'react'
import Logo from '../../Images/logo-lg.svg'
import Input from '../../Components/Inputs/Input'
import { clearError, signIn } from './loginSlice'
import { useDispatch, useSelector } from 'react-redux'
import Timebar from '../../Components/TimeBar/Timebar'
import { universalToast } from '../../Components/ToastMessages/ToastMessages'
import { motion } from 'framer-motion';

function Login() {
    const dispatch = useDispatch()
    const { loading, error } = useSelector((state) => state.login)
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const handleChangeLogin = (e) => {
        const str = e.target.value
        setLogin(str)
    }
    const handleChangePassword = (e) => {
        const str = e.target.value
        setPassword(str)
    }
    const handleClickSubmit = (e) => {
        e.preventDefault()
        const data = {
            login,
            password,
        }
        dispatch(signIn(data))
    }
    useEffect(() => {
        if (error) {
            universalToast(error, 'error')
            setTimeout(() => {
                dispatch(clearError())
            }, 1000)
        }
    }, [error, dispatch])
    return (
        <motion.section className={'loginPage flex items-center justify-center'}
            key='content'
            initial='collapsed'
            animate='open'
            exit='collapsed'
            variants={{
                open: { opacity: 1, height: 'auto' },
                collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}>
            <div className='loginCircle relative flex items-center justify-center'>
                <div className='bg-circle-1 w-full h-full rounded-full backdrop-blur-[10px] bg-white-400 absolute left-0 right-0 top-0 bottom-0'></div>
                <div className='bg-circle-2 rounded-full bg-white-900 z-20 flex flex-col gap-[1.875rem] justify-center items-center'>
                    <div className='logo-container w-[36.9%]'>
                        <img
                            src={Logo}
                            className={'w-full pointer-events-none'}
                            alt='Alo24 logo'
                        />
                    </div>
                    <form className={'w-full px-[20%]'}>
                        <div className={'mb-[1.25rem]'}>
                            <Input
                                label={'Login'}
                                type={'text'}
                                value={login}
                                placeholder={'Loginni kiriting...'}
                                onChange={handleChangeLogin}
                            />
                        </div>
                        <div className={'mb-[1.25rem]'}>
                            <Input
                                label={'Parol'}
                                type={'password'}
                                value={password}
                                placeholder={'Parolni kiriting...'}
                                password={true}
                                onChange={handleChangePassword}
                            />
                        </div>
                        <button
                            type={'submit'}
                            className={
                                'w-[83.999999%] transition-all ease-in-out duration-200 disabled:cursor-not-allowed disabled:opacity-50 flex items-center justify-center py-[10px] bg-loginButton text-white-900 font-semibold shadow-[0_4px_5px_rgba(0,0,0,0.15)] rounded-[4px] mx-auto block enabled:hover:bg-success-500 enabled:active:bg-success-600 enabled:active:shadow-none leading-[1.125rem]'
                            }
                            onClick={handleClickSubmit}
                            disabled={loading}
                        >
                            {loading ? (
                                <span
                                    className={'animate-spin spinner mr-1'}
                                ></span>
                            ) : (
                                'Kirish'
                            )}
                        </button>
                    </form>
                </div>
                <Timebar />
            </div>
        </motion.section>
    )
}

export default Login