"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _getPrototypeOf = _interopRequireDefault(require("@babel/runtime/core-js/object/get-prototype-of"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _chai = require("chai");

var _sinon = require("sinon");

var _testUtils = require("../test-utils");

var _Portal = _interopRequireDefault(require("./Portal"));

var _LegacyPortal = _interopRequireDefault(require("./LegacyPortal"));

var _Select = _interopRequireDefault(require("../Select"));

var _Menu = require("../Menu");

/* eslint-disable react/no-multi-comp */
var versions = ['old', 'latest'];

var _ref = _react.default.createElement(_Select.default, {
  value: 1,
  open: true
}, _react.default.createElement(_Menu.MenuItem, {
  value: 1
}, _react.default.createElement("em", null, "1")), _react.default.createElement(_Menu.MenuItem, {
  value: 2
}, _react.default.createElement("em", null, "2")));

var _ref2 = _react.default.createElement("div", null, "Bar");

var _ref9 = _react.default.createElement("div", {
  id: "test1"
});

var _ref11 = _react.default.createElement("div", {
  id: "test2"
});

var _ref13 = _react.default.createElement("div", {
  id: "test3"
});

var _ref14 = _react.default.createElement("div", null);

var _ref15 = _react.default.createElement("div", null, "Bar");

var _ref16 = _react.default.createElement("h1", {
  className: "woofPortal"
}, "Foo");

var _ref17 = _react.default.createElement("h1", null, "Foo");

var _ref18 = _react.default.createElement("h1", {
  className: "woofPortal"
}, "Foo");

var _ref19 = _react.default.createElement("div", {
  id: "test2"
});

