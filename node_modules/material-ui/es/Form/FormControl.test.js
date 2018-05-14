import React from 'react';
import { spy } from 'sinon';
import { assert } from 'chai';
import { createShallow, getClasses } from '../test-utils';
import Input from '../Input';
import Select from '../Select';
import FormControl from './FormControl';

var _ref = React.createElement(FormControl, null);

var _ref2 = React.createElement(FormControl, {
  className: "woofFormControl"
});

var _ref3 = React.createElement(FormControl, {
  className: "woofFormControl"
});

var _ref4 = React.createElement(FormControl, null);

var _ref5 = React.createElement(FormControl, {
  margin: "normal"
});

var _ref6 = React.createElement(FormControl, {
  margin: "dense"
});

var _ref7 = React.createElement(FormControl, null);

var _ref8 = React.createElement(FormControl, {
  required: true
});

var _ref9 = React.createElement(FormControl, null, React.createElement(Input, {
  value: "bar"
}));

var _ref10 = React.createElement(FormControl, null, React.createElement(Input, {
  defaultValue: "bar"
}));

var _ref11 = React.createElement(FormControl, null, React.createElement(Input, {
  endAdornment: React.createElement("div", null)
}));

var _ref12 = React.createElement(FormControl, null, React.createElement(Input, {
  startAdornment: React.createElement("div", null)
}));

var _ref13 = React.createElement(FormControl, null, React.createElement(Select, {
  value: ""
}));

var _ref14 = React.createElement(FormControl, null, React.createElement(Select, {
  value: "",
  input: React.createElement(Input, {
    startAdornment: React.createElement("div", null)
  })
}));

var _ref15 = React.createElement(FormControl, null);

