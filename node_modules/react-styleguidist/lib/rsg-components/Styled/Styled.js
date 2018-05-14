var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import createStyleSheet from '../../styles/createStyleSheet';

export default (function (styles) {
	return function (WrappedComponent) {
		var _class, _temp;

		var componentName = WrappedComponent.name.replace(/Renderer$/, '');
		return _temp = _class = function (_Component) {
			_inherits(_class, _Component);

			function _class() {
				_classCallCheck(this, _class);

				return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
			}

			_createClass(_class, [{
				key: 'componentWillMount',
				value: function componentWillMount() {
					this.sheet = createStyleSheet(styles, this.context.config || {}, componentName);
					this.sheet.update(this.props).attach();
				}
			}, {
				key: 'componentWillReceiveProps',
				value: function componentWillReceiveProps(nextProps) {
					this.sheet.update(nextProps);
				}
			}, {
				key: 'render',
				value: function render() {
					return React.createElement(WrappedComponent, _extends({}, this.props, { classes: this.sheet.classes }));
				}
			}]);

			return _class;
		}(Component), _class.displayName = 'Styled(' + componentName + ')', _class.contextTypes = {
			config: PropTypes.object
		}, _temp;
	};
});