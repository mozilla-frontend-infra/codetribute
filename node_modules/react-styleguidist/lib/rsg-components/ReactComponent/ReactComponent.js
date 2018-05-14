var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Examples from 'rsg-components/Examples';
import SectionHeading from 'rsg-components/SectionHeading';
import JsDoc from 'rsg-components/JsDoc';
import Markdown from 'rsg-components/Markdown';
import Slot from 'rsg-components/Slot';
import ReactComponentRenderer from 'rsg-components/ReactComponent/ReactComponentRenderer';
import { DOCS_TAB_USAGE } from '../slots';
import { DisplayModes } from '../../consts';

var ExamplePlaceholder = process.env.STYLEGUIDIST_ENV !== 'production' ? require('rsg-components/ExamplePlaceholder').default : function () {
	return React.createElement('div', null);
};

var ReactComponent = function (_Component) {
	_inherits(ReactComponent, _Component);

	function ReactComponent(props, context) {
		_classCallCheck(this, ReactComponent);

		var _this = _possibleConstructorReturn(this, (ReactComponent.__proto__ || Object.getPrototypeOf(ReactComponent)).call(this, props, context));

		var showUsage = context.config.showUsage;


		_this.handleTabChange = _this.handleTabChange.bind(_this);

		_this.state = {
			activeTab: showUsage ? DOCS_TAB_USAGE : undefined
		};
		return _this;
	}

	_createClass(ReactComponent, [{
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
			var activeTab = this.state.activeTab;
			var displayMode = this.context.displayMode;
			var _props = this.props,
			    component = _props.component,
			    depth = _props.depth;
			var name = component.name,
			    slug = component.slug,
			    filepath = component.filepath,
			    pathLine = component.pathLine;
			var _component$props = component.props,
			    description = _component$props.description,
			    _component$props$exam = _component$props.examples,
			    examples = _component$props$exam === undefined ? [] : _component$props$exam,
			    _component$props$tags = _component$props.tags,
			    tags = _component$props$tags === undefined ? {} : _component$props$tags;

			if (!name) {
				return null;
			}

			return React.createElement(ReactComponentRenderer, {
				name: name,
				slug: slug,
				filepath: filepath,
				pathLine: pathLine,
				docs: React.createElement(JsDoc, tags),
				description: description && React.createElement(Markdown, { text: description }),
				heading: React.createElement(
					SectionHeading,
					{
						id: slug,
						deprecated: !!tags.deprecated,
						slotName: 'componentToolbar',
						slotProps: _extends({}, component, {
							isolated: displayMode !== DisplayModes.all
						}),
						depth: depth
					},
					name
				),
				examples: examples.length > 0 ? React.createElement(Examples, { examples: examples, name: name }) : React.createElement(ExamplePlaceholder, { name: name }),
				tabButtons: React.createElement(Slot, {
					name: 'docsTabButtons',
					active: activeTab,
					props: _extends({}, component, { onClick: this.handleTabChange })
				}),
				tabBody: React.createElement(Slot, { name: 'docsTabs', active: activeTab, onlyActive: true, props: component })
			});
		}
	}]);

	return ReactComponent;
}(Component);

ReactComponent.propTypes = {
	component: PropTypes.object.isRequired,
	depth: PropTypes.number.isRequired
};
ReactComponent.contextTypes = {
	config: PropTypes.object.isRequired,
	displayMode: PropTypes.string
};
export default ReactComponent;