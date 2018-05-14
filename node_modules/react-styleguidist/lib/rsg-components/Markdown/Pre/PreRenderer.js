import React from 'react';
import PropTypes from 'prop-types';

import Styled from 'rsg-components/Styled';

var styles = function styles(_ref) {
	var space = _ref.space,
	    color = _ref.color,
	    fontSize = _ref.fontSize,
	    fontFamily = _ref.fontFamily,
	    borderRadius = _ref.borderRadius;
	return {
		pre: {
			fontFamily: fontFamily.base,
			fontSize: fontSize.small,
			lineHeight: 1.5,
			color: color.base,
			whiteSpace: 'pre',
			backgroundColor: color.codeBackground,
			padding: [[space[1], space[2]]],
			border: [[1, color.border, 'solid']],
			borderRadius: borderRadius,
			marginTop: 0,
			marginBottom: space[2]
		}
	};
};

export function PreRenderer(_ref2) {
	var classes = _ref2.classes,
	    children = _ref2.children;

	return React.createElement(
		'pre',
		{ className: classes.pre },
		children
	);
}
PreRenderer.propTypes = {
	classes: PropTypes.object.isRequired,
	children: PropTypes.node.isRequired
};

export default Styled(styles)(PreRenderer);