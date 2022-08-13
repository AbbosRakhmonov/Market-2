import React from 'react'
import {RouteLink} from '../../Components/RouteLinks/RouteLink'
import {Outlet} from 'react-router-dom'
import {motion} from 'framer-motion'

const Incoming = () => {
    return (
        <motion.section
            key='content'
            initial='collapsed'
            animate='open'
            exit='collapsed'
            variants={{
                open: {opacity: 1, height: 'auto'},
                collapsed: {opacity: 0, height: 0}
            }}
            transition={{duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98]}}
        >
            <div className='h-[80px] w-full border-b-2 border-black-100 flex justify-around items-center'>
                <RouteLink
                    path={'/maxsulotlar/qabul/qabulqilish'}
                    iconType={'bag'}
                    title={'Qabul qilish'}
                />
                <RouteLink
                    path={'/maxsulotlar/qabul/qabullar'}
                    iconType={'cloud'}
                    title={'Qabullar'}
                />
                <RouteLink
                    path={'/maxsulotlar/qabul/saqlanganlar'}
                    iconType={'clip'}
                    title={'Saqlanganlar'}
                />
                <RouteLink
                    path={'/maxsulotlar/qabul/ruyxat'}
                    iconType={'text'}
                    title={'Ro`yxat'}
                />
            </div>
            <div>
                <Outlet />
            </div>
        </motion.section>
    )
}

export default Incoming
