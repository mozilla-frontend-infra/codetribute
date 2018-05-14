import _extends from "@babel/runtime/helpers/extends";
import React from 'react';
import { assert } from 'chai';
import { createShallow, getClasses } from '../test-utils';
import Paper from '../Paper';
import Fade from '../transitions/Fade';
import Modal from '../Modal';
import Dialog from './Dialog';

var _ref = React.createElement("p", null, "Hello");

var _ref2 = React.createElement(Dialog, {
  open: true
}, "foo");

describe('<Dialog />', () => {
  let shallow;
  let classes;
  const defaultProps = {
    open: false
  };
  before(() => {
    shallow = createShallow({
      dive: true
    });
    classes = getClasses(React.createElement(Dialog, defaultProps, "foo"));
  });
  it('should render a Modal', () => {
    const wrapper = shallow(React.createElement(Dialog, defaultProps, "foo"));
    assert.strictEqual(wrapper.type(), Modal);
  });
  it('should render a Modal with TransitionComponent', () => {
    const Transition = props => React.createElement("div", _extends({
      className: "cloned-element-class"
    }, props));

    const wrapper = shallow(React.createElement(Dialog, _extends({}, defaultProps, {
      TransitionComponent: Transition
    }), "foo"));
    assert.strictEqual(wrapper.find(Transition).length, 1, 'should include element given in TransitionComponent');
  });
  it('should put Modal specific props on the root Modal node', () => {
    const onBackdropClick = () => {};

    const onEscapeKeyDown = () => {};

    const onClose = () => {};

    const wrapper = shallow(React.createElement(Dialog, {
      open: true,
      transitionDuration: 100,
      onBackdropClick: onBackdropClick,
      onEscapeKeyDown: onEscapeKeyDown,
      onClose: onClose,
      hideOnBackdropClick: false,
      hideOnEscapeKeyUp: false
    }, "foo"));
    assert.strictEqual(wrapper.props().open, true);
    assert.strictEqual(wrapper.props().BackdropProps.transitionDuration, 100);
    assert.strictEqual(wrapper.props().onBackdropClick, onBackdropClick);
    assert.strictEqual(wrapper.props().onEscapeKeyDown, onEscapeKeyDown);
    assert.strictEqual(wrapper.props().onClose, onClose);
    assert.strictEqual(wrapper.props().hideOnBackdropClick, false);
    assert.strictEqual(wrapper.props().hideOnEscapeKeyUp, false);
  });
  it('should spread custom props on the paper (dialog "root") node', () => {
    const wrapper = shallow(React.createElement(Dialog, _extends({}, defaultProps, {
      "data-my-prop": "woofDialog"
    }), "foo"));
    assert.strictEqual(wrapper.prop('data-my-prop'), 'woofDialog', 'custom prop should be woofDialog');
  });
  it('should render with the user classes on the root node', () => {
    const wrapper = shallow(React.createElement(Dialog, _extends({}, defaultProps, {
      className: "woofDialog"
    }), "foo"));
    assert.strictEqual(wrapper.hasClass('woofDialog'), true);
  });
  it('should render Fade > Paper > children inside the Modal', () => {
    const children = _ref;
    const wrapper = shallow(React.createElement(Dialog, defaultProps, children));
    const fade = wrapper.childAt(0);
    assert.strictEqual(fade.type(), Fade);
    const paper = fade.childAt(0);
    assert.strictEqual(paper.length === 1 && paper.type(), Paper);
    assert.strictEqual(paper.hasClass(classes.paper), true, 'should have the dialog class');
  });
  it('should not be open by default', () => {
    const wrapper = shallow(React.createElement(Dialog, defaultProps, "foo"));
    assert.strictEqual(wrapper.props().open, false, 'should pass show=false to the Modal');
    assert.strictEqual(wrapper.find(Fade).props().in, false, 'should pass in=false to the Fade');
  });
  it('should be open by default', () => {
    const wrapper = shallow(_ref2);
    assert.strictEqual(wrapper.props().open, true, 'should pass show=true to the Modal');
    assert.strictEqual(wrapper.find(Fade).props().in, true, 'should pass in=true to the Fade');
  });
  it('should fade down and make the transition appear on first mount', () => {
    const wrapper = shallow(React.createElement(Dialog, defaultProps, "foo"));
    assert.strictEqual(wrapper.find(Fade).props().appear, true, 'should pass appear=true to the Fade');
  });
  describe('prop: classes', () => {
    it('should add the class on the Paper element', () => {
      const className = 'foo';
      const wrapper = shallow(React.createElement(Dialog, _extends({}, defaultProps, {
        classes: {
          paper: className
        }
      }), "foo"));
      assert.strictEqual(wrapper.find(Paper).hasClass(className), true);
    });
  });
  describe('prop: maxWidth', () => {
    it('should use the right className', () => {
      const wrapper = shallow(React.createElement(Dialog, _extends({}, defaultProps, {
        maxWidth: "xs"
      }), "foo"));
      assert.strictEqual(wrapper.find(Paper).hasClass(classes.paperWidthXs), true);
    });
  });
  describe('prop: fullWidth', () => {
    it('should set `fullWidth` class if specified', () => {
      const wrapper = shallow(React.createElement(Dialog, _extends({}, defaultProps, {
        fullWidth: true
      }), "foo"));
      assert.strictEqual(wrapper.find(Paper).hasClass(classes.paperFullWidth), true);
    });
    it('should not set `fullWidth` class if not specified', () => {
      const wrapper = shallow(React.createElement(Dialog, defaultProps, "foo"));
      assert.strictEqual(wrapper.find(Paper).hasClass(classes.paperFullWidth), false);
    });
  });
  describe('prop: fullScreen', () => {
    it('true should render fullScreen', () => {
      const wrapper = shallow(React.createElement(Dialog, _extends({}, defaultProps, {
        fullScreen: true
      }), "foo"));
      assert.strictEqual(wrapper.find(Paper).hasClass(classes.paperFullScreen), true);
    });
    it('false should not render fullScreen', () => {
      const wrapper = shallow(React.createElement(Dialog, _extends({}, defaultProps, {
        fullScreen: false
      }), "foo"));
      assert.strictEqual(wrapper.find(Paper).hasClass(classes.paperFullScreen), false);
    });
  });
});