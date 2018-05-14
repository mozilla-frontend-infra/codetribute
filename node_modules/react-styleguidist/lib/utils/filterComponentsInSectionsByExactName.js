function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

import filterComponentsByExactName from './filterComponentsByExactName';

/**
 * Recursively filters all components in all sections by component name.
 *
 * @param {object} sections
 * @param {string} name
 * @return {Array}
 */
export default function filterComponentsInSectionsByExactName(sections, name) {
	var components = [];
	sections.forEach(function (section) {
		if (section.components) {
			components.push.apply(components, _toConsumableArray(filterComponentsByExactName(section.components, name)));
		}
		if (section.sections) {
			components.push.apply(components, _toConsumableArray(filterComponentsInSectionsByExactName(section.sections, name)));
		}
	});
	return components;
}