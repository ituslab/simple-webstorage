# [Async Simple Web Storage](https://www.npmjs.com/package/@itpolsri/simple-webstorage)
> Lightweight utilities that can make easier to write and read application storage in client browser.
Inspired by [Sutan gading's simple web storage](https://github.com/sutanlab/simple-webstorage), one of our team member

> it's a asynchronous API using Promise

### Support :
- Local Storage
- Cookie Storage
- Session Storage
---

## How using this package

### 1. Use Package with NPM

```bash
$ npm i @itpolsri/simple-webstorage
```

#### All API import

```js
import SimpleWebStorage from '@itpolsri/simple-webstorage'

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

// we support setBulk too :), if you want to set data all at once
storage
  .asyncLocal
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
  .then(r=> /*do what you want to do*/)
  // resolved value = [{key:'a',value:'hello'} , {key:'b',value:'world'}]
```

#### Partial API import

```js
// # for local storage
import { 
  get as getLocalStorage, 
  set as setLocalStorage ,
  setBulk as setBulkLocalStorage
} from '@itpolsri/simple-webstorage/src/local'


setLocalStorage('key', {
  name: 'you',
  skill: [
    'angry',
    'crying'
  ]
})
  .then(r=> /*do what you want to do..*/) 

setBulkLocalStorage([
  {
    key:'a',
    value:'override this value'
  },
  {
    key:'b',
    value:'this one too'
  }
])
.then(r=> /*do what you want to do..*/)

// { name: 'you', skill: ['angry', 'crying'] }
getLocalStorage('key')
  .then(r=> /*do what you want to do..*/)

```

##### or you can import partial API like this :

```js
// # for cookie storage
import CookieStorage from '@itpolsri/simple-webstorage/lib/cookie'

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
<script type="text/javascript" src="https://unpkg.com/babel-polyfill@6.26.0/dist/polyfill.js"></script>
<script type="text/javascript" src="https://unpkg.com/@itpolsri/simple-webstorage@1.0.1/lib/bundle/simple-webstorage.min.js"></script>
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
| `asyncLocal`   | set         | `key` (type: String), `value` (type: any, default: 0), `expiryInMinutes` (type: Number, default: null)  |
| `asyncCookie` or `asyncSession` or `asyncLocal`   | get         | `key` (type: String)                                                           |
| `asyncCookie` or `asyncSession`   | set         | `key` (type: String), `value` (type: any, default: 0), `expiryInMinutes` (type: Number, default: 5)     |
| `asyncCookie` or `asyncSession` or `asyncLocal`   | remove      | `key` (type: String)                                                                        |
| `asyncCookie` or `asyncSession` or `asyncLocal`   | keys        |  none                                                                                       |
| `asyncCookie` or `asyncSession` or `asyncLocal`   | clear       |  none                                                                               |

---
Copyright © 2019 by IT-Polsri, soon will be IT-Us  🙂
