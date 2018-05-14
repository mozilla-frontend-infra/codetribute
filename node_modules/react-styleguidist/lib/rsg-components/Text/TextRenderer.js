var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';
import cx from 'classnames';

export var styles = function styles(_ref) {
	var fontFamily = _ref.fontFamily,
	    fontSize = _ref.fontSize,
	    color = _ref.color;
	return {
		text: {
			fontFamily: fontFamily.base
		},
		inheritSize: {
			fontSize: 'inherit'
		},
		smallSize: {
			fontSize: fontSize.small
		},
		baseSize: {
			fontSize: fontSize.base
		},
		textSize: {
			fontSize: fontSize.text
		},
		baseColor: {
			color: color.base
		},
		lightColor: {
			color: color.light
		},
		em: {
			fontStyle: 'italic'
		},
		strong: {
			fontWeight: 'bold'
		},
		isUnderlined: {
			borderBottom: [[1, 'dotted', color.lightest]]
		}
	};
};

export function TextRenderer(_ref2) {
	var _cx;

	var classes = _ref2.classes,
	    semantic = _ref2.semantic,
	    size = _ref2.size,
	    color = _ref2.color,
	    underlined = _ref2.underlined,
	    children = _ref2.children,
	    props = _objectWithoutProperties(_ref2, ['classes', 'semantic', 'size', 'color', 'underlined', 'children']);

	var Tag = semantic || 'span';
	var classNames = cx(classes.text, classes[size + 'Size'], classes[color + 'Color'], (_cx = {}, _defineProperty(_cx, classes[semantic], semantic), _defineProperty(_cx, classes.isUnderlined, underlined), _cx));

	return React.createElement(
		Tag,
		_extends({}, props, { className: classNames }),
		children
	);
}

TextRenderer.propTypes = {
	classes: PropTypes.object.isRequired,
	semantic: PropTypes.oneOf(['em', 'strong']),
	size: PropTypes.oneOf(['inherit', 'small', 'base', 'text']),
	color: PropTypes.oneOf(['base', 'light']),
	underlined: PropTypes.bool,
	children: PropTypes.node.isRequired
};

TextRenderer.defaultProps = {
	size: 'inherit',
	color: 'base',
	underlined: false
};

export default Styled(styles)(TextRenderer);