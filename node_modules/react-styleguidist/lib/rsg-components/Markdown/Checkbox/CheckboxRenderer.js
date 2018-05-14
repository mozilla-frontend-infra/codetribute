var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React from 'react';
import PropTypes from 'prop-types';

import Styled from 'rsg-components/Styled';

var styles = function styles() {
	return {
		input: {
			isolate: false,
			display: 'inline-block',
			verticalAlign: 'middle'
		}
	};
};

export function CheckboxRenderer(_ref) {
	var classes = _ref.classes,
	    rest = _objectWithoutProperties(_ref, ['classes']);

	return React.createElement('input', _extends({}, rest, { type: 'checkbox', className: classes.input }));
}
CheckboxRenderer.propTypes = {
	classes: PropTypes.object.isRequired
};

export default Styled(styles)(CheckboxRenderer);