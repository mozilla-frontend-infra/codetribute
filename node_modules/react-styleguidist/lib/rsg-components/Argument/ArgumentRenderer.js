var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';
import Markdown from 'rsg-components/Markdown';
import Name from 'rsg-components/Name';
import Type from 'rsg-components/Type';
import Group from 'react-group';

export var styles = function styles(_ref) {
	var space = _ref.space;
	return {
		block: {
			marginBottom: space[2]
		}
	};
};

export function ArgumentRenderer(_ref2) {
	var classes = _ref2.classes,
	    name = _ref2.name,
	    type = _ref2.type,
	    description = _ref2.description,
	    returns = _ref2.returns,
	    block = _ref2.block,
	    props = _objectWithoutProperties(_ref2, ['classes', 'name', 'type', 'description', 'returns', 'block']);

	return React.createElement(
		Group,
		_extends({ className: block && classes.block }, props),
		returns && 'Returns',
		name && React.createElement(
			'span',
			null,
			React.createElement(
				Name,
				null,
				name
			),
			type && ':'
		),
		type && React.createElement(
			Type,
			null,
			type.name
		),
		type && description && ' \u2014 ',
		description && React.createElement(Markdown, { text: '' + description, inline: true })
	);
}

ArgumentRenderer.propTypes = {
	classes: PropTypes.object.isRequired,
	name: PropTypes.string,
	type: PropTypes.object,
	description: PropTypes.string,
	returns: PropTypes.bool,
	block: PropTypes.bool
};

export default Styled(styles)(ArgumentRenderer);