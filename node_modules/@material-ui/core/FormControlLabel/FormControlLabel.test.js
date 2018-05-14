"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _chai = require("chai");

var _testUtils = require("../test-utils");

var _Checkbox = _interopRequireDefault(require("../Checkbox"));

var _FormControlLabel = _interopRequireDefault(require("./FormControlLabel"));

var _ref = _react.default.createElement(_FormControlLabel.default, {
  label: "Pizza",
  control: _react.default.createElement("div", null)
});

var _ref2 = _react.default.createElement(_FormControlLabel.default, {
  label: "Pizza",
  control: _react.default.createElement("div", null)
});

var _ref3 = _react.default.createElement(_FormControlLabel.default, {
  label: "Pizza",
  disabled: true,
  control: _react.default.createElement("div", null)
});

var _ref4 = _react.default.createElement(_FormControlLabel.default, {
  label: "Pizza",
  control: _react.default.createElement("div", {
    disabled: true
  })
});

var _ref5 = _react.default.createElement(_FormControlLabel.default, {
  label: "Pizza",
  control: _react.default.createElement(_Checkbox.default, null)
});

var _ref6 = _react.default.createElement(_FormControlLabel.default, {
  label: "Pizza",
  control: _react.default.createElement("div", null)
});

describe('FormControlLabel', function () {
  var shallow;
  var mount;
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
  it('should render the label text inside an additional element', function () {
    var wrapper = shallow(_ref2);
    var label = wrapper.childAt(1);

    _chai.assert.strictEqual(wrapper.name(), 'label');

    _chai.assert.strictEqual(label.childAt(0).text(), 'Pizza', 'should be the label text');

    _chai.assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the "root" class');
  });
  describe('prop: disabled', function () {
    it('should disable everything', function () {
      var wrapper = shallow(_ref3);
      var label = wrapper.childAt(1);

      _chai.assert.strictEqual(wrapper.hasClass(classes.disabled), true, 'should have the disabled class');

      _chai.assert.strictEqual(wrapper.hasClass(classes.disabled), true);

      _chai.assert.strictEqual(wrapper.find('div').props().disabled, true);

      _chai.assert.strictEqual(label.hasClass(classes.disabled), true);
    });
    it('should disable everything', function () {
      var wrapper = shallow(_ref4);
      var label = wrapper.childAt(1);

      _chai.assert.strictEqual(wrapper.hasClass(classes.disabled), true, 'should have the disabled class');

      _chai.assert.strictEqual(wrapper.hasClass(classes.disabled), true);

      _chai.assert.strictEqual(wrapper.find('div').props().disabled, true);

      _chai.assert.strictEqual(label.hasClass(classes.disabled), true);
    });
  });
  it('should mount without issue', function () {
    var wrapper = mount(_ref5);

    _chai.assert.strictEqual(wrapper.type(), _FormControlLabel.default);
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
    describe('enabled', function () {
      beforeEach(function () {
        setFormControlContext({});
      });
      it('should not have the disabled class', function () {
        _chai.assert.strictEqual(wrapper.hasClass(classes.disabled), false);
      });
      it('should be overridden by props', function () {
        _chai.assert.strictEqual(wrapper.hasClass(classes.disabled), false);

        wrapper.setProps({
          disabled: true
        });

        _chai.assert.strictEqual(wrapper.hasClass(classes.disabled), true);
      });
    });
    describe('disabled', function () {
      beforeEach(function () {
        setFormControlContext({
          disabled: true
        });
      });
      it('should have the disabled class', function () {
        _chai.assert.strictEqual(wrapper.hasClass(classes.disabled), true);
      });
      it('should honor props', function () {
        _chai.assert.strictEqual(wrapper.hasClass(classes.disabled), true);

        wrapper.setProps({
          disabled: false
        });

        _chai.assert.strictEqual(wrapper.hasClass(classes.disabled), false);
      });
    });
  });
});