import React from 'react';
import { assert } from 'chai';
import { createShallow, getClasses } from '../test-utils';
import FormLabel from './FormLabel';

var _ref = React.createElement(FormLabel, null);

var _ref2 = React.createElement(FormLabel, {
  className: "woofFormLabel"
});

var _ref3 = React.createElement(FormLabel, {
  required: true
});

var _ref4 = React.createElement(FormLabel, null);

var _ref5 = React.createElement(FormLabel, {
  required: true,
  error: true
});

var _ref6 = React.createElement(FormLabel, null, "Foo");

describe('<FormLabel />', () => {
  let shallow;
  let classes;
  before(() => {
    shallow = createShallow({
      dive: true
    });
    classes = getClasses(_ref);
  });
  it('should render a <label />', () => {
    const wrapper = shallow(_ref2);
    assert.strictEqual(wrapper.name(), 'label');
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass('woofFormLabel'), true, 'should have the user class');
  });
  describe('prop: required', () => {
    it('should show an asterisk if required is set', () => {
      const wrapper = shallow(_ref3);
      const text = wrapper.text();
      assert.strictEqual(text.slice(-1), '*', 'should show an asterisk at the end');
      assert.strictEqual(wrapper.find('[data-mui-test="FormLabelAsterisk"]').length, 1);
    });
    it('should not show an asterisk by default', () => {
      const wrapper = shallow(_ref4);
      assert.strictEqual(wrapper.find('[data-mui-test="FormLabelAsterisk"]').length, 0);
      assert.strictEqual(wrapper.text().includes('*'), false, 'should not show an asterisk');
    });
  });
  describe('prop: error', () => {
    it('should have an error class', () => {
      const wrapper = shallow(_ref5);
      const asteriskWrapper = wrapper.find('[data-mui-test="FormLabelAsterisk"]');
      assert.strictEqual(asteriskWrapper.length, 1);
      assert.strictEqual(asteriskWrapper.hasClass(classes.error), true);
      assert.strictEqual(wrapper.hasClass(classes.error), true, 'should have the error class');
    });
  });
  describe('with muiFormControl context', () => {
    let wrapper;
    let muiFormControl;

    function setFormControlContext(muiFormControlContext) {
      muiFormControl = muiFormControlContext;
      wrapper.setContext({
        muiFormControl
      });
    }

    beforeEach(() => {
      wrapper = shallow(_ref6);
    });
    ['error', 'focused'].forEach(visualState => {
      describe(visualState, () => {
        beforeEach(() => {
          setFormControlContext({
            [visualState]: true
          });
        });
        it(`should have the ${visualState} class`, () => {
          assert.strictEqual(wrapper.hasClass(classes[visualState]), true);
        });
        it('should be overridden by props', () => {
          assert.strictEqual(wrapper.hasClass(classes[visualState]), true);
          wrapper.setProps({
            [visualState]: false
          });
          assert.strictEqual(wrapper.hasClass(classes[visualState]), false);
          wrapper.setProps({
            [visualState]: true
          });
          assert.strictEqual(wrapper.hasClass(classes[visualState]), true);
        });
      });
    });
    describe('required', () => {
      beforeEach(() => {
        setFormControlContext({
          required: true
        });
      });
      it('should show an asterisk', () => {
        assert.strictEqual(wrapper.find('[data-mui-test="FormLabelAsterisk"]').length, 1);
      });
      it('should be overridden by props', () => {
        assert.strictEqual(wrapper.find('[data-mui-test="FormLabelAsterisk"]').length, 1);
        wrapper.setProps({
          required: false
        });
        assert.strictEqual(wrapper.find('[data-mui-test="FormLabelAsterisk"]').length, 0);
        wrapper.setProps({
          required: true
        });
        assert.strictEqual(wrapper.find('[data-mui-test="FormLabelAsterisk"]').length, 1);
      });
    });
  });
});