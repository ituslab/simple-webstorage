import {
  set as setStorage,
  get as getStorage,
  check as checkStorage,
  remove as removeStorage,
  clear as clearStorage,
  keys as keysStorage,
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
        reject(false)
      }
  })
}

export const setBulk = arrOfData => {
  return new Promise((resolve,reject)=>{
    arrOfData.forEach((d,idx)=>{
      const invalidKeys = Object
        .keys(d)
        .filter(r=> r !== 'key' && r !== 'value' && r !== 'expiryInMinutes')

      if(invalidKeys.length > 0) {
        reject(new Error(`invalid data format, you have specified invalid key name , valid key names are key,value,expiryInMinutes`));      
        return;
      } 
      const {key , value  , expiryInMinutes} = d

      if(typeof key === 'undefined') {
        reject(new Error(`invalid data format, object doesn't have key property at ${idx}`));
        return;
      }

      setStorage(checkStorage('localStorage'),key,value,expiryInMinutes)
    })
    resolve(arrOfData)
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
      const result = clearStorage(checkStorage('localStorage'))
      resolve(result)
    }catch(ex){
      reject(false)
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

export default () => ({ get, set, remove, clear, keys, setBulk })