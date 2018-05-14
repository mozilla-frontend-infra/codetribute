"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _chai = require("chai");

var _testUtils = require("../test-utils");

var _Input = _interopRequireWildcard(require("../Input"));

var _FormHelperText = _interopRequireDefault(require("../Form/FormHelperText"));

var _FormControl = _interopRequireDefault(require("../Form/FormControl"));

var _TextField = _interopRequireDefault(require("./TextField"));

var _Select = _interopRequireDefault(require("../Select/Select"));

var _ref = _react.default.createElement(_TextField.default, null);

var _ref2 = _react.default.createElement(_TextField.default, {
  multiline: true
});

var _ref3 = _react.default.createElement(_TextField.default, {
  fullWidth: true
});

describe('<TextField />', function () {
  var shallow;
  var mount;
  before(function () {
    shallow = (0, _testUtils.createShallow)();
    mount = (0, _testUtils.createMount)();
  });
  after(function () {
    mount.cleanUp();
  });
  describe('shallow', function () {
    var wrapper;
    beforeEach(function () {
      wrapper = shallow(_ref);
    });
    describe('structure', function () {
      it('should be a FormControl', function () {
        _chai.assert.strictEqual(wrapper.type(), _FormControl.default);
      });
      it('should pass className to the FormControl', function () {
        wrapper.setProps({
          className: 'foo'
        });

        _chai.assert.strictEqual(wrapper.dive().hasClass('foo'), true);
      });
      it('should pass margin to the FormControl', function () {
        wrapper.setProps({
          margin: 'normal'
        });

        _chai.assert.strictEqual(wrapper.dive().props().margin, 'normal');
      });
      it('should have an Input as the only child', function () {
        _chai.assert.strictEqual(wrapper.children().length, 1);

        _chai.assert.strictEqual(wrapper.childAt(0).type(), _Input.default);
      });
      it('should forward the multiline prop to Input', function () {
        wrapper = shallow(_ref2);

        _chai.assert.strictEqual(wrapper.childAt(0).props().multiline, true);
      });
      it('should forward the fullWidth prop to Input', function () {
        wrapper = shallow(_ref3);

        _chai.assert.strictEqual(wrapper.childAt(0).props().fullWidth, true);
      });
    });
    describe('with a label', function () {
      beforeEach(function () {
        wrapper.setProps({
          label: 'Foo bar'
        });
      });
      it('should have 2 children', function () {
        _chai.assert.strictEqual(wrapper.children().length, 2);
      });
      it('should have an InputLabel as the first child', function () {
        _chai.assert.strictEqual(wrapper.childAt(0).type(), _Input.InputLabel);
      });
      it('should apply the className to the InputLabel', function () {
        wrapper.setProps({
          InputLabelProps: {
            className: 'foo'
          }
        });

        _chai.assert.strictEqual(wrapper.find(_Input.InputLabel).hasClass('foo'), true);
      });
      it('should have an Input as the second child', function () {
        _chai.assert.strictEqual(wrapper.childAt(1).type(), _Input.default);
      });
    });
    describe('with a helper text', function () {
      beforeEach(function () {
        wrapper.setProps({
          helperText: 'Foo bar'
        });
      });
      it('should have 2 children', function () {
        _chai.assert.strictEqual(wrapper.children().length, 2);
      });
      it('should have an FormHelperText as the second child', function () {
        _chai.assert.strictEqual(wrapper.childAt(1).type(), _FormHelperText.default);
      });
      it('should apply the className to the FormHelperText', function () {
        wrapper.setProps({
          FormHelperTextProps: {
            className: 'foo'
          }
        });

        _chai.assert.strictEqual(wrapper.find(_FormHelperText.default).hasClass('foo'), true);
      });
      it('should have an Input as the first child', function () {
        _chai.assert.strictEqual(wrapper.childAt(0).type(), _Input.default);
      });
    });
    describe('prop: InputProps', function () {
      it('should apply additional properties to the Input component', function () {
        wrapper.setProps({
          InputProps: {
            inputClassName: 'fullWidth'
          }
        });

        _chai.assert.strictEqual(wrapper.find(_Input.default).props().inputClassName, 'fullWidth');
      });
    });
  });
  describe('prop: InputProps', function () {
    it('should apply additional properties to the Input component', function () {
      var wrapper = mount(_react.default.createElement(_TextField.default, {
        InputProps: {
          readOnly: true
        }
      }));

      _chai.assert.strictEqual(wrapper.find('input').props().readOnly, true);
    });
  });
  describe('prop: select', function () {
    it('should be able to render a select as expected', function () {
      var currencies = [{
        value: 'USD',
        label: '$'
      }, {
        value: 'BTC',
        label: '฿'
      }];
      var wrapper = shallow(_react.default.createElement(_TextField.default, {
        select: true,
        SelectProps: {
          native: true
        }
      }, currencies.map(function (option) {
        return _react.default.createElement("option", {
          key: option.value,
          value: option.value
        }, option.label);
      })));

      _chai.assert.strictEqual(wrapper.childAt(0).type(), _Select.default);

      _chai.assert.strictEqual(wrapper.childAt(0).props().input.type, _Input.default);

      _chai.assert.strictEqual(wrapper.childAt(0).children().every('option'), true);
    });
  });
});