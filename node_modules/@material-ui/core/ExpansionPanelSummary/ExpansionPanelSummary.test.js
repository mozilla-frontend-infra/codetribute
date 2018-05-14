"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _chai = require("chai");

var _sinon = require("sinon");

var _testUtils = require("../test-utils");

var _ButtonBase = _interopRequireDefault(require("../ButtonBase"));

var _ExpansionPanelSummary = _interopRequireDefault(require("./ExpansionPanelSummary"));

var _ref = _react.default.createElement(_ExpansionPanelSummary.default, null);

var _ref2 = _react.default.createElement(_ExpansionPanelSummary.default, null);

var _ref3 = _react.default.createElement(_ExpansionPanelSummary.default, {
  className: "woofExpansionPanelSummary"
});

var _ref4 = _react.default.createElement(_ExpansionPanelSummary.default, null);

var _ref5 = _react.default.createElement(_ExpansionPanelSummary.default, {
  disabled: true
});

var _ref6 = _react.default.createElement(_ExpansionPanelSummary.default, {
  expanded: true
});

var _ref7 = _react.default.createElement(_ExpansionPanelSummary.default, {
  expandIcon: _react.default.createElement("div", null, "Icon")
});

describe('<ExpansionPanelSummary />', function () {
  var mount;
  var shallow;
  var classes;
  var ExpansionPanelSummaryNaked = (0, _testUtils.unwrap)(_ExpansionPanelSummary.default);
  before(function () {
    shallow = (0, _testUtils.createShallow)({
      dive: true
    });
    mount = (0, _testUtils.createMount)();
    classes = (0, _testUtils.getClasses)(_ref);
  });
  after(function () {
    mount.cleanUp();
  });
  it('should render a ButtonBase', function () {
    var wrapper = shallow(_ref2);

    _chai.assert.strictEqual(wrapper.type(), _ButtonBase.default);
  });
  it('should render with the user and root classes', function () {
    var wrapper = shallow(_ref3);

    _chai.assert.strictEqual(wrapper.hasClass(classes.root), true);

    _chai.assert.strictEqual(wrapper.hasClass('woofExpansionPanelSummary'), true);
  });
  it('should render with the content', function () {
    var wrapper = shallow(_ref4);
    var itemsWrap = wrapper.childAt(0);

    _chai.assert.strictEqual(itemsWrap.hasClass(classes.content), true);
  });
  it('when disabled should have disabled class', function () {
    var wrapper = shallow(_ref5);

    _chai.assert.strictEqual(wrapper.hasClass(classes.disabled), true);
  });
  it('when expanded should have expanded class', function () {
    var wrapper = shallow(_ref6);

    _chai.assert.strictEqual(wrapper.hasClass(classes.expanded), true);
  });
  it('should render with the expand icon and have the expandIcon class', function () {
    var wrapper = shallow(_ref7);
    var iconWrap = wrapper.childAt(1);

    _chai.assert.strictEqual(iconWrap.hasClass(classes.expandIcon), true);
  });
  it('handleFocus() should set focused state', function () {
    var eventMock = 'woofExpansionPanelSummary';
    var wrapper = mount(_react.default.createElement(ExpansionPanelSummaryNaked, {
      classes: {}
    }));
    wrapper.instance().handleFocus(eventMock);

    _chai.assert.strictEqual(wrapper.state().focused, true);
  });
  it('handleBlur() should unset focused state', function () {
    var eventMock = 'woofExpansionPanelSummary';
    var wrapper = mount(_react.default.createElement(ExpansionPanelSummaryNaked, {
      classes: {}
    }));
    wrapper.setState({
      focused: true
    });
    wrapper.instance().handleBlur(eventMock);

    _chai.assert.strictEqual(wrapper.state().focused, false);
  });
  describe('prop: onChange', function () {
    it('should propagate call to onChange prop', function () {
      var eventMock = 'woofExpansionPanelSummary';
      var handleChange = (0, _sinon.spy)();
      var wrapper = mount(_react.default.createElement(ExpansionPanelSummaryNaked, {
        classes: {},
        onChange: handleChange
      }));
      wrapper.instance().handleChange(eventMock);

      _chai.assert.strictEqual(handleChange.callCount, 1);

      _chai.assert.strictEqual(handleChange.calledWith(eventMock), true);
    });
    it('should not propagate call to onChange prop', function () {
      var eventMock = 'woofExpansionPanelSummary';
      var handleChange = (0, _sinon.spy)();
      var wrapper = mount(_react.default.createElement(ExpansionPanelSummaryNaked, {
        classes: {},
        onChange: handleChange
      }));
      wrapper.setProps({
        onChange: undefined
      });
      wrapper.instance().handleChange(eventMock);

      _chai.assert.strictEqual(handleChange.callCount, 0);
    });
  });
  describe('prop: click', function () {
    it('should trigger onClick', function () {
      var handleClick = (0, _sinon.spy)();
      var wrapper = shallow(_react.default.createElement(_ExpansionPanelSummary.default, {
        onClick: handleClick
      }));
      wrapper.simulate('click');

      _chai.assert.strictEqual(handleClick.callCount, 1);
    });
  });
});