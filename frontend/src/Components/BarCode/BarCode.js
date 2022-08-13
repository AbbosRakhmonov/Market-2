import React from 'react'
import {Body} from './Body.js'
import {uniqueId} from 'lodash'
import {range} from 'lodash/util.js'

export const BarCode = ({
                            countOfCheques,
                            productForCheque,
                            productForCheques,
                            componentRef,
                            currency,
                            countOfCheque,
                            marketName
                        }) => {
    return (
        <div ref={componentRef}>
            <div>
                {productForCheque &&
                    countOfCheque &&
                    range(0, countOfCheque).map(() => {
                        return (
                            <Body
                                key={uniqueId('barCode')}
                                currency={currency}
                                product={productForCheque}
                                marketName={marketName}
                            />
                        )
                    })}
                {productForCheques &&
                    countOfCheques &&
                    productForCheques.map((productForCheque) =>
                        range(0, countOfCheques).map(() => {
                            return (
                                <Body
                                    key={uniqueId('barCode')}
                                    currency={currency}
                                    product={productForCheque}
                                    marketName={marketName}
                                />
                            )
                        })
                    )}
            </div>
        </div>
    )
}
