import React from 'react';
import { assert } from 'chai';
import consoleErrorMock from 'test/utils/consoleErrorMock';
import { createShallow, getClasses } from '../test-utils';
import Avatar from '../Avatar';
import ListItemAvatar from './ListItemAvatar';

var _ref = React.createElement(ListItemAvatar, {
  className: "foo"
}, React.createElement(Avatar, {
  className: "bar"
}));

var _ref2 = React.createElement(ListItemAvatar, {
  className: "foo"
}, React.createElement(Avatar, {
  className: "bar"
}));

var _ref3 = React.createElement(ListItemAvatar, null, React.createElement(Avatar, null));

var _ref4 = React.createElement(ListItemAvatar, null, React.createElement(Avatar, null));

describe('<ListItemAvatar />', () => {
  let shallow;
  let classes;
  before(() => {
    shallow = createShallow({
      dive: true
    });
    classes = getClasses(_ref, {
      context: {
        dense: true
      }
    });
  });
  it('should render with the user and root classes', () => {
    const wrapper = shallow(_ref2, {
      context: {
        dense: true
      }
    });
    assert.strictEqual(wrapper.hasClass('foo'), true, 'should have the "foo" class');
    assert.strictEqual(wrapper.hasClass('bar'), true, 'should have the "bar" class');
    assert.strictEqual(wrapper.hasClass(classes.root), true);
  });
  describe('List', () => {
    before(() => {
      consoleErrorMock.spy();
    });
    after(() => {
      consoleErrorMock.reset();
    });
    it('should render an Avatar', () => {
      const wrapper = shallow(_ref3, {
        context: {
          dense: true
        }
      });
      assert.strictEqual(wrapper.type(), Avatar);
      assert.strictEqual(consoleErrorMock.callCount(), 0);
    });
    it('should warn in a wrong context', () => {
      shallow(_ref4);
      assert.strictEqual(consoleErrorMock.callCount(), 1);
    });
  });
});