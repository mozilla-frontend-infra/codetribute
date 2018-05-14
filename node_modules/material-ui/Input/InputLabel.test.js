"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _chai = require("chai");

var _testUtils = require("../test-utils");

var _Form = require("../Form");

var _InputLabel = _interopRequireDefault(require("./InputLabel"));

var _ref = _react.default.createElement(_InputLabel.default, null);

var _ref2 = _react.default.createElement(_InputLabel.default, null, "Foo");

var _ref3 = _react.default.createElement(_InputLabel.default, null, "Foo");

var _ref4 = _react.default.createElement(_InputLabel.default, {
  disableAnimation: true
}, "Foo");

var _ref5 = _react.default.createElement(_InputLabel.default, null);

describe('<InputLabel />', function () {
  var shallow;
  var classes;
  before(function () {
    shallow = (0, _testUtils.createShallow)({
      dive: true
    });
    classes = (0, _testUtils.getClasses)(_ref);
  });
  it('should render a FormLabel', function () {
    var wrapper = shallow(_ref2);

    _chai.assert.strictEqual(wrapper.type(), _Form.FormLabel);

    _chai.assert.strictEqual(wrapper.childAt(0).text(), 'Foo');
  });
  it('should have the root and animated classes by default', function () {
    var wrapper = shallow(_ref3);

    _chai.assert.strictEqual(wrapper.hasClass(classes.root), true);

    _chai.assert.strictEqual(wrapper.hasClass(classes.animated), true);
  });
  it('should not have the animated class when disabled', function () {
    var wrapper = shallow(_ref4);

    _chai.assert.strictEqual(wrapper.hasClass(classes.animated), false);
  });
  describe('prop: FormLabelClasses', function () {
    it('should be able to change the FormLabel style', function () {
      var wrapper = shallow(_react.default.createElement(_InputLabel.default, {
        FormLabelClasses: {
          foo: 'bar'
        }
      }, "Foo"));

      _chai.assert.strictEqual(wrapper.props().classes.foo, 'bar');
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
    it('should have the formControl class', function () {
      setFormControlContext({});

      _chai.assert.strictEqual(wrapper.hasClass(classes.formControl), true);
    });
    it('should have the labelDense class when margin is dense', function () {
      setFormControlContext({
        margin: 'dense'
      });

      _chai.assert.strictEqual(wrapper.hasClass(classes.marginDense), true);
    });
    ['filled', 'focused'].forEach(function (state) {
      describe(state, function () {
        beforeEach(function () {
          setFormControlContext((0, _defineProperty2.default)({}, state, true));
        });
        it('should have the shrink class', function () {
          _chai.assert.strictEqual(wrapper.hasClass(classes.shrink), true);
        });
        it('should be overridden by the shrink prop', function () {
          _chai.assert.strictEqual(wrapper.hasClass(classes.shrink), true);

          wrapper.setProps({
            shrink: false
          });

          _chai.assert.strictEqual(wrapper.hasClass(classes.shrink), false);

          wrapper.setProps({
            shrink: true
          });

          _chai.assert.strictEqual(wrapper.hasClass(classes.shrink), true);
        });
      });
    });
  });
});