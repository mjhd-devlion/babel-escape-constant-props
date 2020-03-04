# babel-escape-constant-props

convert

```javascript
<Foo constProp={{ message: "hello" }} />
```

into

```javascript
const _ref = { message: "hello" };

<Foo constProp={_ref} />
```

```sh
$ yarn babel
```

```sh
$ yarn build
```

```sh
$ yarn dev
```
