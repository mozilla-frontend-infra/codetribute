"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _chai = require("chai");

var _testUtils = require("../test-utils");

var _HiddenCss = _interopRequireDefault(require("./HiddenCss"));

var _ref = _react.default.createElement("div", null, "bar");

var Foo = function Foo() {
  return _ref;
};

var _ref2 = _react.default.createElement(_HiddenCss.default, null, _react.default.createElement("div", null));

var _ref3 = _react.default.createElement(_HiddenCss.default, {
  only: "sm"
}, _react.default.createElement("div", {
  className: "foo"
}));

var _ref4 = _react.default.createElement("div", {
  className: "foo"
});

var _ref5 = _react.default.createElement("div", {
  className: "foo"
});

var _ref6 = _react.default.createElement(_HiddenCss.default, {
  mdDown: true
}, _react.default.createElement("div", {
  className: "foo"
}));

var _ref7 = _react.default.createElement(_HiddenCss.default, {
  mdUp: true
}, _react.default.createElement("div", {
  className: "foo"
}));

var _ref8 = _react.default.createElement(_HiddenCss.default, {
  mdUp: true,
  className: "custom"
}, _react.default.createElement("div", {
  className: "foo"
}));

var _ref9 = _react.default.createElement(_HiddenCss.default, {
  mdUp: true
}, "foo");

var _ref10 = _react.default.createElement(_HiddenCss.default, {
  mdUp: true
}, _react.default.createElement(Foo, null));

var _ref11 = _react.default.createElement(_HiddenCss.default, {
  mdUp: true
}, _react.default.createElement(Foo, null), _react.default.createElement(Foo, null), "foo");

describe('<HiddenCss />', function () {
  var shallow;
  var classes;
  before(function () {
    shallow = (0, _testUtils.createShallow)({
      untilSelector: 'div'
    });
    classes = (0, _testUtils.getClasses)(_ref2);
  });
  describe('the generated class names', function () {
    it('should be ok with only', function () {
      var wrapper = shallow(_ref3);

      _chai.assert.strictEqual(wrapper.type(), 'div');

      _chai.assert.strictEqual(wrapper.hasClass(classes.onlySm), true);

      var div = wrapper.childAt(0);

      _chai.assert.strictEqual(div.type(), 'div');

      _chai.assert.strictEqual(div.props().className, 'foo');
    });
    it('should be ok with only as an array', function () {
      var wrapper = shallow(_react.default.createElement(_HiddenCss.default, {
        only: ['xs', 'sm']
      }, _ref4));

      _chai.assert.strictEqual(wrapper.type(), 'div');

      _chai.assert.strictEqual(wrapper.props().className.split(' ')[0], classes.onlyXs);

      _chai.assert.strictEqual(wrapper.props().className.split(' ')[1], classes.onlySm);
    });
    it('should be ok with only as an empty array', function () {
      var wrapper = shallow(_react.default.createElement(_HiddenCss.default, {
        only: []
      }, _ref5));

      _chai.assert.strictEqual(wrapper.type(), 'div');

      _chai.assert.strictEqual(wrapper.props().className, '');
    });
    it('should be ok with mdDown', function () {
      var wrapper = shallow(_ref6);

      _chai.assert.strictEqual(wrapper.hasClass(classes.mdDown), true);
    });
    it('should be ok with mdUp', function () {
      var wrapper = shallow(_ref7);

      _chai.assert.strictEqual(wrapper.hasClass(classes.mdUp), true);
    });
    it('should handle provided className prop', function () {
      var wrapper = shallow(_ref8);

      _chai.assert.strictEqual(wrapper.hasClass('custom'), true);
    });
  });
  describe('prop: children', function () {
    it('should work when text Node', function () {
      var wrapper = shallow(_ref9);

      _chai.assert.strictEqual(wrapper.type(), 'div');

      _chai.assert.strictEqual(wrapper.hasClass(classes.mdUp), true);

      _chai.assert.strictEqual(wrapper.childAt(0).text(), 'foo');
    });
    it('should work when Element', function () {
      var wrapper = shallow(_ref10);

      _chai.assert.strictEqual(wrapper.type(), 'div');

      _chai.assert.strictEqual(wrapper.hasClass(classes.mdUp), true);

      _chai.assert.strictEqual(wrapper.childAt(0).is(Foo), true);
    });
    it('should work when mixed ChildrenArray', function () {
      var wrapper = shallow(_ref11);

      _chai.assert.strictEqual(wrapper.type(), 'div');

      _chai.assert.strictEqual(wrapper.hasClass(classes.mdUp), true);

      _chai.assert.strictEqual(wrapper.childAt(0).is(Foo), true);

      _chai.assert.strictEqual(wrapper.childAt(1).is(Foo), true);

      _chai.assert.strictEqual(wrapper.childAt(2).text(), 'foo');
    });
  });
});