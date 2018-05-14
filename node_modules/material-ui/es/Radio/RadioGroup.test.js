import React from 'react';
import { assert } from 'chai';
import { spy } from 'sinon';
import { createShallow, createMount } from '../test-utils';
import FormGroup from '../Form/FormGroup';
import RadioGroup from './RadioGroup';
import Radio from './Radio';

var _ref = React.createElement(RadioGroup, {
  value: ""
});

var _ref2 = React.createElement(RadioGroup, {
  value: ""
});

var _ref3 = React.createElement(RadioGroup, {
  value: ""
}, React.createElement(Radio, null), null);

var _ref4 = React.createElement(RadioGroup, {
  value: ""
}, React.createElement(Radio, null), React.createElement(Radio, null));

var _ref5 = React.createElement(RadioGroup, {
  value: ""
}, React.createElement(Radio, null));

var _ref6 = React.createElement(RadioGroup, {
  value: ""
});

describe('<RadioGroup />', () => {
  let shallow;
  before(() => {
    shallow = createShallow();
  });
  it('should render a FormGroup with the radiogroup role', () => {
    const wrapper = shallow(_ref);
    assert.strictEqual(wrapper.type(), FormGroup);
    assert.strictEqual(wrapper.props().role, 'radiogroup');
  });
  it('should fire the onBlur callback', () => {
    const handleBlur = spy();
    const wrapper = shallow(React.createElement(RadioGroup, {
      value: "",
      onBlur: handleBlur
    }));
    const event = {};
    wrapper.simulate('blur', event);
    assert.strictEqual(handleBlur.callCount, 1);
    assert.strictEqual(handleBlur.args[0][0], event);
  });
  it('should fire the onKeyDown callback', () => {
    const handleKeyDown = spy();
    const wrapper = shallow(React.createElement(RadioGroup, {
      value: "",
      onKeyDown: handleKeyDown
    }));
    const event = {};
    wrapper.simulate('keyDown', event);
    assert.strictEqual(handleKeyDown.callCount, 1);
    assert.strictEqual(handleKeyDown.args[0][0], event);
  });
  describe('imperative focus()', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(_ref2);
    });
    it('should focus the first non-disabled radio', () => {
      const radios = [{
        disabled: true,
        focus: spy()
      }, {
        disabled: false,
        focus: spy()
      }, {
        disabled: false,
        focus: spy()
      }];
      wrapper.instance().radios = radios;
      wrapper.instance().focus();
      assert.strictEqual(radios[1].focus.callCount, 1);
    });
    it('should not focus any radios if all are disabled', () => {
      const radios = [{
        disabled: true,
        focus: spy()
      }, {
        disabled: true,
        focus: spy()
      }, {
        disabled: true,
        focus: spy()
      }];
      wrapper.instance().radios = radios;
      wrapper.instance().focus();
      assert.strictEqual(radios[0].focus.callCount, 0);
      assert.strictEqual(radios[1].focus.callCount, 0);
      assert.strictEqual(radios[2].focus.callCount, 0);
    });
    it('should focus the selected radio', () => {
      const radios = [{
        disabled: true,
        focus: spy()
      }, {
        disabled: false,
        focus: spy()
      }, {
        disabled: false,
        checked: true,
        focus: spy()
      }, {
        disabled: false,
        focus: spy()
      }];
      wrapper.instance().radios = radios;
      wrapper.instance().focus();
      assert.strictEqual(radios[0].focus.callCount, 0);
      assert.strictEqual(radios[1].focus.callCount, 0);
      assert.strictEqual(radios[2].focus.callCount, 1);
      assert.strictEqual(radios[3].focus.callCount, 0);
    });
    it('should focus the non-disabled radio rather than the disabled selected radio', () => {
      const radios = [{
        disabled: true,
        focus: spy()
      }, {
        disabled: true,
        focus: spy()
      }, {
        disabled: true,
        checked: true,
        focus: spy()
      }, {
        disabled: false,
        focus: spy()
      }];
      wrapper.instance().radios = radios;
      wrapper.instance().focus();
      assert.strictEqual(radios[0].focus.callCount, 0);
      assert.strictEqual(radios[1].focus.callCount, 0);
      assert.strictEqual(radios[2].focus.callCount, 0);
      assert.strictEqual(radios[3].focus.callCount, 1);
    });
    it('should be able to focus with no radios', () => {
      wrapper.instance().radios = [];
      wrapper.instance().focus();
    });
  });
  it('should accept invalid child', () => {
    shallow(_ref3);
  });
  describe('children radios fire change event', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(_ref4);
    });
    it('should fire onChange', () => {
      const internalRadio = wrapper.children().first();
      const event = {
        target: {
          value: 'woofRadioGroup'
        }
      };
      const onChangeSpy = spy();
      wrapper.setProps({
        onChange: onChangeSpy
      });
      internalRadio.simulate('change', event, true);
      assert.strictEqual(onChangeSpy.callCount, 1);
      assert.strictEqual(onChangeSpy.calledWith(event), true);
    });
    it('should not fire onChange if not checked', () => {
      const internalRadio = wrapper.children().first();
      const onChangeSpy = spy();
      wrapper.setProps({
        onChange: onChangeSpy
      });
      internalRadio.simulate('change', {
        target: {
          value: 'woofRadioGroup'
        }
      }, false);
      assert.strictEqual(onChangeSpy.callCount, 0);
    });
  });
  describe('register internal radios to this.radio', () => {
    let mount;
    before(() => {
      mount = createMount();
    });
    after(() => {
      mount.cleanUp();
    });
    it('should add a child', () => {
      const wrapper = mount(_ref5);
      assert.strictEqual(wrapper.instance().radios.length, 1);
    });
    it('should keep radios empty', () => {
      const wrapper = mount(_ref6);
      assert.strictEqual(wrapper.instance().radios.length, 0);
    });
  });
});