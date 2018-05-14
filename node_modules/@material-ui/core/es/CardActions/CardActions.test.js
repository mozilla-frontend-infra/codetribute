import React from 'react';
import { assert } from 'chai';
import { createShallow, getClasses } from '../test-utils';
import CardActions from './CardActions';

var _ref = React.createElement(CardActions, null);

var _ref2 = React.createElement(CardActions, {
  className: "cardActions"
});

var _ref3 = React.createElement("div", {
  id: "child1"
});

var _ref4 = React.createElement("div", {
  id: "child2"
});

var _ref5 = React.createElement("div", {
  id: "child3"
});

var _ref6 = React.createElement(CardActions, {
  disableActionSpacing: true
}, React.createElement("div", {
  id: "child1"
}), React.createElement("div", {
  id: "child2"
}));

describe('<CardActions />', () => {
  let shallow;
  let classes;
  before(() => {
    shallow = createShallow({
      dive: true
    });
    classes = getClasses(_ref);
  });
  it('should render a div with the root and custom class', () => {
    const wrapper = shallow(_ref2);
    assert.strictEqual(wrapper.name(), 'div');
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass('cardActions'), true);
  });
  it('should pass the action class to children', () => {
    const child3 = false;
    const wrapper = shallow(React.createElement(CardActions, null, _ref3, _ref4, child3 && _ref5));
    assert.strictEqual(wrapper.find('#child1').hasClass(classes.action), true);
    assert.strictEqual(wrapper.find('#child2').hasClass(classes.action), true);
  });
  it('should not pass the action class to children', () => {
    const wrapper = shallow(_ref6);
    assert.strictEqual(wrapper.find('#child1').hasClass(classes.action), false);
    assert.strictEqual(wrapper.find('#child2').hasClass(classes.action), false);
  });
});