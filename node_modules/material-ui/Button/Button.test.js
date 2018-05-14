"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _chai = require("chai");

var _testUtils = require("../test-utils");

var _Button = _interopRequireDefault(require("./Button"));

var _ButtonBase = _interopRequireDefault(require("../ButtonBase"));

var _Icon = _interopRequireDefault(require("../Icon"));

var _ref = _react.default.createElement(_Button.default, null, "Hello World");

var _ref2 = _react.default.createElement(_Button.default, null, "Hello World");

var _ref3 = _react.default.createElement(_Button.default, null, "Hello World");

var _ref4 = _react.default.createElement(_Button.default, {
  className: "test-class-name"
}, "Hello World");

var _ref5 = _react.default.createElement(_Button.default, {
  color: "primary"
}, "Hello World");

var _ref6 = _react.default.createElement(_Button.default, {
  color: "secondary"
}, "Hello World");

var _ref7 = _react.default.createElement(_Button.default, {
  variant: "raised"
}, "Hello World");

var _ref8 = _react.default.createElement(_Button.default, {
  variant: "raised",
  color: "primary"
}, "Hello World");

var _ref9 = _react.default.createElement(_Button.default, {
  variant: "raised",
  color: "secondary"
}, "Hello World");

var _ref10 = _react.default.createElement(_Button.default, {
  variant: "fab"
}, "Hello World");

var _ref11 = _react.default.createElement(_Button.default, {
  variant: "fab",
  mini: true
}, "Hello World");

var _ref12 = _react.default.createElement(_Button.default, {
  variant: "fab",
  color: "primary"
}, "Hello World");

var _ref13 = _react.default.createElement(_Button.default, {
  variant: "fab",
  color: "secondary"
}, "Hello World");

var _ref14 = _react.default.createElement(_Button.default, null, "Hello World");

var _ref15 = _react.default.createElement(_Button.default, {
  disableRipple: true
}, "Hello World");

var _ref16 = _react.default.createElement(_Button.default, null, "Hello World");

var _ref17 = _react.default.createElement(_Button.default, {
  disableFocusRipple: true
}, "Hello World");

var _ref18 = _react.default.createElement(_Button.default, null, "Hello World");

