import React, {useEffect, useState} from 'react'
import Filial from '../../Components/Filial/Filial'
import {uniqueId, map} from 'lodash'
import {motion} from 'framer-motion'
import {useDispatch, useSelector} from 'react-redux'
import SmallLoader from '../../Components/Spinner/SmallLoader'
import {universalToast} from '../../Components/ToastMessages/ToastMessages.js'
import {clearGetFilials, getAllFilials} from './marketFilialsSlice.js'
function MarketFilials() {
    const dispatch = useDispatch()
    const {allFilials, loading, errorGetFilials} = useSelector(
        (state) => state.filials
    )

    const [data, setData] = useState([])

    useEffect(() => {
        const newData = allFilials.map((item) => {
            return {
                director: {
                    firstname: item?.director?.firstname,
                    lastname: item?.director?.lastname,
                    image: item?.director?.image,
                },
                typecount: 10,
                productcount: 100,
                totalPrice: 1000000,
                totalPriceUSD: 100,
                shopname: item?.name,
                _id: item?._id,
            }
        })
        setData(newData)
    }, [allFilials])

    useEffect(() => {
        dispatch(getAllFilials())
    }, [dispatch])
    useEffect(() => {
        errorGetFilials && universalToast(errorGetFilials, 'error')
        dispatch(clearGetFilials())
    }, [errorGetFilials, dispatch])

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