describe('<Portal />', function () {
  var mount;
  var render;
  var reactDomMock = {};
  before(function () {
    mount = (0, _testUtils.createMount)();
    render = (0, _testUtils.createRender)();
  });
  after(function () {
    mount.cleanUp();
  });
  it('should work with a high level component like the Select', function () {
    var wrapper = mount(_ref);

    _chai.assert.strictEqual(wrapper.find(_Menu.MenuItem).length, 2);
  });
  versions.map(function (verion) {
    describe(verion, function () {
      var Portal;
      var cleanUp;
      beforeEach(function () {
        reactDomMock.createPortal = _reactDom.default.createPortal;

        if (verion === 'latest') {
          Portal = _Portal.default;

          _reactDom.default.createPortal = function (children, mountNode) {
            var element = document.createElement(children.type);
            element.textContent = children.props.children;
            element.setAttribute('id', children.props.id);
            element.setAttribute('class', children.props.className);
            mountNode.appendChild(element);

            if (cleanUp) {
              cleanUp.mountNode.removeChild(cleanUp.element);
            }

            cleanUp = {
              element: element,
              mountNode: mountNode
            };
            return null;
          };
        } else if (verion === 'old') {
          Portal = _LegacyPortal.default;
          _reactDom.default.createPortal = null;

          _reactDom.default.unstable_renderSubtreeIntoContainer = function (instance, children, mountNode, callback) {
            var element = document.createElement(children.type);
            element.textContent = children.props.children;
            element.setAttribute('id', children.props.id);
            element.setAttribute('class', children.props.className);
            mountNode.appendChild(element);

            if (cleanUp) {
              cleanUp.mountNode.removeChild(cleanUp.element);
            }

            cleanUp = {
              element: element,
              mountNode: mountNode
            };
            callback();
            return null;
          };
        } else {
          throw new Error('unsupported');
        }
      });
      afterEach(function () {
        _reactDom.default.createPortal = reactDomMock.createPortal;

        if (verion === 'next') {
          _reactDom.default.unstable_renderSubtreeIntoContainer = undefined;
        }

        if (cleanUp) {
          cleanUp.mountNode.removeChild(cleanUp.element);
          cleanUp = null;
        }
      });

      var _ref3 = _react.default.createElement(Portal, null, _ref15);

      describe('server side', function () {
        // Only run the test on node.
        if (!/jsdom/.test(window.navigator.userAgent) || verion === 'next') {
          return;
        }

        it('render nothing on the server', function () {
          var markup1 = render(_ref2);

          _chai.assert.strictEqual(markup1.text(), 'Bar');

          var markup2 = render(_ref3);

          _chai.assert.strictEqual(markup2.text(), '');
        });
      });

      var _ref4 = _react.default.createElement(Portal, null, _ref16);

      it('should render nothing directly', function () {
        var wrapper = mount(_ref4);

        _chai.assert.strictEqual(wrapper.children().length, 0, 'should have no children');
      });

      var _ref5 = _react.default.createElement(Portal, null, _ref17);

      it('should have access to the mountNode', function () {
        var wrapper = mount(_ref5);
        var instance = wrapper.instance();

        _chai.assert.strictEqual(instance.getMountNode(), instance.mountNode);
      });

      var _ref6 = _react.default.createElement(Portal, null, _ref18);

      it('should render in a different node', function () {
        var wrapper = mount(_ref6);
        var instance = wrapper.instance();

        _chai.assert.notStrictEqual(instance.mountNode, null, 'should have a mountNode');

        _chai.assert.strictEqual(document.querySelectorAll('.woofPortal').length, 1);
      });
      it('should unmount when parent unmounts', function () {
        var Parent =
        /*#__PURE__*/
        function (_React$Component) {
          (0, _inherits2.default)(Parent, _React$Component);

          function Parent() {
            var _ref7;

            var _temp, _this;

            (0, _classCallCheck2.default)(this, Parent);

            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }

            return (0, _possibleConstructorReturn2.default)(_this, (_temp = _this = (0, _possibleConstructorReturn2.default)(this, (_ref7 = Parent.__proto__ || (0, _getPrototypeOf.default)(Parent)).call.apply(_ref7, [this].concat(args))), Object.defineProperty((0, _assertThisInitialized2.default)(_this), "state", {
              configurable: true,
              enumerable: true,
              writable: true,
              value: {
                show: true
              }
            }), _temp));
          }

          (0, _createClass2.default)(Parent, [{
            key: "render",
            value: function render() {
              return _react.default.createElement("div", null, this.state.show ? _ref8 : null);
            }
          }]);
          return Parent;
        }(_react.default.Component);

        var Child =
        /*#__PURE__*/
        function (_React$Component2) {
          (0, _inherits2.default)(Child, _React$Component2);

          function Child() {
            (0, _classCallCheck2.default)(this, Child);
            return (0, _possibleConstructorReturn2.default)(this, (Child.__proto__ || (0, _getPrototypeOf.default)(Child)).apply(this, arguments));
          }

          (0, _createClass2.default)(Child, [{
            key: "render",
            value: function render() {
              var _this2 = this;

              return _react.default.createElement("div", null, _react.default.createElement("div", {
                ref: function ref(node) {
                  _this2.container = node;
                }
              }), _react.default.createElement(Portal, {
                container: function container() {
                  return _this2.container;
                }
              }, _ref9));
            }
          }]);
          return Child;
        }(_react.default.Component);

        var _ref8 = _react.default.createElement(Child, null);

        var wrapper = mount(_react.default.createElement(Parent, null));

        _chai.assert.strictEqual(document.querySelectorAll('#test1').length, 1);

        wrapper.setState({
          show: false
        });

        _chai.assert.strictEqual(document.querySelectorAll('#test1').length, 0);
      });

      var _ref10 = _react.default.createElement(Portal, null, _ref19);

      it('should render overlay into container (document)', function () {
        mount(_ref10);

        _chai.assert.strictEqual(document.querySelectorAll('#test2').length, 1);
      });
      it('should render overlay into container (DOMNode)', function () {
        var container = document.createElement('div');
        mount(_react.default.createElement(Portal, {
          container: container
        }, _ref11));

        _chai.assert.strictEqual(container.querySelectorAll('#test2').length, 1);
      });
      it('should change container on prop change', function () {
        var ContainerTest =
        /*#__PURE__*/
        function (_React$Component3) {
          (0, _inherits2.default)(ContainerTest, _React$Component3);

          function ContainerTest() {
            var _ref12;

            var _temp2, _this3;

            (0, _classCallCheck2.default)(this, ContainerTest);

            for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
              args[_key2] = arguments[_key2];
            }

            return (0, _possibleConstructorReturn2.default)(_this3, (_temp2 = _this3 = (0, _possibleConstructorReturn2.default)(this, (_ref12 = ContainerTest.__proto__ || (0, _getPrototypeOf.default)(ContainerTest)).call.apply(_ref12, [this].concat(args))), Object.defineProperty((0, _assertThisInitialized2.default)(_this3), "state", {
              configurable: true,
              enumerable: true,
              writable: true,
              value: {
                container: null
              }
            }), _temp2));
          }

          (0, _createClass2.default)(ContainerTest, [{
            key: "render",
            value: function render() {
              var _this4 = this;

              return _react.default.createElement("div", null, _react.default.createElement("div", {
                ref: function ref(node) {
                  _this4.container = node;
                }
              }), _react.default.createElement(Portal, {
                container: this.state.container
              }, _ref13));
            }
          }]);
          return ContainerTest;
        }(_react.default.Component);

        var wrapper = mount(_react.default.createElement(ContainerTest, null));

        if (verion === 'latest') {
          _chai.assert.strictEqual(document.querySelector('#test3').parentNode.nodeName, 'BODY');

          wrapper.setState({
            container: wrapper.instance().container
          });

          _chai.assert.strictEqual(document.querySelector('#test3').parentNode.nodeName, 'DIV');
        } else {
          _chai.assert.strictEqual(document.querySelector('#test3').parentNode.parentNode.nodeName, 'BODY');

          wrapper.setState({
            container: wrapper.instance().container
          });

          _chai.assert.strictEqual(document.querySelector('#test3').parentNode.parentNode.nodeName, 'DIV');
        }
      });
      it('should call onRendered', function () {
        var handleRendered = (0, _sinon.spy)();
        mount(_react.default.createElement(Portal, {
          onRendered: handleRendered
        }, _ref14));

        _chai.assert.strictEqual(handleRendered.callCount, 1);
      });
    });
    return null;
  });
});