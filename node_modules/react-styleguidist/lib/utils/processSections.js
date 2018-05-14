var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import processComponents from './processComponents';

/**
 * Recursively process each component in all sections.
 *
 * @param {Array} sections
 * @return {Array}
 */
export default function processSections(sections) {
  return sections.map(function (section) {
    return _extends({}, section, {
      components: processComponents(section.components || []),
      sections: processSections(section.sections || [])
    });
  });
}