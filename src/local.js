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
    const result =  getStorage(checkStorage('localStorage'),key);
    if(result === null) {
      reject(null);
      return;
    }
    resolve(result);
  })
}

export const set = (key, value = 0, expiryInMinutes = null) => {
  return new Promise((resolve,reject)=>{
      try{
        resolve(setStorage(checkStorage('localStorage'), key, value, expiryInMinutes))
      }catch(err){
        reject(err)
      }
  })
}

export const remove = key => {
  return new Promise((resolve,reject)=>{
    const result = removeStorage(checkStorage('localStorage'), key)
    result ? resolve(true) : reject(false);
  })
}

export const clear = () => {
  return new Promise((resolve,reject)=>{
    try{
      resolve(clearStorage(checkStorage('localStorage')))
    }catch(ex){
      reject(ex)
    }
  })
}

export const keys = () => {
  return new Promise((resolve,reject)=>{
    try {
      resolve(keysStorage(checkStorage('localStorage')))
    }catch(ex){
      reject(ex)
    }
  })
}

export default () => ({ get, set, remove, clear, keys })