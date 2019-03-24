import LocalStorage from './local'
import CookieStorage from './cookie'
import SessionStorage from './session'

export const SimpleWebStorage = () => ({
  asyncLocal: {
    get: LocalStorage().get,
    set: LocalStorage().set,
    remove: LocalStorage().remove,
    clear: LocalStorage().clear,
    keys: LocalStorage().keys,
    setBulk: LocalStorage().setBulk
  },
  asyncCookie: {
    get: CookieStorage().get,
    set: CookieStorage().set,
    remove: CookieStorage().remove,
    clear: CookieStorage().clear,
    keys: CookieStorage().keys,
    setBulk: CookieStorage().setBulk
  },
  asyncSession: {
    get: SessionStorage().get,
    set: SessionStorage().set,
    remove: SessionStorage().remove,
    clear: SessionStorage().clear,
    keys: SessionStorage().keys,
    setBulk: SessionStorage().setBulk
  }
})

global.SimpleWebStorage = SimpleWebStorage

export default SimpleWebStorage