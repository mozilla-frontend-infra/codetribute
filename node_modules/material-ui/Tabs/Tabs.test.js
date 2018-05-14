"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _react = _interopRequireDefault(require("react"));

var _chai = require("chai");

var _sinon = require("sinon");

var _scroll = _interopRequireDefault(require("scroll"));

var _enzyme = require("enzyme");

var _consoleErrorMock = _interopRequireDefault(require("test/utils/consoleErrorMock"));

var _testUtils = require("../test-utils");

var _Tabs = _interopRequireDefault(require("./Tabs"));

var _TabScrollButton = _interopRequireDefault(require("./TabScrollButton"));

var _TabIndicator = _interopRequireDefault(require("./TabIndicator"));

var _Tab = _interopRequireDefault(require("./Tab"));

var _ref4 = _react.default.createElement(_Tab.default, null);

var _ref5 = _react.default.createElement(_Tab.default, null);

var _ref15 = _react.default.createElement(_Tab.default, null);

var _ref16 = _react.default.createElement(_Tab.default, null);

var _ref18 = _react.default.createElement(_Tab.default, null);

var _ref19 = _react.default.createElement(_Tab.default, null);

var _ref30 = _react.default.createElement(_Tab.default, null);

var _ref31 = _react.default.createElement(_Tab.default, null);

var _ref32 = _react.default.createElement(_Tab.default, null);

var _ref33 = _react.default.createElement(_Tab.default, null);

var _ref34 = _react.default.createElement(_Tab.default, null);

var _ref35 = _react.default.createElement(_Tab.default, null);

var _ref36 = _react.default.createElement(_Tab.default, null);

var _ref37 = _react.default.createElement(_Tab.default, null);

var _ref38 = _react.default.createElement(_Tab.default, null);

var _ref39 = _react.default.createElement(_Tab.default, null);

var _ref40 = _react.default.createElement(_Tab.default, null);

var _ref41 = _react.default.createElement(_Tab.default, null);

var _ref42 = _react.default.createElement(_Tab.default, null);

var _ref43 = _react.default.createElement(_Tab.default, null);

var _ref44 = _react.default.createElement(_Tab.default, null);

var _ref45 = _react.default.createElement(_Tab.default, null);

var _ref46 = _react.default.createElement(_Tab.default, null);

var _ref47 = _react.default.createElement(_Tab.default, null);

var _ref48 = _react.default.createElement(_Tab.default, null);

var _ref49 = _react.default.createElement(_Tab.default, null);

var _ref50 = _react.default.createElement(_Tab.default, null);

var _ref51 = _react.default.createElement(_Tab.default, null);

var _ref52 = _react.default.createElement(_Tab.default, null);

var _ref53 = _react.default.createElement(_Tab.default, null);

var _ref54 = _react.default.createElement(_Tab.default, null);

var _ref55 = _react.default.createElement(_Tab.default, null);

var _ref56 = _react.default.createElement(_Tab.default, null);

var _ref57 = _react.default.createElement(_Tab.default, null);

var _ref58 = _react.default.createElement(_Tab.default, null);

var _ref59 = _react.default.createElement(_Tab.default, null);

var _ref60 = _react.default.createElement(_Tab.default, null);

var _ref61 = _react.default.createElement(_Tab.default, null);

var _ref62 = _react.default.createElement(_Tab.default, null);

var _ref63 = _react.default.createElement(_Tab.default, null);

var _ref64 = _react.default.createElement(_Tab.default, null);

var _ref65 = _react.default.createElement(_Tab.default, null);

var _ref66 = _react.default.createElement(_Tab.default, null);

var _ref67 = _react.default.createElement(_Tab.default, null);

var _ref68 = _react.default.createElement(_Tab.default, null);

