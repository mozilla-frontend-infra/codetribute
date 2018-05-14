import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _objectSpread from "@babel/runtime/helpers/objectSpread";
import React from 'react';
import PropTypes from 'prop-types';
import { assert } from 'chai';
import { spy } from 'sinon';
import { createShallow, createMount, getClasses, unwrap } from '../test-utils';
import Textarea from './Textarea';
import Input, { hasValue, isFilled } from './Input';
import InputAdornment from './InputAdornment';

var _ref = React.createElement(Input, null);

var _ref2 = React.createElement(Input, null);

var _ref3 = React.createElement(Input, null);

var _ref4 = React.createElement(Input, {
  multiline: true
});

var _ref5 = React.createElement(Input, {
  multiline: true,
  rows: "4"
});

var _ref6 = React.createElement(Input, {
  multiline: true,
  rowsMax: "4",
  value: ""
});

var _ref7 = React.createElement(Input, {
  disabled: true
});

var _ref8 = React.createElement(Input, null);

var _ref9 = React.createElement(Input, {
  disabled: true
});

var _ref10 = React.createElement(Input, {
  disableUnderline: true
});

var _ref12 = React.createElement(Input, {
  inputComponent: "span"
});

var _ref13 = React.createElement(Input, null);

var _ref15 = React.createElement(Input, {
  startAdornment: React.createElement(InputAdornment, {
    position: "start"
  }, "$")
});

var _ref16 = React.createElement(Input, {
  endAdornment: React.createElement(InputAdornment, {
    position: "end"
  }, "$")
});

