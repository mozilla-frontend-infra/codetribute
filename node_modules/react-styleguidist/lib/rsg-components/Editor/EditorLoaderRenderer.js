import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';

var styles = function styles(_ref) {
	var fontFamily = _ref.fontFamily,
	    color = _ref.color,
	    space = _ref.space,
	    fontSize = _ref.fontSize;
	return {
		root: {
			padding: [[space[1], space[2], space[1], space[1]]],
			fontFamily: fontFamily.base,
			fontSize: fontSize.small,
			color: color.light,
			backgroundColor: color.codeBackground
		},
		// Tweak CodeMirror styles. Duplicate selectors are for increased specificity
		'@global': {
			'.CodeMirror.CodeMirror': {
				isolate: false,
				fontFamily: fontFamily.monospace,
				height: 'auto',
				padding: [[space[1], space[2]]],
				fontSize: fontSize.small
			},
			'.CodeMirror.CodeMirror pre': {
				isolate: false,
				padding: 0
			},
			'.CodeMirror-scroll.CodeMirror-scroll': {
				isolate: false,
				height: 'auto',
				overflowY: 'hidden',
				overflowX: 'auto'
			},
			'.cm-error.cm-error': {
				isolate: false,
				background: 'none'
			}
		}
	};
};

export function EditorLoaderRenderer(_ref2) {
	var classes = _ref2.classes;

	return React.createElement(
		'div',
		{ className: classes.root },
		'Loading\u2026'
	);
}

EditorLoaderRenderer.propTypes = {
	classes: PropTypes.object.isRequired
};

export default Styled(styles)(EditorLoaderRenderer);