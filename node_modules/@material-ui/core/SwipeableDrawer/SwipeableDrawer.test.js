"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _keys = _interopRequireDefault(require("@babel/runtime/core-js/object/keys"));

var _react = _interopRequireDefault(require("react"));

var _chai = require("chai");

var _sinon = require("sinon");

var _reactDom = _interopRequireDefault(require("react-dom"));

var _testUtils = require("../test-utils");

var _Paper = _interopRequireDefault(require("../Paper"));

var _Drawer = _interopRequireDefault(require("../Drawer"));

var _SwipeableDrawer = _interopRequireWildcard(require("./SwipeableDrawer"));

var _SwipeArea = _interopRequireDefault(require("./SwipeArea"));

var _createMuiTheme = _interopRequireDefault(require("../styles/createMuiTheme"));

function fireBodyMouseEvent(name, properties) {
  var event = document.createEvent('MouseEvents');
  event.initEvent(name, true, true);
  (0, _keys.default)(properties).forEach(function (key) {
    event[key] = properties[key];
  });
  document.body.dispatchEvent(event);
}

var _ref = _react.default.createElement("h1", null, "Hello");

var _ref2 = _react.default.createElement("h1", null, "Hello");

var _ref3 = _react.default.createElement("h1", null, "Hello");

var _ref4 = _react.default.createElement("h1", null, "Hello1");

var _ref5 = _react.default.createElement("h1", null, "Hello2");

var _ref6 = _react.default.createElement("h1", null, "Hello");

