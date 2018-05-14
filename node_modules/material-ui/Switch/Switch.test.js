"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _react = _interopRequireDefault(require("react"));

var _chai = require("chai");

var _classnames = _interopRequireDefault(require("classnames"));

var _testUtils = require("../test-utils");

var _SwitchBase = _interopRequireDefault(require("../internal/SwitchBase"));

var _Switch = _interopRequireDefault(require("./Switch"));

var _ref = _react.default.createElement(_Switch.default, null);

var _ref2 = _react.default.createElement(_Switch.default, {
  className: "foo"
});

describe('<Switch />', function () {
  var shallow;
  var classes;
  before(function () {
    shallow = (0, _testUtils.createShallow)({
      untilSelector: 'span'
    });
    classes = (0, _testUtils.getClasses)(_ref);
  });
  describe('styleSheet', function () {
    it('should have the classes required for SwitchBase', function () {
      _chai.assert.strictEqual((0, _typeof2.default)(classes.root), 'string');

      _chai.assert.strictEqual((0, _typeof2.default)(classes.checked), 'string');

      _chai.assert.strictEqual((0, _typeof2.default)(classes.disabled), 'string');
    });
  });
  describe('default Switch export', function () {
    var wrapper;
    beforeEach(function () {
      wrapper = shallow(_ref2);
    });
    it('should render a span with the root and user classes', function () {
      _chai.assert.strictEqual(wrapper.name(), 'span');

      _chai.assert.strictEqual(wrapper.hasClass(classes.root), true);

      _chai.assert.strictEqual(wrapper.hasClass('foo'), true);
    });
    it('should render SwitchBase with a custom span icon with the icon class', function () {
      var switchBase = wrapper.childAt(0);

      _chai.assert.strictEqual(switchBase.type(), _SwitchBase.default);

      _chai.assert.strictEqual(switchBase.props().icon.type, 'span');

      _chai.assert.strictEqual(switchBase.props().icon.props.className, classes.icon);

      _chai.assert.strictEqual(switchBase.props().checkedIcon.type, 'span');

      _chai.assert.strictEqual(switchBase.props().checkedIcon.props.className, (0, _classnames.default)(classes.icon, classes.iconChecked));
    });
    it('should render the bar as the 2nd child', function () {
      var bar = wrapper.childAt(1);

      _chai.assert.strictEqual(bar.is('span'), true);

      _chai.assert.strictEqual(bar.hasClass(classes.bar), true);
    });
  });
});