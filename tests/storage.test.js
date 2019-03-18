import '../src/mocks';
import SimpleWebStorage from '../lib/index'
import LocalStorage, { get as getLocalStorage } from '../lib/local'
import CookieStorage, { get as getCookieStorage } from '../lib/cookie'
import SessionStorage, { get as getSessionStorage } from '../lib/session'
import { isNotNull, check as checkStorage } from '../lib/storage'



const {asyncLocal} = SimpleWebStorage()





const testThrown = (func, val = '') => {
  try { func(val) } 
  catch (err) {
    return err.message.trim() === 'window is not defined'
  }
}

test('Testing storage function', () => {
  expect(isNotNull(undefined)).toBeFalsy()
  expect(isNotNull(null)).toBeFalsy()
})

test('Testing all API import', () => {
  expect(SimpleWebStorage()).toBeDefined()
  expect(asyncLocal).toBeTruthy()
})

test('Testing partial import', () => {
  expect(getLocalStorage).toBeDefined()
  expect(getCookieStorage).toBeDefined()
  expect(getSessionStorage).toBeDefined()
})

describe('async API testing', () => {
  describe('asyncLocalStorage API testing...', () => {
    test('[set]should not return false',()=>{
        return asyncLocal
          .set('foo','bar')
          .then(r=> expect(r).toBeTruthy())
    })
    test('[get]get a value that was inserted before, must not null', () => {
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
  });
});