describe('<SwipeableDrawer />', function () {
  var SwipeableDrawerNaked = (0, _testUtils.unwrap)(_SwipeableDrawer.default);
  var mount;
  var findDOMNodeStub;
  before(function () {
    mount = (0, _testUtils.createMount)(); // mock the drawer DOM node, since jsdom doesn't do layouting but its size is required

    var findDOMNode = _reactDom.default.findDOMNode;
    findDOMNodeStub = (0, _sinon.stub)(_reactDom.default, 'findDOMNode').callsFake(function (arg) {
      if (arg instanceof _Paper.default) {
        // mock the drawer's DOM node
        return {
          clientWidth: 250,
          clientHeight: 250,
          style: {}
        };
      }

      return findDOMNode(arg);
    });
  });
  after(function () {
    findDOMNodeStub.restore();
    mount.cleanUp();
  });
  it('should render a Drawer and a SwipeArea', function () {
    var wrapper = mount(_react.default.createElement(SwipeableDrawerNaked, {
      onOpen: function onOpen() {},
      onClose: function onClose() {},
      open: false,
      theme: (0, _createMuiTheme.default)()
    }));

    if (_react.default.Fragment) {
      _chai.assert.strictEqual(wrapper.childAt(0).type(), _Drawer.default);

      _chai.assert.strictEqual(wrapper.childAt(1).type(), _SwipeArea.default);
    } else {
      _chai.assert.strictEqual(wrapper.childAt(0).childAt(0).type(), _Drawer.default);

      _chai.assert.strictEqual(wrapper.childAt(0).childAt(1).type(), _SwipeArea.default);
    }

    wrapper.unmount();
  });
  it('should hide the SwipeArea if swipe to open is disabled', function () {
    var wrapper = mount(_react.default.createElement(SwipeableDrawerNaked, {
      onOpen: function onOpen() {},
      onClose: function onClose() {},
      open: false,
      theme: (0, _createMuiTheme.default)(),
      disableSwipeToOpen: true
    }));

    _chai.assert.strictEqual(wrapper.children().length, 1);

    wrapper.unmount();
  });
  it('should hide the SwipeArea if discovery is disabled', function () {
    var wrapper = mount(_react.default.createElement(SwipeableDrawerNaked, {
      onOpen: function onOpen() {},
      onClose: function onClose() {},
      open: false,
      theme: (0, _createMuiTheme.default)(),
      disableDiscovery: true
    }));

    _chai.assert.strictEqual(wrapper.children().length, 1);

    wrapper.unmount();
  });
  describe('swipe to open', function () {
    var wrapper;
    var instance;
    beforeEach(function () {
      wrapper = mount(_react.default.createElement(SwipeableDrawerNaked, {
        onOpen: function onOpen() {},
        onClose: function onClose() {},
        open: false,
        theme: (0, _createMuiTheme.default)()
      }, _ref));
      instance = wrapper.instance();
    });
    afterEach(function () {
      (0, _SwipeableDrawer.reset)();
      wrapper.unmount();
    });
    var bodyWidth = document.body.offsetWidth;
    var windowHeight = window.innerHeight;
    var tests = [{
      anchor: 'left',
      openTouches: [{
        pageX: 0,
        clientY: 0
      }, {
        pageX: 20,
        clientY: 0
      }, {
        pageX: 180,
        clientY: 0
      }],
      closeTouches: [{
        pageX: 200,
        clientY: 0
      }, {
        pageX: 180,
        clientY: 0
      }, {
        pageX: 10,
        clientY: 0
      }],
      edgeTouch: {
        pageX: 10,
        clientY: 50
      },
      ignoreTouch: {
        pageX: 100,
        clientY: 0
      }
    }, {
      anchor: 'right',
      openTouches: [{
        pageX: bodyWidth,
        clientY: 0
      }, {
        pageX: bodyWidth - 20,
        clientY: 0
      }, {
        pageX: bodyWidth - 180,
        clientY: 0
      }],
      closeTouches: [{
        pageX: bodyWidth - 200,
        clientY: 0
      }, {
        pageX: bodyWidth - 180,
        clientY: 0
      }, {
        pageX: bodyWidth - 10,
        clientY: 0
      }],
      edgeTouch: {
        pageX: bodyWidth - 10,
        clientY: 50
      },
      ignoreTouch: {
        pageX: bodyWidth - 100,
        clientY: 0
      }
    }, {
      anchor: 'top',
      openTouches: [{
        pageX: 0,
        clientY: 0
      }, {
        pageX: 0,
        clientY: 20
      }, {
        pageX: 0,
        clientY: 180
      }],
      closeTouches: [{
        pageX: 0,
        clientY: 200
      }, {
        pageX: 0,
        clientY: 180
      }, {
        pageX: 0,
        clientY: 10
      }],
      edgeTouch: {
        pageX: 50,
        clientY: 10
      },
      ignoreTouch: {
        pageX: 0,
        clientY: 100
      }
    }, {
      anchor: 'bottom',
      openTouches: [{
        pageX: 0,
        clientY: windowHeight
      }, {
        pageX: 0,
        clientY: windowHeight - 20
      }, {
        pageX: 0,
        clientY: windowHeight - 180
      }],
      closeTouches: [{
        pageX: 0,
        clientY: windowHeight - 200
      }, {
        pageX: 0,
        clientY: windowHeight - 180
      }, {
        pageX: 0,
        clientY: windowHeight - 10
      }],
      edgeTouch: {
        pageX: 50,
        clientY: windowHeight - 10
      },
      ignoreTouch: {
        pageX: 0,
        clientY: windowHeight - 100
      }
    }];
    tests.forEach(function (params) {
      describe("anchor=".concat(params.anchor), function () {
        beforeEach(function () {
          wrapper.setProps({
            anchor: params.anchor
          });
        });
        it('should open and close when swiping', function () {
          // mock the internal setPosition function that moves the drawer while swiping
          instance.setPosition = (0, _sinon.spy)(); // simulate open swipe

          var handleOpen = (0, _sinon.spy)();
          wrapper.setProps({
            onOpen: handleOpen
          });
          fireBodyMouseEvent('touchstart', {
            touches: [params.openTouches[0]]
          });

          _chai.assert.strictEqual(wrapper.state().maybeSwiping, true, 'should be listening for swipe');

          fireBodyMouseEvent('touchmove', {
            touches: [params.openTouches[1]]
          });

          _chai.assert.strictEqual(instance.isSwiping, true, 'should be swiping');

          fireBodyMouseEvent('touchmove', {
            touches: [params.openTouches[2]]
          });
          fireBodyMouseEvent('touchend', {
            changedTouches: [params.openTouches[2]]
          });

          _chai.assert.strictEqual(handleOpen.callCount, 1, 'should call onOpen');

          _chai.assert.strictEqual(instance.setPosition.callCount, 3, 'should move the drawer on touchstart and touchmove'); // simulate close swipe


          instance.setPosition.resetHistory();
          var handleClose = (0, _sinon.spy)();
          wrapper.setProps({
            open: true,
            onClose: handleClose
          });
          fireBodyMouseEvent('touchstart', {
            touches: [params.closeTouches[0]]
          });

          _chai.assert.strictEqual(wrapper.state().maybeSwiping, true, 'should be listening for swipe');

          fireBodyMouseEvent('touchmove', {
            touches: [params.closeTouches[1]]
          });

          _chai.assert.strictEqual(instance.isSwiping, true, 'should be swiping');

          fireBodyMouseEvent('touchmove', {
            touches: [params.closeTouches[2]]
          });
          fireBodyMouseEvent('touchend', {
            changedTouches: [params.closeTouches[2]]
          });

          _chai.assert.strictEqual(handleClose.callCount, 1, 'should call onClose');

          _chai.assert.strictEqual(instance.setPosition.callCount, 2, 'should move the drawer on touchmove');
        });
        it('should stay closed when not swiping far enough', function () {
          // simulate open swipe that doesn't swipe far enough
          var handleOpen = (0, _sinon.spy)();
          wrapper.setProps({
            onOpen: handleOpen
          });
          fireBodyMouseEvent('touchstart', {
            touches: [params.openTouches[0]]
          });

          _chai.assert.strictEqual(wrapper.state().maybeSwiping, true, 'should be listening for swipe');

          fireBodyMouseEvent('touchmove', {
            touches: [params.openTouches[1]]
          });

          _chai.assert.strictEqual(instance.isSwiping, true, 'should be swiping');

          fireBodyMouseEvent('touchend', {
            changedTouches: [params.openTouches[1]]
          });

          _chai.assert.strictEqual(handleOpen.callCount, 0, 'should not call onOpen');
        });
        it('should stay opened when not swiping far enough', function () {
          // simulate close swipe that doesn't swipe far enough
          var handleClose = (0, _sinon.spy)();
          wrapper.setProps({
            open: true,
            onClose: handleClose
          });
          fireBodyMouseEvent('touchstart', {
            touches: [params.closeTouches[0]]
          });

          _chai.assert.strictEqual(wrapper.state().maybeSwiping, true, 'should be listening for swipe');

          fireBodyMouseEvent('touchmove', {
            touches: [params.closeTouches[1]]
          });

          _chai.assert.strictEqual(instance.isSwiping, true, 'should be swiping');

          fireBodyMouseEvent('touchend', {
            changedTouches: [params.closeTouches[1]]
          });

          _chai.assert.strictEqual(handleClose.callCount, 0, 'should not call onClose');
        });
        it('should ignore swiping in the wrong direction if discovery is disabled', function () {
          wrapper.setProps({
            disableDiscovery: true
          });
          fireBodyMouseEvent('touchstart', {
            touches: [params.openTouches[0]]
          });

          if (['left', 'right'].includes(params.anchor)) {
            fireBodyMouseEvent('touchmove', {
              touches: [{
                pageX: params.openTouches[0].pageX,
                clientY: params.openTouches[0].clientY + 50
              }]
            });
          } else {
            fireBodyMouseEvent('touchmove', {
              touches: [{
                pageX: params.openTouches[0].pageX + 50,
                clientY: params.openTouches[0].clientY
              }]
            });
          }

          _chai.assert.strictEqual(instance.isSwiping, null, 'should not be swiping');
        });
        it('should slide in a bit when touching near the edge', function () {
          // mock the internal setPosition function that moves the drawer while swiping
          instance.setPosition = (0, _sinon.spy)();
          var handleOpen = (0, _sinon.spy)();
          var handleClose = (0, _sinon.spy)();
          wrapper.setProps({
            onOpen: handleOpen,
            onClose: handleClose
          });
          fireBodyMouseEvent('touchstart', {
            touches: [params.edgeTouch]
          });

          _chai.assert.strictEqual(wrapper.state().maybeSwiping, true, 'should be listening for swipe');

          _chai.assert.strictEqual(instance.setPosition.callCount, 1, 'should slide in a bit');

          fireBodyMouseEvent('touchend', {
            changedTouches: [params.edgeTouch]
          });

          _chai.assert.strictEqual(handleOpen.callCount, 0, 'should not call onOpen');

          _chai.assert.strictEqual(handleClose.callCount, 0, 'should not call onClose');
        });
        it('should makes the drawer stay hidden', function () {
          // mock the internal setPosition function that moves the drawer while swiping
          instance.setPosition = (0, _sinon.spy)();
          var handleOpen = (0, _sinon.spy)();
          var handleClose = (0, _sinon.spy)();
          wrapper.setProps({
            disableDiscovery: true,
            onOpen: handleOpen,
            onClose: handleClose
          });
          fireBodyMouseEvent('touchstart', {
            touches: [params.edgeTouch]
          });

          _chai.assert.strictEqual(wrapper.state().maybeSwiping, true, 'should be listening for swipe');

          _chai.assert.strictEqual(instance.setPosition.callCount, 1, 'should slide in');

          fireBodyMouseEvent('touchend', {
            changedTouches: [params.edgeTouch]
          });

          _chai.assert.strictEqual(handleOpen.callCount, 0, 'should not call onOpen');

          _chai.assert.strictEqual(handleClose.callCount, 0, 'should not call onClose');
        });
        it('should let user scroll the page', function () {
          // mock the internal setPosition function that moves the drawer while swiping
          instance.setPosition = (0, _sinon.spy)();
          var handleOpen = (0, _sinon.spy)();
          var handleClose = (0, _sinon.spy)();
          wrapper.setProps({
            open: false,
            disableDiscovery: true,
            onOpen: handleOpen,
            onClose: handleClose
          });
          fireBodyMouseEvent('touchstart', {
            touches: [params.ignoreTouch]
          });

          _chai.assert.strictEqual(wrapper.state().maybeSwiping, false, 'should be listening for swipe');

          _chai.assert.strictEqual(instance.setPosition.callCount, 0, 'should slide in');

          fireBodyMouseEvent('touchend', {
            changedTouches: [params.ignoreTouch]
          });

          _chai.assert.strictEqual(handleOpen.callCount, 0, 'should not call onOpen');

          _chai.assert.strictEqual(handleClose.callCount, 0, 'should not call onClose');
        });
      });
    });
    it('should wait for a clear signal to determin this.isSwiping', function () {
      _chai.assert.strictEqual(instance.isSwiping, null);

      fireBodyMouseEvent('touchstart', {
        touches: [{
          pageX: 0,
          clientY: 0
        }]
      });

      _chai.assert.strictEqual(instance.isSwiping, null);

      fireBodyMouseEvent('touchmove', {
        touches: [{
          pageX: 3,
          clientY: 0
        }]
      });

      _chai.assert.strictEqual(instance.isSwiping, null);

      fireBodyMouseEvent('touchmove', {
        touches: [{
          pageX: 10,
          clientY: 0
        }]
      });

      _chai.assert.strictEqual(instance.isSwiping, true);
    });
    it('removes event listeners on unmount', function () {
      fireBodyMouseEvent('touchstart', {
        touches: [{
          pageX: 0,
          clientY: 0
        }]
      });
      wrapper.unmount(); //  trigger setState warning if listeners aren't cleaned.

      fireBodyMouseEvent('touchmove', {
        touches: [{
          pageX: 180,
          clientY: 0
        }]
      }); //  trigger setState warning if swipe handling is not cleaned, too

      fireBodyMouseEvent('touchstart', {
        touches: [{
          pageX: 0,
          clientY: 0
        }]
      });
    });
    it('toggles swipe handling when the variant is changed', function () {
      // variant is 'temporary' by default
      (0, _sinon.spy)(instance, 'removeTouchStart');
      wrapper.setProps({
        variant: 'persistent'
      });

      _chai.assert.strictEqual(instance.removeTouchStart.callCount, 1);

      (0, _sinon.spy)(instance, 'listenTouchStart');
      wrapper.setProps({
        variant: 'temporary'
      });

      _chai.assert.strictEqual(instance.listenTouchStart.callCount, 1);
    });
  });
  describe('disableSwipeToOpen', function () {
    it('should not support swipe to open if disableSwipeToOpen is set', function () {
      var wrapper = mount(_react.default.createElement(SwipeableDrawerNaked, {
        onOpen: function onOpen() {},
        onClose: function onClose() {},
        open: false,
        theme: (0, _createMuiTheme.default)()
      }, _ref2)); // simulate open swipe

      wrapper.setProps({
        disableSwipeToOpen: true
      });
      fireBodyMouseEvent('touchstart', {
        touches: [{
          pageX: 0,
          clientY: 0
        }]
      });

      _chai.assert.strictEqual(wrapper.state().maybeSwiping, false, 'should not be listening for open swipe');

      wrapper.unmount();
    });
    it('should support swipe to close if disableSwipeToOpen is set', function () {
      var wrapper = mount(_react.default.createElement(SwipeableDrawerNaked, {
        onOpen: function onOpen() {},
        onClose: function onClose() {},
        open: false,
        theme: (0, _createMuiTheme.default)()
      }, _ref3)); // simulate close swipe

      wrapper.setProps({
        disableSwipeToOpen: true,
        open: true
      });
      fireBodyMouseEvent('touchstart', {
        touches: [{
          pageX: 0,
          clientY: 0
        }]
      });

      _chai.assert.strictEqual(wrapper.state().maybeSwiping, true, 'should not be listening for open swipe');

      wrapper.unmount();
    });
  });
  describe('lock', function () {
    it('should handle a single swipe at the time', function () {
      var handleOpen = (0, _sinon.spy)();
      var wrapper = mount(_react.default.createElement("div", null, _react.default.createElement(SwipeableDrawerNaked, {
        onOpen: handleOpen,
        onClose: function onClose() {},
        open: false,
        theme: (0, _createMuiTheme.default)()
      }, _ref4), _react.default.createElement(SwipeableDrawerNaked, {
        onOpen: handleOpen,
        onClose: function onClose() {},
        open: false,
        theme: (0, _createMuiTheme.default)()
      }, _ref5)));
      fireBodyMouseEvent('touchstart', {
        touches: [{
          pageX: 0,
          clientY: 0
        }]
      });
      fireBodyMouseEvent('touchmove', {
        touches: [{
          pageX: 20,
          clientY: 0
        }]
      });
      fireBodyMouseEvent('touchmove', {
        touches: [{
          pageX: 180,
          clientY: 0
        }]
      });
      fireBodyMouseEvent('touchend', {
        changedTouches: [{
          pageX: 180,
          clientY: 0
        }]
      });

      _chai.assert.strictEqual(handleOpen.callCount, 1, 'should call onOpen once, not twice');

      wrapper.unmount();
    });
  });
  it('does not crash when updating the parent component while swiping', function () {
    var wrapper = mount(_react.default.createElement(SwipeableDrawerNaked, {
      onOpen: function onOpen() {},
      onClose: function onClose() {},
      open: false,
      theme: (0, _createMuiTheme.default)()
    }, _ref6));
    fireBodyMouseEvent('touchstart', {
      touches: [{
        pageX: 0,
        clientY: 0
      }]
    }); // simulate paper ref being null because of the drawer being updated

    wrapper.instance().handlePaperRef(null);
    fireBodyMouseEvent('touchmove', {
      touches: [{
        pageX: 20,
        clientY: 0
      }]
    });
  });
});