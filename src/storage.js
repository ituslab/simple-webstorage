export const isNotNull = variable => (typeof variable !== 'undefined' && variable !== null)

export const check = storage => {
  if (storage in window && window[storage]) return window[storage]
  throw new Error(`Your Browser doesn't support ${storage}`)
}

export const validateKeys = (arrOfData,cb,onEach) =>{
  try {
    arrOfData.forEach((d,idx)=>{
      const invalidKeys = Object
      .keys(d)
      .filter(r=> r !== 'key' && r !== 'value' && r !== 'expiryInMinutes')
  
      if(invalidKeys.length > 0) {
        throw new Error(`invalid data format, you have specified invalid key name , valid key names are key,value,expiryInMinutes`);     
      } 
      const {key , value  , expiryInMinutes} = d
  
      if(typeof key === 'undefined') {
        throw new Error(`invalid data format, object doesn't have key property at ${idx}`);
      }
      onEach(d)
    })
    cb(arrOfData)
  } catch (error) {
    cb(error)
  }
}

export const get = (storage, key) => {
  const cache = storage.getItem(key)
  if (isNotNull(cache)) {
    const cacheParsed = JSON.parse(cache)
    if (isNotNull(cacheParsed)) {
      const timeNow = new Date().getTime()
      const dateCache = cacheParsed.created
      const expiryInMilis = parseInt(cacheParsed.expiry, 10) * 60 * 1000
      const expiryTime = parseInt(dateCache, 10) + expiryInMilis
      if (isNotNull(cacheParsed.expiry)) {
        if (expiryTime > timeNow) return cacheParsed.value
        else remove(storage, key)
      } else {
        return cacheParsed.value
      }
    }
  }
  return null
}

export const set = (storage, key, value, expiryInMinutes) => {
  const data = {
    created: new Date().getTime(),
    value,
    expiry: expiryInMinutes,
  }
  storage.setItem(key, JSON.stringify(data))
  return data
}

export const remove = (storage, key) => {
  if (isNotNull(get(storage, key))) {
    storage.removeItem(key)
    return true
  }
  return false
}

export const clear = storage => {
  storage.clear()
  return true
}

export const keys = storage => {
  const keys = []
  for (let i = 0; i < storage.length; i++) keys.push(storage.key(i))
  return keys
} 
