"use strict";

module.exports = require("postcss").plugin("postcss-url-mapper", function(
  map,
  options
) {
  var replacer = function(value, name) {
    return value.replace(
      /url\(\s*['"]?(?!['"]?data:)(.*?)['"]?\s*\)/g,
      function(match, url) {
        return 'url("' + map(url, name) + '")';
      }
    );
  };

  options = options || {
    atRules: false
  };

  return function(css) {
    if (typeof map !== "function") {
      return;
    }

    css.walkDecls(
      /^(?=--|cue|play|background|content|src|cursor|list-style)/,
      function(decl) {
        decl.value = replacer(decl.value, decl.prop);
      }
    );

    if (options.atRules) {
      css.walkAtRules("import", function(rule) {
        rule.params = replacer(rule.params, rule.name);
      });
    }
  };
});
