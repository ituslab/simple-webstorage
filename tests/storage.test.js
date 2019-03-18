import '../src/mocks';
import SimpleWebStorage from '../lib/index'
import LocalStorage, { get as getLocalStorage } from '../lib/local'
import CookieStorage, { get as getCookieStorage } from '../lib/cookie'
import SessionStorage, { get as getSessionStorage } from '../lib/session'
import { isNotNull, check as checkStorage } from '../lib/storage'



const {asyncLocal, asyncSession } = SimpleWebStorage()

beforeAll(()=>{
  if(process.env.NODE_VER) {
    console.log(`Testing on Node v${process.env.NODE_VER}`)
  }
})


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
        .get('foo')
        .then(r=> expect(r).toBe('bar'))
  });
  test("[get]get a key that doesn't exists, must null", () => {
      expect.assertions(1)
      return asyncSession
        .get('fakeKey')
        .catch(r=> expect(r).toBeNull())
  });
  test('[remove]remove an existing key, must return true', () => {
      return asyncSession
        .remove('foo')
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
        .then(r=> expect(r.length).toHaveLength(1))
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
        .then(r=> expect(r.length).toHaveLength(0))
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
});