describe('<Input />', () => {
  let shallow;
  let classes;
  let mount;
  const NakedInput = unwrap(Input);
  before(() => {
    shallow = createShallow({
      untilSelector: 'Input'
    });
    mount = createMount();
    classes = getClasses(_ref);
  });
  after(() => {
    mount.cleanUp();
  });
  it('should render a <div />', () => {
    const wrapper = shallow(_ref2);
    assert.strictEqual(wrapper.name(), 'div');
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass(classes.underline), true, 'should have the underline class');
  });
  it('should render an <input /> inside the div', () => {
    const wrapper = shallow(_ref3);
    const input = wrapper.find('input');
    assert.strictEqual(input.name(), 'input');
    assert.strictEqual(input.props().type, 'text', 'should pass the text type prop');
    assert.strictEqual(input.hasClass(classes.input), true, 'should have the input class');
    assert.strictEqual(input.props().required, undefined);
  });
  describe('multiline', () => {
    it('should render an <Textarea /> when passed the multiline prop', () => {
      const wrapper = shallow(_ref4);
      assert.strictEqual(wrapper.find(Textarea).length, 1);
    });
    it('should render an <textarea /> when passed the multiline and rows props', () => {
      const wrapper = shallow(_ref5);
      assert.strictEqual(wrapper.find('textarea').length, 1);
    });
    it('should forward the value to the Textarea', () => {
      const wrapper = shallow(_ref6);
      assert.strictEqual(wrapper.find(Textarea).props().value, '');
    });
  });
  describe('prop: disabled', () => {
    it('should render a disabled <input />', () => {
      const wrapper = shallow(_ref7);
      const input = wrapper.find('input');
      assert.strictEqual(input.name(), 'input');
      assert.strictEqual(input.hasClass(classes.input), true, 'should have the input class');
      assert.strictEqual(input.hasClass(classes.disabled), true, 'should have the disabled class');
    });
    it('should reset the focused state', () => {
      const wrapper = shallow(_ref8);
      const handleBlur = spy();
      wrapper.setContext(_objectSpread({}, wrapper.context(), {
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
      assert.strictEqual(wrapper.state().focused, false);
      assert.strictEqual(handleBlur.callCount, 1);
    }); // IE11 bug

    it('should not respond the focus event when disabled', () => {
      const wrapper = shallow(_ref9);
      const instance = wrapper.instance();
      const event = {
        stopPropagation: spy()
      };
      instance.handleFocus(event);
      assert.strictEqual(event.stopPropagation.callCount, 1);
    });
  });
  it('should disabled the underline', () => {
    const wrapper = shallow(_ref10);
    const input = wrapper.find('input');
    assert.strictEqual(wrapper.hasClass(classes.inkbar), false, 'should not have the inkbar class');
    assert.strictEqual(input.name(), 'input');
    assert.strictEqual(input.hasClass(classes.input), true, 'should have the input class');
    assert.strictEqual(input.hasClass(classes.underline), false, 'should not have the underline class');
  });
  it('should fire event callbacks', () => {
    const events = ['onChange', 'onFocus', 'onBlur', 'onKeyUp', 'onKeyDown'];
    const handlers = events.reduce((result, n) => {
      result[n] = spy();
      return result;
    }, {});
    const wrapper = mount(React.createElement(Input, handlers));
    events.forEach(n => {
      const event = n.charAt(2).toLowerCase() + n.slice(3);
      wrapper.find('input').simulate(event);
      assert.strictEqual(handlers[n].callCount, 1, `should have called the ${n} handler`);
    });
  });
  describe('controlled', () => {
    it('should considered [] as controlled', () => {
      const wrapper = shallow(React.createElement(Input, {
        value: []
      }));
      const instance = wrapper.instance();
      assert.strictEqual(instance.isControlled, true, 'isControlled should return true');
    });
    ['', 0].forEach(value => {
      describe(`${typeof value} value`, () => {
        let wrapper;
        let handleFilled;
        let handleEmpty;

        var _ref11 = React.createElement(Input, {
          value: value,
          onFilled: handleFilled,
          onEmpty: handleEmpty
        });

        before(() => {
          handleEmpty = spy();
          handleFilled = spy();
          wrapper = shallow(_ref11);
        });
        it('should check that the component is controlled', () => {
          const instance = wrapper.instance();
          assert.strictEqual(instance.isControlled, true, 'isControlled should return true');
        }); // don't test number because zero is a empty state, whereas '' is not

        if (typeof value !== 'number') {
          it('should have called the handleEmpty callback', () => {
            assert.strictEqual(handleEmpty.callCount, 1, 'should have called the onEmpty cb');
          });
          it('should fire the onFilled callback when dirtied', () => {
            assert.strictEqual(handleFilled.callCount, 0);
            wrapper.setProps({
              value: typeof value === 'number' ? 2 : 'hello'
            });
            assert.strictEqual(handleFilled.callCount, 1, 'should have called the onFilled cb');
          });
          it('should fire the onEmpty callback when dirtied', () => {
            assert.strictEqual(handleEmpty.callCount, 1, 'should have called the onEmpty cb once already');
            wrapper.setProps({
              value
            });
            assert.strictEqual(handleEmpty.callCount, 2, 'should have called the onEmpty cb again');
          });
        }
      });
    });
  });
  describe('prop: inputComponent', () => {
    it('should accept any html component', () => {
      const wrapper = shallow(_ref12);
      assert.strictEqual(wrapper.find('span').length, 1);
    });
    it('should inject onBlur and onFocus', () => {
      let injectedProps;

      function MyInput(props) {
        injectedProps = props;

        const {
          inputRef
        } = props,
              other = _objectWithoutProperties(props, ["inputRef"]);

        return React.createElement("input", _extends({
          ref: inputRef
        }, other));
      }

      MyInput.propTypes = process.env.NODE_ENV !== "production" ? {
        inputRef: PropTypes.func.isRequired
      } : {};
      mount(React.createElement(Input, {
        inputComponent: MyInput
      }));
      assert.strictEqual(typeof injectedProps.onBlur, 'function');
      assert.strictEqual(typeof injectedProps.onFocus, 'function');
    });
  }); // Note the initial callback when
  // uncontrolled only fires for a full mount

  describe('uncontrolled', () => {
    let wrapper;
    let handleFilled;
    let handleEmpty;
    before(() => {
      handleEmpty = spy();
      handleFilled = spy();
      wrapper = mount(React.createElement(NakedInput, {
        classes: {},
        onFilled: handleFilled,
        defaultValue: "hell",
        onEmpty: handleEmpty
      }));
    });
    it('should check that the component is uncontrolled', () => {
      const instance = wrapper.instance();
      assert.strictEqual(instance.isControlled, false, 'isControlled should return false');
    });
    it('should fire the onFilled callback when dirtied', () => {
      assert.strictEqual(handleFilled.callCount, 1, 'should not have called the onFilled cb yet');
      wrapper.instance().input.value = 'hello';
      wrapper.find('input').simulate('change');
      assert.strictEqual(handleFilled.callCount, 2, 'should have called the onFilled cb');
    });
    it('should fire the onEmpty callback when cleaned', () => {
      // Because of shallow() this hasn't fired since there is no mounting
      assert.strictEqual(handleEmpty.callCount, 0, 'should not have called the onEmpty cb yet');
      wrapper.instance().input.value = '';
      wrapper.find('input').simulate('change');
      assert.strictEqual(handleEmpty.callCount, 1, 'should have called the onEmpty cb');
    });
  });
  describe('with muiFormControl context', () => {
    let wrapper;
    let muiFormControl;

    function setFormControlContext(muiFormControlContext) {
      muiFormControl = muiFormControlContext;
      wrapper.setContext(_objectSpread({}, wrapper.context(), {
        muiFormControl
      }));
    }

    beforeEach(() => {
      wrapper = shallow(_ref13);
    });
    it('should have the formControl class', () => {
      setFormControlContext({});
      assert.strictEqual(wrapper.hasClass(classes.formControl), true);
    });
    describe('callbacks', () => {
      let handleFilled;
      let handleEmpty;
      beforeEach(() => {
        handleFilled = spy();
        handleEmpty = spy(); // Mock the input ref

        wrapper.setProps({
          onFilled: handleFilled,
          onEmpty: handleEmpty
        });
        wrapper.instance().input = {
          value: ''
        };
        setFormControlContext({
          onFilled: spy(),
          onEmpty: spy()
        });
      });
      it('should fire the onFilled muiFormControl and props callback when dirtied', () => {
        wrapper.instance().input.value = 'hello';
        wrapper.find('input').simulate('change');
        assert.strictEqual(handleFilled.callCount, 1, 'should have called the onFilled props cb');
        assert.strictEqual(muiFormControl.onFilled.callCount, 1, 'should have called the onFilled muiFormControl cb');
      });
      it('should fire the onEmpty muiFormControl and props callback when cleaned', () => {
        wrapper.instance().input.value = '';
        wrapper.find('input').simulate('change');
        assert.strictEqual(handleEmpty.callCount, 1, 'should have called the onEmpty props cb');
        assert.strictEqual(muiFormControl.onEmpty.callCount, 1, 'should have called the onEmpty muiFormControl cb');
      });
    });
    describe('error', () => {
      beforeEach(() => {
        setFormControlContext({
          error: true
        });
      });
      it('should have the error class', () => {
        assert.strictEqual(wrapper.hasClass(classes.error), true);
      });
      it('should be overridden by props', () => {
        assert.strictEqual(wrapper.hasClass(classes.error), true);
        wrapper.setProps({
          error: false
        });
        assert.strictEqual(wrapper.hasClass(classes.error), false);
        wrapper.setProps({
          error: true
        });
        assert.strictEqual(wrapper.hasClass(classes.error), true);
      });
    });
    describe('margin', () => {
      describe('context margin: dense', () => {
        beforeEach(() => {
          setFormControlContext({
            margin: 'dense'
          });
        });
        it('should have the inputMarginDense class', () => {
          assert.strictEqual(wrapper.find('input').hasClass(classes.inputMarginDense), true);
        });
      });
      it('should be overridden by props', () => {
        assert.strictEqual(wrapper.find('input').hasClass(classes.inputMarginDense), false);
        wrapper.setProps({
          margin: 'dense'
        });
        assert.strictEqual(wrapper.find('input').hasClass(classes.inputMarginDense), true);
      });
    });
    describe('required', () => {
      it('should have the aria-required prop with value true', () => {
        setFormControlContext({
          required: true
        });
        const input = wrapper.find('input');
        assert.strictEqual(input.props().required, true);
      });
    });
  });

  var _ref14 = React.createElement(NakedInput, {
    classes: classes
  });

  describe('componentDidMount', () => {
    let wrapper;
    let instance;
    before(() => {
      wrapper = mount(_ref14);
      instance = wrapper.instance();
    });
    beforeEach(() => {
      instance.checkDirty = spy();
    });
    it('should not call checkDirty if controlled', () => {
      instance.isControlled = true;
      instance.componentDidMount();
      assert.strictEqual(instance.checkDirty.callCount, 0);
    });
    it('should call checkDirty if controlled', () => {
      instance.isControlled = false;
      instance.componentDidMount();
      assert.strictEqual(instance.checkDirty.callCount, 1);
    });
    it('should call checkDirty with input value', () => {
      instance.isControlled = false;
      instance.input = 'woofinput';
      instance.componentDidMount();
      assert.strictEqual(instance.checkDirty.calledWith(instance.input), true);
    });
    it('should call or not call checkDirty consistently', () => {
      instance.isControlled = true;
      instance.componentDidMount();
      assert.strictEqual(instance.checkDirty.callCount, 0);
      instance.isControlled = false;
      instance.componentDidMount();
      assert.strictEqual(instance.checkDirty.callCount, 1);
      instance.isControlled = true;
      instance.componentDidMount();
      assert.strictEqual(instance.checkDirty.callCount, 1);
    });
  });
  describe('mount', () => {
    it('should be able to access the native input', () => {
      const handleRef = spy();
      mount(React.createElement(Input, {
        inputRef: handleRef
      }));
      assert.strictEqual(handleRef.callCount, 1);
    });
    it('should be able to access the native textarea', () => {
      const handleRef = spy();
      mount(React.createElement(Input, {
        multiline: true,
        inputRef: handleRef
      }));
      assert.strictEqual(handleRef.callCount, 1);
    });
  });
  describe('hasValue', () => {
    ['', 0].forEach(value => {
      it(`is true for ${value}`, () => {
        assert.strictEqual(hasValue(value), true);
      });
    });
    [null, undefined].forEach(value => {
      it(`is false for ${value}`, () => {
        assert.strictEqual(hasValue(value), false);
      });
    });
  });
  describe('isFilled', () => {
    [' ', 0].forEach(value => {
      it(`is true for value ${value}`, () => {
        assert.strictEqual(isFilled({
          value
        }), true);
      });
      it(`is true for SSR defaultValue ${value}`, () => {
        assert.strictEqual(isFilled({
          defaultValue: value
        }, true), true);
      });
    });
    [null, undefined, ''].forEach(value => {
      it(`is false for value ${value}`, () => {
        assert.strictEqual(isFilled({
          value
        }), false);
      });
      it(`is false for SSR defaultValue ${value}`, () => {
        assert.strictEqual(isFilled({
          defaultValue: value
        }, true), false);
      });
    });
  });
  describe('prop: inputProps', () => {
    it('should apply the props on the input', () => {
      const wrapper = shallow(React.createElement(Input, {
        inputProps: {
          className: 'foo',
          readOnly: true
        }
      }));
      const input = wrapper.find('input');
      assert.strictEqual(input.hasClass('foo'), true, 'should have the foo class');
      assert.strictEqual(input.hasClass(classes.input), true, 'should still have the input class');
      assert.strictEqual(input.props().readOnly, true, 'should have the readOnly prop');
    });
    it('should be able to get a ref', () => {
      const handleRef = spy();
      mount(React.createElement(Input, {
        inputProps: {
          ref: handleRef
        }
      }));
      assert.strictEqual(handleRef.callCount, 1);
    });
  });
  describe('prop: startAdornment, prop: endAdornment', () => {
    it('should render adornment before input', () => {
      const wrapper = shallow(_ref15);
      assert.strictEqual(wrapper.childAt(0).type(), InputAdornment);
    });
    it('should render adornment after input', () => {
      const wrapper = shallow(_ref16);
      assert.strictEqual(wrapper.childAt(1).type(), InputAdornment);
    });
  });
});