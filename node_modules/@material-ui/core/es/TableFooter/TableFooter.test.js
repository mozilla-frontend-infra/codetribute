import React from 'react';
import { assert } from 'chai';
import { createShallow, getClasses } from '../test-utils';
import TableFooter from './TableFooter';

var _ref = React.createElement(TableFooter, null);

var _ref2 = React.createElement(TableFooter, null);

var _ref3 = React.createElement(TableFooter, {
  component: "div"
});

var _ref4 = React.createElement(TableFooter, {
  className: "woofTableHead"
});

var _ref5 = React.createElement("tr", {
  className: "test"
});

describe('<TableFooter />', () => {
  let shallow;
  let classes;
  before(() => {
    shallow = createShallow({
      dive: true
    });
    classes = getClasses(_ref);
  });
  it('should render a tfoot', () => {
    const wrapper = shallow(_ref2);
    assert.strictEqual(wrapper.name(), 'tfoot');
  });
  it('should render a div', () => {
    const wrapper = shallow(_ref3);
    assert.strictEqual(wrapper.name(), 'div');
  });
  it('should render with the user and root class', () => {
    const wrapper = shallow(_ref4);
    assert.strictEqual(wrapper.hasClass('woofTableHead'), true);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
  });
  it('should render children', () => {
    const children = _ref5;
    const wrapper = shallow(React.createElement(TableFooter, null, children));
    assert.strictEqual(wrapper.childAt(0).equals(children), true);
  });
});