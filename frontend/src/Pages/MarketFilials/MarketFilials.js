import React, {useEffect, useState} from 'react'
import Filial from '../../Components/Filial/Filial'
import {uniqueId, map} from 'lodash'
import {motion} from 'framer-motion'
import SmallLoader from '../../Components/Spinner/SmallLoader'
import socket from '../../Config/socket.js'
import {useSelector} from 'react-redux'
import {universalToast} from '../../Components/ToastMessages/ToastMessages.js'

function MarketFilials() {
    const {market} = useSelector((state) => state.login)

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        market &&
            socket.emit('getAllFilials', {
                market: market._id,
            })
        market &&
            socket.on('getAllFilials', (filials) => {
                setLoading(false)
                setData(
                    map(filials, (filial) => {
                        return {
                            director: {
                                firstname: filial?.director?.firstname,
                                lastname: filial?.director?.lastname,
                                image: filial?.director?.image,
                            },
                            typecount: 10,
                            productcount: 100,
                            totalPrice: 1000000,
                            totalPriceUSD: 100,
                            shopname: filial?.name,
                            _id: filial?._id,
                        }
                    })
                )
            })
        market &&
            socket.on('error', (err) => {
                universalToast(err.message, 'error')
            })
    }, [market])

    return (
        <motion.section
            className='mainPadding'
            key='content'
            initial='collapsed'
            animate='open'
            exit='collapsed'
            variants={{
                open: {opacity: 1, height: 'auto'},
                collapsed: {opacity: 0, height: 0},
            }}
            transition={{duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98]}}
        >
            {loading && (
                <div className='fixed backdrop-blur-[2px] left-0 right-0 bg-white-700 flex flex-col items-center justify-center w-full h-full'>
                    <SmallLoader />
                </div>
            )}
            {data.length > 0 &&
                map(data, (value) => (
                    <div className='pb-[1.25rem]' key={uniqueId('filial')}>
                        <Filial value={value} />
                    </div>
                ))}
        </motion.section>
    )
}

export default MarketFilials
