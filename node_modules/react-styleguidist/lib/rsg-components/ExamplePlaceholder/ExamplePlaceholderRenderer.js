var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';
import Markdown from 'rsg-components/Markdown';
import { DOCS_DOCUMENTING } from '../../../scripts/consts';

var styles = function styles(_ref) {
	var fontFamily = _ref.fontFamily,
	    fontSize = _ref.fontSize,
	    color = _ref.color;
	return {
		button: {
			padding: 0,
			fontSize: fontSize.base,
			fontFamily: fontFamily.base,
			textDecoration: 'underline',
			color: color.light,
			border: 0,
			cursor: 'pointer',
			background: 'transparent',
			'&:hover, &:active': {
				isolate: false,
				color: color.lightest
			}
		}
	};
};

export var ExamplePlaceholderRenderer = function (_Component) {
	_inherits(ExamplePlaceholderRenderer, _Component);

	function ExamplePlaceholderRenderer() {
		_classCallCheck(this, ExamplePlaceholderRenderer);

		var _this = _possibleConstructorReturn(this, (ExamplePlaceholderRenderer.__proto__ || Object.getPrototypeOf(ExamplePlaceholderRenderer)).call(this));

		_this.handleOpen = _this.handleOpen.bind(_this);
		_this.state = {
			isVisible: false
		};
		return _this;
	}

	_createClass(ExamplePlaceholderRenderer, [{
		key: 'handleOpen',
		value: function handleOpen() {
			this.setState({ isVisible: true });
		}
	}, {
		key: 'render',
		value: function render() {
			var _props = this.props,
			    classes = _props.classes,
			    name = _props.name;
			var isVisible = this.state.isVisible;

			if (isVisible) {
				return React.createElement(Markdown, {
					text: '\nCreate **Readme.md** or **' + name + '.md** file in the component\u2019s folder like this:\n\n    ' + name + ' example:\n\n    ```js\n    <' + name + ' pizza="\uD83C\uDF55" />\n\t```\n\nYou may need to **restart** the style guide server after adding an example file.\n\nRead more in the [documenting components guide](' + DOCS_DOCUMENTING + ').\n\t\t\t\t\t'
				});
			}

			return React.createElement(
				'button',
				{ className: classes.button, onClick: this.handleOpen },
				'Add examples to this component'
			);
		}
	}]);

	return ExamplePlaceholderRenderer;
}(Component);

ExamplePlaceholderRenderer.propTypes = {
	classes: PropTypes.object.isRequired,
	name: PropTypes.string
};
export default Styled(styles)(ExamplePlaceholderRenderer);