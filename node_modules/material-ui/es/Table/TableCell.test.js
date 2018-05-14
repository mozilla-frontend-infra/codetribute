import React from 'react';
import { assert } from 'chai';
import { createShallow, getClasses } from '../test-utils';
import TableCell from './TableCell';

var _ref = React.createElement(TableCell, null);

var _ref2 = React.createElement(TableCell, null);

var _ref3 = React.createElement(TableCell, {
  "data-my-prop": "woofTableCell"
});

var _ref4 = React.createElement(TableCell, {
  className: "woofTableCell"
});

var _ref5 = React.createElement(TableCell, {
  className: "woofTableCell",
  padding: "none"
});

var _ref6 = React.createElement(TableCell, {
  className: "woofTableCell",
  padding: "checkbox"
});

var _ref7 = React.createElement(TableCell, {
  className: "woofTableCell",
  padding: "dense"
});

var _ref8 = React.createElement("p", {
  className: "test"
}, "Hello");

var _ref9 = React.createElement(TableCell, null);

var _ref10 = React.createElement(TableCell, {
  scope: "row"
});

var _ref11 = React.createElement(TableCell, null);

var _ref12 = React.createElement(TableCell, {
  component: "div"
});

var _ref13 = React.createElement(TableCell, null);

var _ref14 = React.createElement(TableCell, {
  variant: "head"
});

var _ref15 = React.createElement(TableCell, {
  variant: "body"
});

var _ref16 = React.createElement(TableCell, {
  variant: "body"
});

var _ref17 = React.createElement(TableCell, {
  variant: "footer"
});

var _ref18 = React.createElement(TableCell, {
  numeric: true
});

var _ref19 = React.createElement(TableCell, {
  sortDirection: "asc"
});

var _ref20 = React.createElement(TableCell, {
  sortDirection: "desc"
});

describe('<TableCell />', () => {
  let shallow;
  let classes;
  before(() => {
    shallow = createShallow({
      untilSelector: TableCell,
      context: {
        table: {
          footer: true
        }
      }
    });
    classes = getClasses(_ref);
  });
  it('should render a td', () => {
    const wrapper = shallow(_ref2);
    assert.strictEqual(wrapper.name(), 'td');
  });
  it('should spread custom props on the root node', () => {
    const wrapper = shallow(_ref3);
    assert.strictEqual(wrapper.props()['data-my-prop'], 'woofTableCell', 'custom prop should be woofTableCell');
  });
  it('should render with the user, root and padding classes', () => {
    const wrapper = shallow(_ref4);
    assert.strictEqual(wrapper.hasClass('woofTableCell'), true);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass(classes.paddingDefault), false);
  });
  it('should render with the user, root and without the padding classes', () => {
    const wrapper = shallow(_ref5);
    assert.strictEqual(wrapper.hasClass('woofTableCell'), true);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass(classes.paddingDefault), false, 'should not have the padding class');
  });
  it('should render with the user, root, padding, and checkbox classes', () => {
    const wrapper = shallow(_ref6);
    assert.strictEqual(wrapper.hasClass('woofTableCell'), true);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass(classes.paddingCheckbox), true);
  });
  it('should render with the user, root, padding, and dense classes', () => {
    const wrapper = shallow(_ref7);
    assert.strictEqual(wrapper.hasClass('woofTableCell'), true);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass(classes.paddingDense), true);
  });
  it('should render children', () => {
    const children = _ref8;
    const wrapper = shallow(React.createElement(TableCell, null, children));
    assert.strictEqual(wrapper.childAt(0).equals(children), true);
  });
  it('should render a th with the head class when in the context of a table head', () => {
    const wrapper = shallow(_ref9);
    wrapper.setContext({
      table: {
        head: true
      }
    });
    assert.strictEqual(wrapper.name(), 'th');
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass(classes.head), true, 'should have the head class');
    assert.strictEqual(wrapper.props().scope, 'col', 'should have the correct scope attribute');
  });
  it('should render specified scope attribute even when in the context of a table head', () => {
    const wrapper = shallow(_ref10);
    wrapper.setContext({
      table: {
        head: true
      }
    });
    assert.strictEqual(wrapper.props().scope, 'row', 'should have the specified scope attribute');
  });
  it('should render a th with the footer class when in the context of a table footer', () => {
    const wrapper = shallow(_ref11);
    wrapper.setContext({
      table: {
        footer: true
      }
    });
    assert.strictEqual(wrapper.name(), 'td');
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass(classes.footer), true, 'should have the footer class');
  });
  it('should render a div when custom component prop is used', () => {
    const wrapper = shallow(_ref12);
    assert.strictEqual(wrapper.name(), 'div', 'should be a div element');
    assert.strictEqual(wrapper.hasClass(classes.root), true);
  });
  it('should render with the footer class when in the context of a table footer', () => {
    const wrapper = shallow(_ref13);
    wrapper.setContext({
      table: {
        footer: true
      }
    });
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass(classes.footer), true, 'should have the footer class');
  });
  it('should render with the head class when variant is head, overriding context', () => {
    const wrapper = shallow(_ref14);
    wrapper.setContext({
      table: {
        footer: true
      }
    });
    assert.strictEqual(wrapper.hasClass(classes.head), true);
    assert.strictEqual(wrapper.props().scope, undefined, 'should have the correct scope attribute');
  });
  it('should render without head class when variant is body, overriding context', () => {
    const wrapper = shallow(_ref15);
    wrapper.setContext({
      table: {
        head: true
      }
    });
    assert.strictEqual(wrapper.hasClass(classes.head), false);
  });
  it('should render without footer class when variant is body, overriding context', () => {
    const wrapper = shallow(_ref16);
    wrapper.setContext({
      table: {
        footer: true
      }
    });
    assert.strictEqual(wrapper.hasClass(classes.footer), false);
  });
  it('should render with the footer class when variant is footer, overriding context', () => {
    const wrapper = shallow(_ref17);
    wrapper.setContext({
      table: {
        head: true
      }
    });
    assert.strictEqual(wrapper.hasClass(classes.footer), true);
  });
  it('should render with the numeric class', () => {
    const wrapper = shallow(_ref18);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass(classes.numeric), true, 'should have the numeric class');
  });
  it('should render aria-sort="ascending" when prop sortDirection="asc" provided', () => {
    const wrapper = shallow(_ref19);
    assert.strictEqual(wrapper.props()['aria-sort'], 'ascending');
  });
  it('should render aria-sort="descending" when prop sortDirection="desc" provided', () => {
    const wrapper = shallow(_ref20);
    assert.strictEqual(wrapper.props()['aria-sort'], 'descending');
  });
});