import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Styled from 'rsg-components/Styled';

var styles = function styles(_ref) {
	var fontFamily = _ref.fontFamily;
	return {
		code: {
			fontFamily: fontFamily.monospace,
			fontSize: 'inherit',
			color: 'inherit',
			background: 'transparent',
			whiteSpace: 'inherit'
		}
	};
};

export function CodeRenderer(_ref2) {
	var classes = _ref2.classes,
	    className = _ref2.className,
	    children = _ref2.children;

	var classNames = cx(className, classes.code);

	var isHighlighted = className && className.indexOf('lang-') !== -1;
	if (isHighlighted) {
		return React.createElement('code', { className: classNames, dangerouslySetInnerHTML: { __html: children } });
	}
	return React.createElement(
		'code',
		{ className: classNames },
		children
	);
}
CodeRenderer.propTypes = {
	classes: PropTypes.object.isRequired,
	className: PropTypes.string,
	children: PropTypes.node.isRequired
};

export default Styled(styles)(CodeRenderer);