# AstuteDict

AstuteDict is a tiny library (~300B minified and gzipped) with minimal API and zero dependencies which can help you to build your router for frontend or backend application.


## Installation

```
npm install --save astute-dict
```

## API by Examples

AstuteDict is not bound to URL structure or window object. The main aim of this library is to provide minimal API for mapping templates with variables to values. 

### Creation

```js
const Dict = require('astute-dict');

const routes = Dict({
  'just-word': 'just-word-value',
  'library-{name}': 'library-value',
  'catch-*-all': 'catch-all-value',
  'ending-slash': 'without',
  'ending-slash/': 'with',
});
```

### Getting a value

```js
const justWord = routes.get('just-word');
console.log(justWord); // { value: 'just-word-value', variables: {} }

const library = routes.get('library-astute-dict');
console.log(library); // { value: 'library-value', variables: { name: 'astute-dict' } }

const catchAll = routes.get('catch-this-all');
console.log(catchAll); // { value: 'catch-all-value', variables: {} }

const withoutEndingSlash = routes.get('ending-slash');
console.log(withoutEndingSlash); // { value: 'without', variables: {} }

const withEndingSlash = routes.get('ending-slash/');
console.log(withEndingSlash); // { value: 'with', variables: {}
```

**Notes**

More specific keys should be above general rules:

```js
const rightRoutes = Dict({
  'user-admin': 'admin',
  'user-{role}': 'role',
});

const admin = rightRoutes.get('user-admin');
console.log(admin); // { value: 'admin', variables: {} }

const anon = rightRoutes.get('user-anon');
console.log(anon); // { value: 'role', variables: { role: 'anon' } }


const wrongRoutes = Dict({
  'user-{role}': 'role',
  'user-admin': 'admin', // never will be available
});

const notAdmin = wrongRoutes.get('user-admin');
console.log(notAdmin); // { value: 'role', variables: { role: 'admin' } }

const stillAnon = wrongRoutes.get('user-anon');
console.log(stillAnon); // { value: 'role', variables: { role: 'anon' } }
```
