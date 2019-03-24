import { isNotNull , validateKeys } from './storage'

export const set = (key, value = 0, expiryInMinutes = 5) => {
  return new Promise((resolve,reject)=>{
    try {
      let expires = ''
      if (expiryInMinutes) {
        const date = new Date();
        date.setTime(date.getTime() + (expiryInMinutes * 60 * 1000))
        expires = '; expires=' + date.toGMTString()
      }
      document.cookie = key + '=' + JSON.stringify(value) + expires + '; path=/'
      resolve(value)
    } catch (error) {
      reject(error)
    }
  })
}

export const setBulk = arrOfData => {
  return new Promise((resolve,reject)=>{
    validateKeys(arrOfData , data=>{
      if(data.length) {
        resolve(data)
        return;
      }
      reject(data)
    },async (d)=>{
      await set(d.key , d.value , d.expiryInMinutes)
    })
  })
}



export const get = key => {
  return new Promise((resolve,reject)=>{
    key = key + '='
    const cookies = document.cookie.split(';')
    for(let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i]
      while (cookie.charAt(0) === ' ') cookie = cookie.substring(1, cookie.length)
      if (cookie.indexOf(key) === 0){ 
        const result  = JSON.parse(cookie.substring(key.length, cookie.length))
        resolve(result); 
      }
    }
    reject(null)
  })
}

export const remove = async (key) => {
  try {
    const getKey = await get(key)
    if (isNotNull(getKey)) {
      await set(key, '', -1)
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
}

export const clear = () => {
  return new Promise((resolve,reject)=>{
    try{
      const cookies = document.cookie.split(";")
      for(let i = 0; i < cookies.length; i++) {
        set(cookies[i].split("=")[0], '', -1)
      }
      resolve(true)
    }catch(ex){
      reject(ex)
    } 
  })
}

export const keys = () => {
  return new Promise((resolve,reject)=>{
    try {
      const keys = []
      const cookies = document.cookie.split(';')
      for(let i = 0; i < cookies.length; i++) {
        const key = cookies[i].split("=")[0]
        if(key !== '') keys.push(key)
      }
      resolve(keys)
    } catch (error) {
      reject(error)
    }
  })
}

export default () => ({ get, set, remove, clear, keys, setBulk })