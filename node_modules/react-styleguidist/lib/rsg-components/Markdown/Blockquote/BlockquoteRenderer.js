import React from 'react';
import PropTypes from 'prop-types';

import Styled from 'rsg-components/Styled';

var styles = function styles(_ref) {
	var space = _ref.space,
	    color = _ref.color,
	    fontSize = _ref.fontSize,
	    fontFamily = _ref.fontFamily;
	return {
		blockquote: {
			margin: [[space[2], space[4]]],
			padding: 0,
			color: color.base,
			fontFamily: fontFamily.base,
			fontSize: fontSize.base,
			lineHeight: 1.5
		}
	};
};

export function BlockquoteRenderer(_ref2) {
	var classes = _ref2.classes,
	    children = _ref2.children;

	return React.createElement(
		'blockquote',
		{ className: classes.blockquote },
		children
	);
}
BlockquoteRenderer.propTypes = {
	classes: PropTypes.object.isRequired,
	children: PropTypes.node.isRequired
};

export default Styled(styles)(BlockquoteRenderer);