"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _keys = _interopRequireDefault(require("@babel/runtime/core-js/object/keys"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _chai = require("chai");

var _sinon = require("sinon");

var _testUtils = require("../test-utils");

var _SwitchBase = _interopRequireDefault(require("./SwitchBase"));

var _IconButton = _interopRequireDefault(require("../IconButton"));

var _Icon = _interopRequireDefault(require("../Icon"));

function assertIsChecked(wrapper) {
  var iconButton = wrapper.find('span').at(0);

  _chai.assert.strictEqual(iconButton.hasClass('test-class-checked'), true, 'should have the checked class on the root node');

  var input = wrapper.find('input');

  _chai.assert.strictEqual(input.instance().checked, true, 'the DOM node should be checked');

  var label = iconButton.childAt(0);
  var icon = label.childAt(0);

  _chai.assert.strictEqual(icon.is('h2'), true, 'should be the checked icon');
}

function assertIsNotChecked(wrapper) {
  var iconButton = wrapper.find('span').at(0);

  _chai.assert.strictEqual(iconButton.hasClass('test-class-checked'), false, 'should not have the checked class on the root node');

  var input = wrapper.find('input');

  _chai.assert.strictEqual(input.instance().checked, false, 'the DOM node should not be checked');

  var label = iconButton.childAt(0);
  var icon = label.childAt(0);

  _chai.assert.strictEqual(icon.is('h1'), true, 'should be the icon');
}

var _ref = _react.default.createElement("h1", null, "h1");

var _ref2 = _react.default.createElement("h2", null, "h2");

var _ref3 = _react.default.createElement(_Icon.default, null, "heart");

