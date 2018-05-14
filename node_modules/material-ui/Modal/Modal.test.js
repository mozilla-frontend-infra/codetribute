"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _react = _interopRequireDefault(require("react"));

var _chai = require("chai");

var _sinon = require("sinon");

var _keycode = _interopRequireDefault(require("keycode"));

var _contains = _interopRequireDefault(require("dom-helpers/query/contains"));

var _consoleErrorMock = _interopRequireDefault(require("test/utils/consoleErrorMock"));

var _testUtils = require("../test-utils");

var _Fade = _interopRequireDefault(require("../transitions/Fade"));

var _Backdrop = _interopRequireDefault(require("./Backdrop"));

var _Modal = _interopRequireDefault(require("./Modal"));

/* eslint-disable jsx-a11y/no-autofocus */
var _ref = _react.default.createElement(_Modal.default, {
  open: false
});

var _ref2 = _react.default.createElement(_Modal.default, {
  open: false
}, _react.default.createElement("p", null, "Hello World"));

var _ref4 = _react.default.createElement(_Modal.default, {
  open: true,
  id: "modal"
}, _react.default.createElement("div", {
  id: "container"
}, _react.default.createElement("h1", {
  id: "heading"
}, "Hello")));

var _ref5 = _react.default.createElement(_Modal.default, {
  open: false,
  id: "modal"
}, _react.default.createElement("div", {
  id: "container"
}, _react.default.createElement("h1", {
  id: "heading"
}, "Hello")));

var _ref6 = _react.default.createElement(_Modal.default, {
  open: true,
  id: "modal"
}, _react.default.createElement("div", {
  id: "container"
}, _react.default.createElement("h1", {
  id: "heading"
}, "Hello")));

var _ref7 = _react.default.createElement(_Modal.default, {
  open: true,
  hideBackdrop: true,
  id: "modal"
}, _react.default.createElement("div", {
  id: "container"
}, _react.default.createElement("h1", {
  id: "heading"
}, "Hello")));

var _ref8 = _react.default.createElement(_Modal.default, {
  open: false
});

var _ref9 = _react.default.createElement("p", null, "Hello World");

var _ref10 = _react.default.createElement("p", null, "Hello World");

var _ref11 = _react.default.createElement("div", null);

var _ref12 = _react.default.createElement(_Modal.default, {
  open: true
}, _react.default.createElement("div", null));

var _ref13 = _react.default.createElement(_Modal.default, {
  open: true
}, _react.default.createElement("div", {
  className: "modal"
}, "Foo"));

var _ref14 = _react.default.createElement(_Modal.default, {
  open: true,
  disableRestoreFocus: true
}, _react.default.createElement("div", {
  className: "modal"
}, "Foo"));

var _ref15 = _react.default.createElement(_Modal.default, {
  open: true,
  disableAutoFocus: true
}, _react.default.createElement("div", null, "Foo"));

var _ref16 = _react.default.createElement(_Modal.default, {
  open: true
}, _react.default.createElement("div", null, _react.default.createElement("input", {
  autoFocus: true
})));

var _ref17 = _react.default.createElement(_Modal.default, {
  open: true
}, _react.default.createElement("div", {
  className: "modal"
}, _react.default.createElement("input", {
  autoFocus: true
})));

var _ref18 = _react.default.createElement(_Modal.default, {
  open: true,
  disableEnforceFocus: true
}, _react.default.createElement("div", {
  className: "modal"
}, _react.default.createElement("input", {
  autoFocus: true
})));

var _ref19 = _react.default.createElement("div", null);

var _ref20 = _react.default.createElement("div", null);

var _ref21 = _react.default.createElement("p", null, "Hello World");

