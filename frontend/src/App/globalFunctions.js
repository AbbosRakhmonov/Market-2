import {regexForEmptyString} from '../Components/RegularExpressions/RegularExpressions.js'
import {orderBy} from 'lodash'
export const universalSort = (data, setData, key, sort, prevData) => {
    const keys = key.split('.')
    const result = sort
        ? orderBy(
              [...data],
              (item) => {
                  return keys.length === 3
                      ? item[keys[0]][keys[1]][keys[2]]
                      : keys.length === 2
                      ? item[keys[0]][keys[1]]
                      : item[key]
              },
              [sort === -1 ? 'desc' : 'asc']
          )
        : prevData
    setData(result)
}
export const UsdToUzs = (val, currency) => {
    return Math.round(val * currency)
}
export const UzsToUsd = (val, currency) => {
    return Math.round((val / currency) * 1000) / 1000
}
// check empty string
export const checkEmptyString = (values) => {
    return values.some((value) => regexForEmptyString.test(value))
}
