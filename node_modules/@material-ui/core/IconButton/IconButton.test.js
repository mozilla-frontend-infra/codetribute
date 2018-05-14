"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _sinon = require("sinon");

var _chai = require("chai");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _testUtils = require("../test-utils");

var _Icon = _interopRequireDefault(require("../Icon"));

var _ButtonBase = _interopRequireDefault(require("../ButtonBase"));

var _IconButton = _interopRequireDefault(require("./IconButton"));

var _ref = _react.default.createElement(_IconButton.default, null);

var _ref2 = _react.default.createElement(_IconButton.default, null, "book");

var _ref3 = _react.default.createElement(_IconButton.default, null, "book");

var _ref4 = _react.default.createElement("p", null, "H");

var _ref5 = _react.default.createElement(_IconButton.default, null, "book");

var _ref6 = _react.default.createElement(_IconButton.default, {
  disableRipple: true
}, "book");

var _ref7 = _react.default.createElement(_IconButton.default, {
  "data-test": "hello",
  disableRipple: true
}, "book");

var _ref8 = _react.default.createElement(_IconButton.default, {
  className: "woofIconButton"
}, "book");

var _ref9 = _react.default.createElement(_IconButton.default, null, "book");

var _ref10 = _react.default.createElement(_IconButton.default, {
  disabled: true
}, "book");

describe('<IconButton />', function () {
  var shallow;
  var classes;
  var mount;
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
  it('should render an inner label span (bloody safari)', function () {
    var wrapper = shallow(_ref3);
    var label = wrapper.childAt(0);

    _chai.assert.strictEqual(label.hasClass(classes.label), true, 'should have the label class');

    _chai.assert.strictEqual(label.is('span'), true, 'should be a span');
  });
  it('should render the child normally inside the label span', function () {
    var child = _ref4;
    var wrapper = shallow(_react.default.createElement(_IconButton.default, null, child));
    var label = wrapper.childAt(0);
    var icon = label.childAt(0);

    _chai.assert.strictEqual(icon.equals(child), true, 'should be the child');
  });
  it('should render Icon children with right classes', function () {
    var childClassName = 'child-woof';

    var iconChild = _react.default.createElement(_Icon.default, {
      className: childClassName
    });

    var wrapper = shallow(_react.default.createElement(_IconButton.default, null, iconChild));
    var label = wrapper.childAt(0);
    var renderedIconChild = label.childAt(0);

    _chai.assert.strictEqual(renderedIconChild.type(), _Icon.default);

    _chai.assert.strictEqual(renderedIconChild.hasClass(childClassName), true, 'child should be icon');
  });
  it('should have a ripple by default', function () {
    var wrapper = shallow(_ref5);

    _chai.assert.strictEqual(wrapper.props().disableRipple, undefined);
  });
  it('should pass disableRipple to ButtonBase', function () {
    var wrapper = shallow(_ref6);

    _chai.assert.strictEqual(wrapper.props().disableRipple, true);
  });
  it('should spread props on ButtonBase', function () {
    var wrapper = shallow(_ref7);

    _chai.assert.strictEqual(wrapper.prop('data-test'), 'hello', 'should be spread on the ButtonBase');

    _chai.assert.strictEqual(wrapper.props().disableRipple, true);
  });
  it('should render with the user and root classes', function () {
    var wrapper = shallow(_ref8);

    _chai.assert.strictEqual(wrapper.hasClass('woofIconButton'), true);

    _chai.assert.strictEqual(wrapper.hasClass(classes.root), true);
  });
  it('should pass centerRipple={true} to ButtonBase', function () {
    var wrapper = shallow(_ref9);

    _chai.assert.strictEqual(wrapper.props().centerRipple, true, 'should set centerRipple to true');
  });
  describe('prop: disabled', function () {
    it('should disable the component', function () {
      var wrapper = shallow(_ref10);

      _chai.assert.strictEqual(wrapper.props().disabled, true, 'should pass the property down the tree');

      _chai.assert.strictEqual(wrapper.hasClass(classes.disabled), true, 'should add the disabled class');
    });
  });
  describe('prop: ref', function () {
    it('should give a reference on the native button', function () {
      function IconButtonRef(props) {
        return _react.default.createElement(_IconButton.default, {
          ref: props.rootRef
        });
      }

      IconButtonRef.propTypes = process.env.NODE_ENV !== "production" ? {
        rootRef: _propTypes.default.func.isRequired
      } : {};
      var ref = (0, _sinon.spy)();
      mount(_react.default.createElement(IconButtonRef, {
        rootRef: ref
      }));

      _chai.assert.strictEqual(ref.callCount, 1);

      _chai.assert.strictEqual(_reactDom.default.findDOMNode(ref.args[0][0]).type, 'button');
    });
  });
});