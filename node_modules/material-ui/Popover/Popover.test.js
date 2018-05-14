"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _promise = _interopRequireDefault(require("@babel/runtime/core-js/promise"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _chai = require("chai");

var _sinon = require("sinon");

var _style = _interopRequireDefault(require("dom-helpers/style"));

var _testUtils = require("../test-utils");

var _Grow = _interopRequireDefault(require("../transitions/Grow"));

var _Paper = _interopRequireDefault(require("../Paper"));

var _Popover = _interopRequireDefault(require("./Popover"));

var _ref = _react.default.createElement("div", null);

var _ref2 = _react.default.createElement("div", null);

var _ref3 = _react.default.createElement("div", null);

var _ref4 = _react.default.createElement("div", null);

var _ref5 = _react.default.createElement("div", null);

var _ref6 = _react.default.createElement("div", null);

var _ref7 = _react.default.createElement("div", null);

var _ref8 = _react.default.createElement("div", null);

var _ref9 = _react.default.createElement("div", null);

var _ref10 = _react.default.createElement("div", null);

var _ref11 = _react.default.createElement("div", null);

var _ref12 = _react.default.createElement("div", null);

var _ref13 = _react.default.createElement("div", null);

var _ref14 = _react.default.createElement("div", null);

var _ref15 = _react.default.createElement("div", null);

var _ref16 = _react.default.createElement(_Popover.default, {
  open: true
});

var _ref17 = _react.default.createElement("div", null);

var _ref18 = _react.default.createElement("div", null);

var _ref19 = _react.default.createElement("div", null);

var _ref20 = _react.default.createElement("div", null);

var _ref21 = _react.default.createElement("div", null);

var _ref22 = _react.default.createElement("div", null);

var _ref23 = _react.default.createElement("div", null, "content #1");

var _ref24 = _react.default.createElement("div", null, "content #2");

var _ref25 = _react.default.createElement("div", null, "content #3");

