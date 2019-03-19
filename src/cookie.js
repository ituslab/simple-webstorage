import { isNotNull } from './storage'

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

export const get = key => {
  return new Promise((resolve,reject)=>{
    key = key + '='
    const cookies = document.cookie.split(';')
    for(let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i]
      while (cookie.charAt(0) === ' ') cookie = cookie.substring(1, cookie.length)
      if (cookie.indexOf(key) === 0){ 
        resolve(JSON.parse(cookie.substring(key.length, cookie.length))); 
        return;
      }
    }
    reject(null)
  })
}

export const remove = key => {
  return new Promise((resolve,reject)=>{
    if (isNotNull(get(key))) {
      set(key, '', -1)
      resolve(true)
    }
    reject(false)
  })
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
        keys.push(cookies[i].split("=")[0])
      }
      resolve(keys)
    } catch (error) {
      reject(error)
    }
  })
}

export default () => ({ get, set, remove, clear, keys })