import React from 'react'
import TableInput from '../../Inputs/TableInput'

export const SaleReturnTableRow = ({
    data,
    changeHandler,
    currency,
    onKeyUp,
    inputValue,
}) => {
    return (
        <>
            {data.map((salereturn, index) => (
                <tr className='tr' key={salereturn._id}>
                    <td className='text-left td'>{index + 1}</td>
                    <td className='text-right td'>
                        {salereturn.productdata.code}
                    </td>
                    <td className='text-left td'>
                        {salereturn.productdata.name}
                    </td>
                    <td className='text-right td'>{salereturn.pieces}</td>
                    <td className='text-right td'>
                        {salereturn.totalprice} {currency}
                    </td>
                    <td className='text-right td py-[5px]'>
                        <TableInput
                            onKeyUp={onKeyUp}
                            onChange={(e) => changeHandler(e, 'returnpieces')}
                            value={inputValue}
                            type={'number'}
                        />
                    </td>
                    <td className='text-right td'>
                        {salereturn.returntotalprice} {currency}
                    </td>
                </tr>
            ))}
        </>
    )
}
