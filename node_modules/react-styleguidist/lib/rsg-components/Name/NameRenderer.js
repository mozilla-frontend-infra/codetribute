function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import PropTypes from 'prop-types';
import Code from 'rsg-components/Code';
import Styled from 'rsg-components/Styled';
import cx from 'classnames';

export var styles = function styles(_ref) {
	var fontSize = _ref.fontSize,
	    color = _ref.color;
	return {
		name: {
			fontSize: fontSize.small,
			color: color.name
		},
		isDeprecated: {
			color: color.light,
			textDecoration: 'line-through'
		}
	};
};

export function NameRenderer(_ref2) {
	var classes = _ref2.classes,
	    children = _ref2.children,
	    deprecated = _ref2.deprecated;

	var classNames = cx(classes.name, _defineProperty({}, classes.isDeprecated, deprecated));
	return React.createElement(
		'span',
		{ className: classNames },
		React.createElement(
			Code,
			null,
			children
		)
	);
}

NameRenderer.propTypes = {
	classes: PropTypes.object.isRequired,
	children: PropTypes.node.isRequired,
	deprecated: PropTypes.bool
};

export default Styled(styles)(NameRenderer);