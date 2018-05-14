"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _chai = require("chai");

var _testUtils = require("../test-utils");

var _Slide = _interopRequireDefault(require("../transitions/Slide"));

var _createMuiTheme = _interopRequireDefault(require("../styles/createMuiTheme"));

var _Paper = _interopRequireDefault(require("../Paper"));

var _Modal = _interopRequireDefault(require("../Modal"));

var _Drawer = _interopRequireWildcard(require("./Drawer"));

var _ref = _react.default.createElement(_Drawer.default, null, _react.default.createElement("div", null));

var _ref2 = _react.default.createElement(_Drawer.default, null, _react.default.createElement("div", null));

var _ref3 = _react.default.createElement(_Drawer.default, null, _react.default.createElement("div", null));

var _ref6 = _react.default.createElement("div", null);

var _ref7 = _react.default.createElement("div", null);

var _ref8 = _react.default.createElement("div", null);

var _ref9 = _react.default.createElement(_Drawer.default, {
  className: "woofDrawer",
  variant: "temporary"
}, _react.default.createElement("h1", null, "Hello"));

var _ref10 = _react.default.createElement("h1", null, "Hello");

var _ref11 = _react.default.createElement(_Drawer.default, null, _react.default.createElement("h1", null, "Hello"));

var _ref12 = _react.default.createElement(_Drawer.default, null, _react.default.createElement("h1", null, "Hello"));

var _ref13 = _react.default.createElement(_Drawer.default, {
  variant: "persistent"
}, _react.default.createElement("h1", null, "Hello"));

var _ref14 = _react.default.createElement(_Drawer.default, {
  variant: "permanent"
}, _react.default.createElement("h1", null, "Hello"));

var _ref15 = _react.default.createElement(_Drawer.default, null, _react.default.createElement("div", null));

var _ref16 = _react.default.createElement("div", null);

