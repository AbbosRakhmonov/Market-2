import React, {useEffect, useRef, useState} from 'react'
import PrintBtn from '../../Buttons/PrintBtn'
import {useReactToPrint} from 'react-to-print'
import {SaleCheckAll} from '../../SaleCheck/SaleCheckAll.js'
import SmallLoader from '../../Spinner/SmallLoader.js'

function AllCheck({product}) {
    const [loadContent, setLoadContent] = useState(false)
    const [selled, setSelled] = useState([])
    const [returned, setReturned] = useState([])
    const [selledDiscounts, setSelledDiscounts] = useState([])
    const [returnedDiscounts, setReturnedDiscounts] = useState([])
    const [selledPayments, setSelledPayments] = useState([])
    const [returnedPayments, setReturnedPayments] = useState([])
    const saleCheckRef = useRef(null)
    const onBeforeGetContentResolve = useRef(null)
    const handleOnBeforeGetContent = React.useCallback(() => {
        setLoadContent(true)
        return new Promise((resolve) => {
            onBeforeGetContentResolve.current = resolve

            setTimeout(() => {
                setLoadContent(false)
                resolve()
            }, 2000)
        })
    }, [setLoadContent])
    const reactToPrintContent = React.useCallback(() => {
        return saleCheckRef.current
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [saleCheckRef.current])
    const print = useReactToPrint({
        content: reactToPrintContent,
        documentTitle: 'All Checks',
        onBeforeGetContent: handleOnBeforeGetContent,
        removeAfterPrint: true
    })
    useEffect(() => {
        if (loadContent && typeof onBeforeGetContentResolve.current === 'function') {
            onBeforeGetContentResolve.current()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [onBeforeGetContentResolve.current, loadContent])
    useEffect(() => {
        setSelled(product?.products.filter(item => item.pieces > 0))
        setReturned(product?.products.filter(item => item.pieces < 0))
        setSelledDiscounts(product?.discounts.filter(item => item.discount > 0))
        setReturnedDiscounts(product?.discounts.filter(item => item.discount < 0))
        setSelledPayments(product?.payments.filter(item => item.payment > 0))
        setReturnedPayments(product?.payments.filter(item => item.payment < 0))
    }, [product])
    return (
        <section className='w-[27cm] mt-4 mx-auto'>
            {loadContent &&
                <div
                    className='fixed backdrop-blur-[2px] left-0 right-0 bg-white-700 flex flex-col items-center justify-center w-full h-full'>
                    <SmallLoader />
                </div>}
            <SaleCheckAll
                ref={saleCheckRef}
                returned={returned}
                selled={selled}
                selledDiscounts={selledDiscounts}
                returnedDiscounts={returnedDiscounts}
                selledPayments={selledPayments}
                returnedPayments={returnedPayments}
                product={product}
            />
            <div className='flex justify-center items-center mt-6'>
                <PrintBtn onClick={print} isDisabled={loadContent} />
            </div>
        </section>
    )
}

export default AllCheck