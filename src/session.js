import {
  set as setStorage,
  get as getStorage,
  check as checkStorage,
  remove as removeStorage,
  clear as clearStorage,
  keys as keysStorage
} from './storage'

export const get = key => {
  return new Promise((resolve,reject)=>{
    const result = getStorage(checkStorage('sessionStorage'),key)    
    if(result === null) {
      reject(null);
      return;
    }
    resolve(result);
  })
}

export const set = (key, value = 0, expiryInMinutes = 5) => {
  return new Promise((resolve,reject)=>{
    try{
      resolve(setStorage(checkStorage('sessionStorage'), key , value , expiryInMinutes))
    }catch(ex){
      reject(false)
    }
  })
}

export const remove = key => {
  return new Promise((resolve,reject)=>{
    const result = removeStorage(checkStorage('sessionStorage'),key)
    result ? resolve(true) : reject(false);
  })
}

export const clear = () => {
  return new Promise((resolve,reject)=>{
    try {
      resolve(clearStorage(checkStorage('sessionStorage')))
    } catch(err) {
      reject(false)
    }
  })
}

export const keys = () => {
  return new Promise((resolve,reject)=>{
    try {
      resolve(keysStorage(checkStorage('sessionStorage')))
    } catch(err) {
      reject(err)
    }
  })
}

export default () => ({ get, set, remove, clear, keys })