const babel = require('babel-core');
const plugin = require('../');

test.each([
  ['number', '<Foo prop={1} />'],
  ['boolean', '<Foo prop={true} />'],
  ['shorthanded boolean', '<Foo prop />'],
  ['string', '<Foo prop="bar" />'],
  ['null', '<Foo prop={null} />'],
  ['constant object contains string', "<Foo prop={{ foo: 'bar' }} />"],
  ['constant object contains number', '<Foo prop={{ foo: 1 }} />'],
  ['constant object contains null', '<Foo prop={{ foo: null }} />'],
  [
    'constant object contains constant object',
    "<Foo prop={{ foo: { foo: 'bar' } }} />",
  ],
  ['constant object contains array', '<Foo prop={{ foo: [1, 2] }} />'],
  [
    'constant object contains array of array',
    "<Foo prop={{ foo: [['foo', 'bar']] }} />",
  ],
  [
    'constant object contains array of constant objects',
    "<Foo prop={{ foo: [{ foo: 'bar' }, { hoge: 'piyo' }] }} />",
  ],
  ['constant array', '<Foo prop={[1, 2]} />'],
  [
    'constant array of constant objects',
    "<Foo prop={[{ foo: 'bar' }, { hoge: 'piyo' }]} />",
  ],
  ['identifier', '<Foo prop={hoge} />'],
  ["identifier as object's key", "<Foo prop={{ [hoge]: 'bar' }} />"],
  ['object contains identifier', '<Foo prop={{ foo: bar }} />'],
  ['function', '<Foo prop={func()} />'],
  ['arrow function', '<Foo prop={() => true} />'],
])('snapshot %s', (title, testcase) => {
  const {code} = babel.transform(testcase, {
    presets: ['@babel/preset-react'],
    plugins: [plugin],
  });
  expect(code).toMatchSnapshot();
});