describe('<Popover />', function () {
  var shallow;
  var mount;
  var classes;
  var defaultProps = {
    open: false
  };
  before(function () {
    shallow = (0, _testUtils.createShallow)({
      dive: true
    });
    mount = (0, _testUtils.createMount)();
    classes = (0, _testUtils.getClasses)(_react.default.createElement(_Popover.default, defaultProps, _ref));
  });
  after(function () {
    mount.cleanUp();
  });
  describe('root node', function () {
    it('should render a Modal with an invisible backdrop as the root node', function () {
      var wrapper = shallow(_react.default.createElement(_Popover.default, defaultProps, _ref2));

      _chai.assert.strictEqual(wrapper.props().BackdropProps.invisible, true);
    });
    it('should pass onClose prop to Modal', function () {
      var fn = function fn() {};

      var wrapper = shallow(_react.default.createElement(_Popover.default, (0, _extends2.default)({}, defaultProps, {
        onClose: fn
      }), _ref3));

      _chai.assert.strictEqual(wrapper.props().onClose, fn, 'should be the onClose function');
    });
    it('should pass open prop to Modal as `open`', function () {
      var wrapper = shallow(_react.default.createElement(_Popover.default, defaultProps, _ref4));

      _chai.assert.strictEqual(wrapper.props().open, false, 'should not be open');

      wrapper.setProps({
        open: true
      });

      _chai.assert.strictEqual(wrapper.props().open, true, 'should be open');

      wrapper.setProps({
        open: false
      });

      _chai.assert.strictEqual(wrapper.props().open, false, 'should not be open');
    });
    describe('getOffsetTop', function () {
      var instance;
      var rect;
      before(function () {
        instance = shallow(_react.default.createElement(_Popover.default, defaultProps, _ref5)).instance();
        rect = {
          height: 1
        };
      });
      it('should return vertical when vertical is a number', function () {
        var vertical = 1;
        var offsetTop = instance.handleGetOffsetTop('', vertical);

        _chai.assert.strictEqual(offsetTop, vertical);
      });
      it("should return half of rect.height if vertical is 'center'", function () {
        var vertical = 'center';
        var offsetTop = instance.handleGetOffsetTop(rect, vertical);

        _chai.assert.strictEqual(offsetTop, rect.height / 2);
      });
      it("should return rect.height if vertical is 'bottom'", function () {
        var vertical = 'bottom';
        var offsetTop = instance.handleGetOffsetTop(rect, vertical);

        _chai.assert.strictEqual(offsetTop, rect.height);
      });
      it('should return zero if vertical is something else', function () {
        var vertical = undefined;
        var offsetTop = instance.handleGetOffsetTop(rect, vertical);

        _chai.assert.strictEqual(offsetTop, 0);
      });
    });
    describe('getOffsetLeft', function () {
      var instance;
      var rect;
      before(function () {
        instance = shallow(_react.default.createElement(_Popover.default, defaultProps, _ref6)).instance();
        rect = {
          width: 1
        };
      });
      it('should return horizontal when horizontal is a number', function () {
        var horizontal = 1;
        var offsetLeft = instance.handleGetOffsetLeft('', horizontal);

        _chai.assert.strictEqual(offsetLeft, horizontal);
      });
      it("should return half of rect.width if horizontal is 'center'", function () {
        var horizontal = 'center';
        var offsetLeft = instance.handleGetOffsetLeft(rect, horizontal);

        _chai.assert.strictEqual(offsetLeft, rect.width / 2);
      });
      it("should return rect.width if horizontal is 'right'", function () {
        var horizontal = 'right';
        var offsetLeft = instance.handleGetOffsetLeft(rect, horizontal);

        _chai.assert.strictEqual(offsetLeft, rect.width);
      });
      it('should return zero if horizontal is something else', function () {
        var horizontal = undefined;
        var offsetLeft = instance.handleGetOffsetLeft(rect, horizontal);

        _chai.assert.strictEqual(offsetLeft, 0);
      });
    });
  });
  describe('transition', function () {
    it('should have Transition as the only child of Modal', function () {
      var wrapper = shallow(_react.default.createElement(_Popover.default, defaultProps, _ref7));

      _chai.assert.strictEqual(wrapper.children().length, 1, 'should have one child');

      _chai.assert.strictEqual(wrapper.childAt(0).type(), _Grow.default);

      _chai.assert.strictEqual(wrapper.childAt(0).props().appear, true, 'should transition on first appearance');
    });
    it('should set the transition in/out based on the open prop', function () {
      var wrapper = shallow(_react.default.createElement(_Popover.default, defaultProps, _ref8));

      _chai.assert.strictEqual(wrapper.childAt(0).props().in, false, 'should not be in');

      wrapper.setProps({
        open: true
      });

      _chai.assert.strictEqual(wrapper.childAt(0).props().in, true, 'should be in');

      wrapper.setProps({
        open: false
      });

      _chai.assert.strictEqual(wrapper.childAt(0).props().in, false, 'should not be in');
    });
    it('should fire Popover transition event callbacks', function () {
      var events = ['onEntering', 'onEnter', 'onEntered', 'onExit', 'onExiting', 'onExited'];
      var handlers = events.reduce(function (result, eventHook) {
        result[eventHook] = (0, _sinon.spy)();
        return result;
      }, {});
      var wrapper = shallow(_react.default.createElement(_Popover.default, (0, _extends2.default)({}, defaultProps, handlers), _ref9));
      events.forEach(function (eventHook) {
        var event = eventHook.charAt(2).toLowerCase() + eventHook.slice(3);
        wrapper.find(_Grow.default).simulate(event, {
          style: {}
        });

        _chai.assert.strictEqual(handlers[eventHook].callCount, 1, "should have called the ".concat(eventHook, " handler"));
      });
    });
  });
  describe('paper', function () {
    it('should have Paper as the only child of Transition', function () {
      var wrapper = shallow(_react.default.createElement(_Popover.default, defaultProps, _ref10));

      _chai.assert.strictEqual(wrapper.childAt(0).children().length, 1, 'should have one child');

      _chai.assert.strictEqual(wrapper.childAt(0).childAt(0).type(), _Paper.default);
    });
    it('should have the paper class and user classes', function () {
      var wrapper = shallow(_react.default.createElement(_Popover.default, (0, _extends2.default)({}, defaultProps, {
        className: "test-class"
      }), _ref11));

      _chai.assert.strictEqual(wrapper.hasClass('test-class'), true, 'should have the user class');

      var paper = wrapper.childAt(0).childAt(0);

      _chai.assert.strictEqual(paper.hasClass(classes.paper), true, 'should have the popover class');
    });
    it('should have a elevation prop passed down', function () {
      var wrapper = shallow(_react.default.createElement(_Popover.default, defaultProps, _ref12));

      _chai.assert.strictEqual(wrapper.childAt(0).childAt(0).prop('elevation'), 8, 'should be 8 elevation by default');

      wrapper.setProps({
        elevation: 16
      });

      _chai.assert.strictEqual(wrapper.childAt(0).childAt(0).prop('elevation'), 16, 'should be 16 elevation');
    });
  });
  describe('transition lifecycle', function () {
    var element = {
      style: {
        offsetTop: 'auto',
        left: 'auto',
        opacity: 1,
        transform: undefined,
        transformOrigin: undefined,
        transition: undefined
      }
    };
    describe('handleEnter(element)', function () {
      var wrapper;
      var handleEnter;
      before(function () {
        handleEnter = (0, _sinon.spy)();
        wrapper = shallow(_react.default.createElement(_Popover.default, (0, _extends2.default)({}, defaultProps, {
          onEnter: handleEnter
        }), _ref13));
        wrapper.instance().handleEnter(element);
      });
      it('should set the inline styles for the enter phase', function () {
        _chai.assert.strictEqual(element.style.top === '16px' && element.style.left === '16px', true, 'should offset the element from the top left of the screen by 16px');

        _chai.assert.strictEqual(element.style.transformOrigin, wrapper.instance().getPositioningStyle(element).transformOrigin, 'should have a transformOrigin');
      });
    });
  });
  describe('prop: anchorEl', function () {
    it('should accept a function', function () {
      var anchorElSpy = (0, _sinon.spy)();
      shallow(_react.default.createElement(_Popover.default, (0, _extends2.default)({}, defaultProps, {
        anchorEl: anchorElSpy
      }), _ref14));

      _chai.assert.strictEqual(anchorElSpy.callCount, 1);
    });
  });
  describe('positioning on an anchor', function () {
    var anchorEl;
    var wrapper;
    var popoverEl;
    var openPopover;
    var expectPopover;
    before(function () {
      openPopover = function openPopover(anchorOrigin, renderShallow) {
        if (!anchorEl) {
          anchorEl = window.document.createElement('div');
        }

        (0, _style.default)(anchorEl, {
          width: '50px',
          height: '50px',
          position: 'absolute',
          top: '100px',
          left: '100px'
        });
        window.document.body.appendChild(anchorEl);
        return new _promise.default(function (resolve) {
          var component = _react.default.createElement(_Popover.default, (0, _extends2.default)({}, defaultProps, {
            anchorEl: anchorEl,
            anchorOrigin: anchorOrigin,
            transitionDuration: 0,
            onEntered: function onEntered() {
              popoverEl = window.document.querySelector('[data-mui-test="Popover"]');
              resolve();
            }
          }), _ref15);

          wrapper = renderShallow ? shallow(component) : mount(component);
          wrapper.setProps({
            open: true
          });

          if (renderShallow) {
            resolve();
          }
        });
      };

      expectPopover = function expectPopover(top, left) {
        _chai.assert.strictEqual(popoverEl.style.top, "".concat(top, "px"), 'should position at the correct top offset');

        _chai.assert.strictEqual(popoverEl.style.left, "".concat(left, "px"), 'should position at the correct left offset');

        wrapper.unmount();
      };
    });
    after(function () {
      window.document.body.removeChild(anchorEl);
    });
    it('should be positioned over the top left of the anchor', function () {
      return openPopover({
        vertical: 'top',
        horizontal: 'left'
      }).then(function () {
        var anchorRect = anchorEl.getBoundingClientRect();
        var expectedTop = anchorRect.top <= 16 ? 16 : anchorRect.top;
        var expectedLeft = anchorRect.left <= 16 ? 16 : anchorRect.left;
        expectPopover(expectedTop, expectedLeft);
      });
    });
    it('should be positioned over the center left of the anchor', function () {
      return openPopover({
        vertical: 'center',
        horizontal: 'left'
      }).then(function () {
        var anchorRect = anchorEl.getBoundingClientRect();
        var anchorTop = anchorRect.top + anchorRect.height / 2;
        var expectedTop = anchorTop <= 16 ? 16 : anchorTop;
        var expectedLeft = anchorRect.left <= 16 ? 16 : anchorRect.left;
        expectPopover(expectedTop, expectedLeft);
      });
    });
    it('should be positioned over the bottom left of the anchor', function () {
      return openPopover({
        vertical: 'bottom',
        horizontal: 'left'
      }).then(function () {
        var anchorRect = anchorEl.getBoundingClientRect();
        var expectedTop = anchorRect.bottom <= 16 ? 16 : anchorRect.bottom;
        var expectedLeft = anchorRect.left <= 16 ? 16 : anchorRect.left;
        expectPopover(expectedTop, expectedLeft);
      });
    });
    it('should be positioned over the center center of the anchor', function () {
      return openPopover({
        vertical: 'center',
        horizontal: 'center'
      }).then(function () {
        var anchorRect = anchorEl.getBoundingClientRect();
        var anchorTop = anchorRect.top + anchorRect.height / 2;
        var anchorLeft = anchorRect.left + anchorRect.height / 2;
        var expectedTop = anchorTop <= 16 ? 16 : anchorTop;
        var expectedLeft = anchorLeft <= 16 ? 16 : anchorLeft;
        expectPopover(expectedTop, expectedLeft);
      });
    });
    it('should be positioned over the top right of the anchor', function () {
      return openPopover({
        vertical: 'top',
        horizontal: 'right'
      }).then(function () {
        var anchorRect = anchorEl.getBoundingClientRect();
        var expectedTop = anchorRect.top <= 16 ? 16 : anchorRect.top;
        var expectedLeft = anchorRect.right <= 16 ? 16 : anchorRect.right;
        expectPopover(expectedTop, expectedLeft);
      });
    });
    it('should be positioned over the bottom right of the anchor', function () {
      return openPopover({
        vertical: 'bottom',
        horizontal: 'right'
      }).then(function () {
        var anchorRect = anchorEl.getBoundingClientRect();
        var expectedTop = anchorRect.bottom <= 16 ? 16 : anchorRect.bottom;
        var expectedLeft = anchorRect.right <= 16 ? 16 : anchorRect.right;
        expectPopover(expectedTop, expectedLeft);
      });
    });
    it('should pass through container prop if container and anchorEl props are provided', function () {
      var container = {};
      var shallowWrapper = shallow(_react.default.createElement(_Popover.default, {
        container: container,
        open: true
      }));

      _chai.assert.strictEqual(shallowWrapper.dive().find('Modal').props().container, container, 'should pass through container prop if both container and anchorEl props are provided');
    });
    it("should use anchorEl's parent body as container if container prop not provided", function () {
      return openPopover(undefined, true).then(function () {
        _chai.assert.strictEqual(wrapper.dive().find('Modal').props().container, window.document.body, "should use anchorEl's parent body as Modal container");
      });
    });
    it('should not pass container to Modal if container or anchorEl props are notprovided', function () {
      var shallowWrapper = shallow(_ref16);

      _chai.assert.strictEqual(shallowWrapper.dive().find('Modal').props().container, undefined, 'should not pass a container prop if neither container or anchorEl are provided');
    });
  });
  describe('prop anchorReference="anchorPosition"', function () {
    var anchorPosition = {
      top: 300,
      left: 500
    };
    var wrapper;
    var popoverEl;
    var openPopover;
    var expectPopover;
    before(function () {
      openPopover = function openPopover(anchorOrigin) {
        return new _promise.default(function (resolve) {
          wrapper = mount(_react.default.createElement(_Popover.default, (0, _extends2.default)({}, defaultProps, {
            anchorReference: "anchorPosition",
            anchorPosition: anchorPosition,
            anchorOrigin: anchorOrigin,
            transitionDuration: 0,
            onEntered: function onEntered() {
              popoverEl = window.document.querySelector('[data-mui-test="Popover"]');
              resolve();
            }
          }), _ref17));
          wrapper.setProps({
            open: true
          });
        });
      };

      expectPopover = function expectPopover(top, left) {
        _chai.assert.strictEqual(popoverEl.style.top, "".concat(top, "px"), 'should position at the correct top offset');

        _chai.assert.strictEqual(popoverEl.style.left, "".concat(left, "px"), 'should position at the correct left offset');

        wrapper.unmount();
      };
    });
    it('should be positioned according to the passed coordinates', function () {
      return openPopover().then(function () {
        expectPopover(anchorPosition.top, anchorPosition.left);
      });
    });
    it('should ignore the anchorOrigin prop when being positioned', function () {
      return openPopover({
        vertical: 'top',
        horizontal: 'right'
      }).then(function () {
        expectPopover(anchorPosition.top, anchorPosition.left);
      });
    });
  });
  describe('prop anchorReference="none"', function () {
    var wrapper;
    var popoverEl;
    var openPopover;
    var expectPopover;
    before(function () {
      openPopover = function openPopover() {
        return new _promise.default(function (resolve) {
          wrapper = mount(_react.default.createElement(_Popover.default, (0, _extends2.default)({}, defaultProps, {
            anchorReference: "none",
            transitionDuration: 0,
            onEntered: function onEntered() {
              popoverEl = window.document.querySelector('[data-mui-test="Popover"]');
              resolve();
            },
            PaperProps: {
              style: {
                top: 11,
                left: 12
              }
            }
          }), _ref18));
          wrapper.setProps({
            open: true
          });
        });
      };

      expectPopover = function expectPopover(top, left) {
        _chai.assert.strictEqual(popoverEl.style.top, "".concat(top, "px"), 'should position at the correct top offset');

        _chai.assert.strictEqual(popoverEl.style.left, "".concat(left, "px"), 'should position at the correct left offset');

        wrapper.unmount();
      };
    });
    it('should not try to change the position', function () {
      return openPopover().then(function () {
        expectPopover(11, 12);
      });
    });
  });
  describe('on window resize', function () {
    var clock;
    before(function () {
      clock = (0, _sinon.useFakeTimers)();
    });
    after(function () {
      clock.restore();
    });
    it('should recalculate position if the popover is open', function () {
      var wrapper = shallow(_react.default.createElement(_Popover.default, (0, _extends2.default)({}, defaultProps, {
        open: true,
        transitionDuration: 0
      }), _ref19));
      var instance = wrapper.instance();
      (0, _sinon.stub)(instance, 'setPositioningStyles');
      wrapper.find('EventListener').at(0).simulate('resize');
      clock.tick(166);

      _chai.assert.strictEqual(instance.setPositioningStyles.called, true, 'position styles recalculated');
    });
    it('should not recalculate position if the popover is closed', function () {
      var wrapper = mount(_react.default.createElement(_Popover.default, (0, _extends2.default)({}, defaultProps, {
        transitionDuration: 0
      }), _ref20));

      _chai.assert.strictEqual(wrapper.contains('EventListener'), false, 'no component listening on resize');
    });
  });
  [0, 8, 16].forEach(function (marginThreshold) {
    describe('getPositioningStyle(element)', function () {
      var instance;
      var element;
      var anchorOffset;
      var tempAnchorOffset;
      var transformOrigin;
      var positioningStyle;
      var innerHeightContainer;
      var innerWidthContainer;
      before(function () {
        instance = shallow(_react.default.createElement(_Popover.default, (0, _extends2.default)({}, defaultProps, {
          marginThreshold: marginThreshold
        }), _ref21)).instance();
        instance.getContentAnchorOffset = (0, _sinon.spy)();
        innerHeightContainer = global.window.innerHeight;
        innerWidthContainer = global.window.innerWidth;
        global.window.innerHeight = marginThreshold * 2;
        global.window.innerWidth = marginThreshold * 2;
        anchorOffset = {
          top: marginThreshold,
          left: marginThreshold
        };
        instance.getAnchorOffset = (0, _sinon.stub)().returns(anchorOffset);
        transformOrigin = {
          vertical: 0,
          horizontal: 0
        };
        instance.getTransformOrigin = (0, _sinon.stub)().returns(transformOrigin);
        instance.getTransformOriginValue = (0, _sinon.stub)().returns(true);
        element = {
          clientHeight: 0,
          clientWidth: 0
        };
      });
      after(function () {
        global.window.innerHeight = innerHeightContainer;
        global.window.innerWidth = innerWidthContainer;
      });
      describe('no offsets', function () {
        before(function () {
          positioningStyle = instance.getPositioningStyle(element);
        });
        after(function () {
          instance.getAnchorOffset = (0, _sinon.stub)().returns(anchorOffset);
        });
        it('should set top to marginThreshold', function () {
          _chai.assert.strictEqual(positioningStyle.top, "".concat(marginThreshold, "px"));
        });
        it('should set left to marginThreshold', function () {
          _chai.assert.strictEqual(positioningStyle.left, "".concat(marginThreshold, "px"));
        });
        it('should transformOrigin according to marginThreshold', function () {
          _chai.assert.strictEqual(positioningStyle.transformOrigin, '0px 0px');
        });
      });
      describe('top < marginThreshold', function () {
        before(function () {
          tempAnchorOffset = {
            top: marginThreshold - 1,
            left: marginThreshold
          };
          instance.getAnchorOffset = (0, _sinon.stub)().returns(tempAnchorOffset);
          positioningStyle = instance.getPositioningStyle(element);
        });
        after(function () {
          instance.getAnchorOffset = (0, _sinon.stub)().returns(anchorOffset);
        });
        it('should set top to marginThreshold', function () {
          _chai.assert.strictEqual(positioningStyle.top, "".concat(marginThreshold, "px"));
        });
        it('should set left to marginThreshold', function () {
          _chai.assert.strictEqual(positioningStyle.left, "".concat(marginThreshold, "px"));
        });
        it('should transformOrigin according to marginThreshold', function () {
          _chai.assert.strictEqual(positioningStyle.transformOrigin, '0px -1px');
        });
      });
      describe('bottom > heightThreshold', function () {
        before(function () {
          tempAnchorOffset = {
            top: marginThreshold + 1,
            left: marginThreshold
          };
          instance.getAnchorOffset = (0, _sinon.stub)().returns(tempAnchorOffset);
          positioningStyle = instance.getPositioningStyle(element);
        });
        after(function () {
          instance.getAnchorOffset = (0, _sinon.stub)().returns(anchorOffset);
        });
        it('should set top to marginThreshold', function () {
          _chai.assert.strictEqual(positioningStyle.top, "".concat(marginThreshold, "px"));
        });
        it('should set left to marginThreshold', function () {
          _chai.assert.strictEqual(positioningStyle.left, "".concat(marginThreshold, "px"));
        });
        it('should transformOrigin according to marginThreshold', function () {
          _chai.assert.strictEqual(positioningStyle.transformOrigin, '0px 1px');
        });
      });
      describe('left < marginThreshold', function () {
        before(function () {
          tempAnchorOffset = {
            top: marginThreshold,
            left: marginThreshold - 1
          };
          instance.getAnchorOffset = (0, _sinon.stub)().returns(tempAnchorOffset);
          positioningStyle = instance.getPositioningStyle(element);
        });
        after(function () {
          instance.getAnchorOffset = (0, _sinon.stub)().returns(anchorOffset);
        });
        it('should set top to marginThreshold', function () {
          _chai.assert.strictEqual(positioningStyle.top, "".concat(marginThreshold, "px"));
        });
        it('should set left to marginThreshold', function () {
          _chai.assert.strictEqual(positioningStyle.left, "".concat(marginThreshold, "px"));
        });
        it('should transformOrigin according to marginThreshold', function () {
          _chai.assert.strictEqual(positioningStyle.transformOrigin, '-1px 0px');
        });
      });
      describe('right > widthThreshold', function () {
        before(function () {
          tempAnchorOffset = {
            top: marginThreshold,
            left: marginThreshold + 1
          };
          instance.getAnchorOffset = (0, _sinon.stub)().returns(tempAnchorOffset);
          positioningStyle = instance.getPositioningStyle(element);
        });
        after(function () {
          instance.getAnchorOffset = (0, _sinon.stub)().returns(anchorOffset);
        });
        it('should set top to marginThreshold', function () {
          _chai.assert.strictEqual(positioningStyle.top, "".concat(marginThreshold, "px"));
        });
        it('should set left to marginThreshold', function () {
          _chai.assert.strictEqual(positioningStyle.left, "".concat(marginThreshold, "px"));
        });
        it('should transformOrigin according to marginThreshold', function () {
          _chai.assert.strictEqual(positioningStyle.transformOrigin, '1px 0px');
        });
      });
    });
  });
  describe('prop: getContentAnchorEl', function () {
    it('should position accordingly', function () {
      var element = {
        scrollTop: 5
      };
      var child = {
        offsetTop: 40,
        clientHeight: 20,
        parentNode: element
      };
      var wrapper = shallow(_react.default.createElement(_Popover.default, (0, _extends2.default)({}, defaultProps, {
        getContentAnchorEl: function getContentAnchorEl() {
          return child;
        }
      }), _ref22));

      _chai.assert.strictEqual(wrapper.instance().getContentAnchorOffset(element), 45);
    });
  });
  describe('prop: action', function () {
    it('should be able to access updatePosition function', function () {
      var popoverActions = {};
      mount(_react.default.createElement(_Popover.default, (0, _extends2.default)({}, defaultProps, {
        action: function action(actions) {
          popoverActions = actions;
        }
      }), _ref23, _ref24, _ref25));

      _chai.assert.strictEqual(typeof popoverActions.updatePosition === 'function', true, 'Should be a function.');

      popoverActions.updatePosition();
    });
  });
});