describe('<FormControl />', () => {
  let shallow;
  let classes;
  before(() => {
    shallow = createShallow({
      dive: true
    });
    classes = getClasses(_ref);
  });
  describe('initial state', () => {
    it('should render a div with the root and user classes', () => {
      const wrapper = shallow(_ref2);
      assert.strictEqual(wrapper.name(), 'div');
      assert.strictEqual(wrapper.hasClass(classes.root), true);
      assert.strictEqual(wrapper.hasClass('woofFormControl'), true);
    });
    it('should have the focused class', () => {
      const wrapper = shallow(_ref3);
      assert.strictEqual(wrapper.name(), 'div');
      assert.strictEqual(wrapper.hasClass(classes.root), true);
      assert.strictEqual(wrapper.hasClass('woofFormControl'), true);
    });
    it('should have no margin', () => {
      const wrapper = shallow(_ref4);
      assert.strictEqual(wrapper.name(), 'div');
      assert.strictEqual(wrapper.hasClass(classes.marginNormal), false);
      assert.strictEqual(wrapper.hasClass(classes.marginDense), false);
    });
    it('should have the margin normal class', () => {
      const wrapper = shallow(_ref5);
      assert.strictEqual(wrapper.name(), 'div');
      assert.strictEqual(wrapper.hasClass(classes.marginNormal), true);
    });
    it('should have the margin dense class', () => {
      const wrapper = shallow(_ref6);
      assert.strictEqual(wrapper.name(), 'div');
      assert.strictEqual(wrapper.hasClass(classes.marginDense), true);
      assert.strictEqual(wrapper.hasClass(classes.marginNormal), false);
    });
  });
  describe('initial state', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(_ref7);
    });
    it('should not be filled initially', () => {
      assert.strictEqual(wrapper.state().filled, false);
    });
    it('should not be focused initially', () => {
      assert.strictEqual(wrapper.state().focused, false);
    });
  });
  describe('prop: required', () => {
    it('should not apply it to the DOM', () => {
      const wrapper = shallow(_ref8);
      assert.strictEqual(wrapper.props().required, undefined);
    });
  });
  describe('input', () => {
    it('should be filled with a value', () => {
      const wrapper = shallow(_ref9);
      assert.strictEqual(wrapper.state().filled, true);
    });
    it('should be filled with a defaultValue', () => {
      const wrapper = shallow(_ref10);
      assert.strictEqual(wrapper.state().filled, true);
    });
    it('should be adorned with an endAdornment', () => {
      const wrapper = shallow(_ref11);
      assert.strictEqual(wrapper.state().adornedStart, false);
    });
    it('should be adorned with a startAdornment', () => {
      const wrapper = shallow(_ref12);
      assert.strictEqual(wrapper.state().adornedStart, true);
    });
  });
  describe('select', () => {
    it('should not be adorned without a startAdornment', () => {
      const wrapper = shallow(_ref13);
      assert.strictEqual(wrapper.state().adornedStart, false);
    });
    it('should be adorned with a startAdornment', () => {
      const wrapper = shallow(_ref14);
      assert.strictEqual(wrapper.state().adornedStart, true);
    });
  });
  describe('muiFormControl child context', () => {
    let wrapper;
    let muiFormControlContext;

    function loadChildContext() {
      muiFormControlContext = wrapper.instance().getChildContext().muiFormControl;
    }

    beforeEach(() => {
      wrapper = shallow(_ref15);
      loadChildContext();
    });
    describe('from state', () => {
      it('should have the filled state from the instance', () => {
        assert.strictEqual(muiFormControlContext.filled, false);
        wrapper.setState({
          filled: true
        });
        loadChildContext();
        assert.strictEqual(muiFormControlContext.filled, true);
      });
      it('should have the focused state from the instance', () => {
        assert.strictEqual(muiFormControlContext.focused, false);
        wrapper.setState({
          focused: true
        });
        loadChildContext();
        assert.strictEqual(muiFormControlContext.focused, true);
      });
      it('should have the adornedStart state from the instance', () => {
        assert.strictEqual(muiFormControlContext.adornedStart, false);
        wrapper.setState({
          adornedStart: true
        });
        loadChildContext();
        assert.strictEqual(muiFormControlContext.adornedStart, true);
      });
    });
    describe('from props', () => {
      it('should have the required prop from the instance', () => {
        assert.strictEqual(muiFormControlContext.required, false);
        wrapper.setProps({
          required: true
        });
        loadChildContext();
        assert.strictEqual(muiFormControlContext.required, true);
      });
      it('should have the error prop from the instance', () => {
        assert.strictEqual(muiFormControlContext.error, false);
        wrapper.setProps({
          error: true
        });
        loadChildContext();
        assert.strictEqual(muiFormControlContext.error, true);
      });
      it('should have the margin prop from the instance', () => {
        assert.strictEqual(muiFormControlContext.margin, 'none');
        wrapper.setProps({
          margin: 'dense'
        });
        loadChildContext();
        assert.strictEqual(muiFormControlContext.margin, 'dense');
      });
    });
    describe('callbacks', () => {
      describe('onFilled', () => {
        it('should set the filled state', () => {
          assert.strictEqual(muiFormControlContext.filled, false);
          muiFormControlContext.onFilled();
          loadChildContext();
          assert.strictEqual(muiFormControlContext.filled, true);
          muiFormControlContext.onFilled();
          assert.strictEqual(muiFormControlContext.filled, true);
        });
      });
      describe('onEmpty', () => {
        it('should clean the filled state', () => {
          muiFormControlContext.onFilled();
          loadChildContext();
          assert.strictEqual(muiFormControlContext.filled, true);
          muiFormControlContext.onEmpty();
          loadChildContext();
          assert.strictEqual(muiFormControlContext.filled, false);
          muiFormControlContext.onEmpty();
          assert.strictEqual(muiFormControlContext.filled, false);
        });
      });
      describe('handleFocus', () => {
        it('should set the focused state', () => {
          assert.strictEqual(wrapper.state('focused'), false);
          muiFormControlContext.onFocus();
          assert.strictEqual(wrapper.state('focused'), true);
          muiFormControlContext.onFocus();
          assert.strictEqual(wrapper.state('focused'), true);
        });
        it('should be able to use a onFocus property', () => {
          const handleFocus = spy();
          wrapper.setProps({
            onFocus: handleFocus
          });
          muiFormControlContext.onFocus();
          assert.strictEqual(handleFocus.callCount, 1);
        });
      });
      describe('handleBlur', () => {
        it('should clear the focused state', () => {
          assert.strictEqual(wrapper.state('focused'), false);
          muiFormControlContext.onFocus();
          assert.strictEqual(wrapper.state('focused'), true);
          muiFormControlContext.onBlur();
          assert.strictEqual(wrapper.state('focused'), false);
          muiFormControlContext.onBlur();
          assert.strictEqual(wrapper.state('focused'), false);
        });
        it('should be able to use a onBlur property', () => {
          const handleBlur = spy();
          wrapper.setProps({
            onBlur: handleBlur
          });
          muiFormControlContext.onFocus();
          muiFormControlContext.onBlur({});
          assert.strictEqual(handleBlur.callCount, 1);
        });
      });
    });
  });
});