describe('<Button />', function () {
  var shallow;
  var render;
  var classes;
  before(function () {
    shallow = (0, _testUtils.createShallow)({
      dive: true
    });
    render = (0, _testUtils.createRender)();
    classes = (0, _testUtils.getClasses)(_ref);
  });
  it('should render a <ButtonBase> element', function () {
    var wrapper = shallow(_ref2);

    _chai.assert.strictEqual(wrapper.type(), _ButtonBase.default);

    _chai.assert.strictEqual(wrapper.props().type, 'button', 'should render with the button type attribute');
  });
  it('should render with the root class but no others', function () {
    var wrapper = shallow(_ref3);

    _chai.assert.strictEqual(wrapper.hasClass(classes.root), true);

    _chai.assert.strictEqual(wrapper.hasClass(classes.raised), false, 'should not have the raised class');

    _chai.assert.strictEqual(wrapper.hasClass(classes.fab), false, 'should not have the fab class');

    _chai.assert.strictEqual(wrapper.hasClass(classes.flatPrimary), false, 'should not have the primary class');

    _chai.assert.strictEqual(wrapper.hasClass(classes.flatSecondary), false);
  });
  it('should render the custom className and the root class', function () {
    var wrapper = shallow(_ref4);

    _chai.assert.strictEqual(wrapper.is('.test-class-name'), true, 'should pass the test className');

    _chai.assert.strictEqual(wrapper.hasClass(classes.root), true);
  });
  it('should render a primary button', function () {
    var wrapper = shallow(_ref5);

    _chai.assert.strictEqual(wrapper.hasClass(classes.root), true);

    _chai.assert.strictEqual(wrapper.hasClass(classes.raised), false, 'should have the raised class');

    _chai.assert.strictEqual(wrapper.hasClass(classes.fab), false, 'should not have the fab class');

    _chai.assert.strictEqual(wrapper.hasClass(classes.flatPrimary), true, 'should have the primary class');

    _chai.assert.strictEqual(wrapper.hasClass(classes.flatSecondary), false);
  });
  it('should render an secondary button', function () {
    var wrapper = shallow(_ref6);

    _chai.assert.strictEqual(wrapper.hasClass(classes.root), true);

    _chai.assert.strictEqual(wrapper.hasClass(classes.raised), false, 'should have the raised class');

    _chai.assert.strictEqual(wrapper.hasClass(classes.fab), false, 'should not have the fab class');

    _chai.assert.strictEqual(wrapper.hasClass(classes.flatPrimary), false, 'should not have the primary class');

    _chai.assert.strictEqual(wrapper.hasClass(classes.flatSecondary), true);
  });
  it('should render a raised button', function () {
    var wrapper = shallow(_ref7);

    _chai.assert.strictEqual(wrapper.hasClass(classes.root), true);

    _chai.assert.strictEqual(wrapper.hasClass(classes.raised), true, 'should have the raised class');

    _chai.assert.strictEqual(wrapper.hasClass(classes.fab), false, 'should not have the fab class');

    _chai.assert.strictEqual(wrapper.hasClass(classes.flatPrimary), false, 'should not have the primary class');

    _chai.assert.strictEqual(wrapper.hasClass(classes.flatSecondary), false);
  });
  it('should render a raised primary button', function () {
    var wrapper = shallow(_ref8);

    _chai.assert.strictEqual(wrapper.hasClass(classes.root), true);

    _chai.assert.strictEqual(wrapper.hasClass(classes.raised), true, 'should have the raised class');

    _chai.assert.strictEqual(wrapper.hasClass(classes.fab), false, 'should not have the fab class');

    _chai.assert.strictEqual(wrapper.hasClass(classes.raisedPrimary), true, 'should not have the primary class');

    _chai.assert.strictEqual(wrapper.hasClass(classes.raisedSecondary), false);
  });
  it('should render a raised secondary button', function () {
    var wrapper = shallow(_ref9);

    _chai.assert.strictEqual(wrapper.hasClass(classes.root), true);

    _chai.assert.strictEqual(wrapper.hasClass(classes.raised), true, 'should have the raised class');

    _chai.assert.strictEqual(wrapper.hasClass(classes.fab), false, 'should not have the fab class');

    _chai.assert.strictEqual(wrapper.hasClass(classes.raisedPrimary), false, 'should not have the primary class');

    _chai.assert.strictEqual(wrapper.hasClass(classes.raisedSecondary), true, 'should have the secondary class');
  });
  it('should render a floating action button', function () {
    var wrapper = shallow(_ref10);

    _chai.assert.strictEqual(wrapper.hasClass(classes.root), true);

    _chai.assert.strictEqual(wrapper.hasClass(classes.raised), true, 'should have the raised class');

    _chai.assert.strictEqual(wrapper.hasClass(classes.fab), true, 'should have the fab class');

    _chai.assert.strictEqual(wrapper.hasClass(classes.flatPrimary), false, 'should not have the primary class');

    _chai.assert.strictEqual(wrapper.hasClass(classes.flatSecondary), false);
  });
  it('should render a mini floating action button', function () {
    var wrapper = shallow(_ref11);

    _chai.assert.strictEqual(wrapper.hasClass(classes.root), true);

    _chai.assert.strictEqual(wrapper.hasClass(classes.raised), true, 'should have the raised class');

    _chai.assert.strictEqual(wrapper.hasClass(classes.fab), true, 'should have the fab class');

    _chai.assert.strictEqual(wrapper.hasClass(classes.mini), true, 'should have the mini class');

    _chai.assert.strictEqual(wrapper.hasClass(classes.flatPrimary), false, 'should not have the primary class');

    _chai.assert.strictEqual(wrapper.hasClass(classes.flatSecondary), false);
  });
  it('should render a primary floating action button', function () {
    var wrapper = shallow(_ref12);

    _chai.assert.strictEqual(wrapper.hasClass(classes.root), true);

    _chai.assert.strictEqual(wrapper.hasClass(classes.raised), true, 'should have the raised class');

    _chai.assert.strictEqual(wrapper.hasClass(classes.fab), true, 'should have the fab class');

    _chai.assert.strictEqual(wrapper.hasClass(classes.raisedPrimary), true, 'should have the primary class');

    _chai.assert.strictEqual(wrapper.hasClass(classes.raisedSecondary), false);
  });
  it('should render an secondary floating action button', function () {
    var wrapper = shallow(_ref13);

    _chai.assert.strictEqual(wrapper.hasClass(classes.root), true);

    _chai.assert.strictEqual(wrapper.hasClass(classes.raised), true, 'should have the raised class');

    _chai.assert.strictEqual(wrapper.hasClass(classes.fab), true, 'should have the fab class');

    _chai.assert.strictEqual(wrapper.hasClass(classes.raisedPrimary), false, 'should not have the primary class');

    _chai.assert.strictEqual(wrapper.hasClass(classes.raisedSecondary), true, 'should have the secondary class');
  });
  it('should have a ripple by default', function () {
    var wrapper = shallow(_ref14);

    _chai.assert.strictEqual(wrapper.props().disableRipple, undefined);
  });
  it('should pass disableRipple to ButtonBase', function () {
    var wrapper = shallow(_ref15);

    _chai.assert.strictEqual(wrapper.props().disableRipple, true);
  });
  it('should have a focusRipple by default', function () {
    var wrapper = shallow(_ref16);

    _chai.assert.strictEqual(wrapper.props().focusRipple, true, 'should set focusRipple to true');
  });
  it('should pass disableFocusRipple to ButtonBase', function () {
    var wrapper = shallow(_ref17);

    _chai.assert.strictEqual(wrapper.props().focusRipple, false, 'should set focusRipple to false');
  });
  it('should render Icon children with right classes', function () {
    var childClassName = 'child-woof';

    var iconChild = _react.default.createElement(_Icon.default, {
      className: childClassName
    });

    var wrapper = shallow(_react.default.createElement(_Button.default, {
      variant: "fab"
    }, iconChild));
    var label = wrapper.childAt(0);
    var renderedIconChild = label.childAt(0);

    _chai.assert.strictEqual(renderedIconChild.type(), _Icon.default);

    _chai.assert.strictEqual(renderedIconChild.hasClass(childClassName), true, 'child should be icon');
  });
  describe('server side', function () {
    // Only run the test on node.
    if (!/jsdom/.test(window.navigator.userAgent)) {
      return;
    }

    it('should server side render', function () {
      var markup = render(_ref18);

      _chai.assert.strictEqual(markup.text(), 'Hello World');
    });
  });
});