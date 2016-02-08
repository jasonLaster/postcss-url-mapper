# [postcss][postcss]-url-mapper [![Build Status][ci-img]][ci]
> Simple .map for urls in CSS

<img align="right" width="95" height="95"
     title="Philosopher’s stone, logo of PostCSS"
     src="http://postcss.github.io/postcss/logo.svg">

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

**Note:** Mapper doesn't match on data URI (`url` is always URL), but you can return it, for instance when you replace icons with their data. But I think there is better tools for such tasks.

[postcss]: https://github.com/postcss/postcss
[npm]: https://www.npmjs.com/package/postcss-url-mapper
[ci-img]: https://travis-ci.org/igoradamenko/postcss-url-mapper.svg?branch=master
[ci]: https://travis-ci.org/igoradamenko/postcss-url-mapper