import React from 'react'
import { RouteLink } from '../../Components/RouteLinks/RouteLink'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'

const Sale = () => {
    const { user } = useSelector(state => state.login)
    return (
        <motion.section className={'h-full flex flex-col'}
            key='content'
            initial='collapsed'
            animate='open'
            exit='collapsed'
            variants={{
                open: { opacity: 1, height: '100%' },
                collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}>
            <div
                className='py-[1.1875rem] w-full border-b-2 border-black-100 flex justify-center gap-[2.5rem] items-center'>
                <RouteLink
                    path={user.type.toLowerCase() === 'seller' ? '/' : 'sotish'}
                    iconType={'bag'}
                    title={'Sotuv'}
                />
                <RouteLink
                    path={'saqlanganlar'}
                    iconType={'clip'}
                    title={'Saqlanganlar'}
                />
                <RouteLink
                    path={'ruyxat'}
                    iconType={'text'}
                    title={'Ro\'yxat'}
                />
            </div>
            <Outlet />
        </motion.section>
    )
}

export default Sale