describe('<Tabs />', function () {
  var mount;
  var shallow;
  var classes;
  var TabsNaked = (0, _testUtils.unwrap)(_Tabs.default);

  var noop = function noop() {};

  var fakeTabs = {
    getBoundingClientRect: function getBoundingClientRect() {
      return {};
    },
    children: [{
      children: [{
        getBoundingClientRect: function getBoundingClientRect() {
          return {};
        }
      }]
    }]
  };

  var _ref = _react.default.createElement(_Tabs.default, {
    onChange: noop,
    value: 0
  });

  before(function () {
    shallow = (0, _testUtils.createShallow)({
      untilSelector: 'Tabs'
    });
    classes = (0, _testUtils.getClasses)(_ref);
    mount = (0, _testUtils.createMount)();
  });
  after(function () {
    mount.cleanUp();
  });

  var _ref2 = _react.default.createElement(_Tabs.default, {
    width: "md",
    onChange: noop,
    value: 0
  }, _ref30, _ref31);

  it('should render with the root class', function () {
    var wrapper = shallow(_ref2);

    _chai.assert.strictEqual(wrapper.name(), 'div');

    _chai.assert.strictEqual(wrapper.hasClass(classes.root), true);
  });

  var _ref3 = _react.default.createElement(_Tabs.default, {
    onChange: noop,
    value: 0,
    centered: true,
    scrollable: true
  });

  describe('warning', function () {
    before(function () {
      _consoleErrorMock.default.spy();
    });
    after(function () {
      _consoleErrorMock.default.reset();
    });
    it('should warn if the input is invalid', function () {
      shallow(_ref3);

      _chai.assert.match(_consoleErrorMock.default.args()[0][0], /Material-UI: you can not use the `centered={true}` and `scrollable={true}`/);
    });
  });
  describe('prop: action', function () {
    it('should be able to access updateIndicator function', function () {
      var tabsActions = {};
      mount(_react.default.createElement(_Tabs.default, {
        width: "md",
        onChange: noop,
        value: 0,
        className: "woofTabs",
        action: function action(actions) {
          tabsActions = actions;
        }
      }, _ref4, _ref5));

      _chai.assert.strictEqual(typeof tabsActions.updateIndicator === 'function', true, 'Should be a function.');

      tabsActions.updateIndicator();
    });
  });

  var _ref6 = _react.default.createElement(_Tabs.default, {
    width: "md",
    onChange: noop,
    value: 0,
    className: "woofTabs"
  }, _ref32, _ref33);

  describe('prop: className', function () {
    it('should render with the user and root classes', function () {
      var wrapper = shallow(_ref6);

      _chai.assert.strictEqual(wrapper.hasClass('woofTabs'), true);

      _chai.assert.strictEqual(wrapper.hasClass(classes.root), true);
    });
  });

  var _ref7 = _react.default.createElement(_Tabs.default, {
    width: "md",
    onChange: noop,
    value: 0,
    centered: true
  }, _ref34, _ref35);

  describe('prop: centered', function () {
    it('should render with the centered class', function () {
      var wrapper = shallow(_ref7);
      var selector = ".".concat(classes.flexContainer, ".").concat(classes.centered);

      _chai.assert.strictEqual(wrapper.find(selector).is('div'), true, 'should be a div');

      _chai.assert.strictEqual(wrapper.find(selector).length, 1, 'should only be one');
    });
  });

  var _ref8 = _react.default.createElement(_Tabs.default, {
    width: "md",
    onChange: noop,
    value: 0
  }, null, _ref36);

  var _ref9 = _react.default.createElement(_Tabs.default, {
    width: "md",
    onChange: noop,
    value: 1
  });

  describe('prop: children', function () {
    it('should accept an invalid child', function () {
      var wrapper = shallow(_ref8);

      _chai.assert.strictEqual(wrapper.find(_Tab.default).length, 1);
    });
    it('should support empty children', function () {
      var wrapper = mount(_ref9);

      _chai.assert.strictEqual(wrapper.find('EventListener').length, 1);
    });
  });

  var _ref10 = _react.default.createElement(_Tabs.default, {
    width: "md",
    onChange: noop,
    value: 1
  }, _ref37, _ref38);

  var _ref11 = _react.default.createElement(_Tabs.default, {
    width: "md",
    onChange: noop,
    value: false
  }, _ref39, _ref40);

  var _ref12 = _react.default.createElement(_Tabs.default, {
    width: "md",
    onChange: noop,
    value: 1
  }, _ref41, _ref42);

  var _ref13 = _react.default.createElement(_Tabs.default, {
    width: "md",
    onChange: noop,
    value: 1
  }, _ref43, _ref44);

  var _ref14 = _react.default.createElement(_Tabs.default, {
    width: "md",
    onChange: noop,
    value: 1
  }, _ref45, _ref46);

  var _ref17 = _react.default.createElement(_Tabs.default, {
    width: "md",
    onChange: noop,
    value: 2
  }, _ref47, _ref48);

  describe('prop: value', function () {
    var wrapper;
    before(function () {
      wrapper = shallow(_ref10);
    });
    after(function () {
      _consoleErrorMock.default.reset();
    });
    it('should pass selected prop to children', function () {
      _chai.assert.strictEqual(wrapper.find(_Tab.default).at(0).props().selected, false, 'should have selected to false');

      _chai.assert.strictEqual(wrapper.find(_Tab.default).at(1).props().selected, true, 'should have selected');
    });
    it('should switch from the original value', function () {
      wrapper.setProps({
        value: 0
      });

      _chai.assert.strictEqual(wrapper.find(_Tab.default).at(0).props().selected, true, 'should have switched to true');

      _chai.assert.strictEqual(wrapper.find(_Tab.default).at(1).props().selected, false, 'should have switched to false');
    });
    describe('indicator', function () {
      it('should accept a false value', function () {
        var wrapper2 = mount(_ref11);

        _chai.assert.strictEqual(wrapper2.find(_TabIndicator.default).props().style.width, 0);
      });
      it('should work server-side', function () {
        var wrapper2 = shallow(_ref12, {
          disableLifecycleMethods: true
        });
        var indicator = new _enzyme.ShallowWrapper(wrapper2.find(_Tab.default).at(1).props().indicator, wrapper2);

        _chai.assert.deepEqual(indicator.props().style, {});
      });
      it('should let the selected <Tab /> render the indicator', function () {
        var wrapper2 = shallow(_ref13, {
          disableLifecycleMethods: true
        });

        _chai.assert.strictEqual(wrapper2.find(_Tab.default).at(0).props().indicator, false);

        _chai.assert.strictEqual(wrapper2.find(_Tab.default).at(1).props().indicator.type, _TabIndicator.default);
      });
      it('should render the indicator', function () {
        var wrapper2 = mount(_ref14);

        _chai.assert.strictEqual(wrapper2.find(_Tab.default).at(0).props().indicator, false);

        _chai.assert.strictEqual(wrapper2.find(_Tab.default).at(1).props().indicator, false);

        _chai.assert.strictEqual(wrapper2.find(_TabIndicator.default).length, 1);
      });
      it('should update the indicator state no matter what', function () {
        var wrapper2 = mount(_react.default.createElement(TabsNaked, {
          width: "md",
          onChange: noop,
          value: 1,
          classes: {},
          theme: {}
        }, _ref15, _ref16));
        var instance = wrapper2.instance();
        (0, _sinon.stub)(instance, 'scrollSelectedIntoView');
        wrapper2.setState({
          indicatorStyle: {
            left: 10,
            width: 40
          }
        });
        wrapper2.setProps({
          value: 0
        });

        _chai.assert.strictEqual(instance.scrollSelectedIntoView.callCount >= 2, true, 'should have called scrollSelectedIntoView');
      });
    });
    it('should warn when the value is invalid', function () {
      _consoleErrorMock.default.spy();

      mount(_ref17);

      _chai.assert.strictEqual(_consoleErrorMock.default.callCount(), 3);

      _chai.assert.strictEqual(_consoleErrorMock.default.args()[0][0], 'Warning: Material-UI: the value provided `2` is invalid');
    });
  });
  describe('prop: onChange', function () {
    it('should call onChange when clicking', function () {
      var handleChange = (0, _sinon.spy)(); // use mount to ensure that click event on Tab can be fired

      var wrapper = mount(_react.default.createElement(_Tabs.default, {
        width: "md",
        value: 0,
        onChange: handleChange
      }, _ref18, _ref19));
      wrapper.find(_Tab.default).at(1).simulate('click');
      wrapper.setProps({
        value: 1
      });

      _chai.assert.strictEqual(handleChange.callCount, 1, 'should have been called once');

      _chai.assert.strictEqual(handleChange.args[0][1], 1, 'should have been called with value 1');

      wrapper.unmount();
    });
  });

  var _ref20 = _react.default.createElement(_Tabs.default, {
    width: "md",
    onChange: noop,
    value: 0,
    scrollable: true
  }, _ref49, _ref50);

  var _ref21 = _react.default.createElement(_Tabs.default, {
    width: "md",
    onChange: noop,
    value: 0,
    scrollable: true
  }, _ref51, _ref52);

  describe('prop: scrollable', function () {
    var clock;
    var wrapper;
    before(function () {
      clock = (0, _sinon.useFakeTimers)();
      wrapper = shallow(_ref20);
    });
    after(function () {
      clock.restore();
    });
    it('should render with the scrollable class', function () {
      var selector = ".".concat(classes.scroller, ".").concat(classes.scrollable);

      _chai.assert.strictEqual(wrapper.find(selector).is('div'), true, 'should be a div');

      _chai.assert.strictEqual(wrapper.find(selector).length, 1, 'should only be one');
    });
    it('should response to scroll events', function () {
      var instance = wrapper.instance();
      instance.tabs = (0, _objectSpread2.default)({
        scrollLeft: 100
      }, fakeTabs);
      (0, _sinon.spy)(instance, 'updateScrollButtonState');
      var selector = ".".concat(classes.scroller, ".").concat(classes.scrollable);
      wrapper.find(selector).simulate('scroll');
      clock.tick(166);

      _chai.assert.strictEqual(instance.updateScrollButtonState.called, true, 'should have called updateScrollButtonState');
    });
    it('should get a scrollbar size listener', function () {
      // use mount to ensure that handleScrollbarSizeChange gets covered
      var mountWrapper = mount(_ref21);

      _chai.assert.strictEqual(mountWrapper.find('ScrollbarSize').length, 1, 'should be one');

      mountWrapper.unmount();
    });
  });

  var _ref22 = _react.default.createElement(_Tabs.default, {
    width: "md",
    onChange: noop,
    value: 0
  }, _ref53, _ref54);

  describe('prop: !scrollable', function () {
    it('should not render with the scrollable class', function () {
      var wrapper = shallow(_ref22);
      var baseSelector = ".".concat(classes.scroller);
      var selector = ".".concat(classes.scroller, ".").concat(classes.scrollable);

      _chai.assert.strictEqual(wrapper.find(baseSelector).length, 1, 'base selector should exist');

      _chai.assert.strictEqual(wrapper.find(selector).length, 0, 'scrolling selector should not exist');
    });
  });

  var _ref23 = _react.default.createElement(_Tabs.default, {
    width: "md",
    onChange: noop,
    value: 0,
    scrollable: true,
    scrollButtons: "on"
  }, _ref55, _ref56);

  var _ref24 = _react.default.createElement(_Tabs.default, {
    width: "md",
    onChange: noop,
    value: 0,
    scrollable: true,
    scrollButtons: "auto"
  }, _ref57, _ref58);

  var _ref25 = _react.default.createElement(_Tabs.default, {
    width: "sm",
    onChange: noop,
    value: 0,
    scrollable: true,
    scrollButtons: "auto"
  }, _ref59, _ref60);

  var _ref26 = _react.default.createElement(_Tabs.default, {
    width: "md",
    onChange: noop,
    value: 0,
    scrollable: true,
    scrollButtons: "on"
  }, _ref61, _ref62);

  var _ref27 = _react.default.createElement(_Tabs.default, {
    width: "md",
    onChange: noop,
    value: 0,
    scrollable: true,
    scrollButtons: "on"
  }, _ref63, _ref64);

  describe('prop: scrollButtons', function () {
    var clock;
    before(function () {
      clock = (0, _sinon.useFakeTimers)();
    });
    after(function () {
      clock.restore();
    });
    it('should render scroll buttons', function () {
      var wrapper = shallow(_ref23);

      _chai.assert.strictEqual(wrapper.find(_TabScrollButton.default).length, 2, 'should be two');
    });
    it('should render scroll buttons automatically', function () {
      var wrapper = shallow(_ref24);

      _chai.assert.strictEqual(wrapper.find(_TabScrollButton.default).length, 2, 'should be two');
    });
    it('should should not render scroll buttons automatically', function () {
      var wrapper = shallow(_ref25);

      _chai.assert.strictEqual(wrapper.find(_TabScrollButton.default).length, 2, 'should be zero');

      _chai.assert.strictEqual(wrapper.find(_TabScrollButton.default).everyWhere(function (node) {
        return node.hasClass(classes.scrollButtonsAuto);
      }), true);
    });
    it('should handle window resize event', function () {
      var wrapper = shallow(_ref26);
      var instance = wrapper.instance();
      (0, _sinon.stub)(instance, 'updateScrollButtonState');
      (0, _sinon.stub)(instance, 'updateIndicatorState');
      wrapper.find('EventListener').at(0).simulate('resize');
      clock.tick(166);

      _chai.assert.strictEqual(instance.updateScrollButtonState.called, true, 'should have called updateScrollButtonState');

      _chai.assert.strictEqual(instance.updateIndicatorState.called, true, 'should have called updateIndicatorState');
    });
    describe('scroll button visibility states', function () {
      var wrapper;
      var instance;
      before(function () {
        wrapper = shallow(_ref27);
        instance = wrapper.instance();
      });
      it('should set neither left nor right scroll button state', function () {
        instance.tabs = (0, _objectSpread2.default)({
          scrollLeft: 0,
          scrollWidth: 90,
          clientWidth: 100
        }, fakeTabs);
        instance.updateScrollButtonState();

        _chai.assert.strictEqual(wrapper.state().showLeftScroll, false, 'left scroll should be false');

        _chai.assert.strictEqual(wrapper.state().showRightScroll, false, 'right scroll should be false');
      });
      it('should set only left scroll button state', function () {
        instance.tabs = (0, _objectSpread2.default)({
          scrollLeft: 1
        }, fakeTabs);
        instance.updateScrollButtonState();

        _chai.assert.strictEqual(wrapper.state().showLeftScroll, true, 'left scroll should be true');

        _chai.assert.strictEqual(wrapper.state().showRightScroll, false, 'right scroll should be false');
      });
      it('should set only right scroll button state', function () {
        instance.tabs = (0, _objectSpread2.default)({
          scrollLeft: 0,
          scrollWidth: 110,
          clientWidth: 100
        }, fakeTabs);
        instance.updateScrollButtonState();

        _chai.assert.strictEqual(wrapper.state().showLeftScroll, false, 'left scroll should be false');

        _chai.assert.strictEqual(wrapper.state().showRightScroll, true, 'right scroll should be true');
      });
      it('should set both left and right scroll button state', function () {
        instance.tabs = (0, _objectSpread2.default)({
          scrollLeft: 1,
          scrollWidth: 110,
          clientWidth: 100
        }, fakeTabs);
        instance.updateScrollButtonState();

        _chai.assert.strictEqual(wrapper.state().showLeftScroll, true, 'left scroll should be true');

        _chai.assert.strictEqual(wrapper.state().showRightScroll, true, 'right scroll should be true');
      });
    });
  });

  var _ref28 = _react.default.createElement(_Tabs.default, {
    width: "md",
    onChange: noop,
    value: 0,
    scrollable: true,
    scrollButtons: "on"
  }, _ref65, _ref66);

  describe('scroll button behavior', function () {
    var instance;
    var wrapper;
    var scrollSpy;
    var dimensions = {
      scrollLeft: 100,
      clientWidth: 200,
      scrollWidth: 1000
    };
    before(function () {
      wrapper = shallow(_ref28);
      instance = wrapper.instance();
      instance.tabs = dimensions;
      scrollSpy = (0, _sinon.spy)(instance, 'moveTabsScroll');
    });
    it('should call moveTabsScroll', function () {
      wrapper.find(_TabScrollButton.default).at(0).simulate('click');

      _chai.assert.strictEqual(scrollSpy.args[0][0], -dimensions.clientWidth, "should be called with -".concat(dimensions.clientWidth));

      wrapper.find(_TabScrollButton.default).at(1).simulate('click');

      _chai.assert.strictEqual(scrollSpy.args[1][0], dimensions.clientWidth, "should be called with ".concat(dimensions.clientWidth));
    });
  });

  var _ref29 = _react.default.createElement(_Tabs.default, {
    width: "md",
    onChange: noop,
    value: 0,
    scrollable: true
  }, _ref67, _ref68);

  describe('scroll into view behavior', function () {
    var scrollStub;
    var instance;
    var metaStub;
    beforeEach(function () {
      scrollStub = (0, _sinon.stub)(_scroll.default, 'left');
      var wrapper = shallow(_ref29);
      instance = wrapper.instance();
      metaStub = (0, _sinon.stub)(instance, 'getTabsMeta');
    });
    afterEach(function () {
      _scroll.default.left.restore();
    });
    it('should scroll left tab into view', function () {
      metaStub.returns({
        tabsMeta: {
          left: 0,
          right: 100,
          scrollLeft: 10
        },
        tabMeta: {
          left: -10,
          right: 10
        }
      });
      instance.scrollSelectedIntoView();

      _chai.assert.strictEqual(scrollStub.args[0][1], 0, 'should scroll to 0 position');
    });
    it('should scroll right tab into view', function () {
      metaStub.returns({
        tabsMeta: {
          left: 0,
          right: 100,
          scrollLeft: 0
        },
        tabMeta: {
          left: 90,
          right: 110
        }
      });
      instance.scrollSelectedIntoView();

      _chai.assert.strictEqual(scrollStub.args[0][1], 10, 'should scroll to 10 position');
    });
    it('should support value=false', function () {
      metaStub.returns({
        tabsMeta: {
          left: 0,
          right: 100,
          scrollLeft: 0
        },
        tabMeta: undefined
      });
      instance.scrollSelectedIntoView();

      _chai.assert.strictEqual(scrollStub.callCount, 0, 'should not scroll');
    });
  });
});