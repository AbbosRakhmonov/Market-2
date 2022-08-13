import React, {useEffect, useRef, useState} from 'react'
import PrintBtn from '../../Buttons/PrintBtn'
import {SaleCheck} from '../../SaleCheck/SaleCheck.js'
import {useReactToPrint} from 'react-to-print'
import SmallLoader from '../../Spinner/SmallLoader.js'
import {SaleCheckReturn} from '../../SaleCheck/SaleCheckReturn.js'
import {PaymentCheck} from '../../SaleCheck/PaymentCheck.js'

function Check({product, returned, isPayment, payment}) {
    const [loadContent, setLoadContent] = useState(false)
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
        documentTitle: 'Sale Check',
        onBeforeGetContent: handleOnBeforeGetContent,
        removeAfterPrint: true
    })
    useEffect(() => {
        if (
            loadContent &&
            typeof onBeforeGetContentResolve.current === 'function'
        ) {
            onBeforeGetContentResolve.current()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [onBeforeGetContentResolve.current, loadContent])
    return (
        <section className='w-[27cm] mt-4 mx-auto'>
            {loadContent && (
                <div
                    className='fixed backdrop-blur-[2px] left-0 top-0 bg-white-700 flex flex-col items-center justify-center w-full h-full'>
                    <SmallLoader />
                </div>
            )}
            {returned ? (
                <SaleCheckReturn product={product} ref={saleCheckRef} />
            ) : isPayment ? (
                <PaymentCheck payment={payment} ref={saleCheckRef} />
            ) : (
                <SaleCheck product={product} ref={saleCheckRef} />
            )}
            <div className='flex justify-center items-center mt-6'>
                <PrintBtn onClick={print} isDisabled={loadContent} />
            </div>
        </section>
    )
}

export default Check
