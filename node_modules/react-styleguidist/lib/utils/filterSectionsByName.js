var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import getFilterRegExp from './getFilterRegExp';
import filterComponentsByName from './filterComponentsByName';

/**
 * Fuzzy filters sections by section or component name.
 *
 * @param {Array} sections
 * @param {string} query
 * @return {Array}
 */
export default function filterSectionsByName(sections, query) {
	var regExp = getFilterRegExp(query);

	return sections.map(function (section) {
		return _extends({}, section, {
			sections: section.sections ? filterSectionsByName(section.sections, query) : [],
			components: section.components ? filterComponentsByName(section.components, query) : []
		});
	}).filter(function (section) {
		return section.components.length > 0 || section.sections.length > 0 || regExp.test(section.name);
	});
}