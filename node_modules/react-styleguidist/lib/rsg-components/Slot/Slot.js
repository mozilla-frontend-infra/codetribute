var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

// Inspired by https://github.com/camwest/react-slot-fill

import React from 'react';
import PropTypes from 'prop-types';

export default function Slot(_ref, _ref2) {
	var name = _ref.name,
	    active = _ref.active,
	    onlyActive = _ref.onlyActive,
	    className = _ref.className,
	    _ref$props = _ref.props,
	    props = _ref$props === undefined ? {} : _ref$props;
	var slots = _ref2.slots;

	var fills = slots[name];
	if (!fills) {
		throw new Error('Slot "' + name + '" not found, available slots: ' + Object.keys(slots).join(', '));
	}

	var rendered = fills.map(function (Fill, index) {
		// { id: 'pizza', render: ({ foo }) => <div>{foo}</div> }
		var _Fill = Fill,
		    id = _Fill.id,
		    render = _Fill.render;

		if (id && render) {
			// Render only specified fill
			if (onlyActive && id !== active) {
				return null;
			}

			var _props = props,
			    onClick = _props.onClick;

			props = _extends({}, props, {
				name: id,
				// Set active prop to active fill
				active: active && id === active,
				// Pass fill ID to onClick event handler
				// eslint-disable-next-line react/prop-types
				onClick: onClick && function () {
					for (var _len = arguments.length, attrs = Array(_len), _key = 0; _key < _len; _key++) {
						attrs[_key] = arguments[_key];
					}

					return onClick.apply(undefined, [id].concat(attrs));
				}
			});

			Fill = render;
		}

		return React.createElement(Fill, _extends({ key: index }, props));
	});

	var filtered = rendered.filter(Boolean);
	if (filtered.length === 0) {
		return null;
	}

	return React.createElement(
		'div',
		{ className: className },
		filtered
	);
}

Slot.propTypes = {
	name: PropTypes.string.isRequired,
	active: PropTypes.string,
	onlyActive: PropTypes.bool,
	props: PropTypes.object,
	className: PropTypes.string
};
Slot.contextTypes = {
	slots: PropTypes.object.isRequired
};