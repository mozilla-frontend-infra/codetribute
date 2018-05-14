"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _chai = require("chai");

var _sinon = require("sinon");

var _testUtils = require("../test-utils");

var _Textarea = _interopRequireDefault(require("./Textarea"));

var _Input = _interopRequireWildcard(require("./Input"));

var _InputAdornment = _interopRequireDefault(require("./InputAdornment"));

var _ref = _react.default.createElement(_Input.default, null);

var _ref2 = _react.default.createElement(_Input.default, null);

var _ref3 = _react.default.createElement(_Input.default, null);

var _ref4 = _react.default.createElement(_Input.default, {
  multiline: true
});

var _ref5 = _react.default.createElement(_Input.default, {
  multiline: true,
  rows: "4"
});

var _ref6 = _react.default.createElement(_Input.default, {
  multiline: true,
  rowsMax: "4",
  value: ""
});

var _ref7 = _react.default.createElement(_Input.default, {
  disabled: true
});

var _ref8 = _react.default.createElement(_Input.default, null);

var _ref9 = _react.default.createElement(_Input.default, {
  disabled: true
});

var _ref10 = _react.default.createElement(_Input.default, {
  disableUnderline: true
});

var _ref12 = _react.default.createElement(_Input.default, {
  inputComponent: "span"
});

var _ref13 = _react.default.createElement(_Input.default, null);

var _ref15 = _react.default.createElement(_Input.default, {
  startAdornment: _react.default.createElement(_InputAdornment.default, {
    position: "start"
  }, "$")
});

var _ref16 = _react.default.createElement(_Input.default, {
  endAdornment: _react.default.createElement(_InputAdornment.default, {
    position: "end"
  }, "$")
});

