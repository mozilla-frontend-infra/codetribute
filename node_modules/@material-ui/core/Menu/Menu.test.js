"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _sinon = require("sinon");

var _chai = require("chai");

var _reactDom = _interopRequireDefault(require("react-dom"));

var _testUtils = require("../test-utils");

var _Popover = _interopRequireDefault(require("../Popover"));

var _Menu = _interopRequireDefault(require("./Menu"));

var _ref2 = _react.default.createElement("div", null);

describe('<Menu />', function () {
  var shallow;
  var classes;
  var mount;
  var defaultProps = {
    open: false
  };
  before(function () {
    shallow = (0, _testUtils.createShallow)({
      dive: true
    });
    classes = (0, _testUtils.getClasses)(_react.default.createElement(_Menu.default, defaultProps));
    mount = (0, _testUtils.createMount)();
  });
  after(function () {
    mount.cleanUp();
  });
  it('should render a Popover', function () {
    var wrapper = shallow(_react.default.createElement(_Menu.default, defaultProps));

    _chai.assert.strictEqual(wrapper.type(), _Popover.default);
  });
  it('should fire Popover transition event callbacks', function () {
    var events = ['onEnter', 'onEntering', 'onEntered', 'onExit', 'onExiting', 'onExited'];
    var handlers = events.reduce(function (result, n) {
      result[n] = (0, _sinon.spy)();
      return result;
    }, {});
    var wrapper = shallow(_react.default.createElement(_Menu.default, (0, _extends2.default)({}, defaultProps, handlers)));
    events.forEach(function (n) {
      var event = n.charAt(2).toLowerCase() + n.slice(3);
      wrapper.simulate(event, {
        style: {}
      });

      _chai.assert.strictEqual(handlers[n].callCount, 1, "should have called the ".concat(n, " handler"));
    });
  });
  it('should pass `classes.paper` to the Popover', function () {
    var wrapper = shallow(_react.default.createElement(_Menu.default, defaultProps));

    _chai.assert.strictEqual(wrapper.props().PaperProps.classes.root, classes.paper);
  });
  describe('prop: PopoverClasses', function () {
    it('should be able to change the Popover style', function () {
      var wrapper = shallow(_react.default.createElement(_Menu.default, (0, _extends2.default)({}, defaultProps, {
        PopoverClasses: {
          foo: 'bar'
        }
      })));

      _chai.assert.strictEqual(wrapper.props().classes.foo, 'bar');
    });
  });
  it('should pass the instance function `getContentAnchorEl` to Popover', function () {
    var wrapper = shallow(_react.default.createElement(_Menu.default, defaultProps));

    _chai.assert.strictEqual(wrapper.props().getContentAnchorEl, wrapper.instance().getContentAnchorEl, 'should be the same function');
  });
  it('should pass onClose prop to Popover', function () {
    var fn = function fn() {};

    var wrapper = shallow(_react.default.createElement(_Menu.default, (0, _extends2.default)({}, defaultProps, {
      onClose: fn
    })));

    _chai.assert.strictEqual(wrapper.props().onClose, fn, 'should be the same function');
  });
  it('should pass anchorEl prop to Popover', function () {
    var el = document.createElement('div');
    var wrapper = shallow(_react.default.createElement(_Menu.default, (0, _extends2.default)({}, defaultProps, {
      anchorEl: el
    })));

    _chai.assert.strictEqual(wrapper.props().anchorEl, el, 'should be the same object');
  });
  it('should pass through the `open` prop to Popover', function () {
    var wrapper = shallow(_react.default.createElement(_Menu.default, defaultProps));

    _chai.assert.strictEqual(wrapper.props().open, false, 'should have an open prop of false');

    wrapper.setProps({
      open: true
    });

    _chai.assert.strictEqual(wrapper.props().open, true, 'should have an open prop of true');
  });
  describe('list node', function () {
    var wrapper;
    var list;
    before(function () {
      wrapper = shallow(_react.default.createElement(_Menu.default, (0, _extends2.default)({}, defaultProps, {
        className: "test-class",
        "data-test": "hi"
      })));
      list = wrapper.childAt(0);
    });
    it('should render a MenuList inside the Popover', function () {
      _chai.assert.strictEqual(list.is('MenuList'), true, 'should have a MenuList as the immediate child');
    });
    it('should spread other props on the list', function () {
      _chai.assert.strictEqual(wrapper.props()['data-test'], 'hi', 'should have the custom prop');
    });
    it('should have the user classes', function () {
      _chai.assert.strictEqual(wrapper.hasClass('test-class'), true, 'should have the user class');
    });
  });

  var _ref = _react.default.createElement(_Menu.default, {
    open: true,
    classes: classes
  }, _ref2);

  it('should open during the initial mount', function () {
    var wrapper = mount(_ref);
    var popover = wrapper.find('Popover');

    _chai.assert.strictEqual(popover.props().open, true);

    var menuEl = document.querySelector('[data-mui-test="Menu"]');

    _chai.assert.strictEqual(document.activeElement, menuEl && menuEl.firstChild, 'should be the first menu item');
  });
  describe('mount', function () {
    var wrapper;
    var instance;
    var selectedItemFocusSpy;
    var menuListSpy;
    var menuListFocusSpy;
    var elementForHandleEnter;
    var SELECTED_ITEM_KEY = 111111;
    var MENU_LIST_HEIGHT = 100;
    var findDOMNodeStub;
    before(function () {
      var MenuNaked = (0, _testUtils.unwrap)(_Menu.default);
      wrapper = mount(_react.default.createElement(MenuNaked, (0, _extends2.default)({}, defaultProps, {
        theme: {},
        classes: classes
      })));
      instance = wrapper.instance();
      selectedItemFocusSpy = (0, _sinon.spy)();
      menuListFocusSpy = (0, _sinon.spy)();
      menuListSpy = {};
      menuListSpy.clientHeight = MENU_LIST_HEIGHT;
      menuListSpy.style = {};
      menuListSpy.firstChild = {
        focus: menuListFocusSpy
      };
      findDOMNodeStub = (0, _sinon.stub)(_reactDom.default, 'findDOMNode').callsFake(function (arg) {
        if (arg === SELECTED_ITEM_KEY) {
          return {
            focus: selectedItemFocusSpy
          };
        }

        return menuListSpy;
      });
      elementForHandleEnter = {
        clientHeight: MENU_LIST_HEIGHT
      };
    });
    after(function () {
      findDOMNodeStub.restore();
    });
    beforeEach(function () {
      menuListFocusSpy.resetHistory();
      selectedItemFocusSpy.resetHistory();
    });
    it('should call props.onEnter with element if exists', function () {
      var onEnterSpy = (0, _sinon.spy)();
      wrapper.setProps({
        onEnter: onEnterSpy
      });
      instance.handleEnter(elementForHandleEnter);

      _chai.assert.strictEqual(onEnterSpy.callCount, 1);

      _chai.assert.strictEqual(onEnterSpy.calledWith(elementForHandleEnter), true);
    });
    it('should call menuList focus when no menuList', function () {
      delete instance.menuList;
      instance.handleEnter(elementForHandleEnter);

      _chai.assert.strictEqual(selectedItemFocusSpy.callCount, 0);

      _chai.assert.strictEqual(menuListFocusSpy.callCount, 1);
    });
    it('should call menuList focus when menuList but no menuList.selectedItem ', function () {
      instance.menuList = {};
      delete instance.menuList.selectedItem;
      instance.handleEnter(elementForHandleEnter);

      _chai.assert.strictEqual(selectedItemFocusSpy.callCount, 0);

      _chai.assert.strictEqual(menuListFocusSpy.callCount, 1);
    });
    describe('menuList.selectedItem exists', function () {
      before(function () {
        instance.menuList = {};
        instance.menuList.selectedItem = SELECTED_ITEM_KEY;
      });
      it('should call selectedItem focus when there is a menuList.selectedItem', function () {
        instance.handleEnter(elementForHandleEnter);

        _chai.assert.strictEqual(selectedItemFocusSpy.callCount, 1);

        _chai.assert.strictEqual(menuListFocusSpy.callCount, 0);
      });
      it('should not set style on list when element.clientHeight > list.clientHeight', function () {
        elementForHandleEnter.clientHeight = MENU_LIST_HEIGHT + 1;
        instance.handleEnter(elementForHandleEnter);

        _chai.assert.strictEqual(menuListSpy.style.paddingRight, undefined);

        _chai.assert.strictEqual(menuListSpy.style.width, undefined);
      });
      it('should not set style on list when element.clientHeight == list.clientHeight', function () {
        elementForHandleEnter.clientHeight = MENU_LIST_HEIGHT;
        instance.handleEnter(elementForHandleEnter);

        _chai.assert.strictEqual(menuListSpy.style.paddingRight, undefined);

        _chai.assert.strictEqual(menuListSpy.style.width, undefined);
      });
      it('should not set style on list when element.clientHeight < list.clientHeight', function () {
        _chai.assert.strictEqual(menuListSpy.style.paddingRight, undefined);

        _chai.assert.strictEqual(menuListSpy.style.width, undefined);

        elementForHandleEnter.clientHeight = MENU_LIST_HEIGHT - 1;
        instance.handleEnter(elementForHandleEnter);

        _chai.assert.notStrictEqual(menuListSpy.style.paddingRight, undefined);

        _chai.assert.notStrictEqual(menuListSpy.style.width, undefined);
      });
    });
  });
});