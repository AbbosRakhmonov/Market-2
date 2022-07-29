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
