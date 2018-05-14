var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import Preview from 'rsg-components/Preview';
import Para from 'rsg-components/Para';
import Slot from 'rsg-components/Slot';
import PlaygroundRenderer from 'rsg-components/Playground/PlaygroundRenderer';
import { EXAMPLE_TAB_CODE_EDITOR } from '../slots';
import { DisplayModes } from '../../consts';

var Playground = function (_Component) {
	_inherits(Playground, _Component);

	function Playground(props, context) {
		_classCallCheck(this, Playground);

		var _this = _possibleConstructorReturn(this, (Playground.__proto__ || Object.getPrototypeOf(Playground)).call(this, props, context));

		var code = props.code,
		    settings = props.settings;
		var config = context.config;

		var showCode = settings.showcode !== undefined ? settings.showcode : config.showCode;

		_this.state = {
			code: code,
			activeTab: showCode ? EXAMPLE_TAB_CODE_EDITOR : undefined
		};

		_this.handleTabChange = _this.handleTabChange.bind(_this);
		_this.handleChange = debounce(_this.handleChange.bind(_this), config.previewDelay);
		return _this;
	}

	_createClass(Playground, [{
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			var code = nextProps.code;

			this.setState({
				code: code
			});
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			// Clear pending changes
			this.handleChange.cancel();
		}
	}, {
		key: 'handleChange',
		value: function handleChange(code) {
			this.setState({
				code: code
			});
		}
	}, {
		key: 'handleTabChange',
		value: function handleTabChange(name) {
			this.setState(function (state) {
				return {
					activeTab: state.activeTab !== name ? name : undefined
				};
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var _state = this.state,
			    code = _state.code,
			    activeTab = _state.activeTab;
			var _props = this.props,
			    evalInContext = _props.evalInContext,
			    index = _props.index,
			    name = _props.name,
			    settings = _props.settings;
			var displayMode = this.context.displayMode;

			var preview = React.createElement(Preview, { code: code, evalInContext: evalInContext });
			if (settings.noeditor) {
				return React.createElement(
					Para,
					null,
					preview
				);
			}
			return React.createElement(PlaygroundRenderer, {
				name: name,
				preview: preview,
				previewProps: settings.props || {},
				tabButtons: React.createElement(Slot, {
					name: 'exampleTabButtons',
					active: activeTab,
					props: { onClick: this.handleTabChange }
				}),
				tabBody: React.createElement(Slot, {
					name: 'exampleTabs',
					active: activeTab,
					onlyActive: true,
					props: { code: code, onChange: this.handleChange }
				}),
				toolbar: React.createElement(Slot, {
					name: 'exampleToolbar',
					props: { name: name, isolated: displayMode === DisplayModes.example, example: index }
				})
			});
		}
	}]);

	return Playground;
}(Component);

Playground.propTypes = {
	code: PropTypes.string.isRequired,
	evalInContext: PropTypes.func.isRequired,
	index: PropTypes.number.isRequired,
	name: PropTypes.string.isRequired,
	settings: PropTypes.object
};
Playground.contextTypes = {
	config: PropTypes.object.isRequired,
	displayMode: PropTypes.string
};
export default Playground;