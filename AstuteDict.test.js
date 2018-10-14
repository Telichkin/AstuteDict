const Dict = require('./AstuteDict');

const $in = dict => {
  const self = {};
  self.get = aKey => ({
    returns: expected => {
      test(`'${aKey}' in ${JSON.stringify(dict)} should return ${JSON.stringify(expected)}`, () => {
        expect(Dict(dict).get(aKey)).toEqual(expected)
      });
      return self;
    }
  });
  return self;
}

$in({'bar': 'foo'}).get('foo').returns({value: undefined, variables: {}});

$in({'/about': 'foo'}).get('/about').returns({value: 'foo', variables: {}});

$in({'/foo/*/bar': 'baz'}).get('/foo/wow/bar').returns({value: 'baz', variables: {}});

$in({'/src/{dirName}/test': 'js'}).get('/src/dict/test').returns({value: 'js', variables: {dirName: 'dict'}});

$in({
  'home': 'home',
  '/foo': '/bar',
  '{name}_surname': 'do',
  'hello * world': 'works'
})
  .get('home').returns({value: 'home', variables: {}})
  .get('hello funny world').returns({value: 'works', variables: {}})
  .get('/foo').returns({value: '/bar', variables: {}})
  .get('test_surname').returns({value: 'do', variables: {name: 'test'}});

$in({'/users/{id}/{action}/{priority}': 'result'})
  .get('/users/@id/@action/@priority').returns({value: 'result', variables: {id: '@id', action: '@action', priority: '@priority'}});

$in({
  '/users': 'users',
  '/users/*/edit': 'edit',
  '/users/{userId}': 'aUser',
})
  .get('/users/1').returns({value: 'aUser', variables: {userId: '1'}})
  .get('/users/1/edit').returns({value: 'edit', variables: {}});

$in({
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
  .get('ho\\ho\\ho').returns({value: 'ho', variables: {}})
  .get('wow.such.dot').returns({value: 'doge', variables: {}})
  .get('works+with+plus').returns({value: 'plus', variables: {}})
  .get('[works][]with[][brackets]').returns({value: '[brackets]', variables: {}})
  .get('(works)()with()(brackets)').returns({value: '(brackets)', variables: {}})
  .get('?what is it?').returns({value: 'test', variables: {}})
  .get('^ lift me up ^').returns({value: 'lift me up', variables: {}})
  .get('$money$money$money$').returns({value: 'must be funny', variables: {}})
  .get('yes|no').returns({value: 'I don\'t know', variables: {}});