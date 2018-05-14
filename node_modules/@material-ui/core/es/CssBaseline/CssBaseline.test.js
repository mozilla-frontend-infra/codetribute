import React from 'react';
import { assert } from 'chai';
import { createMount } from '../test-utils';
import CssBaseline from './CssBaseline';

var _ref = React.createElement(CssBaseline, null);

var _ref2 = React.createElement(CssBaseline, null, React.createElement("div", null));

describe('<CssBaseline />', () => {
  let mount;
  before(() => {
    mount = createMount();
  });
  after(() => {
    mount.cleanUp();
  });
  it('should render nothing', () => {
    const wrapper = mount(_ref);
    assert.strictEqual(wrapper.childAt(0).children().length, 0, 'should have no children');
  });
  it('should render a div with the root class', () => {
    const wrapper = mount(_ref2);
    assert.strictEqual(wrapper.childAt(0).children().name(), 'div');
  });
});