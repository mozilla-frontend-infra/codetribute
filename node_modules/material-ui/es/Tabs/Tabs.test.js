import _objectSpread from "@babel/runtime/helpers/objectSpread";
import React from 'react';
import { assert } from 'chai';
import { spy, stub, useFakeTimers } from 'sinon';
import scroll from 'scroll';
import { ShallowWrapper } from 'enzyme';
import consoleErrorMock from 'test/utils/consoleErrorMock';
import { createShallow, createMount, getClasses, unwrap } from '../test-utils';
import Tabs from './Tabs';
import TabScrollButton from './TabScrollButton';
import TabIndicator from './TabIndicator';
import Tab from './Tab';

var _ref4 = React.createElement(Tab, null);

var _ref5 = React.createElement(Tab, null);

var _ref15 = React.createElement(Tab, null);

var _ref16 = React.createElement(Tab, null);

var _ref18 = React.createElement(Tab, null);

var _ref19 = React.createElement(Tab, null);

var _ref30 = React.createElement(Tab, null);

var _ref31 = React.createElement(Tab, null);

var _ref32 = React.createElement(Tab, null);

var _ref33 = React.createElement(Tab, null);

var _ref34 = React.createElement(Tab, null);

var _ref35 = React.createElement(Tab, null);

var _ref36 = React.createElement(Tab, null);

var _ref37 = React.createElement(Tab, null);

var _ref38 = React.createElement(Tab, null);

var _ref39 = React.createElement(Tab, null);

var _ref40 = React.createElement(Tab, null);

var _ref41 = React.createElement(Tab, null);

var _ref42 = React.createElement(Tab, null);

var _ref43 = React.createElement(Tab, null);

var _ref44 = React.createElement(Tab, null);

var _ref45 = React.createElement(Tab, null);

var _ref46 = React.createElement(Tab, null);

var _ref47 = React.createElement(Tab, null);

var _ref48 = React.createElement(Tab, null);

var _ref49 = React.createElement(Tab, null);

var _ref50 = React.createElement(Tab, null);

var _ref51 = React.createElement(Tab, null);

var _ref52 = React.createElement(Tab, null);

var _ref53 = React.createElement(Tab, null);

var _ref54 = React.createElement(Tab, null);

var _ref55 = React.createElement(Tab, null);

var _ref56 = React.createElement(Tab, null);

var _ref57 = React.createElement(Tab, null);

var _ref58 = React.createElement(Tab, null);

var _ref59 = React.createElement(Tab, null);

var _ref60 = React.createElement(Tab, null);

var _ref61 = React.createElement(Tab, null);

var _ref62 = React.createElement(Tab, null);

var _ref63 = React.createElement(Tab, null);

var _ref64 = React.createElement(Tab, null);

var _ref65 = React.createElement(Tab, null);

var _ref66 = React.createElement(Tab, null);

var _ref67 = React.createElement(Tab, null);

var _ref68 = React.createElement(Tab, null);