describe('<Input />', function () {
  var shallow;
  var classes;
  var mount;
  var NakedInput = (0, _testUtils.unwrap)(_Input.default);
  before(function () {
    shallow = (0, _testUtils.createShallow)({
      untilSelector: 'Input'
    });
    mount = (0, _testUtils.createMount)();
    classes = (0, _testUtils.getClasses)(_ref);
  });
  after(function () {
    mount.cleanUp();
  });
  it('should render a <div />', function () {
    var wrapper = shallow(_ref2);

    _chai.assert.strictEqual(wrapper.name(), 'div');

    _chai.assert.strictEqual(wrapper.hasClass(classes.root), true);

    _chai.assert.strictEqual(wrapper.hasClass(classes.underline), true, 'should have the underline class');
  });
  it('should render an <input /> inside the div', function () {
    var wrapper = shallow(_ref3);
    var input = wrapper.find('input');

    _chai.assert.strictEqual(input.name(), 'input');

    _chai.assert.strictEqual(input.props().type, 'text', 'should pass the text type prop');

    _chai.assert.strictEqual(input.hasClass(classes.input), true, 'should have the input class');

    _chai.assert.strictEqual(input.props().required, undefined);
  });
  describe('multiline', function () {
    it('should render an <Textarea /> when passed the multiline prop', function () {
      var wrapper = shallow(_ref4);

      _chai.assert.strictEqual(wrapper.find(_Textarea.default).length, 1);
    });
    it('should render an <textarea /> when passed the multiline and rows props', function () {
      var wrapper = shallow(_ref5);

      _chai.assert.strictEqual(wrapper.find('textarea').length, 1);
    });
    it('should forward the value to the Textarea', function () {
      var wrapper = shallow(_ref6);

      _chai.assert.strictEqual(wrapper.find(_Textarea.default).props().value, '');
    });
  });
  describe('prop: disabled', function () {
    it('should render a disabled <input />', function () {
      var wrapper = shallow(_ref7);
      var input = wrapper.find('input');

      _chai.assert.strictEqual(input.name(), 'input');

      _chai.assert.strictEqual(input.hasClass(classes.input), true, 'should have the input class');

      _chai.assert.strictEqual(input.hasClass(classes.disabled), true, 'should have the disabled class');
    });
    it('should reset the focused state', function () {
      var wrapper = shallow(_ref8);
      var handleBlur = (0, _sinon.spy)();
      wrapper.setContext((0, _objectSpread2.default)({}, wrapper.context(), {
        muiFormControl: {
          onBlur: handleBlur
        }
      })); // We simulate a focused input that is getting disabled.

      wrapper.setState({
        focused: true
      });
      wrapper.setProps({
        disabled: true
      });

      _chai.assert.strictEqual(wrapper.state().focused, false);

      _chai.assert.strictEqual(handleBlur.callCount, 1);
    }); // IE11 bug

    it('should not respond the focus event when disabled', function () {
      var wrapper = shallow(_ref9);
      var instance = wrapper.instance();
      var event = {
        stopPropagation: (0, _sinon.spy)()
      };
      instance.handleFocus(event);

      _chai.assert.strictEqual(event.stopPropagation.callCount, 1);
    });
  });
  it('should disabled the underline', function () {
    var wrapper = shallow(_ref10);
    var input = wrapper.find('input');

    _chai.assert.strictEqual(wrapper.hasClass(classes.inkbar), false, 'should not have the inkbar class');

    _chai.assert.strictEqual(input.name(), 'input');

    _chai.assert.strictEqual(input.hasClass(classes.input), true, 'should have the input class');

    _chai.assert.strictEqual(input.hasClass(classes.underline), false, 'should not have the underline class');
  });
  it('should fire event callbacks', function () {
    var events = ['onChange', 'onFocus', 'onBlur', 'onKeyUp', 'onKeyDown'];
    var handlers = events.reduce(function (result, n) {
      result[n] = (0, _sinon.spy)();
      return result;
    }, {});
    var wrapper = mount(_react.default.createElement(_Input.default, handlers));
    events.forEach(function (n) {
      var event = n.charAt(2).toLowerCase() + n.slice(3);
      wrapper.find('input').simulate(event);

      _chai.assert.strictEqual(handlers[n].callCount, 1, "should have called the ".concat(n, " handler"));
    });
  });
  describe('controlled', function () {
    it('should considered [] as controlled', function () {
      var wrapper = shallow(_react.default.createElement(_Input.default, {
        value: []
      }));
      var instance = wrapper.instance();

      _chai.assert.strictEqual(instance.isControlled, true, 'isControlled should return true');
    });
    ['', 0].forEach(function (value) {
      describe("".concat((0, _typeof2.default)(value), " value"), function () {
        var wrapper;
        var handleFilled;
        var handleEmpty;

        var _ref11 = _react.default.createElement(_Input.default, {
          value: value,
          onFilled: handleFilled,
          onEmpty: handleEmpty
        });

        before(function () {
          handleEmpty = (0, _sinon.spy)();
          handleFilled = (0, _sinon.spy)();
          wrapper = shallow(_ref11);
        });
        it('should check that the component is controlled', function () {
          var instance = wrapper.instance();

          _chai.assert.strictEqual(instance.isControlled, true, 'isControlled should return true');
        }); // don't test number because zero is a empty state, whereas '' is not

        if (typeof value !== 'number') {
          it('should have called the handleEmpty callback', function () {
            _chai.assert.strictEqual(handleEmpty.callCount, 1, 'should have called the onEmpty cb');
          });
          it('should fire the onFilled callback when dirtied', function () {
            _chai.assert.strictEqual(handleFilled.callCount, 0);

            wrapper.setProps({
              value: typeof value === 'number' ? 2 : 'hello'
            });

            _chai.assert.strictEqual(handleFilled.callCount, 1, 'should have called the onFilled cb');
          });
          it('should fire the onEmpty callback when dirtied', function () {
            _chai.assert.strictEqual(handleEmpty.callCount, 1, 'should have called the onEmpty cb once already');

            wrapper.setProps({
              value: value
            });

            _chai.assert.strictEqual(handleEmpty.callCount, 2, 'should have called the onEmpty cb again');
          });
        }
      });
    });
  });
  describe('prop: inputComponent', function () {
    it('should accept any html component', function () {
      var wrapper = shallow(_ref12);

      _chai.assert.strictEqual(wrapper.find('span').length, 1);
    });
    it('should inject onBlur and onFocus', function () {
      var injectedProps;

      function MyInput(props) {
        injectedProps = props;
        var inputRef = props.inputRef,
            other = (0, _objectWithoutProperties2.default)(props, ["inputRef"]);
        return _react.default.createElement("input", (0, _extends2.default)({
          ref: inputRef
        }, other));
      }

      MyInput.propTypes = process.env.NODE_ENV !== "production" ? {
        inputRef: _propTypes.default.func.isRequired
      } : {};
      mount(_react.default.createElement(_Input.default, {
        inputComponent: MyInput
      }));

      _chai.assert.strictEqual((0, _typeof2.default)(injectedProps.onBlur), 'function');

      _chai.assert.strictEqual((0, _typeof2.default)(injectedProps.onFocus), 'function');
    });
  }); // Note the initial callback when
  // uncontrolled only fires for a full mount

  describe('uncontrolled', function () {
    var wrapper;
    var handleFilled;
    var handleEmpty;
    before(function () {
      handleEmpty = (0, _sinon.spy)();
      handleFilled = (0, _sinon.spy)();
      wrapper = mount(_react.default.createElement(NakedInput, {
        classes: {},
        onFilled: handleFilled,
        defaultValue: "hell",
        onEmpty: handleEmpty
      }));
    });
    it('should check that the component is uncontrolled', function () {
      var instance = wrapper.instance();

      _chai.assert.strictEqual(instance.isControlled, false, 'isControlled should return false');
    });
    it('should fire the onFilled callback when dirtied', function () {
      _chai.assert.strictEqual(handleFilled.callCount, 1, 'should not have called the onFilled cb yet');

      wrapper.instance().input.value = 'hello';
      wrapper.find('input').simulate('change');

      _chai.assert.strictEqual(handleFilled.callCount, 2, 'should have called the onFilled cb');
    });
    it('should fire the onEmpty callback when cleaned', function () {
      // Because of shallow() this hasn't fired since there is no mounting
      _chai.assert.strictEqual(handleEmpty.callCount, 0, 'should not have called the onEmpty cb yet');

      wrapper.instance().input.value = '';
      wrapper.find('input').simulate('change');

      _chai.assert.strictEqual(handleEmpty.callCount, 1, 'should have called the onEmpty cb');
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
      wrapper = shallow(_ref13);
    });
    it('should have the formControl class', function () {
      setFormControlContext({});

      _chai.assert.strictEqual(wrapper.hasClass(classes.formControl), true);
    });
    describe('callbacks', function () {
      var handleFilled;
      var handleEmpty;
      beforeEach(function () {
        handleFilled = (0, _sinon.spy)();
        handleEmpty = (0, _sinon.spy)(); // Mock the input ref

        wrapper.setProps({
          onFilled: handleFilled,
          onEmpty: handleEmpty
        });
        wrapper.instance().input = {
          value: ''
        };
        setFormControlContext({
          onFilled: (0, _sinon.spy)(),
          onEmpty: (0, _sinon.spy)()
        });
      });
      it('should fire the onFilled muiFormControl and props callback when dirtied', function () {
        wrapper.instance().input.value = 'hello';
        wrapper.find('input').simulate('change');

        _chai.assert.strictEqual(handleFilled.callCount, 1, 'should have called the onFilled props cb');

        _chai.assert.strictEqual(muiFormControl.onFilled.callCount, 1, 'should have called the onFilled muiFormControl cb');
      });
      it('should fire the onEmpty muiFormControl and props callback when cleaned', function () {
        wrapper.instance().input.value = '';
        wrapper.find('input').simulate('change');

        _chai.assert.strictEqual(handleEmpty.callCount, 1, 'should have called the onEmpty props cb');

        _chai.assert.strictEqual(muiFormControl.onEmpty.callCount, 1, 'should have called the onEmpty muiFormControl cb');
      });
    });
    describe('error', function () {
      beforeEach(function () {
        setFormControlContext({
          error: true
        });
      });
      it('should have the error class', function () {
        _chai.assert.strictEqual(wrapper.hasClass(classes.error), true);
      });
      it('should be overridden by props', function () {
        _chai.assert.strictEqual(wrapper.hasClass(classes.error), true);

        wrapper.setProps({
          error: false
        });

        _chai.assert.strictEqual(wrapper.hasClass(classes.error), false);

        wrapper.setProps({
          error: true
        });

        _chai.assert.strictEqual(wrapper.hasClass(classes.error), true);
      });
    });
    describe('margin', function () {
      describe('context margin: dense', function () {
        beforeEach(function () {
          setFormControlContext({
            margin: 'dense'
          });
        });
        it('should have the inputMarginDense class', function () {
          _chai.assert.strictEqual(wrapper.find('input').hasClass(classes.inputMarginDense), true);
        });
      });
      it('should be overridden by props', function () {
        _chai.assert.strictEqual(wrapper.find('input').hasClass(classes.inputMarginDense), false);

        wrapper.setProps({
          margin: 'dense'
        });

        _chai.assert.strictEqual(wrapper.find('input').hasClass(classes.inputMarginDense), true);
      });
    });
    describe('required', function () {
      it('should have the aria-required prop with value true', function () {
        setFormControlContext({
          required: true
        });
        var input = wrapper.find('input');

        _chai.assert.strictEqual(input.props().required, true);
      });
    });
  });

  var _ref14 = _react.default.createElement(NakedInput, {
    classes: classes
  });

  describe('componentDidMount', function () {
    var wrapper;
    var instance;
    before(function () {
      wrapper = mount(_ref14);
      instance = wrapper.instance();
    });
    beforeEach(function () {
      instance.checkDirty = (0, _sinon.spy)();
    });
    it('should not call checkDirty if controlled', function () {
      instance.isControlled = true;
      instance.componentDidMount();

      _chai.assert.strictEqual(instance.checkDirty.callCount, 0);
    });
    it('should call checkDirty if controlled', function () {
      instance.isControlled = false;
      instance.componentDidMount();

      _chai.assert.strictEqual(instance.checkDirty.callCount, 1);
    });
    it('should call checkDirty with input value', function () {
      instance.isControlled = false;
      instance.input = 'woofinput';
      instance.componentDidMount();

      _chai.assert.strictEqual(instance.checkDirty.calledWith(instance.input), true);
    });
    it('should call or not call checkDirty consistently', function () {
      instance.isControlled = true;
      instance.componentDidMount();

      _chai.assert.strictEqual(instance.checkDirty.callCount, 0);

      instance.isControlled = false;
      instance.componentDidMount();

      _chai.assert.strictEqual(instance.checkDirty.callCount, 1);

      instance.isControlled = true;
      instance.componentDidMount();

      _chai.assert.strictEqual(instance.checkDirty.callCount, 1);
    });
  });
  describe('mount', function () {
    it('should be able to access the native input', function () {
      var handleRef = (0, _sinon.spy)();
      mount(_react.default.createElement(_Input.default, {
        inputRef: handleRef
      }));

      _chai.assert.strictEqual(handleRef.callCount, 1);
    });
    it('should be able to access the native textarea', function () {
      var handleRef = (0, _sinon.spy)();
      mount(_react.default.createElement(_Input.default, {
        multiline: true,
        inputRef: handleRef
      }));

      _chai.assert.strictEqual(handleRef.callCount, 1);
    });
  });
  describe('hasValue', function () {
    ['', 0].forEach(function (value) {
      it("is true for ".concat(value), function () {
        _chai.assert.strictEqual((0, _Input.hasValue)(value), true);
      });
    });
    [null, undefined].forEach(function (value) {
      it("is false for ".concat(value), function () {
        _chai.assert.strictEqual((0, _Input.hasValue)(value), false);
      });
    });
  });
  describe('isFilled', function () {
    [' ', 0].forEach(function (value) {
      it("is true for value ".concat(value), function () {
        _chai.assert.strictEqual((0, _Input.isFilled)({
          value: value
        }), true);
      });
      it("is true for SSR defaultValue ".concat(value), function () {
        _chai.assert.strictEqual((0, _Input.isFilled)({
          defaultValue: value
        }, true), true);
      });
    });
    [null, undefined, ''].forEach(function (value) {
      it("is false for value ".concat(value), function () {
        _chai.assert.strictEqual((0, _Input.isFilled)({
          value: value
        }), false);
      });
      it("is false for SSR defaultValue ".concat(value), function () {
        _chai.assert.strictEqual((0, _Input.isFilled)({
          defaultValue: value
        }, true), false);
      });
    });
  });
  describe('prop: inputProps', function () {
    it('should apply the props on the input', function () {
      var wrapper = shallow(_react.default.createElement(_Input.default, {
        inputProps: {
          className: 'foo',
          readOnly: true
        }
      }));
      var input = wrapper.find('input');

      _chai.assert.strictEqual(input.hasClass('foo'), true, 'should have the foo class');

      _chai.assert.strictEqual(input.hasClass(classes.input), true, 'should still have the input class');

      _chai.assert.strictEqual(input.props().readOnly, true, 'should have the readOnly prop');
    });
    it('should be able to get a ref', function () {
      var handleRef = (0, _sinon.spy)();
      mount(_react.default.createElement(_Input.default, {
        inputProps: {
          ref: handleRef
        }
      }));

      _chai.assert.strictEqual(handleRef.callCount, 1);
    });
  });
  describe('prop: startAdornment, prop: endAdornment', function () {
    it('should render adornment before input', function () {
      var wrapper = shallow(_ref15);

      _chai.assert.strictEqual(wrapper.childAt(0).type(), _InputAdornment.default);
    });
    it('should render adornment after input', function () {
      var wrapper = shallow(_ref16);

      _chai.assert.strictEqual(wrapper.childAt(1).type(), _InputAdornment.default);
    });
  });
});