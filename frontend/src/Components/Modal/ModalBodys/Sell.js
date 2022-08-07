import React, {useCallback, useEffect} from 'react'
import TableInput from '../../Inputs/TableInput.js'
import {useSelector} from 'react-redux'

function Sell({product, changeProduct, approveFunction, toggleModal}) {
    const {currencyType} = useSelector(state => state.currency)
    // submit form when user press enter
    const handleKeyPress = useCallback((e) => {
        if (e.key === 'Enter') {
            approveFunction()
        }
    }, [approveFunction])
    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress)
        return () => {
            document.removeEventListener('keydown', handleKeyPress)
        }
    }, [handleKeyPress])
    return (
        <div className={'modal-content pt-[1.25rem] text-center'}>
            <div className='text-center'>
                <h1 className='text-2xl text-black-900 mb-[1rem]'>
                    {product.product.code}
                </h1>
                <h2 className='text-xl text-black-900 mb-[2rem]'>
                    {product.product.name}
                </h2>
            </div>
            <div className='flex justify-center'>
                <table className='overflow-x-auto w-[50rem]'>
                    <thead className='rounded-t-lg'>
                    <tr className='bg-primary-900 rounded-t-lg'>
                        <th scope='col' className='th w-[20%]'>
                            <span>Soni</span>
                        </th>
                        <th scope='col' className='th w-[30%]'>
                            <span>Narxi</span>
                        </th>

                        <th scope='col' className='th'>
                            <span>Jami</span>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr className='tr'>
                        <td className='py-1 td'>
                            <TableInput
                                onChange={(e) =>
                                    changeProduct(e.target.value, 'pieces')
                                }
                                type={'number'}
                                value={product.pieces}
                            />
                        </td>
                        <td className='py-1 td'>
                            <TableInput
                                onChange={(e) =>
                                    changeProduct(e.target.value, 'unitprice')
                                }
                                type={'number'}
                                value={currencyType !== 'UZS' ? product.unitprice : product.unitpriceuzs}
                            />
                        </td>
                        <td className='py-0 td text-right text-success-600 font-medium'>
                            {currencyType !== 'UZS' ? (product.totalprice).toLocaleString("ru-Ru") : (product.totalpriceuzs).toLocaleString("ru-Ru")} {currencyType}
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div className={'flex mt-12 items-center justify-center gap-[1.5rem]'}>
                <button
                    className={'approveBtn bg-black-500 hover:bg-black-700'}
                    onClick={toggleModal}
                >
                    Bekor qilish
                </button>
                <button
                    className={'approveBtn bg-success-500 hover:bg-success-700'}
                    onClick={approveFunction}
                >
                    Tasdiqlash
                </button>
            </div>
        </div>
    )
}

export default Sell