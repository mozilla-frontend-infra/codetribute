import React from 'react';
import { assert } from 'chai';
import createBroadcast from 'brcast';
import { createShallow, createMount } from '../test-utils';
import { CHANNEL } from './themeListener';
import withTheme from './withTheme';

var _ref = React.createElement("div", null);

const Empty = () => _ref;

describe('withTheme', () => {
  let shallow;
  let context;
  let mount;
  let broadcast;
  before(() => {
    shallow = createShallow();
    mount = createMount();
    broadcast = createBroadcast();
    context = {
      [CHANNEL]: broadcast
    };
  });
  after(() => {
    mount.cleanUp();
  });
  it('should use the theme provided by the context', () => {
    const theme = {
      themeProperty: 'foo'
    };
    broadcast.setState(theme);
    const ThemedComponent = withTheme()(Empty);
    const wrapper = shallow(React.createElement(ThemedComponent, null), {
      context
    });
    assert.strictEqual(wrapper.props().theme, theme);
  });
  it('should rerender when the theme is updated', () => {
    const theme = {
      themeProperty: 'foo'
    };
    broadcast.setState(theme);
    const ThemedComponent = withTheme()(Empty);
    const wrapper = mount(React.createElement(ThemedComponent, null), {
      context
    });
    assert.strictEqual(wrapper.instance().state.theme, theme);
    const newTheme = {
      themeProperty: 'bar'
    };
    broadcast.setState(newTheme);
    assert.strictEqual(wrapper.instance().state.theme, newTheme);
  });
});