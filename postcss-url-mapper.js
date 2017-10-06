const URL_REGEX = /url\(\s*['"]?(?!['"]?data:)(.*?)['"]?\s*\)/g;
const PROP_REGEX = /^(?=--|cue|play|background|content|src|cursor|list-style)/;

module.exports = require('postcss').plugin('postcss-url-mapper', (map, options = { atRules: false }) => {
  const replacer = (value, name) => value.replace(URL_REGEX, (match, url) => `url("${map(url, name)}")`);

  return (css) => {
    if (typeof map !== 'function') return;

    css.walkDecls(PROP_REGEX, (decl) => { decl.value = replacer(decl.value, decl.prop); });

    if (options.atRules) {
      css.walkAtRules('import', (rule) => { rule.params = replacer(rule.params, rule.name); });
    }
  };
});
