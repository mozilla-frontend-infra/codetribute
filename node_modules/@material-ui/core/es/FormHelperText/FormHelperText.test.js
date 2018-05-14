import React from 'react';
import { assert } from 'chai';
import { createShallow, getClasses } from '../test-utils';
import FormHelperText from './FormHelperText';

var _ref = React.createElement(FormHelperText, null);

var _ref2 = React.createElement(FormHelperText, {
  className: "woofHelperText"
});

var _ref3 = React.createElement(FormHelperText, {
  component: "div"
});

var _ref4 = React.createElement(FormHelperText, {
  error: true
});

var _ref5 = React.createElement(FormHelperText, null, "Foo");

describe('<FormHelperText />', () => {
  let shallow;
  let classes;
  before(() => {
    shallow = createShallow({
      dive: true
    });
    classes = getClasses(_ref);
  });
  it('should render a <p />', () => {
    const wrapper = shallow(_ref2);
    assert.strictEqual(wrapper.name(), 'p');
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass('woofHelperText'), true, 'should have the user class');
  });
  describe('prop: component', () => {
    it('should render the prop component', () => {
      const wrapper = shallow(_ref3);
      assert.strictEqual(wrapper.name(), 'div');
    });
  });
  describe('prop: error', () => {
    it('should have an error class', () => {
      const wrapper = shallow(_ref4);
      assert.strictEqual(wrapper.hasClass(classes.error), true);
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
      wrapper = shallow(_ref5);
    });
    ['error', 'disabled'].forEach(visualState => {
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
    describe('margin', () => {
      describe('context margin: dense', () => {
        beforeEach(() => {
          setFormControlContext({
            margin: 'dense'
          });
        });
        it('should have the dense class', () => {
          assert.strictEqual(wrapper.hasClass(classes.marginDense), true);
        });
      });
      it('should be overridden by props', () => {
        assert.strictEqual(wrapper.hasClass(classes.marginDense), false);
        wrapper.setProps({
          margin: 'dense'
        });
        assert.strictEqual(wrapper.hasClass(classes.marginDense), true);
      });
    });
  });
});