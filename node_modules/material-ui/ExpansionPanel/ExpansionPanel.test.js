"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _chai = require("chai");

var _sinon = require("sinon");

var _testUtils = require("../test-utils");

var _Collapse = _interopRequireDefault(require("../transitions/Collapse"));

var _Paper = _interopRequireDefault(require("../Paper"));

var _ExpansionPanel = _interopRequireDefault(require("./ExpansionPanel"));

var _ExpansionPanelSummary = _interopRequireDefault(require("./ExpansionPanelSummary"));

var _ref = _react.default.createElement(_ExpansionPanel.default, null, "foo");

var _ref2 = _react.default.createElement(_ExpansionPanel.default, null, "foo");

var _ref3 = _react.default.createElement(_ExpansionPanel.default, {
  defaultExpanded: true
}, "foo");

var _ref4 = _react.default.createElement(_ExpansionPanel.default, {
  className: "test-class-name"
}, "foo");

var _ref5 = _react.default.createElement(_ExpansionPanel.default, null, _react.default.createElement(_ExpansionPanelSummary.default, null), _react.default.createElement("div", null, "Hello"));

var _ref6 = _react.default.createElement(_ExpansionPanel.default, {
  expanded: true
}, "foo");

var _ref7 = _react.default.createElement(_ExpansionPanelSummary.default, null);

var _ref8 = _react.default.createElement(_ExpansionPanelSummary.default, null);

var _ref9 = _react.default.createElement(_ExpansionPanelSummary.default, null);

var _ref10 = _react.default.createElement(_ExpansionPanel.default, {
  disabled: true
}, "foo");

var _ref11 = _react.default.createElement(_ExpansionPanel.default, null, _react.default.createElement(_ExpansionPanelSummary.default, null), null);

describe('<ExpansionPanel />', function () {
  var mount;
  var shallow;
  var classes;
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
  it('should render and have isControlled set to false', function () {
    var wrapper = shallow(_ref2);

    _chai.assert.strictEqual(wrapper.type(), _Paper.default);

    _chai.assert.strictEqual(wrapper.props().elevation, 1);

    _chai.assert.strictEqual(wrapper.props().square, true);

    _chai.assert.strictEqual(wrapper.instance().isControlled, false);

    var collapse = wrapper.find(_Collapse.default);

    _chai.assert.strictEqual(collapse.props()['aria-hidden'], 'true');

    wrapper.setProps({
      expanded: true
    });

    _chai.assert.strictEqual(wrapper.state().expanded, false, 'should not change the expanded state');
  });
  it('should handle defaultExpanded prop', function () {
    var wrapper = shallow(_ref3);

    _chai.assert.strictEqual(wrapper.instance().isControlled, false, 'should have isControlled state false');

    _chai.assert.strictEqual(wrapper.state().expanded, true, 'should set expanded state');

    _chai.assert.strictEqual(wrapper.hasClass(classes.expanded), true, 'should have the expanded class');
  });
  it('should render the custom className and the root class', function () {
    var wrapper = shallow(_ref4);

    _chai.assert.strictEqual(wrapper.hasClass('test-class-name'), true, 'should pass the test className');

    _chai.assert.strictEqual(wrapper.hasClass(classes.root), true);
  });
  it('should render the summary and collapse elements', function () {
    var wrapper = shallow(_ref5);

    _chai.assert.strictEqual(wrapper.childAt(0).type(), _ExpansionPanelSummary.default);

    var collapse = wrapper.childAt(1);

    _chai.assert.strictEqual(collapse.type(), _Collapse.default);

    _chai.assert.strictEqual(collapse.children().length, 1, 'collapse should have 1 children div');
  });
  it('should handle the expanded prop', function () {
    var wrapper = shallow(_ref6);

    _chai.assert.strictEqual(wrapper.state().expanded, undefined);

    _chai.assert.strictEqual(wrapper.hasClass(classes.expanded), true);

    _chai.assert.strictEqual(wrapper.instance().isControlled, true, 'should set isControlled prop');

    wrapper.setProps({
      expanded: false
    });

    _chai.assert.strictEqual(wrapper.hasClass(classes.expanded), false);
  });
  it('should call onChange when clicking the summary element', function () {
    var handleChange = (0, _sinon.spy)();
    var wrapper = mount(_react.default.createElement(_ExpansionPanel.default, {
      onChange: handleChange
    }, _ref7));

    _chai.assert.strictEqual(wrapper.type(), _ExpansionPanel.default);

    wrapper.find(_ExpansionPanelSummary.default).simulate('click');

    _chai.assert.strictEqual(handleChange.callCount, 1, 'it should forward the onChange');
  });
  it('when controlled should call the onChange', function () {
    var handleChange = (0, _sinon.spy)();
    var wrapper = mount(_react.default.createElement(_ExpansionPanel.default, {
      onChange: handleChange,
      expanded: true
    }, _ref8));
    wrapper.find(_ExpansionPanelSummary.default).simulate('click');

    _chai.assert.strictEqual(handleChange.callCount, 1, 'it should forward the onChange');

    _chai.assert.strictEqual(handleChange.args[0][1], false);
  });
  it('when undefined onChange and controlled should not call the onChange', function () {
    var handleChange = (0, _sinon.spy)();
    var wrapper = mount(_react.default.createElement(_ExpansionPanel.default, {
      onChange: handleChange,
      expanded: true
    }, _ref9));
    wrapper.setProps({
      onChange: undefined
    });
    wrapper.find(_ExpansionPanelSummary.default).simulate('click');

    _chai.assert.strictEqual(handleChange.callCount, 0);
  });
  it('when disabled should have the disabled class', function () {
    var wrapper = shallow(_ref10);

    _chai.assert.strictEqual(wrapper.hasClass(classes.disabled), true, 'should have the disabled class');
  });
  describe('prop: children', function () {
    it('should accept an empty child', function () {
      shallow(_ref11);
    });
  });
});