describe('<Tabs />', () => {
  let mount;
  let shallow;
  let classes;
  const TabsNaked = unwrap(Tabs);

  const noop = () => {};

  const fakeTabs = {
    getBoundingClientRect: () => ({}),
    children: [{
      children: [{
        getBoundingClientRect: () => ({})
      }]
    }]
  };

  var _ref = React.createElement(Tabs, {
    onChange: noop,
    value: 0
  });

  before(() => {
    shallow = createShallow({
      untilSelector: 'Tabs'
    });
    classes = getClasses(_ref);
    mount = createMount();
  });
  after(() => {
    mount.cleanUp();
  });

  var _ref2 = React.createElement(Tabs, {
    width: "md",
    onChange: noop,
    value: 0
  }, _ref30, _ref31);

  it('should render with the root class', () => {
    const wrapper = shallow(_ref2);
    assert.strictEqual(wrapper.name(), 'div');
    assert.strictEqual(wrapper.hasClass(classes.root), true);
  });

  var _ref3 = React.createElement(Tabs, {
    onChange: noop,
    value: 0,
    centered: true,
    scrollable: true
  });

  describe('warning', () => {
    before(() => {
      consoleErrorMock.spy();
    });
    after(() => {
      consoleErrorMock.reset();
    });
    it('should warn if the input is invalid', () => {
      shallow(_ref3);
      assert.match(consoleErrorMock.args()[0][0], /Material-UI: you can not use the `centered={true}` and `scrollable={true}`/);
    });
  });
  describe('prop: action', () => {
    it('should be able to access updateIndicator function', () => {
      let tabsActions = {};
      mount(React.createElement(Tabs, {
        width: "md",
        onChange: noop,
        value: 0,
        className: "woofTabs",
        action: actions => {
          tabsActions = actions;
        }
      }, _ref4, _ref5));
      assert.strictEqual(typeof tabsActions.updateIndicator === 'function', true, 'Should be a function.');
      tabsActions.updateIndicator();
    });
  });

  var _ref6 = React.createElement(Tabs, {
    width: "md",
    onChange: noop,
    value: 0,
    className: "woofTabs"
  }, _ref32, _ref33);

  describe('prop: className', () => {
    it('should render with the user and root classes', () => {
      const wrapper = shallow(_ref6);
      assert.strictEqual(wrapper.hasClass('woofTabs'), true);
      assert.strictEqual(wrapper.hasClass(classes.root), true);
    });
  });

  var _ref7 = React.createElement(Tabs, {
    width: "md",
    onChange: noop,
    value: 0,
    centered: true
  }, _ref34, _ref35);

  describe('prop: centered', () => {
    it('should render with the centered class', () => {
      const wrapper = shallow(_ref7);
      const selector = `.${classes.flexContainer}.${classes.centered}`;
      assert.strictEqual(wrapper.find(selector).is('div'), true, 'should be a div');
      assert.strictEqual(wrapper.find(selector).length, 1, 'should only be one');
    });
  });

  var _ref8 = React.createElement(Tabs, {
    width: "md",
    onChange: noop,
    value: 0
  }, null, _ref36);

  var _ref9 = React.createElement(Tabs, {
    width: "md",
    onChange: noop,
    value: 1
  });

  describe('prop: children', () => {
    it('should accept an invalid child', () => {
      const wrapper = shallow(_ref8);
      assert.strictEqual(wrapper.find(Tab).length, 1);
    });
    it('should support empty children', () => {
      const wrapper = mount(_ref9);
      assert.strictEqual(wrapper.find('EventListener').length, 1);
    });
  });

  var _ref10 = React.createElement(Tabs, {
    width: "md",
    onChange: noop,
    value: 1
  }, _ref37, _ref38);

  var _ref11 = React.createElement(Tabs, {
    width: "md",
    onChange: noop,
    value: false
  }, _ref39, _ref40);

  var _ref12 = React.createElement(Tabs, {
    width: "md",
    onChange: noop,
    value: 1
  }, _ref41, _ref42);

  var _ref13 = React.createElement(Tabs, {
    width: "md",
    onChange: noop,
    value: 1
  }, _ref43, _ref44);

  var _ref14 = React.createElement(Tabs, {
    width: "md",
    onChange: noop,
    value: 1
  }, _ref45, _ref46);

  var _ref17 = React.createElement(Tabs, {
    width: "md",
    onChange: noop,
    value: 2
  }, _ref47, _ref48);

  describe('prop: value', () => {
    let wrapper;
    before(() => {
      wrapper = shallow(_ref10);
    });
    after(() => {
      consoleErrorMock.reset();
    });
    it('should pass selected prop to children', () => {
      assert.strictEqual(wrapper.find(Tab).at(0).props().selected, false, 'should have selected to false');
      assert.strictEqual(wrapper.find(Tab).at(1).props().selected, true, 'should have selected');
    });
    it('should switch from the original value', () => {
      wrapper.setProps({
        value: 0
      });
      assert.strictEqual(wrapper.find(Tab).at(0).props().selected, true, 'should have switched to true');
      assert.strictEqual(wrapper.find(Tab).at(1).props().selected, false, 'should have switched to false');
    });
    describe('indicator', () => {
      it('should accept a false value', () => {
        const wrapper2 = mount(_ref11);
        assert.strictEqual(wrapper2.find(TabIndicator).props().style.width, 0);
      });
      it('should work server-side', () => {
        const wrapper2 = shallow(_ref12, {
          disableLifecycleMethods: true
        });
        const indicator = new ShallowWrapper(wrapper2.find(Tab).at(1).props().indicator, wrapper2);
        assert.deepEqual(indicator.props().style, {});
      });
      it('should let the selected <Tab /> render the indicator', () => {
        const wrapper2 = shallow(_ref13, {
          disableLifecycleMethods: true
        });
        assert.strictEqual(wrapper2.find(Tab).at(0).props().indicator, false);
        assert.strictEqual(wrapper2.find(Tab).at(1).props().indicator.type, TabIndicator);
      });
      it('should render the indicator', () => {
        const wrapper2 = mount(_ref14);
        assert.strictEqual(wrapper2.find(Tab).at(0).props().indicator, false);
        assert.strictEqual(wrapper2.find(Tab).at(1).props().indicator, false);
        assert.strictEqual(wrapper2.find(TabIndicator).length, 1);
      });
      it('should update the indicator state no matter what', () => {
        const wrapper2 = mount(React.createElement(TabsNaked, {
          width: "md",
          onChange: noop,
          value: 1,
          classes: {},
          theme: {}
        }, _ref15, _ref16));
        const instance = wrapper2.instance();
        stub(instance, 'scrollSelectedIntoView');
        wrapper2.setState({
          indicatorStyle: {
            left: 10,
            width: 40
          }
        });
        wrapper2.setProps({
          value: 0
        });
        assert.strictEqual(instance.scrollSelectedIntoView.callCount >= 2, true, 'should have called scrollSelectedIntoView');
      });
    });
    it('should warn when the value is invalid', () => {
      consoleErrorMock.spy();
      mount(_ref17);
      assert.strictEqual(consoleErrorMock.callCount(), 3);
      assert.strictEqual(consoleErrorMock.args()[0][0], 'Warning: Material-UI: the value provided `2` is invalid');
    });
  });
  describe('prop: onChange', () => {
    it('should call onChange when clicking', () => {
      const handleChange = spy(); // use mount to ensure that click event on Tab can be fired

      const wrapper = mount(React.createElement(Tabs, {
        width: "md",
        value: 0,
        onChange: handleChange
      }, _ref18, _ref19));
      wrapper.find(Tab).at(1).simulate('click');
      wrapper.setProps({
        value: 1
      });
      assert.strictEqual(handleChange.callCount, 1, 'should have been called once');
      assert.strictEqual(handleChange.args[0][1], 1, 'should have been called with value 1');
      wrapper.unmount();
    });
  });

  var _ref20 = React.createElement(Tabs, {
    width: "md",
    onChange: noop,
    value: 0,
    scrollable: true
  }, _ref49, _ref50);

  var _ref21 = React.createElement(Tabs, {
    width: "md",
    onChange: noop,
    value: 0,
    scrollable: true
  }, _ref51, _ref52);

  describe('prop: scrollable', () => {
    let clock;
    let wrapper;
    before(() => {
      clock = useFakeTimers();
      wrapper = shallow(_ref20);
    });
    after(() => {
      clock.restore();
    });
    it('should render with the scrollable class', () => {
      const selector = `.${classes.scroller}.${classes.scrollable}`;
      assert.strictEqual(wrapper.find(selector).is('div'), true, 'should be a div');
      assert.strictEqual(wrapper.find(selector).length, 1, 'should only be one');
    });
    it('should response to scroll events', () => {
      const instance = wrapper.instance();
      instance.tabs = _objectSpread({
        scrollLeft: 100
      }, fakeTabs);
      spy(instance, 'updateScrollButtonState');
      const selector = `.${classes.scroller}.${classes.scrollable}`;
      wrapper.find(selector).simulate('scroll');
      clock.tick(166);
      assert.strictEqual(instance.updateScrollButtonState.called, true, 'should have called updateScrollButtonState');
    });
    it('should get a scrollbar size listener', () => {
      // use mount to ensure that handleScrollbarSizeChange gets covered
      const mountWrapper = mount(_ref21);
      assert.strictEqual(mountWrapper.find('ScrollbarSize').length, 1, 'should be one');
      mountWrapper.unmount();
    });
  });

  var _ref22 = React.createElement(Tabs, {
    width: "md",
    onChange: noop,
    value: 0
  }, _ref53, _ref54);

  describe('prop: !scrollable', () => {
    it('should not render with the scrollable class', () => {
      const wrapper = shallow(_ref22);
      const baseSelector = `.${classes.scroller}`;
      const selector = `.${classes.scroller}.${classes.scrollable}`;
      assert.strictEqual(wrapper.find(baseSelector).length, 1, 'base selector should exist');
      assert.strictEqual(wrapper.find(selector).length, 0, 'scrolling selector should not exist');
    });
  });

  var _ref23 = React.createElement(Tabs, {
    width: "md",
    onChange: noop,
    value: 0,
    scrollable: true,
    scrollButtons: "on"
  }, _ref55, _ref56);

  var _ref24 = React.createElement(Tabs, {
    width: "md",
    onChange: noop,
    value: 0,
    scrollable: true,
    scrollButtons: "auto"
  }, _ref57, _ref58);

  var _ref25 = React.createElement(Tabs, {
    width: "sm",
    onChange: noop,
    value: 0,
    scrollable: true,
    scrollButtons: "auto"
  }, _ref59, _ref60);

  var _ref26 = React.createElement(Tabs, {
    width: "md",
    onChange: noop,
    value: 0,
    scrollable: true,
    scrollButtons: "on"
  }, _ref61, _ref62);

  var _ref27 = React.createElement(Tabs, {
    width: "md",
    onChange: noop,
    value: 0,
    scrollable: true,
    scrollButtons: "on"
  }, _ref63, _ref64);

  describe('prop: scrollButtons', () => {
    let clock;
    before(() => {
      clock = useFakeTimers();
    });
    after(() => {
      clock.restore();
    });
    it('should render scroll buttons', () => {
      const wrapper = shallow(_ref23);
      assert.strictEqual(wrapper.find(TabScrollButton).length, 2, 'should be two');
    });
    it('should render scroll buttons automatically', () => {
      const wrapper = shallow(_ref24);
      assert.strictEqual(wrapper.find(TabScrollButton).length, 2, 'should be two');
    });
    it('should should not render scroll buttons automatically', () => {
      const wrapper = shallow(_ref25);
      assert.strictEqual(wrapper.find(TabScrollButton).length, 2, 'should be zero');
      assert.strictEqual(wrapper.find(TabScrollButton).everyWhere(node => node.hasClass(classes.scrollButtonsAuto)), true);
    });
    it('should handle window resize event', () => {
      const wrapper = shallow(_ref26);
      const instance = wrapper.instance();
      stub(instance, 'updateScrollButtonState');
      stub(instance, 'updateIndicatorState');
      wrapper.find('EventListener').at(0).simulate('resize');
      clock.tick(166);
      assert.strictEqual(instance.updateScrollButtonState.called, true, 'should have called updateScrollButtonState');
      assert.strictEqual(instance.updateIndicatorState.called, true, 'should have called updateIndicatorState');
    });
    describe('scroll button visibility states', () => {
      let wrapper;
      let instance;
      before(() => {
        wrapper = shallow(_ref27);
        instance = wrapper.instance();
      });
      it('should set neither left nor right scroll button state', () => {
        instance.tabs = _objectSpread({
          scrollLeft: 0,
          scrollWidth: 90,
          clientWidth: 100
        }, fakeTabs);
        instance.updateScrollButtonState();
        assert.strictEqual(wrapper.state().showLeftScroll, false, 'left scroll should be false');
        assert.strictEqual(wrapper.state().showRightScroll, false, 'right scroll should be false');
      });
      it('should set only left scroll button state', () => {
        instance.tabs = _objectSpread({
          scrollLeft: 1
        }, fakeTabs);
        instance.updateScrollButtonState();
        assert.strictEqual(wrapper.state().showLeftScroll, true, 'left scroll should be true');
        assert.strictEqual(wrapper.state().showRightScroll, false, 'right scroll should be false');
      });
      it('should set only right scroll button state', () => {
        instance.tabs = _objectSpread({
          scrollLeft: 0,
          scrollWidth: 110,
          clientWidth: 100
        }, fakeTabs);
        instance.updateScrollButtonState();
        assert.strictEqual(wrapper.state().showLeftScroll, false, 'left scroll should be false');
        assert.strictEqual(wrapper.state().showRightScroll, true, 'right scroll should be true');
      });
      it('should set both left and right scroll button state', () => {
        instance.tabs = _objectSpread({
          scrollLeft: 1,
          scrollWidth: 110,
          clientWidth: 100
        }, fakeTabs);
        instance.updateScrollButtonState();
        assert.strictEqual(wrapper.state().showLeftScroll, true, 'left scroll should be true');
        assert.strictEqual(wrapper.state().showRightScroll, true, 'right scroll should be true');
      });
    });
  });

  var _ref28 = React.createElement(Tabs, {
    width: "md",
    onChange: noop,
    value: 0,
    scrollable: true,
    scrollButtons: "on"
  }, _ref65, _ref66);

  describe('scroll button behavior', () => {
    let instance;
    let wrapper;
    let scrollSpy;
    const dimensions = {
      scrollLeft: 100,
      clientWidth: 200,
      scrollWidth: 1000
    };
    before(() => {
      wrapper = shallow(_ref28);
      instance = wrapper.instance();
      instance.tabs = dimensions;
      scrollSpy = spy(instance, 'moveTabsScroll');
    });
    it('should call moveTabsScroll', () => {
      wrapper.find(TabScrollButton).at(0).simulate('click');
      assert.strictEqual(scrollSpy.args[0][0], -dimensions.clientWidth, `should be called with -${dimensions.clientWidth}`);
      wrapper.find(TabScrollButton).at(1).simulate('click');
      assert.strictEqual(scrollSpy.args[1][0], dimensions.clientWidth, `should be called with ${dimensions.clientWidth}`);
    });
  });

  var _ref29 = React.createElement(Tabs, {
    width: "md",
    onChange: noop,
    value: 0,
    scrollable: true
  }, _ref67, _ref68);

  describe('scroll into view behavior', () => {
    let scrollStub;
    let instance;
    let metaStub;
    beforeEach(() => {
      scrollStub = stub(scroll, 'left');
      const wrapper = shallow(_ref29);
      instance = wrapper.instance();
      metaStub = stub(instance, 'getTabsMeta');
    });
    afterEach(() => {
      scroll.left.restore();
    });
    it('should scroll left tab into view', () => {
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
      assert.strictEqual(scrollStub.args[0][1], 0, 'should scroll to 0 position');
    });
    it('should scroll right tab into view', () => {
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
      assert.strictEqual(scrollStub.args[0][1], 10, 'should scroll to 10 position');
    });
    it('should support value=false', () => {
      metaStub.returns({
        tabsMeta: {
          left: 0,
          right: 100,
          scrollLeft: 0
        },
        tabMeta: undefined
      });
      instance.scrollSelectedIntoView();
      assert.strictEqual(scrollStub.callCount, 0, 'should not scroll');
    });
  });
});