/* eslint-disable react/no-multi-comp */
import React from 'react';
import ReactDOM from 'react-dom';
import { assert } from 'chai';
import { spy } from 'sinon';
import { createMount, createRender } from '../test-utils';
import NewPortal from './Portal';
import LegacyPortal from './LegacyPortal';
import Select from '../Select';
import { MenuItem } from '../Menu';
const versions = ['old', 'latest'];

var _ref = React.createElement(Select, {
  value: 1,
  open: true
}, React.createElement(MenuItem, {
  value: 1
}, React.createElement("em", null, "1")), React.createElement(MenuItem, {
  value: 2
}, React.createElement("em", null, "2")));

var _ref2 = React.createElement("div", null, "Bar");

var _ref8 = React.createElement("div", {
  id: "test1"
});

var _ref10 = React.createElement("div", {
  id: "test2"
});

var _ref11 = React.createElement("div", {
  id: "test3"
});

var _ref12 = React.createElement("div", null);

var _ref13 = React.createElement("div", null, "Bar");

var _ref14 = React.createElement("h1", {
  className: "woofPortal"
}, "Foo");

var _ref15 = React.createElement("h1", null, "Foo");

var _ref16 = React.createElement("h1", {
  className: "woofPortal"
}, "Foo");

var _ref17 = React.createElement("div", {
  id: "test2"
});

describe('<Portal />', () => {
  let mount;
  let render;
  const reactDomMock = {};
  before(() => {
    mount = createMount();
    render = createRender();
  });
  after(() => {
    mount.cleanUp();
  });
  it('should work with a high level component like the Select', () => {
    const wrapper = mount(_ref);
    assert.strictEqual(wrapper.find(MenuItem).length, 2);
  });
  versions.map(verion => {
    describe(verion, () => {
      let Portal;
      let cleanUp;
      beforeEach(() => {
        reactDomMock.createPortal = ReactDOM.createPortal;

        if (verion === 'latest') {
          Portal = NewPortal;

          ReactDOM.createPortal = (children, mountNode) => {
            const element = document.createElement(children.type);
            element.textContent = children.props.children;
            element.setAttribute('id', children.props.id);
            element.setAttribute('class', children.props.className);
            mountNode.appendChild(element);

            if (cleanUp) {
              cleanUp.mountNode.removeChild(cleanUp.element);
            }

            cleanUp = {
              element,
              mountNode
            };
            return null;
          };
        } else if (verion === 'old') {
          Portal = LegacyPortal;
          ReactDOM.createPortal = null;

          ReactDOM.unstable_renderSubtreeIntoContainer = (instance, children, mountNode, callback) => {
            const element = document.createElement(children.type);
            element.textContent = children.props.children;
            element.setAttribute('id', children.props.id);
            element.setAttribute('class', children.props.className);
            mountNode.appendChild(element);

            if (cleanUp) {
              cleanUp.mountNode.removeChild(cleanUp.element);
            }

            cleanUp = {
              element,
              mountNode
            };
            callback();
            return null;
          };
        } else {
          throw new Error('unsupported');
        }
      });
      afterEach(() => {
        ReactDOM.createPortal = reactDomMock.createPortal;

        if (verion === 'next') {
          ReactDOM.unstable_renderSubtreeIntoContainer = undefined;
        }

        if (cleanUp) {
          cleanUp.mountNode.removeChild(cleanUp.element);
          cleanUp = null;
        }
      });

      var _ref3 = React.createElement(Portal, null, _ref13);

      describe('server side', () => {
        // Only run the test on node.
        if (!/jsdom/.test(window.navigator.userAgent) || verion === 'next') {
          return;
        }

        it('render nothing on the server', () => {
          const markup1 = render(_ref2);
          assert.strictEqual(markup1.text(), 'Bar');
          const markup2 = render(_ref3);
          assert.strictEqual(markup2.text(), '');
        });
      });

      var _ref4 = React.createElement(Portal, null, _ref14);

      it('should render nothing directly', () => {
        const wrapper = mount(_ref4);
        assert.strictEqual(wrapper.children().length, 0, 'should have no children');
      });

      var _ref5 = React.createElement(Portal, null, _ref15);

      it('should have access to the mountNode', () => {
        const wrapper = mount(_ref5);
        const instance = wrapper.instance();
        assert.strictEqual(instance.getMountNode(), instance.mountNode);
      });

      var _ref6 = React.createElement(Portal, null, _ref16);

      it('should render in a different node', () => {
        const wrapper = mount(_ref6);
        const instance = wrapper.instance();
        assert.notStrictEqual(instance.mountNode, null, 'should have a mountNode');
        assert.strictEqual(document.querySelectorAll('.woofPortal').length, 1);
      });
      it('should unmount when parent unmounts', () => {
        class Parent extends React.Component {
          constructor(...args) {
            var _temp;

            return _temp = super(...args), Object.defineProperty(this, "state", {
              configurable: true,
              enumerable: true,
              writable: true,
              value: {
                show: true
              }
            }), _temp;
          }

          render() {
            return React.createElement("div", null, this.state.show ? _ref7 : null);
          }

        }

        class Child extends React.Component {
          render() {
            return React.createElement("div", null, React.createElement("div", {
              ref: node => {
                this.container = node;
              }
            }), React.createElement(Portal, {
              container: () => this.container
            }, _ref8));
          }

        }

        var _ref7 = React.createElement(Child, null);

        const wrapper = mount(React.createElement(Parent, null));
        assert.strictEqual(document.querySelectorAll('#test1').length, 1);
        wrapper.setState({
          show: false
        });
        assert.strictEqual(document.querySelectorAll('#test1').length, 0);
      });

      var _ref9 = React.createElement(Portal, null, _ref17);

      it('should render overlay into container (document)', () => {
        mount(_ref9);
        assert.strictEqual(document.querySelectorAll('#test2').length, 1);
      });
      it('should render overlay into container (DOMNode)', () => {
        const container = document.createElement('div');
        mount(React.createElement(Portal, {
          container: container
        }, _ref10));
        assert.strictEqual(container.querySelectorAll('#test2').length, 1);
      });
      it('should change container on prop change', () => {
        class ContainerTest extends React.Component {
          constructor(...args) {
            var _temp2;

            return _temp2 = super(...args), Object.defineProperty(this, "state", {
              configurable: true,
              enumerable: true,
              writable: true,
              value: {
                container: null
              }
            }), _temp2;
          }

          render() {
            return React.createElement("div", null, React.createElement("div", {
              ref: node => {
                this.container = node;
              }
            }), React.createElement(Portal, {
              container: this.state.container
            }, _ref11));
          }

        }

        const wrapper = mount(React.createElement(ContainerTest, null));

        if (verion === 'latest') {
          assert.strictEqual(document.querySelector('#test3').parentNode.nodeName, 'BODY');
          wrapper.setState({
            container: wrapper.instance().container
          });
          assert.strictEqual(document.querySelector('#test3').parentNode.nodeName, 'DIV');
        } else {
          assert.strictEqual(document.querySelector('#test3').parentNode.parentNode.nodeName, 'BODY');
          wrapper.setState({
            container: wrapper.instance().container
          });
          assert.strictEqual(document.querySelector('#test3').parentNode.parentNode.nodeName, 'DIV');
        }
      });
      it('should call onRendered', () => {
        const handleRendered = spy();
        mount(React.createElement(Portal, {
          onRendered: handleRendered
        }, _ref12));
        assert.strictEqual(handleRendered.callCount, 1);
      });
    });
    return null;
  });
});