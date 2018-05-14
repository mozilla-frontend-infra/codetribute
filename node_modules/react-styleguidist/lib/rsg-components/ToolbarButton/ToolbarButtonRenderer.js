function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';
import cx from 'classnames';

export var styles = function styles(_ref) {
	var space = _ref.space,
	    color = _ref.color;
	return {
		button: {
			padding: 2, // Increase clickable area a bit
			color: color.light,
			background: 'transparent',
			transition: 'color 750ms ease-out',
			cursor: 'pointer',
			'&:hover, &:focus': {
				isolate: false,
				color: color.linkHover,
				transition: 'color 150ms ease-in'
			},
			'&:focus': {
				isolate: false,
				outline: [[1, 'dotted', color.linkHover]]
			},
			'& + &': {
				isolate: false,
				marginLeft: space[1]
			},
			// Style react-icons icon passed as children
			'& svg': {
				width: space[3],
				height: space[3],
				color: 'currentColor',
				cursor: 'inherit'
			}
		},
		isSmall: {
			'& svg': {
				width: 14,
				height: 14
			}
		}
	};
};

export function ToolbarButtonRenderer(_ref2) {
	var classes = _ref2.classes,
	    className = _ref2.className,
	    onClick = _ref2.onClick,
	    href = _ref2.href,
	    title = _ref2.title,
	    small = _ref2.small,
	    children = _ref2.children;

	var classNames = cx(classes.button, className, _defineProperty({}, classes.isSmall, small));

	if (href !== undefined) {
		return React.createElement(
			'a',
			{ href: href, title: title, className: classNames },
			children
		);
	}

	return React.createElement(
		'button',
		{ type: 'button', onClick: onClick, title: title, className: classNames },
		children
	);
}

ToolbarButtonRenderer.propTypes = {
	classes: PropTypes.object.isRequired,
	className: PropTypes.string,
	href: PropTypes.string,
	onClick: PropTypes.func,
	title: PropTypes.string,
	small: PropTypes.bool,
	children: PropTypes.node
};

export default Styled(styles)(ToolbarButtonRenderer);