"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _chai = require("chai");

var _testUtils = require("../test-utils");

var _Paper = _interopRequireDefault(require("../Paper"));

var _Fade = _interopRequireDefault(require("../transitions/Fade"));

var _Modal = _interopRequireDefault(require("../Modal"));

var _Dialog = _interopRequireDefault(require("./Dialog"));

var _ref = _react.default.createElement("p", null, "Hello");

var _ref2 = _react.default.createElement(_Dialog.default, {
  open: true
}, "foo");

describe('<Dialog />', function () {
  var shallow;
  var classes;
  var defaultProps = {
    open: false
  };
  before(function () {
    shallow = (0, _testUtils.createShallow)({
      dive: true
    });
    classes = (0, _testUtils.getClasses)(_react.default.createElement(_Dialog.default, defaultProps, "foo"));
  });
  it('should render a Modal', function () {
    var wrapper = shallow(_react.default.createElement(_Dialog.default, defaultProps, "foo"));

    _chai.assert.strictEqual(wrapper.type(), _Modal.default);
  });
  it('should render a Modal with TransitionComponent', function () {
    var Transition = function Transition(props) {
      return _react.default.createElement("div", (0, _extends2.default)({
        className: "cloned-element-class"
      }, props));
    };

    var wrapper = shallow(_react.default.createElement(_Dialog.default, (0, _extends2.default)({}, defaultProps, {
      TransitionComponent: Transition
    }), "foo"));

    _chai.assert.strictEqual(wrapper.find(Transition).length, 1, 'should include element given in TransitionComponent');
  });
  it('should put Modal specific props on the root Modal node', function () {
    var onBackdropClick = function onBackdropClick() {};

    var onEscapeKeyDown = function onEscapeKeyDown() {};

    var onClose = function onClose() {};

    var wrapper = shallow(_react.default.createElement(_Dialog.default, {
      open: true,
      transitionDuration: 100,
      onBackdropClick: onBackdropClick,
      onEscapeKeyDown: onEscapeKeyDown,
      onClose: onClose,
      hideOnBackdropClick: false,
      hideOnEscapeKeyUp: false
    }, "foo"));

    _chai.assert.strictEqual(wrapper.props().open, true);

    _chai.assert.strictEqual(wrapper.props().BackdropProps.transitionDuration, 100);

    _chai.assert.strictEqual(wrapper.props().onBackdropClick, onBackdropClick);

    _chai.assert.strictEqual(wrapper.props().onEscapeKeyDown, onEscapeKeyDown);

    _chai.assert.strictEqual(wrapper.props().onClose, onClose);

    _chai.assert.strictEqual(wrapper.props().hideOnBackdropClick, false);

    _chai.assert.strictEqual(wrapper.props().hideOnEscapeKeyUp, false);
  });
  it('should spread custom props on the paper (dialog "root") node', function () {
    var wrapper = shallow(_react.default.createElement(_Dialog.default, (0, _extends2.default)({}, defaultProps, {
      "data-my-prop": "woofDialog"
    }), "foo"));

    _chai.assert.strictEqual(wrapper.prop('data-my-prop'), 'woofDialog', 'custom prop should be woofDialog');
  });
  it('should render with the user classes on the root node', function () {
    var wrapper = shallow(_react.default.createElement(_Dialog.default, (0, _extends2.default)({}, defaultProps, {
      className: "woofDialog"
    }), "foo"));

    _chai.assert.strictEqual(wrapper.hasClass('woofDialog'), true);
  });
  it('should render Fade > Paper > children inside the Modal', function () {
    var children = _ref;
    var wrapper = shallow(_react.default.createElement(_Dialog.default, defaultProps, children));
    var fade = wrapper.childAt(0);

    _chai.assert.strictEqual(fade.type(), _Fade.default);

    var paper = fade.childAt(0);

    _chai.assert.strictEqual(paper.length === 1 && paper.type(), _Paper.default);

    _chai.assert.strictEqual(paper.hasClass(classes.paper), true, 'should have the dialog class');
  });
  it('should not be open by default', function () {
    var wrapper = shallow(_react.default.createElement(_Dialog.default, defaultProps, "foo"));

    _chai.assert.strictEqual(wrapper.props().open, false, 'should pass show=false to the Modal');

    _chai.assert.strictEqual(wrapper.find(_Fade.default).props().in, false, 'should pass in=false to the Fade');
  });
  it('should be open by default', function () {
    var wrapper = shallow(_ref2);

    _chai.assert.strictEqual(wrapper.props().open, true, 'should pass show=true to the Modal');

    _chai.assert.strictEqual(wrapper.find(_Fade.default).props().in, true, 'should pass in=true to the Fade');
  });
  it('should fade down and make the transition appear on first mount', function () {
    var wrapper = shallow(_react.default.createElement(_Dialog.default, defaultProps, "foo"));

    _chai.assert.strictEqual(wrapper.find(_Fade.default).props().appear, true, 'should pass appear=true to the Fade');
  });
  describe('prop: classes', function () {
    it('should add the class on the Paper element', function () {
      var className = 'foo';
      var wrapper = shallow(_react.default.createElement(_Dialog.default, (0, _extends2.default)({}, defaultProps, {
        classes: {
          paper: className
        }
      }), "foo"));

      _chai.assert.strictEqual(wrapper.find(_Paper.default).hasClass(className), true);
    });
  });
  describe('prop: maxWidth', function () {
    it('should use the right className', function () {
      var wrapper = shallow(_react.default.createElement(_Dialog.default, (0, _extends2.default)({}, defaultProps, {
        maxWidth: "xs"
      }), "foo"));

      _chai.assert.strictEqual(wrapper.find(_Paper.default).hasClass(classes.paperWidthXs), true);
    });
  });
  describe('prop: fullWidth', function () {
    it('should set `fullWidth` class if specified', function () {
      var wrapper = shallow(_react.default.createElement(_Dialog.default, (0, _extends2.default)({}, defaultProps, {
        fullWidth: true
      }), "foo"));

      _chai.assert.strictEqual(wrapper.find(_Paper.default).hasClass(classes.paperFullWidth), true);
    });
    it('should not set `fullWidth` class if not specified', function () {
      var wrapper = shallow(_react.default.createElement(_Dialog.default, defaultProps, "foo"));

      _chai.assert.strictEqual(wrapper.find(_Paper.default).hasClass(classes.paperFullWidth), false);
    });
  });
  describe('prop: fullScreen', function () {
    it('true should render fullScreen', function () {
      var wrapper = shallow(_react.default.createElement(_Dialog.default, (0, _extends2.default)({}, defaultProps, {
        fullScreen: true
      }), "foo"));

      _chai.assert.strictEqual(wrapper.find(_Paper.default).hasClass(classes.paperFullScreen), true);
    });
    it('false should not render fullScreen', function () {
      var wrapper = shallow(_react.default.createElement(_Dialog.default, (0, _extends2.default)({}, defaultProps, {
        fullScreen: false
      }), "foo"));

      _chai.assert.strictEqual(wrapper.find(_Paper.default).hasClass(classes.paperFullScreen), false);
    });
  });
});