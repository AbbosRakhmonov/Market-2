import React, {useEffect, useState} from 'react'
import {uniqueId} from 'lodash'
import SelectInput from '../../SelectInput/SelectInput'
import {useSelector} from 'react-redux'
import SmallLoader from '../../Spinner/SmallLoader.js'

function UploadExcel(
    {
        excelData,
        headers,
        createdData,
        setCreatedData,
        approveFunction,
        toggleModal
    }) {
    const {loading} = useSelector(state => state.products)
    const [cols, setCols] = useState([])
    const [values, setValues] = useState([])
    const clone = (obj) => Object.assign({}, obj)
    const renameKey = (object, key, newKey) => {
        const clonedObj = clone(object)
        clonedObj[newKey] = clonedObj[key]
        return clonedObj
    }
    const handleSelect = (idx, key, option) => {
        values[idx] = {label: option.label, value: option.value}
        setValues([...values])
        setCols([...cols])
        const newData = createdData.map((item) =>
            renameKey(item, option.value, key)
        )
        setCreatedData([...newData])
    }
    useEffect(() => {
        values.fill({}, 0, headers.length)
        setValues(values)
        setCreatedData([...excelData])
        const newOptions = Object.keys(excelData[0]).map((obj) => ({
            label: obj,
            value: obj
        }))
        setCols(newOptions)
        //    eslint-disable-next-line react-hooks/exhaustive-deps
    }, [excelData])
    return (
        <div className={'modalContent mt-10'}>
            {loading &&
                <div
                    className='fixed backdrop-blur-[2px] z-[50] top-0 left-0 right-0 bottom-0 bg-white-700 flex flex-col items-center justify-center w-full'>
                    <SmallLoader />
                </div>}
            <table className='overflow-x-auto w-full'>
                <thead className='rounded-t-lg'>
                <tr className='bg-primary-900 rounded-t-lg'>
                    {headers.map((header, index) => (
                        <th
                            key={uniqueId('header')}
                            scope='col'
                            className={'th'}
                        >
                            <div className='ml-1'>
                                    <span className={'mb-4 block'}>
                                        {header.name}
                                    </span>
                                <SelectInput
                                    onSelect={(option) =>
                                        handleSelect(
                                            index,
                                            header.value,
                                            option
                                        )
                                    }
                                    options={cols}
                                    value={values[index]}
                                    placeholder={'Bo\'limni tanlang ...'}
                                />
                            </div>
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                <tr className='tr'>
                    {values.map((option, index) => (
                        <td
                            key={uniqueId('column')}
                            className='td text-center py-4'
                        >
                            {
                                excelData[0][
                                option.value || cols[index].value
                                    ]
                            }
                        </td>
                    ))}
                </tr>
                </tbody>
            </table>
            <div className={'flex mt-12 items-center justify-end gap-[1.5rem]'}>
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

export default UploadExcel
