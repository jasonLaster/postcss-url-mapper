# [postcss][postcss]-url-mapper

> Simple .map for urls in CSS

<img align="right" width="135" height="95"
     title="Philosopher’s stone, logo of PostCSS"
     src="http://postcss.github.io/postcss/logo-leftp.png">

## Install

With [npm][npm] do:

```
npm install postcss-url-mapper --save
```

## Configuration

### Map
Map function.
Takes two arguments: `url` and `type`, where `type` is a name of property or at-rule (`background`, `cursor`, `import`, etc).
*Required.*

### Options

#### atRules
Indicates whether the mapper should call map function for at-rules (like `@import`).
Type: `boolean`
Default: `false`

## Usage

```js
postcss([ require('postcss-url-mapper')(mapfunc, options)])
```

See the [PostCSS documentation](https://github.com/postcss/postcss#usage) for
examples for your environment.

## Example
Let's imagine that we need to add prefix `/fonts/` for all `src` urls and `/images/` for urls in other properties. And we also need to replace `http` with `https` in `@import`:

```js
postcss([ require('postcss-url-mapper')(urlMapper, { atRules: true }) ]);

function urlMapper(url, type) {
    switch (type) {
        case 'import':
            return url.replace('/^http/', 'https');
        case 'src':
            return '/fonts/' + url;
        default:
            return '/images/' + url;
    }
}
```

**Note:** `url` can't be a data URI.

[postcss]: https://github.com/postcss/postcss
[npm]: https://www.npmjs.com/package/postcss-url-mapper
