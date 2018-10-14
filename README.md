# AstuteDict

AstuteDict is zero-dependencies tiny library (~300B minified and gzipped) with 
extra small API which can 
help you build your own router for frontend or backend application. 


## Installation

```
npm install --save astute-dict
```

## API

### Create

```js
const Dict = require('astute-dict');

const routes = Dict({
    '/index': 'index-value',
    '/users/{name}': 'users-value',
    '/songs/*/popular': 'songs-value',
});
```

### Get a value

```js
const index = routes.get('/index');
console.log(index); // { value: 'index-value', variables: {} }

const users = routes.get('/users/astute');
console.log(users); // { value: 'users-value', variables: { name: 'astute' } }

const songs = routes.get('/songs/pop/popular');
console.log(songs); // { value: 'songs-value', variables: {} } 
```