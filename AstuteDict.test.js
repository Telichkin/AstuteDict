const Dict = require('./AstuteDict')

test('Should get key without variables', () => {
  const d = Dict({'/about': 'foo'})

  expect(d.get('/about')).toEqual({value: 'foo', variables: {}})
})

test('Should get key with "catch all" symbol', () => {
  const d = Dict({'/foo/*/bar': 'baz'})

  expect(d.get('/foo/wow/bar')).toEqual({value: 'baz', variables: {}})
})

test('Should get key with named arguments and return variables', () => {
  const d = Dict({'/src/{dirName}/test': 'js'})

  expect(d.get('/src/dict/test')).toEqual({value: 'js', variables: {dirName: 'dict'}})
})

test('Should get key when keys are mixed', () => {
  const d = Dict({
    'home': 'home',
    '/foo': '/bar',
    '{name}_surname': 'do',
    'hello * world': 'works'
  })

  expect(d.get('home')).toEqual({value: 'home', variables: {}})
  expect(d.get('hello funny world')).toEqual({value: 'works', variables: {}})
  expect(d.get('/foo')).toEqual({value: '/bar', variables: {}})
  expect(d.get('test_surname')).toEqual({value: 'do', variables: {name: 'test'}})
})

test('Should get key with many variables', () => {
  const d = Dict({'/users/{id}/{action}/{priority}': 'result'})

  expect(d.get('/users/@id/@action/@priority')).toEqual({value: 'result', variables: {
    id: '@id', action: '@action', priority: '@priority'
  }})
})

test('Should get two different keys with same start', () => {
  const d = Dict({
    '/users': 'users',
    '/users/*/edit': 'edit',
    '/users/{userId}': 'aUser',
  })

  expect(d.get('/users/1')).toEqual({value: 'aUser', variables: {userId: '1'}})
  expect(d.get('/users/1/edit')).toEqual({value: 'edit', variables: {}})
})

test('Should work with regex literals', () => {
  const d = Dict({
    'ho\\ho\\ho': 'ho',
    'wow.such.dot': 'doge',
    'works+with+plus': 'plus',
    'works-with-minus': 'minus',
    '[works][]with[][brackets]': '[brackets]',
    '(works)()with()(brackets)': '(brackets)',
    '?what is it?': 'test',
    '^ lift me up ^': 'lift me up',
    '$money$money$money$': 'must be funny',
    'yes|no': 'I don\'t know',
  })

  expect(d.get('ho\\ho\\ho')).toEqual({value: 'ho', variables: {}})
  expect(d.get('wow.such.dot')).toEqual({value: 'doge', variables: {}})
  expect(d.get('works+with+plus')).toEqual({value: 'plus', variables: {}})
  expect(d.get('[works][]with[][brackets]')).toEqual({value: '[brackets]', variables: {}})
  expect(d.get('(works)()with()(brackets)')).toEqual({value: '(brackets)', variables: {}})
  expect(d.get('?what is it?')).toEqual({value: 'test', variables: {}})
  expect(d.get('^ lift me up ^')).toEqual({value: 'lift me up', variables: {}})
  expect(d.get('$money$money$money$')).toEqual({value: 'must be funny', variables: {}})
  expect(d.get('yes|no')).toEqual({value: 'I don\'t know', variables: {}})
})

test('Should return undefined on unknown key', () => {
  expect(Dict({'bar': 'foo'}).get('foo')).toEqual({value: undefined, variables: {}})
})