describe('<Drawer />', function () {
  var shallow;
  var classes;
  before(function () {
    shallow = (0, _testUtils.createShallow)({
      dive: true
    });
    classes = (0, _testUtils.getClasses)(_ref);
  });
  describe('prop: variant=temporary', function () {
    it('should render a Modal', function () {
      var wrapper = shallow(_ref2);

      _chai.assert.strictEqual(wrapper.type(), _Modal.default);
    });
    it('should render Slide > Paper inside the Modal', function () {
      var wrapper = shallow(_ref3);
      var slide = wrapper.childAt(0);

      _chai.assert.strictEqual(slide.length === 1 && slide.is(_Slide.default), true, 'immediate wrapper child should be Slide');

      var paper = slide.childAt(0);

      _chai.assert.strictEqual(paper.length === 1 && paper.type(), _Paper.default);

      _chai.assert.strictEqual(paper.hasClass(classes.paper), true, 'should have the paper class');
    });
    describe('transitionDuration property', function () {
      var transitionDuration = {
        enter: 854,
        exit: 2967
      };

      var _ref4 = _react.default.createElement(_Drawer.default, {
        transitionDuration: transitionDuration
      }, _ref6);

      it('should be passed to Slide', function () {
        var wrapper = shallow(_ref4);

        _chai.assert.strictEqual(wrapper.find(_Slide.default).props().timeout, transitionDuration);
      });

      var _ref5 = _react.default.createElement(_Drawer.default, {
        open: true,
        transitionDuration: transitionDuration
      }, _ref7);

      it("should be passed to to Modal's BackdropTransitionDuration when open=true", function () {
        var wrapper = shallow(_ref5);

        _chai.assert.strictEqual(wrapper.find(_Modal.default).props().BackdropProps.transitionDuration, transitionDuration);
      });
    });
    it("should override Modal's BackdropTransitionDuration from property when specified", function () {
      var testDuration = 335;
      var wrapper = shallow(_react.default.createElement(_Drawer.default, {
        BackdropTransitionDuration: testDuration
      }, _ref8));

      _chai.assert.strictEqual(wrapper.find(_Modal.default).props().BackdropTransitionDuration, testDuration);
    });
    it('should set the custom className for Modal when variant is temporary', function () {
      var wrapper = shallow(_ref9);
      var modal = wrapper.find(_Modal.default);

      _chai.assert.strictEqual(modal.hasClass('woofDrawer'), true, 'should have the woofDrawer class');
    });
    it('should set the Paper className', function () {
      var wrapper = shallow(_react.default.createElement(_Drawer.default, {
        classes: {
          paper: 'woofDrawer'
        }
      }, _ref10));
      var paper = wrapper.find(_Paper.default);

      _chai.assert.strictEqual(paper.hasClass(classes.paper), true, 'should have the paper class');

      _chai.assert.strictEqual(paper.hasClass('woofDrawer'), true, 'should have the woofDrawer class');
    });
    it('should be closed by default', function () {
      var wrapper = shallow(_ref11);
      var modal = wrapper;
      var slide = modal.find(_Slide.default);

      _chai.assert.strictEqual(modal.props().open, false, 'should not show the modal');

      _chai.assert.strictEqual(slide.props().in, false, 'should not transition in');
    });
    describe('opening and closing', function () {
      var wrapper;
      before(function () {
        wrapper = shallow(_ref12);
        wrapper.update();
      });
      it('should start closed', function () {
        _chai.assert.strictEqual(wrapper.props().open, false, 'should not show the modal');

        _chai.assert.strictEqual(wrapper.find(_Slide.default).props().in, false, 'should not transition in');
      });
      it('should open', function () {
        wrapper.setProps({
          open: true
        });

        _chai.assert.strictEqual(wrapper.props().open, true, 'should show the modal');

        _chai.assert.strictEqual(wrapper.find(_Slide.default).props().in, true, 'should transition in');
      });
      it('should close', function () {
        wrapper.setProps({
          open: false
        });

        _chai.assert.strictEqual(wrapper.props().open, false, 'should not show the modal');

        _chai.assert.strictEqual(wrapper.find(_Slide.default).props().in, false, 'should not transition in');
      });
    });
  });
  describe('prop: variant=persistent', function () {
    var wrapper;
    before(function () {
      wrapper = shallow(_ref13);
    });
    it('should render a div instead of a Modal when persistent', function () {
      _chai.assert.strictEqual(wrapper.name(), 'div');

      _chai.assert.strictEqual(wrapper.hasClass(classes.docked), true, 'should have the docked class');
    });
    it('should render Slide > Paper inside the div', function () {
      var slide = wrapper.childAt(0);

      _chai.assert.strictEqual(slide.length, 1);

      _chai.assert.strictEqual(slide.type(), _Slide.default);

      var paper = slide.childAt(0);

      _chai.assert.strictEqual(paper.length === 1 && paper.type(), _Paper.default);
    });
  });
  describe('prop: variant=permanent', function () {
    var wrapper;
    before(function () {
      wrapper = shallow(_ref14);
    });
    it('should render a div instead of a Modal when permanent', function () {
      _chai.assert.strictEqual(wrapper.name(), 'div');

      _chai.assert.strictEqual(wrapper.hasClass(classes.docked), true, 'should have the docked class');
    });
    it('should render div > Paper inside the div', function () {
      var slide = wrapper;

      _chai.assert.strictEqual(slide.length, 1);

      _chai.assert.strictEqual(slide.name(), 'div');

      var paper = slide.childAt(0);

      _chai.assert.strictEqual(paper.length === 1 && paper.type(), _Paper.default);
    });
  });
  describe('slide direction', function () {
    var wrapper;
    before(function () {
      wrapper = shallow(_ref15);
    });
    it('should return the opposing slide direction', function () {
      wrapper.setProps({
        anchor: 'left'
      });

      _chai.assert.strictEqual(wrapper.find(_Slide.default).props().direction, 'right');

      wrapper.setProps({
        anchor: 'right'
      });

      _chai.assert.strictEqual(wrapper.find(_Slide.default).props().direction, 'left');

      wrapper.setProps({
        anchor: 'top'
      });

      _chai.assert.strictEqual(wrapper.find(_Slide.default).props().direction, 'down');

      wrapper.setProps({
        anchor: 'bottom'
      });

      _chai.assert.strictEqual(wrapper.find(_Slide.default).props().direction, 'up');
    });
  });
  describe('Right To Left', function () {
    var wrapper;
    before(function () {
      var theme = (0, _createMuiTheme.default)({
        direction: 'rtl'
      });
      wrapper = shallow(_react.default.createElement(_Drawer.default, {
        theme: theme
      }, _ref16));
    });
    it('should switch left and right anchor when theme is right-to-left', function () {
      wrapper.setProps({
        anchor: 'left'
      }); // slide direction for left is right, if left is switched to right, we should get left

      _chai.assert.strictEqual(wrapper.find(_Slide.default).props().direction, 'left');

      wrapper.setProps({
        anchor: 'right'
      }); // slide direction for right is left, if right is switched to left, we should get right

      _chai.assert.strictEqual(wrapper.find(_Slide.default).props().direction, 'right');
    });
  });
});
describe('isHorizontal', function () {
  it('should recognize left and right as horizontal swiping directions', function () {
    _chai.assert.strictEqual((0, _Drawer.isHorizontal)({
      anchor: 'left'
    }), true);

    _chai.assert.strictEqual((0, _Drawer.isHorizontal)({
      anchor: 'right'
    }), true);

    _chai.assert.strictEqual((0, _Drawer.isHorizontal)({
      anchor: 'top'
    }), false);

    _chai.assert.strictEqual((0, _Drawer.isHorizontal)({
      anchor: 'bottom'
    }), false);
  });
});
describe('getAnchor', function () {
  it('should return the anchor', function () {
    var theme = (0, _createMuiTheme.default)({
      direction: 'ltr'
    });

    _chai.assert.strictEqual((0, _Drawer.getAnchor)({
      anchor: 'left',
      theme: theme
    }), 'left');

    _chai.assert.strictEqual((0, _Drawer.getAnchor)({
      anchor: 'right',
      theme: theme
    }), 'right');

    _chai.assert.strictEqual((0, _Drawer.getAnchor)({
      anchor: 'top',
      theme: theme
    }), 'top');

    _chai.assert.strictEqual((0, _Drawer.getAnchor)({
      anchor: 'bottom',
      theme: theme
    }), 'bottom');
  });
  it('should switch left/right if RTL is enabled', function () {
    var theme = (0, _createMuiTheme.default)({
      direction: 'rtl'
    });

    _chai.assert.strictEqual((0, _Drawer.getAnchor)({
      anchor: 'left',
      theme: theme
    }), 'right');

    _chai.assert.strictEqual((0, _Drawer.getAnchor)({
      anchor: 'right',
      theme: theme
    }), 'left');
  });
});