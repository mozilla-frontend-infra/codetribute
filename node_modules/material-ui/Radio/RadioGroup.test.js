"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _chai = require("chai");

var _sinon = require("sinon");

var _testUtils = require("../test-utils");

var _FormGroup = _interopRequireDefault(require("../Form/FormGroup"));

var _RadioGroup = _interopRequireDefault(require("./RadioGroup"));

var _Radio = _interopRequireDefault(require("./Radio"));

var _ref = _react.default.createElement(_RadioGroup.default, {
  value: ""
});

var _ref2 = _react.default.createElement(_RadioGroup.default, {
  value: ""
});

var _ref3 = _react.default.createElement(_RadioGroup.default, {
  value: ""
}, _react.default.createElement(_Radio.default, null), null);

var _ref4 = _react.default.createElement(_RadioGroup.default, {
  value: ""
}, _react.default.createElement(_Radio.default, null), _react.default.createElement(_Radio.default, null));

var _ref5 = _react.default.createElement(_RadioGroup.default, {
  value: ""
}, _react.default.createElement(_Radio.default, null));

var _ref6 = _react.default.createElement(_RadioGroup.default, {
  value: ""
});

describe('<RadioGroup />', function () {
  var shallow;
  before(function () {
    shallow = (0, _testUtils.createShallow)();
  });
  it('should render a FormGroup with the radiogroup role', function () {
    var wrapper = shallow(_ref);

    _chai.assert.strictEqual(wrapper.type(), _FormGroup.default);

    _chai.assert.strictEqual(wrapper.props().role, 'radiogroup');
  });
  it('should fire the onBlur callback', function () {
    var handleBlur = (0, _sinon.spy)();
    var wrapper = shallow(_react.default.createElement(_RadioGroup.default, {
      value: "",
      onBlur: handleBlur
    }));
    var event = {};
    wrapper.simulate('blur', event);

    _chai.assert.strictEqual(handleBlur.callCount, 1);

    _chai.assert.strictEqual(handleBlur.args[0][0], event);
  });
  it('should fire the onKeyDown callback', function () {
    var handleKeyDown = (0, _sinon.spy)();
    var wrapper = shallow(_react.default.createElement(_RadioGroup.default, {
      value: "",
      onKeyDown: handleKeyDown
    }));
    var event = {};
    wrapper.simulate('keyDown', event);

    _chai.assert.strictEqual(handleKeyDown.callCount, 1);

    _chai.assert.strictEqual(handleKeyDown.args[0][0], event);
  });
  describe('imperative focus()', function () {
    var wrapper;
    beforeEach(function () {
      wrapper = shallow(_ref2);
    });
    it('should focus the first non-disabled radio', function () {
      var radios = [{
        disabled: true,
        focus: (0, _sinon.spy)()
      }, {
        disabled: false,
        focus: (0, _sinon.spy)()
      }, {
        disabled: false,
        focus: (0, _sinon.spy)()
      }];
      wrapper.instance().radios = radios;
      wrapper.instance().focus();

      _chai.assert.strictEqual(radios[1].focus.callCount, 1);
    });
    it('should not focus any radios if all are disabled', function () {
      var radios = [{
        disabled: true,
        focus: (0, _sinon.spy)()
      }, {
        disabled: true,
        focus: (0, _sinon.spy)()
      }, {
        disabled: true,
        focus: (0, _sinon.spy)()
      }];
      wrapper.instance().radios = radios;
      wrapper.instance().focus();

      _chai.assert.strictEqual(radios[0].focus.callCount, 0);

      _chai.assert.strictEqual(radios[1].focus.callCount, 0);

      _chai.assert.strictEqual(radios[2].focus.callCount, 0);
    });
    it('should focus the selected radio', function () {
      var radios = [{
        disabled: true,
        focus: (0, _sinon.spy)()
      }, {
        disabled: false,
        focus: (0, _sinon.spy)()
      }, {
        disabled: false,
        checked: true,
        focus: (0, _sinon.spy)()
      }, {
        disabled: false,
        focus: (0, _sinon.spy)()
      }];
      wrapper.instance().radios = radios;
      wrapper.instance().focus();

      _chai.assert.strictEqual(radios[0].focus.callCount, 0);

      _chai.assert.strictEqual(radios[1].focus.callCount, 0);

      _chai.assert.strictEqual(radios[2].focus.callCount, 1);

      _chai.assert.strictEqual(radios[3].focus.callCount, 0);
    });
    it('should focus the non-disabled radio rather than the disabled selected radio', function () {
      var radios = [{
        disabled: true,
        focus: (0, _sinon.spy)()
      }, {
        disabled: true,
        focus: (0, _sinon.spy)()
      }, {
        disabled: true,
        checked: true,
        focus: (0, _sinon.spy)()
      }, {
        disabled: false,
        focus: (0, _sinon.spy)()
      }];
      wrapper.instance().radios = radios;
      wrapper.instance().focus();

      _chai.assert.strictEqual(radios[0].focus.callCount, 0);

      _chai.assert.strictEqual(radios[1].focus.callCount, 0);

      _chai.assert.strictEqual(radios[2].focus.callCount, 0);

      _chai.assert.strictEqual(radios[3].focus.callCount, 1);
    });
    it('should be able to focus with no radios', function () {
      wrapper.instance().radios = [];
      wrapper.instance().focus();
    });
  });
  it('should accept invalid child', function () {
    shallow(_ref3);
  });
  describe('children radios fire change event', function () {
    var wrapper;
    beforeEach(function () {
      wrapper = shallow(_ref4);
    });
    it('should fire onChange', function () {
      var internalRadio = wrapper.children().first();
      var event = {
        target: {
          value: 'woofRadioGroup'
        }
      };
      var onChangeSpy = (0, _sinon.spy)();
      wrapper.setProps({
        onChange: onChangeSpy
      });
      internalRadio.simulate('change', event, true);

      _chai.assert.strictEqual(onChangeSpy.callCount, 1);

      _chai.assert.strictEqual(onChangeSpy.calledWith(event), true);
    });
    it('should not fire onChange if not checked', function () {
      var internalRadio = wrapper.children().first();
      var onChangeSpy = (0, _sinon.spy)();
      wrapper.setProps({
        onChange: onChangeSpy
      });
      internalRadio.simulate('change', {
        target: {
          value: 'woofRadioGroup'
        }
      }, false);

      _chai.assert.strictEqual(onChangeSpy.callCount, 0);
    });
  });
  describe('register internal radios to this.radio', function () {
    var mount;
    before(function () {
      mount = (0, _testUtils.createMount)();
    });
    after(function () {
      mount.cleanUp();
    });
    it('should add a child', function () {
      var wrapper = mount(_ref5);

      _chai.assert.strictEqual(wrapper.instance().radios.length, 1);
    });
    it('should keep radios empty', function () {
      var wrapper = mount(_ref6);

      _chai.assert.strictEqual(wrapper.instance().radios.length, 0);
    });
  });
});