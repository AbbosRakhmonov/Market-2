import React from 'react'
import TableBtn from '../../Buttons/TableBtn'
import TableInput from '../../Inputs/TableInput'

export const ProductReportTableRow = ({
                                          data,
                                          Print,
                                          currentPage,
                                          countPage,
                                          currency,
                                          changeHandler,
                                          addProductCheque,
                                          productCheque,
                                          inputValue
                                      }) => {
    const activeProduct =
        'bg-primary-500 text-white-900 group-hover:bg-black-300'
    return (
        <>
            {data.map((product, index) => (
                <tr className='tr' key={product._id}>
                    <td className='td'>
                        {currentPage * countPage + 1 + index}
                    </td>
                    <td
                        className={`td ${
                            productCheque.code ? `${activeProduct}` : ''
                        }`}
                        onClick={() =>
                            addProductCheque(
                                'code',
                                product._id,
                                product.productdata.code
                            )
                        }
                    >
                        {product.productdata.code}
                    </td>
                    <td
                        className={`${
                            productCheque.name ? `${activeProduct}` : ''
                        } td`}
                        onClick={() =>
                            addProductCheque(
                                'name',
                                product._id,
                                product.productdata.name
                            )
                        }
                    >
                        {product.productdata.name}
                    </td>
                    <td
                        className={`td text-right ${
                            productCheque.total ? `${activeProduct}` : ''
                        } `}
                        onClick={() =>
                            addProductCheque(
                                'total',
                                product._id,
                                `${product.total} ${product.unit.name}`
                            )
                        }
                    >
                        <span className='pointer-events-none'>
                            {product.total} {product.unit.name}
                        </span>
                    </td>
                    <td className='td text-right'>
                        {currency === 'UZS'
                            ? product.price.incomingpriceuzs.toLocaleString(
                                'ru-RU'
                            )
                            : product.price.incomingprice.toLocaleString(
                                'ru-RU'
                            )}{' '}
                        {currency}
                    </td>
                    <td className='td text-right'>
                        {currency === 'UZS'
                            ? (
                                product.price.incomingpriceuzs * product.total
                            ).toLocaleString('ru-RU')
                            : (
                                product.price.incomingprice * product.total
                            ).toLocaleString('ru-RU')}{' '}
                        {currency}
                    </td>
                    <td
                        className={`${
                            productCheque.price ? `${activeProduct}` : ''
                        } td text-right`}
                        onClick={() =>
                            addProductCheque(
                                'price',
                                product._id,
                                product.price.sellingprice
                            )
                        }
                    >
                        {currency === 'UZS'
                            ? product.price.sellingpriceuzs.toLocaleString(
                                'ru-RU'
                            )
                            : product.price.sellingprice.toLocaleString(
                                'ru-RU'
                            )}{' '}
                        {currency}
                    </td>
                    <td className='td text-right'>
                        {currency === 'UZS'
                            ? (
                                product.price.sellingpriceuzs * product.total
                            ).toLocaleString('ru-RU')
                            : (
                                product.price.sellingprice * product.total
                            ).toLocaleString('ru-RU')}{' '}
                        {currency}
                    </td>
                    <td className='py-[0.25rem] td'>
                        <TableInput
                            onChange={(e) => changeHandler(e, product)}
                            type={'number'}
                            value={inputValue}
                        />
                    </td>
                    <td className='td text-center'>
                        <div className='flex items-center justify-center'>
                            <TableBtn
                                type={'print'}
                                bgcolor={'bg-primary-800'}
                                onClick={() => Print(product)}
                            />
                        </div>
                    </td>
                </tr>
            ))}
        </>
    )
}
