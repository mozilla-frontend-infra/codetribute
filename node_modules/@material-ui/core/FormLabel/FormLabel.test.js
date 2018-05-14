"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _chai = require("chai");

var _testUtils = require("../test-utils");

var _FormLabel = _interopRequireDefault(require("./FormLabel"));

var _ref = _react.default.createElement(_FormLabel.default, null);

var _ref2 = _react.default.createElement(_FormLabel.default, {
  className: "woofFormLabel"
});

var _ref3 = _react.default.createElement(_FormLabel.default, {
  required: true
});

var _ref4 = _react.default.createElement(_FormLabel.default, null);

var _ref5 = _react.default.createElement(_FormLabel.default, {
  required: true,
  error: true
});

var _ref6 = _react.default.createElement(_FormLabel.default, null, "Foo");

describe('<FormLabel />', function () {
  var shallow;
  var classes;
  before(function () {
    shallow = (0, _testUtils.createShallow)({
      dive: true
    });
    classes = (0, _testUtils.getClasses)(_ref);
  });
  it('should render a <label />', function () {
    var wrapper = shallow(_ref2);

    _chai.assert.strictEqual(wrapper.name(), 'label');

    _chai.assert.strictEqual(wrapper.hasClass(classes.root), true);

    _chai.assert.strictEqual(wrapper.hasClass('woofFormLabel'), true, 'should have the user class');
  });
  describe('prop: required', function () {
    it('should show an asterisk if required is set', function () {
      var wrapper = shallow(_ref3);
      var text = wrapper.text();

      _chai.assert.strictEqual(text.slice(-1), '*', 'should show an asterisk at the end');

      _chai.assert.strictEqual(wrapper.find('[data-mui-test="FormLabelAsterisk"]').length, 1);
    });
    it('should not show an asterisk by default', function () {
      var wrapper = shallow(_ref4);

      _chai.assert.strictEqual(wrapper.find('[data-mui-test="FormLabelAsterisk"]').length, 0);

      _chai.assert.strictEqual(wrapper.text().includes('*'), false, 'should not show an asterisk');
    });
  });
  describe('prop: error', function () {
    it('should have an error class', function () {
      var wrapper = shallow(_ref5);
      var asteriskWrapper = wrapper.find('[data-mui-test="FormLabelAsterisk"]');

      _chai.assert.strictEqual(asteriskWrapper.length, 1);

      _chai.assert.strictEqual(asteriskWrapper.hasClass(classes.error), true);

      _chai.assert.strictEqual(wrapper.hasClass(classes.error), true, 'should have the error class');
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
      wrapper = shallow(_ref6);
    });
    ['error', 'focused'].forEach(function (visualState) {
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
    describe('required', function () {
      beforeEach(function () {
        setFormControlContext({
          required: true
        });
      });
      it('should show an asterisk', function () {
        _chai.assert.strictEqual(wrapper.find('[data-mui-test="FormLabelAsterisk"]').length, 1);
      });
      it('should be overridden by props', function () {
        _chai.assert.strictEqual(wrapper.find('[data-mui-test="FormLabelAsterisk"]').length, 1);

        wrapper.setProps({
          required: false
        });

        _chai.assert.strictEqual(wrapper.find('[data-mui-test="FormLabelAsterisk"]').length, 0);

        wrapper.setProps({
          required: true
        });

        _chai.assert.strictEqual(wrapper.find('[data-mui-test="FormLabelAsterisk"]').length, 1);
      });
    });
  });
});