describe('<Modal />', function () {
  var shallow;
  var mount;
  var classes;
  var ModalNaked = (0, _testUtils.unwrap)(_Modal.default);
  before(function () {
    shallow = (0, _testUtils.createShallow)({
      dive: true,
      disableLifecycleMethods: true
    });
    classes = (0, _testUtils.getClasses)(_ref);
    mount = (0, _testUtils.createMount)();
  });
  after(function () {
    mount.cleanUp();
  });
  it('should render null by default', function () {
    var wrapper = shallow(_ref2);

    _chai.assert.strictEqual(wrapper.type(), null, 'should be null');
  });

  var _ref3 = _react.default.createElement(ModalNaked, {
    classes: classes,
    open: true,
    "data-my-prop": "woofModal"
  }, _ref21);

  describe('prop: open', function () {
    it('should render the modal div inside the portal', function () {
      var wrapper = mount(_ref3);

      _chai.assert.strictEqual(wrapper.childAt(0).name(), 'Portal', 'should render a portal when openn');

      var modal = wrapper.childAt(0).childAt(0);

      _chai.assert.strictEqual(modal.type(), 'div');

      _chai.assert.strictEqual(modal.hasClass(classes.root), true, 'should have the root class');
    });
  });
  describe('backdrop', function () {
    var wrapper;
    beforeEach(function () {
      wrapper = shallow(_ref4);
    });
    it('should render a backdrop wrapped in a fade transition', function () {
      var transition = wrapper.childAt(0).childAt(0);

      _chai.assert.strictEqual(transition.type(), _Backdrop.default);

      _chai.assert.strictEqual(transition.props().open, true);
    });
    it('should pass a transitionDuration prop to the transition component', function () {
      wrapper.setProps({
        BackdropProps: {
          transitionDuration: 200
        }
      });
      var transition = wrapper.childAt(0).childAt(0);

      _chai.assert.strictEqual(transition.props().transitionDuration, 200);
    });
    it('should attach a handler to the backdrop that fires onClose', function () {
      var onClose = (0, _sinon.spy)();
      wrapper.setProps({
        onClose: onClose
      });
      var handler = wrapper.instance().handleBackdropClick;
      var backdrop = wrapper.find(_Backdrop.default);

      _chai.assert.strictEqual(backdrop.prop('onClick'), handler, 'should attach the handleBackdropClick handler');

      handler({});

      _chai.assert.strictEqual(onClose.callCount, 1, 'should fire the onClose callback');
    });
    it('should let the user disable backdrop click triggering onClose', function () {
      var onClose = (0, _sinon.spy)();
      wrapper.setProps({
        onClose: onClose,
        disableBackdropClick: true
      });
      var handler = wrapper.instance().handleBackdropClick;
      handler({});

      _chai.assert.strictEqual(onClose.callCount, 0, 'should not fire the onClose callback');
    });
    it('should call through to the user specified onBackdropClick callback', function () {
      var onBackdropClick = (0, _sinon.spy)();
      wrapper.setProps({
        onBackdropClick: onBackdropClick
      });
      var handler = wrapper.instance().handleBackdropClick;
      handler({});

      _chai.assert.strictEqual(onBackdropClick.callCount, 1, 'should fire the onBackdropClick callback');
    });
    it('should ignore the backdrop click if the event did not come from the backdrop', function () {
      var onBackdropClick = (0, _sinon.spy)();
      wrapper.setProps({
        onBackdropClick: onBackdropClick
      });
      var handler = wrapper.instance().handleBackdropClick;
      handler({
        target: {
          /* a dom node */
        },
        currentTarget: {
          /* another dom node */
        }
      });

      _chai.assert.strictEqual(onBackdropClick.callCount, 0, 'should not fire the onBackdropClick callback');
    });
  });
  describe('render', function () {
    var wrapper;
    beforeEach(function () {
      wrapper = mount(_ref5);
    });
    it('should not render the content', function () {
      _chai.assert.strictEqual(document.getElementById('container'), null, 'should not have the element in the DOM');

      _chai.assert.strictEqual(document.getElementById('heading'), null, 'should not have the element in the DOM');
    });
    it('should render the content into the portal', function () {
      wrapper.setProps({
        open: true
      });
      var portalLayer = wrapper.find('Portal').instance().getMountNode();
      var container = document.getElementById('container');
      var heading = document.getElementById('heading');

      if (!container || !heading) {
        throw new Error('missing element');
      }

      _chai.assert.strictEqual(container.tagName.toLowerCase(), 'div', 'should have the element in the DOM');

      _chai.assert.strictEqual(heading.tagName.toLowerCase(), 'h1', 'should have the element in the DOM');

      _chai.assert.strictEqual((0, _contains.default)(portalLayer, container), true, 'should be in the portal');

      _chai.assert.strictEqual((0, _contains.default)(portalLayer, heading), true, 'should be in the portal');

      var container2 = document.getElementById('container');

      if (!container2) {
        throw new Error('missing container');
      }

      _chai.assert.strictEqual(container2.getAttribute('role'), 'document', 'should add the document role');

      _chai.assert.strictEqual(container2.getAttribute('tabindex'), '-1', 'should add a -1 tab-index');
    });
  });
  describe('backdrop', function () {
    it('should render a backdrop component into the portal before the modal content', function () {
      mount(_ref6);
      var modal = document.getElementById('modal');
      var container = document.getElementById('container');

      if (!modal) {
        throw new Error('missing modal');
      }

      _chai.assert.strictEqual(modal.children.length, 2, 'should have 2 children, the backdrop and the test container');

      _chai.assert.ok(modal.children[0], 'this is the backdrop, so no assertions about implementation details');

      _chai.assert.strictEqual(modal.children[1], container, 'should be the container');
    });
  });
  describe('hide backdrop', function () {
    it('should not render a backdrop component into the portal before the modal content', function () {
      mount(_ref7);
      var modal = document.getElementById('modal');
      var container = document.getElementById('container');

      if (!modal) {
        throw new Error('missing modal');
      }

      _chai.assert.strictEqual(modal.children.length, 1, 'should have 1 child, the test container');

      _chai.assert.strictEqual(modal.children[0], container, 'should be the container');
    });
  });
  describe('handleDocumentKeyDown()', function () {
    var wrapper;
    var instance;
    var onEscapeKeyDownStub;
    var onCloseStub;
    var topModalStub;
    var event;
    beforeEach(function () {
      wrapper = shallow(_ref8);
      instance = wrapper.instance();
      onEscapeKeyDownStub = (0, _sinon.stub)().returns(true);
      onCloseStub = (0, _sinon.stub)().returns(true);
      topModalStub = (0, _sinon.stub)();
      wrapper.setProps({
        onEscapeKeyDown: onEscapeKeyDownStub,
        onClose: onCloseStub
      });
    });
    afterEach(function () {
      onEscapeKeyDownStub.reset();
      onCloseStub.reset();
      topModalStub.reset();
    });
    it('should have handleDocumentKeyDown', function () {
      _chai.assert.notStrictEqual(instance.handleDocumentKeyDown, undefined);

      _chai.assert.strictEqual((0, _typeof2.default)(instance.handleDocumentKeyDown), 'function');
    });
    it('when not mounted should not call onEscapeKeyDown and onClose', function () {
      instance = wrapper.instance();
      instance.mounted = false;
      instance.handleDocumentKeyDown(undefined);

      _chai.assert.strictEqual(onEscapeKeyDownStub.callCount, 0);

      _chai.assert.strictEqual(onCloseStub.callCount, 0);
    });
    it('when mounted and not TopModal should not call onEscapeKeyDown and onClose', function () {
      topModalStub.returns('false');
      wrapper.setProps({
        manager: {
          isTopModal: topModalStub
        }
      });
      instance = wrapper.instance();
      instance.mounted = true;
      instance.handleDocumentKeyDown(undefined);

      _chai.assert.strictEqual(topModalStub.callCount, 1);

      _chai.assert.strictEqual(onEscapeKeyDownStub.callCount, 0);

      _chai.assert.strictEqual(onCloseStub.callCount, 0);
    });
    it('when mounted, TopModal and event not esc should not call given funcs', function () {
      topModalStub.returns(true);
      wrapper.setProps({
        manager: {
          isTopModal: topModalStub
        }
      });
      instance = wrapper.instance();
      instance.mounted = true;
      event = {
        keyCode: (0, _keycode.default)('j')
      }; // Not 'esc'

      instance.handleDocumentKeyDown(event);

      _chai.assert.strictEqual(topModalStub.callCount, 1);

      _chai.assert.strictEqual(onEscapeKeyDownStub.callCount, 0);

      _chai.assert.strictEqual(onCloseStub.callCount, 0);
    });
    it('should call onEscapeKeyDown and onClose', function () {
      topModalStub.returns(true);
      wrapper.setProps({
        manager: {
          isTopModal: topModalStub
        }
      });
      event = {
        keyCode: (0, _keycode.default)('esc')
      };
      instance = wrapper.instance();
      instance.mounted = true;
      instance.handleDocumentKeyDown(event);

      _chai.assert.strictEqual(topModalStub.callCount, 1);

      _chai.assert.strictEqual(onEscapeKeyDownStub.callCount, 1);

      _chai.assert.strictEqual(onEscapeKeyDownStub.calledWith(event), true);

      _chai.assert.strictEqual(onCloseStub.callCount, 1);

      _chai.assert.strictEqual(onCloseStub.calledWith(event), true);
    });
    it('when disableEscapeKeyDown should call only onClose', function () {
      topModalStub.returns(true);
      wrapper.setProps({
        manager: {
          isTopModal: topModalStub
        }
      });
      wrapper.setProps({
        disableEscapeKeyDown: true
      });
      event = {
        keyCode: (0, _keycode.default)('esc')
      };
      instance = wrapper.instance();
      instance.mounted = true;
      instance.handleDocumentKeyDown(event);

      _chai.assert.strictEqual(topModalStub.callCount, 1);

      _chai.assert.strictEqual(onEscapeKeyDownStub.callCount, 1);

      _chai.assert.strictEqual(onEscapeKeyDownStub.calledWith(event), true);

      _chai.assert.strictEqual(onCloseStub.callCount, 0);
    });
  });
  describe('prop: keepMounted', function () {
    it('should keep the children in the DOM', function () {
      var children = _ref9;
      var wrapper = shallow(_react.default.createElement(_Modal.default, {
        keepMounted: true,
        open: false
      }, _react.default.createElement("div", null, children)));

      _chai.assert.strictEqual(wrapper.contains(children), true);
    });
    it('should not keep the children in the DOM', function () {
      var children = _ref10;
      var wrapper = shallow(_react.default.createElement(_Modal.default, {
        open: false
      }, _react.default.createElement("div", null, children)));

      _chai.assert.strictEqual(wrapper.contains(children), false);
    });
  });
  describe('prop: onExited', function () {
    it('should avoid concurrency issue by chaining internal with the public API', function () {
      var handleExited = (0, _sinon.spy)();
      var wrapper = mount(_react.default.createElement(ModalNaked, {
        classes: {},
        open: true
      }, _react.default.createElement(_Fade.default, {
        "in": true,
        onExited: handleExited
      }, _ref11)));
      wrapper.find('Transition').at(1).props().onExited();

      _chai.assert.strictEqual(handleExited.callCount, 1);

      _chai.assert.strictEqual(wrapper.state().exited, true);
    });
    it('should not rely on the internal backdrop events', function () {
      var wrapper = shallow(_ref12);

      _chai.assert.strictEqual(wrapper.state().exited, false);

      wrapper.setProps({
        open: false
      });

      _chai.assert.strictEqual(wrapper.state().exited, true);
    });
  });
  describe('focus', function () {
    var focusContainer = null;
    var wrapper;
    beforeEach(function () {
      focusContainer = document.createElement('div');
      focusContainer.tabIndex = 0;
      focusContainer.className = 'focus-container';
      document.body.appendChild(focusContainer);
      focusContainer.focus();

      _chai.assert.strictEqual(document.activeElement, focusContainer);

      _consoleErrorMock.default.spy();
    });
    afterEach(function () {
      _consoleErrorMock.default.reset();

      wrapper.unmount();
      document.body.removeChild(focusContainer);
    });
    it('should focus on the modal when it is opened', function () {
      wrapper = mount(_ref13);

      _chai.assert.strictEqual(document.activeElement.className, 'modal');

      wrapper.setProps({
        open: false
      });

      _chai.assert.strictEqual(document.activeElement, focusContainer);
    });
    it('should keep focus on the modal when it is closed', function () {
      wrapper = mount(_ref14);

      _chai.assert.strictEqual(document.activeElement.className, 'modal');

      wrapper.setProps({
        open: false
      });

      _chai.assert.strictEqual(document.activeElement.tagName, 'BODY');
    });
    it('should not focus on the modal when disableAutoFocus is true', function () {
      wrapper = mount(_ref15);

      _chai.assert.strictEqual(document.activeElement, focusContainer);
    });
    it('should not focus modal when child has focus', function () {
      wrapper = mount(_ref16);

      _chai.assert.strictEqual(document.activeElement, document.querySelector('input'));
    });
    it('should return focus to the modal', function () {
      wrapper = mount(_ref17);

      _chai.assert.strictEqual(document.activeElement, document.querySelector('input'));

      focusContainer.focus();

      _chai.assert.strictEqual(document.activeElement.className, 'modal');
    });
    it('should not return focus to the modal when disableEnforceFocus is true', function () {
      wrapper = mount(_ref18);

      _chai.assert.strictEqual(document.activeElement, document.querySelector('input'));

      focusContainer.focus();

      _chai.assert.strictEqual(document.activeElement.className, 'focus-container');
    });
    it('should warn if the modal content is not focusable', function () {
      var Dialog = function Dialog() {
        return _ref19;
      };

      wrapper = mount(_react.default.createElement(_Modal.default, {
        open: true
      }, _react.default.createElement(Dialog, null)));

      _chai.assert.strictEqual(_consoleErrorMock.default.callCount(), 1, 'should call console.error');

      _chai.assert.match(_consoleErrorMock.default.args()[0][0], /the modal content node does not accept focus/);
    });
    it('should not attempt to focus nonexistent children', function () {
      var Dialog = function Dialog() {
        return null;
      };

      wrapper = mount(_react.default.createElement(_Modal.default, {
        open: true
      }, _react.default.createElement(Dialog, null)));
    });
  });
  describe('prop: onRendered', function () {
    it('should fire', function () {
      var handleRendered = (0, _sinon.spy)();
      mount(_react.default.createElement(_Modal.default, {
        open: true,
        onRendered: handleRendered
      }, _ref20));

      _chai.assert.strictEqual(handleRendered.callCount, 1);
    });
  });
});