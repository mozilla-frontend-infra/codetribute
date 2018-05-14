"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _chai = require("chai");

var _testUtils = require("../test-utils");

var _FormHelperText = _interopRequireDefault(require("./FormHelperText"));

var _ref = _react.default.createElement(_FormHelperText.default, null);

var _ref2 = _react.default.createElement(_FormHelperText.default, {
  className: "woofHelperText"
});

var _ref3 = _react.default.createElement(_FormHelperText.default, {
  component: "div"
});

var _ref4 = _react.default.createElement(_FormHelperText.default, {
  error: true
});

var _ref5 = _react.default.createElement(_FormHelperText.default, null, "Foo");

describe('<FormHelperText />', function () {
  var shallow;
  var classes;
  before(function () {
    shallow = (0, _testUtils.createShallow)({
      dive: true
    });
    classes = (0, _testUtils.getClasses)(_ref);
  });
  it('should render a <p />', function () {
    var wrapper = shallow(_ref2);

    _chai.assert.strictEqual(wrapper.name(), 'p');

    _chai.assert.strictEqual(wrapper.hasClass(classes.root), true);

    _chai.assert.strictEqual(wrapper.hasClass('woofHelperText'), true, 'should have the user class');
  });
  describe('prop: component', function () {
    it('should render the prop component', function () {
      var wrapper = shallow(_ref3);

      _chai.assert.strictEqual(wrapper.name(), 'div');
    });
  });
  describe('prop: error', function () {
    it('should have an error class', function () {
      var wrapper = shallow(_ref4);

      _chai.assert.strictEqual(wrapper.hasClass(classes.error), true);
    });
  });
  describe('with muiFormControl context', function () {
    var wrapper;
    var muiFormControl;

    function setFormControlContext(muiFormControlContext) {
      muiFormControl = muiFormControlContext;
      wrapper.setContext({
        muiFormControl: muiFormControl
      });
    }

    beforeEach(function () {
      wrapper = shallow(_ref5);
    });
    ['error', 'disabled'].forEach(function (visualState) {
      describe(visualState, function () {
        beforeEach(function () {
          setFormControlContext((0, _defineProperty2.default)({}, visualState, true));
        });
        it("should have the ".concat(visualState, " class"), function () {
          _chai.assert.strictEqual(wrapper.hasClass(classes[visualState]), true);
        });
        it('should be overridden by props', function () {
          _chai.assert.strictEqual(wrapper.hasClass(classes[visualState]), true);

          wrapper.setProps((0, _defineProperty2.default)({}, visualState, false));

          _chai.assert.strictEqual(wrapper.hasClass(classes[visualState]), false);

          wrapper.setProps((0, _defineProperty2.default)({}, visualState, true));

          _chai.assert.strictEqual(wrapper.hasClass(classes[visualState]), true);
        });
      });
    });
    describe('margin', function () {
      describe('context margin: dense', function () {
        beforeEach(function () {
          setFormControlContext({
            margin: 'dense'
          });
        });
        it('should have the dense class', function () {
          _chai.assert.strictEqual(wrapper.hasClass(classes.marginDense), true);
        });
      });
      it('should be overridden by props', function () {
        _chai.assert.strictEqual(wrapper.hasClass(classes.marginDense), false);

        wrapper.setProps({
          margin: 'dense'
        });

        _chai.assert.strictEqual(wrapper.hasClass(classes.marginDense), true);
      });
    });
  });
});