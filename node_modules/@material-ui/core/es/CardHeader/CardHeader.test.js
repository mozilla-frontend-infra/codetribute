import React from 'react';
import { assert } from 'chai';
import { createShallow, getClasses } from '../test-utils';
import CardHeader from './CardHeader';
import Typography from '../Typography';

var _ref = React.createElement(CardHeader, null);

var _ref2 = React.createElement(CardHeader, null);

var _ref3 = React.createElement(CardHeader, null);

var _ref4 = React.createElement(CardHeader, {
  title: "Title",
  subheader: "Subheader"
});

var _ref5 = React.createElement("span", null);

describe('<CardHeader />', () => {
  let shallow;
  let classes;
  before(() => {
    shallow = createShallow({
      untilSelector: 'div'
    });
    classes = getClasses(_ref);
  });
  it('should render CardContent', () => {
    const wrapper = shallow(_ref2);
    assert.strictEqual(wrapper.name(), 'div');
  });
  it('should have the root class', () => {
    const wrapper = shallow(_ref3);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
  });
  describe('with custom styles', () => {
    let wrapper;
    let extraClasses;
    beforeEach(() => {
      extraClasses = {
        title: 'foo',
        subheader: 'bar'
      };
      wrapper = shallow(React.createElement(CardHeader, {
        title: "Title",
        subheader: "Subheader",
        classes: {
          title: extraClasses.title,
          subheader: extraClasses.subheader
        }
      })).childAt(0);
    });
    it('should render with the title class', () => {
      const title = wrapper.childAt(0);
      assert.strictEqual(title.hasClass(extraClasses.title), true);
    });
    it('should render with the subheader class', () => {
      const subheader = wrapper.childAt(1);
      assert.strictEqual(subheader.hasClass(extraClasses.subheader), true);
    });
  });
  describe('without an avatar', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(_ref4).childAt(0);
    });
    it('should render the title as headline text', () => {
      const title = wrapper.childAt(0);
      assert.strictEqual(title.type(), Typography);
      assert.strictEqual(title.props().variant, 'headline');
    });
    it('should render the subheader as body1 secondary text', () => {
      const subheader = wrapper.childAt(1);
      assert.strictEqual(subheader.type(), Typography);
      assert.strictEqual(subheader.props().variant, 'body1');
      assert.strictEqual(subheader.props().color, 'textSecondary');
    });
    it('should not render the subheader if none is given', () => {
      const title = wrapper.childAt(0);
      assert.strictEqual(title.type(), Typography);
      assert.strictEqual(wrapper.length, 1);
    });
  });
  describe('with an avatar', () => {
    let wrapper;
    let avatar;

    var _ref6 = React.createElement(CardHeader, {
      avatar: avatar,
      title: "Title",
      subheader: "Subhead"
    });

    beforeEach(() => {
      avatar = _ref5;
      wrapper = shallow(_ref6);
    });
    it('should render the avatar inside the first child', () => {
      const container = wrapper.childAt(0);
      assert.strictEqual(container.is('div'), true);
      assert.strictEqual(container.hasClass(classes.avatar), true);
      assert.strictEqual(container.childAt(0).equals(avatar), true);
    });
    it('should render the title as body2 text inside the second child', () => {
      const container = wrapper.childAt(1);
      assert.strictEqual(container.hasClass(classes.content), true, 'should have the content class');
      const title = container.childAt(0);
      assert.strictEqual(title.type(), Typography);
      assert.strictEqual(title.props().variant, 'body2');
    });
    it('should render the subeader as body2 secondary text inside the second child', () => {
      const container = wrapper.childAt(1);
      assert.strictEqual(container.hasClass(classes.content), true, 'should have the content class');
      const subheader = container.childAt(1);
      assert.strictEqual(subheader.type(), Typography);
      assert.strictEqual(subheader.props().variant, 'body2');
      assert.strictEqual(subheader.props().color, 'textSecondary');
    });
  });
});