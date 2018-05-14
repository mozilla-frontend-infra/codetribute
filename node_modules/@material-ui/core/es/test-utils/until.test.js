import assert from 'assert';
import React from 'react';
import PropTypes from 'prop-types';
import { shallow } from 'enzyme';
import until from './until';

var _ref = React.createElement("div", null);

const Div = () => _ref;

const hoc = Component => () => React.createElement(Component, null);

var _ref2 = React.createElement("div", null);

var _ref3 = React.createElement("div", null);

var _ref4 = React.createElement("div", null);

var _ref5 = React.createElement("div", null);

var _ref6 = React.createElement("div", null, React.createElement(Div, null));

var _ref7 = React.createElement("div", null, React.createElement(Div, null));

var _ref8 = React.createElement(Div, null);

var _ref9 = React.createElement("div", null, React.createElement(Div, null));

var _ref10 = React.createElement("div", null);

var _ref11 = React.createElement(Div, null);

var _ref12 = React.createElement(Div, null);

var _ref14 = React.createElement(Div, null);

describe('until', () => {
  it('shallow renders the current wrapper one level deep', () => {
    const EnhancedDiv = hoc(Div);
    const wrapper = until.call(shallow(React.createElement(EnhancedDiv, null)), 'Div');
    assert.strictEqual(wrapper.contains(_ref2), true);
  });
  it('shallow renders the current wrapper several levels deep', () => {
    const EnhancedDiv = hoc(hoc(hoc(Div)));
    const wrapper = until.call(shallow(React.createElement(EnhancedDiv, null)), 'Div');
    assert.strictEqual(wrapper.contains(_ref3), true);
  });
  it('stops shallow rendering when the wrapper is empty', () => {
    const nullHoc = () => () => null;

    const EnhancedDiv = nullHoc();
    const wrapper = until.call(shallow(React.createElement(EnhancedDiv, null)), 'Div');
    assert.strictEqual(wrapper.html(), null);
  });
  it('shallow renders as much as possible when no selector is provided', () => {
    const EnhancedDiv = hoc(hoc(Div));
    const wrapper = until.call(shallow(React.createElement(EnhancedDiv, null)));
    assert.strictEqual(wrapper.contains(_ref4), true);
  });
  it('shallow renders the current wrapper even if the selector never matches', () => {
    const EnhancedDiv = hoc(Div);
    const wrapper = until.call(shallow(React.createElement(EnhancedDiv, null)), 'NotDiv');
    assert.strictEqual(wrapper.contains(_ref5), true);
  });
  it('stops shallow rendering when it encounters a DOM element', () => {
    const wrapper = until.call(shallow(_ref6), 'Div');
    assert.strictEqual(wrapper.contains(_ref7), true);
  });
  it('throws when assert.strictEqual called on an empty wrapper', () => {
    assert.throws(() => {
      until.call(shallow(_ref8).find('Foo'), 'div');
    }, Error, 'Method “until” is only meant to be run on a single node. 0 found instead.');
  });
  it('shallow renders non-root wrappers', () => {
    const Container = () => _ref9;

    const wrapper = until.call(shallow(React.createElement(Container, null)).find(Div));
    assert.strictEqual(wrapper.contains(_ref10), true);
  }); // eslint-disable-next-line react/prefer-stateless-function

  class Foo extends React.Component {
    render() {
      return _ref11;
    }

  }

  Foo.contextTypes = {
    quux: PropTypes.bool.isRequired
  };
  it('context propagation passes down context from the root component', () => {
    const EnhancedFoo = hoc(Foo);
    const options = {
      context: {
        quux: true
      }
    };
    const wrapper = until.call(shallow(React.createElement(EnhancedFoo, null), options), 'Foo', options);
    assert.strictEqual(wrapper.context('quux'), true);
    assert.strictEqual(wrapper.contains(_ref12), true);
  }); // eslint-disable-next-line react/no-multi-comp

  var _ref13 = React.createElement(Foo, null);

  class Bar extends React.Component {
    constructor(...args) {
      var _temp;

      return _temp = super(...args), Object.defineProperty(this, "getChildContext", {
        configurable: true,
        enumerable: true,
        writable: true,
        value: () => ({
          quux: true
        })
      }), Object.defineProperty(this, "render", {
        configurable: true,
        enumerable: true,
        writable: true,
        value: () => _ref13
      }), _temp;
    }

  }

  Object.defineProperty(Bar, "childContextTypes", {
    configurable: true,
    enumerable: true,
    writable: true,
    value: {
      quux: PropTypes.bool
    }
  });
  it('context propagation passes down context from an intermediary component', () => {
    const EnhancedBar = hoc(Bar);
    const wrapper = until.call(shallow(React.createElement(EnhancedBar, null)), 'Foo');
    assert.strictEqual(wrapper.context('quux'), true);
    assert.strictEqual(wrapper.contains(_ref14), true);
  });
});