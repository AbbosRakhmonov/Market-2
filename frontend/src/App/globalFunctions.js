export const universalSort = (data, setData, key, sort, prevData) => {
    const keys = key.split('.')
    setData(
        sort
            ? [...data].sort((a, b) => {
                  if (keys.length === 1) {
                      if (sort === -1) return a[keys[0]] > b[keys[0]] ? 1 : -1
                      else return a[keys[0]] < b[keys[0]] ? 1 : -1
                  } else {
                      if (sort === -1)
                          return a[keys[0]][keys[1]] > b[keys[0]][keys[1]]
                              ? 1
                              : -1
                      else
                          return a[keys[0]][keys[1]] < b[keys[0]][keys[1]]
                              ? 1
                              : -1
                  }
              })
            : prevData
    )
}
export const UsdToUzs = (val, currency) => {
    return Math.round(val * currency)
}
export const UzsToUsd = (val, currency) => {
    return Math.round((val / currency) * 1000) / 1000
}