describe('<SwitchBase />', function () {
  var shallow;
  var mount;
  var classes;
  var SwitchBaseNaked;
  var defaultProps = {
    icon: _ref,
    checkedIcon: _ref2
  };
  before(function () {
    SwitchBaseNaked = (0, _testUtils.unwrap)(_SwitchBase.default);
    shallow = (0, _testUtils.createShallow)({
      dive: true
    });
    mount = (0, _testUtils.createMount)();
    classes = (0, _testUtils.getClasses)(_react.default.createElement(_SwitchBase.default, defaultProps));
  });
  after(function () {
    mount.cleanUp();
  });
  it('should render an IconButton', function () {
    var wrapper = shallow(_react.default.createElement(_SwitchBase.default, defaultProps));

    _chai.assert.strictEqual(wrapper.type(), _IconButton.default);
  });
  it('should render an icon and input inside the button by default', function () {
    var wrapper = shallow(_react.default.createElement(_SwitchBase.default, defaultProps));

    _chai.assert.strictEqual(wrapper.childAt(0).is('h1'), true, 'should be the icon');

    _chai.assert.strictEqual(wrapper.childAt(1).is('input[type="checkbox"]'), true, 'should be a checkbox input');
  });
  it('should have a ripple by default', function () {
    var wrapper = shallow(_react.default.createElement(_SwitchBase.default, defaultProps));

    _chai.assert.strictEqual(wrapper.props().disableRipple, undefined);
  });
  it('should pass disableRipple={true} to IconButton', function () {
    var wrapper = shallow(_react.default.createElement(_SwitchBase.default, (0, _extends2.default)({}, defaultProps, {
      disableRipple: true
    })));

    _chai.assert.strictEqual(wrapper.props().disableRipple, true, 'should set disableRipple to true');
  }); // className is put on the root node, this is a special case!

  it('should render with the user and root classes', function () {
    var wrapper = shallow(_react.default.createElement(_SwitchBase.default, (0, _extends2.default)({}, defaultProps, {
      className: "woofSwitchBase"
    })));

    _chai.assert.strictEqual(wrapper.hasClass('woofSwitchBase'), true);

    _chai.assert.strictEqual(wrapper.hasClass(classes.root), true);
  });
  it('should spread custom props on the root node', function () {
    var wrapper = shallow(_react.default.createElement(_SwitchBase.default, (0, _extends2.default)({}, defaultProps, {
      "data-my-prop": "woofSwitchBase"
    })));

    _chai.assert.strictEqual(wrapper.props()['data-my-prop'], 'woofSwitchBase', 'custom prop should be woofSwitchBase');
  });
  it('should pass tabIndex to the input so it can be taken out of focus rotation', function () {
    var wrapper = shallow(_react.default.createElement(_SwitchBase.default, (0, _extends2.default)({}, defaultProps, {
      tabIndex: -1
    })));
    var input = wrapper.find('input');

    _chai.assert.strictEqual(input.props().tabIndex, -1);
  });
  it('should pass value, disabled, checked, and name to the input', function () {
    var props = {
      name: 'gender',
      disabled: true,
      value: 'male'
    };
    var wrapper = shallow(_react.default.createElement(_SwitchBase.default, (0, _extends2.default)({}, defaultProps, props)));
    var input = wrapper.find('input');
    (0, _keys.default)(props).forEach(function (n) {
      _chai.assert.strictEqual(input.props()[n], props[n]);
    });
  });
  it('should disable the components, and render the IconButton with the disabled className', function () {
    var wrapper = shallow(_react.default.createElement(_SwitchBase.default, (0, _extends2.default)({}, defaultProps, {
      disabled: true
    })));

    _chai.assert.strictEqual(wrapper.props().disabled, true, 'should disable the root node');

    _chai.assert.strictEqual(wrapper.childAt(1).props().disabled, true, 'should disable the input node');
  });
  it('should apply the custom disabled className when disabled', function () {
    var disabledClassName = 'foo';
    var wrapperA = shallow(_react.default.createElement(_SwitchBase.default, (0, _extends2.default)({}, defaultProps, {
      disabled: true,
      classes: {
        disabled: disabledClassName
      }
    })));

    _chai.assert.strictEqual(wrapperA.hasClass(disabledClassName), true, 'should have the custom disabled class');

    wrapperA.setProps({
      disabled: false
    });
    wrapperA.setProps({
      checked: true
    });

    _chai.assert.strictEqual(wrapperA.hasClass(disabledClassName), false, 'should not have the custom disabled class');
  });
  describe('controlled', function () {
    var wrapper;
    beforeEach(function () {
      wrapper = mount(_react.default.createElement(SwitchBaseNaked, (0, _extends2.default)({}, defaultProps, {
        classes: {
          checked: 'test-class-checked'
        },
        className: "test-class",
        checked: false
      })));
    });
    it('should recognize a controlled input', function () {
      _chai.assert.strictEqual(wrapper.instance().isControlled, true, 'should set instance.isControlled to true');

      assertIsNotChecked(wrapper);
    });
    it('should check the checkbox', function () {
      wrapper.setProps({
        checked: true
      });
      assertIsChecked(wrapper);
    });
    it('should uncheck the checkbox', function () {
      wrapper.setProps({
        checked: true
      });
      wrapper.setProps({
        checked: false
      });
      assertIsNotChecked(wrapper);
    });
  });
  describe('prop: defaultChecked', function () {
    it('should work uncontrolled', function () {
      var wrapper = mount(_react.default.createElement(SwitchBaseNaked, (0, _extends2.default)({}, defaultProps, {
        classes: {},
        defaultChecked: true
      })));
      wrapper.find('input').instance().click();
      wrapper.update();
      assertIsNotChecked(wrapper);
    });
  });
  describe('uncontrolled', function () {
    var wrapper;
    beforeEach(function () {
      wrapper = mount(_react.default.createElement(SwitchBaseNaked, (0, _extends2.default)({}, defaultProps, {
        classes: {
          checked: 'test-class-checked'
        },
        className: "test-class"
      })));
    });
    it('should recognize an uncontrolled input', function () {
      _chai.assert.strictEqual(wrapper.instance().isControlled, false);

      assertIsNotChecked(wrapper);
    });
    it('should check the checkbox', function () {
      wrapper.find('input').instance().click();
      wrapper.update();
      assertIsChecked(wrapper);
    });
    it('should uncheck the checkbox', function () {
      wrapper.find('input').instance().click();
      wrapper.find('input').instance().click();
      wrapper.update();
      assertIsNotChecked(wrapper);
    });
  });
  describe('prop: icon', function () {
    it('should render an Icon', function () {
      var wrapper = shallow(_react.default.createElement(_SwitchBase.default, (0, _extends2.default)({}, defaultProps, {
        icon: _ref3
      })));

      _chai.assert.strictEqual(wrapper.childAt(0).is(_Icon.default), true);
    });
  });
  describe('handleInputChange()', function () {
    var event = {
      target: {
        checked: false
      }
    };
    it('should call onChange exactly once with event', function () {
      var onChangeSpy = (0, _sinon.spy)();
      var wrapper = mount(_react.default.createElement(SwitchBaseNaked, (0, _extends2.default)({}, defaultProps, {
        classes: {},
        onChange: onChangeSpy
      })));
      var instance = wrapper.instance();
      instance.handleInputChange(event);

      _chai.assert.strictEqual(onChangeSpy.callCount, 1);

      _chai.assert.strictEqual(onChangeSpy.calledWith(event), true);

      onChangeSpy.resetHistory();
    });
    describe('controlled', function () {
      it('should call onChange once', function () {
        var checked = true;
        var onChangeSpy = (0, _sinon.spy)();
        var wrapper = mount(_react.default.createElement(SwitchBaseNaked, (0, _extends2.default)({}, defaultProps, {
          classes: {},
          checked: checked,
          onChange: onChangeSpy
        })));
        var instance = wrapper.instance();
        instance.handleInputChange(event);

        _chai.assert.strictEqual(onChangeSpy.callCount, 1);

        _chai.assert.strictEqual(onChangeSpy.calledWith(event, !checked), true, 'call onChange with event and !props.checked');
      });
    });
    describe('not controlled no input', function () {
      var checkedMock;
      var wrapper;
      var onChangeSpy;
      before(function () {
        onChangeSpy = (0, _sinon.spy)();
        wrapper = mount(_react.default.createElement(SwitchBaseNaked, (0, _extends2.default)({}, defaultProps, {
          classes: {},
          onChange: onChangeSpy
        })));
        checkedMock = true;
        var instance = wrapper.instance();
        wrapper.setState({
          checked: checkedMock
        });
        instance.handleInputChange(event);
      });
      it('should call onChange exactly once', function () {
        _chai.assert.strictEqual(onChangeSpy.callCount, 1);
      });
      it('should call onChange with right params', function () {
        _chai.assert.strictEqual(onChangeSpy.calledWith(event, !checkedMock), true);
      });
      it('should change state.checked !checkedMock', function () {
        _chai.assert.strictEqual(wrapper.state('checked'), !checkedMock);
      });
    });
    describe('prop: inputProps', function () {
      it('should be able to add aria', function () {
        var wrapper2 = shallow(_react.default.createElement(_SwitchBase.default, (0, _extends2.default)({}, defaultProps, {
          inputProps: {
            'aria-label': 'foo'
          }
        })));

        _chai.assert.strictEqual(wrapper2.find('input').props()['aria-label'], 'foo');
      });
    });
    describe('prop: id', function () {
      it('should be able to add id to a checkbox input', function () {
        var wrapper2 = shallow(_react.default.createElement(_SwitchBase.default, (0, _extends2.default)({}, defaultProps, {
          type: "checkbox",
          id: "foo"
        })));

        _chai.assert.strictEqual(wrapper2.find('input').props().id, 'foo');
      });
      it('should be able to add id to a radio input', function () {
        var wrapper2 = shallow(_react.default.createElement(_SwitchBase.default, (0, _extends2.default)({}, defaultProps, {
          type: "radio",
          id: "foo"
        })));

        _chai.assert.strictEqual(wrapper2.find('input').props().id, 'foo');
      });
    });
  });
  describe('with muiFormControl context', function () {
    var wrapper;
    var muiFormControl;

    function setFormControlContext(muiFormControlContext) {
      muiFormControl = muiFormControlContext;
      wrapper.setContext((0, _objectSpread2.default)({}, wrapper.context(), {
        muiFormControl: muiFormControl
      }));
    }

    beforeEach(function () {
      wrapper = shallow(_react.default.createElement(_SwitchBase.default, defaultProps));
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