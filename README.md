# [Simple Web Storage](https://www.npmjs.com/package/simple-webstorage)
> Lightweight utilities that can make easier to write and read application storage in client browser.

### Support :
- Local Storage
- Cookie Storage
- Session Storage
---

## How using this package

### 1. Use Package with NPM

```bash
$ npm i simple-webstorage --save
```

#### All API import

```js
import SimpleWebStorage from 'simple-webstorage'

const storage = SimpleWebStorage()

// empty the third parameter to store data permanently (only affected in local)
storage
  .asyncLocal
  .set('key', 'value') 
  .then(r=> /*do what you want to do..*/)
storage
  .asyncCookie
  .set('key', 'value', 5)
  .then(r=> /*do what you want to do..*/)
storage
  .asyncSession
  .set('key', 'value', 5)
  .then(r=> /*do what you want to do..*/)
```

#### Partial API import

```js
// # for local storage
import { get as getLocalStorage, set as setLocalStorage } from 'simple-webstorage/lib/local'


setLocalStorage('key', {
  name: 'you',
  skill: [
    'angry',
    'crying'
  ]
})
  .then(r=> /*do what you want to do..*/) 

// { name: 'you', skill: ['angry', 'crying'] }
getLocalStorage('key')
  .then(r=> /*do what you want to do..*/)

```

##### or you can import partial API like this :

```js
// # for cookie storage
import CookieStorage from 'simple-webstorage/lib/cookie'

// # for local storage
// import LocalStorage from 'simple-webstorage/lib/local'

// # for session storage
// import SessionStorage from 'simple-webstorage/lib/session'

const cookie = CookieStorage()

cookie
  .set('remembered', true)
  .then(r=> /*do what you want to do..*/)
cookie
  .set('forgotten', true)
  .then(r=> /*do what you want to do..*/)


cookie
  .get('remembered')
  .then(r=> /*do what you want to do..*/)

// ['remembered', 'forgotten'] # list all keys. returns array
cookie
  .keys()
  .then(r=> /*do what you want to do..*/)

```

### 2. All in minified js

```html
<script type="text/javascript" src="https://sutanlab.js.org/simple-webstorage/lib/bundle/simple-webstorage.min.js"></script>
<script type="text/javascript">
  var storage = SimpleWebStorage();

  storage
    .asyncLocal
    .set('key', 'value');
    .then(r=> /*do what you want to do..*/)
  storage
    .asyncCookie
    .set('key', 'value', 5);
    .then(r=> /*do what you want to do..*/)
  storage
    .asyncSession
    .set('key', 'value', 5);
    .then(r=> /*do what you want to do..*/)
</script>
```

## API Details

| Storage   | Method      | Parameters                                                                                  |
|-----------|-------------|---------------------------------------------------------------------------------------------|
| `local`   | get         | `key` (type: String)                                                                        |
| `local`   | set         | `key` (type: String), `value` (type: any, default: 0), `expiryInMinutes` (type: Number, default: null)  |
| `local`   | remove      | `key` (type: String)                                                                        |
| `local`   | clear       |  none                                                                                       |
| `local`   | keys        |  none                                                                                       |
| `cookie` or `session`  | get         | `key` (type: String)                                                           |
| `cookie` or `session`  | set         | `key` (type: String), `value` (type: any, default: 0), `expiryInMinutes` (type: Number, default: 5)     |
| `cookie` or `session`  | remove      | `key` (type: String)                                                                        |
| `cookie` or `session`  | keys        |  none                                                                                       |
| `cookie` or `session`  | clear       |  none                                                                               |

---
Feel free to contribute [simple-webstorage](https://github.com/sutanlab/simple-webstorage) 🙂

Copyright © 2019 by Sutan Gading Fadhillah Nasution