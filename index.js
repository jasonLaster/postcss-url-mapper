'use strict';

module.exports = require('postcss').plugin('postcss-url-mapper', function(map, options) {
	return function(css) {
		if (typeof map != 'function') {
			return;
		}
		
		options = options || {
			atRules: false
		};

		var	declsRegex = /^(?=cue|play|background|content|src|cursor|list-style)/,
			urlRegex = /url\(\s*['"]?(?!['"]?data:)(.*?)['"]?\s*\)/g;

		css.walkDecls(declsRegex, function(decl) {
			decl.value = decl.value.replace(urlRegex, function(match, url) {
				return 'url("' + map(url, decl.prop) + '")';
			});
		});

		if (options.atRules) {
			css.walkAtRules('import', function(rule) {
				rule.params = rule.params.replace(urlRegex, function(match, url) {
					return 'url("' + map(url, rule.name) + '")';
				});
			});
		}
	};
});
