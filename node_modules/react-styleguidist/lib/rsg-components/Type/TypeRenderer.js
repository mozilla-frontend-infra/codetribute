import React from 'react';
import PropTypes from 'prop-types';
import Code from 'rsg-components/Code';
import Styled from 'rsg-components/Styled';

export var styles = function styles(_ref) {
	var fontSize = _ref.fontSize,
	    color = _ref.color;
	return {
		type: {
			fontSize: fontSize.small,
			color: color.type
		}
	};
};

export function TypeRenderer(_ref2) {
	var classes = _ref2.classes,
	    children = _ref2.children;

	return React.createElement(
		'span',
		{ className: classes.type },
		React.createElement(
			Code,
			null,
			children
		)
	);
}

TypeRenderer.propTypes = {
	classes: PropTypes.object.isRequired,
	children: PropTypes.node.isRequired
};

export default Styled(styles)(TypeRenderer);