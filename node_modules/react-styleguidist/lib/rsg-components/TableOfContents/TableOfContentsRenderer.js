import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';

var styles = function styles(_ref) {
	var space = _ref.space,
	    color = _ref.color,
	    fontFamily = _ref.fontFamily,
	    fontSize = _ref.fontSize,
	    borderRadius = _ref.borderRadius;
	return {
		root: {
			fontFamily: fontFamily.base
		},
		search: {
			padding: space[2]
		},
		input: {
			display: 'block',
			width: '100%',
			padding: space[1],
			color: color.base,
			backgroundColor: color.baseBackground,
			fontFamily: fontFamily.base,
			fontSize: fontSize.base,
			border: [[1, color.border, 'solid']],
			borderRadius: borderRadius,
			transition: 'border-color ease-in-out .15s',
			'&:focus': {
				isolate: false,
				borderColor: color.link,
				outline: 0
			},
			'&::placeholder': {
				isolate: false,
				fontFamily: fontFamily.base,
				fontSize: fontSize.base,
				color: color.light
			}
		}
	};
};

export function TableOfContentsRenderer(_ref2) {
	var classes = _ref2.classes,
	    children = _ref2.children,
	    searchTerm = _ref2.searchTerm,
	    onSearchTermChange = _ref2.onSearchTermChange;

	return React.createElement(
		'div',
		null,
		React.createElement(
			'div',
			{ className: classes.root },
			React.createElement(
				'div',
				{ className: classes.search },
				React.createElement('input', {
					value: searchTerm,
					className: classes.input,
					placeholder: 'Filter by name',
					onChange: function onChange(event) {
						return onSearchTermChange(event.target.value);
					}
				})
			),
			children
		)
	);
}

TableOfContentsRenderer.propTypes = {
	classes: PropTypes.object.isRequired,
	children: PropTypes.node,
	searchTerm: PropTypes.string.isRequired,
	onSearchTermChange: PropTypes.func.isRequired
};

export default Styled(styles)(TableOfContentsRenderer);