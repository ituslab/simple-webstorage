/**
 * @jest-environment jsdom
 */
import "@babel/polyfill"
import SimpleWebStorage from '../lib/index'
import LocalStorage, { get as getLocalStorage } from '../lib/local'
import CookieStorage, { get as getCookieStorage } from '../lib/cookie'
import SessionStorage, { get as getSessionStorage } from '../lib/session'
import { isNotNull, check as checkStorage } from '../lib/storage'




const {asyncLocal, asyncSession, asyncCookie } = SimpleWebStorage()


describe('base API testing...', () => {
  test('Testing storage function', () => {
    expect(isNotNull(undefined)).toBeFalsy()
    expect(isNotNull(null)).toBeFalsy()
  })
  
  test('Testing all API import', () => {
    expect(SimpleWebStorage()).toBeTruthy()
    expect(asyncLocal).toBeTruthy()
  })
  
  test('Testing base storage object', () => {
    expect(LocalStorage).toBeTruthy()
    expect(CookieStorage).toBeTruthy()
    expect(SessionStorage).toBeTruthy()
  });
  
  test('Testing partial import', () => {
    expect(getLocalStorage).toBeTruthy()
    expect(getCookieStorage).toBeTruthy()
    expect(getSessionStorage).toBeTruthy()
  })
});


describe('CookieStorage API testing...', () => {
  test('[set]should not return false', () => {
    return asyncCookie
      .set('x',1)
      .then(r=> expect(r).toBeTruthy())
  });
  test('[keys] total keys must be 1', () => {
    return asyncCookie
      .keys()
      .then(r=> expect(r).toHaveLength(1))
  });

  test('[get]get a value that was inserted before, must exists', () => {
      return asyncCookie
        .get('x')
        .then(r=> expect(r).toBe(1))
  });
  test("[get]get a key that doesn't exists, must null", () => {
      expect.assertions(1)
      return asyncCookie
        .get('fakeKey')
        .catch(r=> expect(r).toBeNull())
  });
  test('[remove]remove an existing key, must return true', () => {
      return asyncCookie
        .remove('x')
        .then(r=> expect(r).toBe(true))
  });

  test('[keys] total keys must be empty', () => {
      return asyncCookie
        .keys()
        .then(r=> expect(r).toHaveLength(0))
  });

  test('[remove]remove an non-existing key, must return false', () => {
      return asyncCookie
        .remove('fakeKey')
        .then(r=> expect(r).toBe(false))
  });

  test('[clear]clear all keys, must return true', () => {
      return asyncCookie
        .clear()
        .then(r=> expect(r).toBe(true))
  });
});


describe('SessionStorage API testing...', () => {
  test('[set]should not return false', () => {
    return asyncSession
      .set('x','y')
      .then(r=> expect(r).toBeTruthy())
  });
  test('[keys] total keys must be 1', () => {
    return asyncSession
      .keys()
      .then(r=> expect(r).toHaveLength(1))
  });

  test('[get]get a value that was inserted before, must exists', () => {
      return asyncSession
        .get('x')
        .then(r=> expect(r).toBe('y'))
  });
  test("[get]get a key that doesn't exists, must null", () => {
      expect.assertions(1)
      return asyncSession
        .get('fakeKey')
        .catch(r=> expect(r).toBeNull())
  });
  test('[remove]remove an existing key, must return true', () => {
      return asyncSession
        .remove('x')
        .then(r=> expect(r).toBe(true))
  });

  test('[keys] total keys must be empty', () => {
      return asyncSession
        .keys()
        .then(r=> expect(r).toHaveLength(0))
  });

  test('[remove]remove an non-existing key, must return false', () => {
      expect.assertions(1)
      return asyncSession
        .remove('fakeKey')
        .catch(r=> expect(r).toBe(false))
  });

  test('[clear]clear all keys, must return true', () => {
      return asyncSession
        .clear()
        .then(r=> expect(r).toBe(true))
  });
});

describe('LocalStorage API testing...', () => {
  test('[set]should not error',()=>{
      return asyncLocal
        .set('foo','bar')
        .then(r=> expect(r).toBeTruthy())
  })

  test('[keys] total keys must be 1', () => {
      return asyncLocal
        .keys()
        .then(r=> expect(r).toHaveLength(1))
  });

  test('[get]get a value that was inserted before, must exists', () => {
      return asyncLocal
        .get('foo')
        .then(r=> expect(r).toBe('bar'))
  });
  test("[get]get a key that doesn't exists, must null", () => {
      expect.assertions(1)
      return asyncLocal
        .get('fakeKey')
        .catch(r=> expect(r).toBeNull())
  });
  test('[remove]remove an existing key, must return true', () => {
      return asyncLocal
        .remove('foo')
        .then(r=> expect(r).toBe(true))
  });

  test('[keys] total keys must be empty', () => {
      return asyncLocal
        .keys()
        .then(r=> expect(r).toHaveLength(0))
  });

  test('[remove]remove an non-existing key, must return false', () => {
      expect.assertions(1)
      return asyncLocal
        .remove('fakeKey')
        .catch(r=> expect(r).toBe(false))
  });

  test('[clear]clear all keys, must return true', () => {
      return asyncLocal
        .clear()
        .then(r=> expect(r).toBe(true))
  });

  test('[setBulk] set array of data, must have 2 length of datas', () => {
      return asyncLocal
        .setBulk([
          {
            key:'a',
            value:'hello'
          },
          {
            key:'b',
            value:'world'
          }
        ])
          .then(r=> expect(r).toHaveLength(2))
  });

  test('[get] get key a, from local storage must return \"hello\"', () => {
    return asyncLocal
      .get('a')  
      .then(r=> expect(r).toBe('hello'))
  });

  test('[setBulk] set array of data,fill it with invalid data. must error', () => {
    expect.assertions(1)
    return asyncLocal
      .setBulk([
        {
          key:'a',
          value:'hello'
        },
        {
          thisIsInvalid:'key',
          mustBeError:'yes its must'
        }
      ])
      .catch(r=> expect(r.message).toMatch(/invalid data format/))
  });

});
