import React, {useCallback, useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useParams, useLocation} from 'react-router-dom'
import {getIncomings} from '../incomingSlice'

const IncomingSuppliers = () => {
    const dispatch = useDispatch()
    const {
        market: {_id},
    } = useSelector((state) => state.login)
    const {incomings} = useSelector((state) => state.incoming)

    const {
        state: {date, supplier},
    } = useLocation()

    const [currentPage, setCurrentPage] = useState(0)
    const [countPage, setCountPage] = useState(10)
    const [sendingSearch, setSendingSearch] = useState({
        name: '',
        code: '',
        supplier: supplier,
    })

    const [incomingCard, setIncomingCard] = useState()

    const changeCardData = useCallback((data) => {
        let groups = []
        const currentGroup = (ind, incoming) => {
            groups[ind].producttypes += 1
            groups[ind].pieces += incoming.pieces
            groups[ind].totalprice += incoming.totalprice
            groups[ind].totalpriceuzs += incoming.totalpriceuzs
        }
        const newGroup = (incoming) => {
            let obj = {
                createdAt: new Date(incoming.createdAt).toLocaleDateString(),
                supplier: {...incoming.supplier},
                producttypes: 1,
                pieces: incoming.pieces,
                totalprice: incoming.totalprice,
                totalpriceuzs: incoming.totalpriceuzs,
            }
            groups.push(obj)
        }
        const findindex = (incoming) =>
            groups.findIndex(
                (group) =>
                    group.supplier &&
                    group.supplier._id === incoming.supplier._id
            )

        data.forEach((incoming) => {
            let ind = findindex(incoming)
            if (ind >= 0) {
                currentGroup(ind, incoming)
            } else {
                newGroup(incoming)
            }
        })

        setIncomingCard(groups)
    }, [])

    console.log(incomings)

    useEffect(() => {
        let beginDay = new Date(
            new Date(date).setHours(3, 0, 0, 0)
        ).toISOString()
        let endDay = new Date(
            new Date(date).setHours(26, 59, 59, 59)
        ).toISOString()

        dispatch(
            getIncomings({
                market: _id,
                beginDay,
                endDay,
                currentPage,
                countPage,
                search: sendingSearch,
            })
        )
    }, [dispatch, _id, date, currentPage, countPage, sendingSearch])

    useEffect(() => {
        changeCardData(incomings)
    }, [incomings, changeCardData])

    return (
        <div className='mainPadding'>
            <div className=''></div>
        </div>
    )
}

export default IncomingSuppliers
