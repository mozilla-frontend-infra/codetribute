var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React from 'react';
import PropTypes from 'prop-types';
import Slot from 'rsg-components/Slot';
import SectionHeadingRenderer from 'rsg-components/SectionHeading/SectionHeadingRenderer';
import getUrl from '../../utils/getUrl';

export default function SectionHeading(_ref) {
	var slotName = _ref.slotName,
	    slotProps = _ref.slotProps,
	    children = _ref.children,
	    id = _ref.id,
	    rest = _objectWithoutProperties(_ref, ['slotName', 'slotProps', 'children', 'id']);

	var href = getUrl({ slug: id, anchor: true });
	return React.createElement(
		SectionHeadingRenderer,
		_extends({
			toolbar: React.createElement(Slot, { name: slotName, props: slotProps }),
			id: id,
			href: href
		}, rest),
		children
	);
}

SectionHeading.propTypes = {
	children: PropTypes.node,
	id: PropTypes.string.isRequired,
	slotName: PropTypes.string.isRequired,
	slotProps: PropTypes.object.isRequired,
	depth: PropTypes.number.isRequired,
	deprecated: PropTypes.bool
};