"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _keys = _interopRequireDefault(require("@babel/runtime/core-js/object/keys"));

var _react = _interopRequireDefault(require("react"));

var _chai = require("chai");

var _testUtils = require("../test-utils");

var _Hidden = _interopRequireDefault(require("../Hidden"));

var _Grid = _interopRequireDefault(require("./Grid"));

var _ref = _react.default.createElement(_Grid.default, null);

var _ref2 = _react.default.createElement(_Grid.default, {
  className: "woofGrid"
});

var _ref3 = _react.default.createElement(_Grid.default, {
  container: true
});

var _ref4 = _react.default.createElement(_Grid.default, {
  item: true
});

var _ref5 = _react.default.createElement(_Grid.default, {
  component: "span"
});

var _ref6 = _react.default.createElement(_Grid.default, {
  item: true,
  xs: true
});

var _ref7 = _react.default.createElement(_Grid.default, {
  item: true,
  xs: 3
});

var _ref8 = _react.default.createElement(_Grid.default, {
  container: true,
  spacing: 8
});

var _ref9 = _react.default.createElement(_Grid.default, {
  alignItems: "center",
  container: true
});

var _ref10 = _react.default.createElement(_Grid.default, {
  alignContent: "center",
  container: true
});

describe('<Grid />', function () {
  var shallow;
  var classes;
  before(function () {
    var shallowInner = (0, _testUtils.createShallow)({
      dive: true
    }); // Render deeper to bypass the GridWrapper.

    shallow = function shallow(node) {
      return shallowInner(node).find('Grid').shallow({
        context: shallowInner.context
      });
    };

    classes = (0, _testUtils.getClasses)(_ref);
  });
  it('should render', function () {
    var wrapper = shallow(_ref2);

    _chai.assert.strictEqual(wrapper.name(), 'div');

    _chai.assert.strictEqual(wrapper.hasClass('woofGrid'), true, 'should have the user class');
  });
  describe('prop: container', function () {
    it('should apply the container class', function () {
      var wrapper = shallow(_ref3);

      _chai.assert.strictEqual(wrapper.hasClass(classes.container), true);
    });
  });
  describe('prop: item', function () {
    it('should apply the item class', function () {
      var wrapper = shallow(_ref4);

      _chai.assert.strictEqual(wrapper.hasClass(classes.item), true);
    });
  });
  describe('prop: component', function () {
    it('should change the component', function () {
      var wrapper = shallow(_ref5);

      _chai.assert.strictEqual(wrapper.name(), 'span');
    });
  });
  describe('prop: xs', function () {
    it('should apply the flex-grow class', function () {
      var wrapper = shallow(_ref6);

      _chai.assert.strictEqual(wrapper.hasClass(classes['grid-xs']), true);
    });
    it('should apply the flex size class', function () {
      var wrapper = shallow(_ref7);

      _chai.assert.strictEqual(wrapper.hasClass(classes['grid-xs-3']), true);
    });
  });
  describe('prop: spacing', function () {
    it('should have a spacing', function () {
      var wrapper = shallow(_ref8);

      _chai.assert.strictEqual(wrapper.hasClass(classes['spacing-xs-8']), true);
    });
  });
  describe('prop: alignItems', function () {
    it('should apply the align-item class', function () {
      var wrapper = shallow(_ref9);

      _chai.assert.strictEqual(wrapper.hasClass(classes['align-items-xs-center']), true);
    });
  });
  describe('prop: alignContent', function () {
    it('should apply the align-content class', function () {
      var wrapper = shallow(_ref10);

      _chai.assert.strictEqual(wrapper.hasClass(classes['align-content-xs-center']), true);
    });
  });
  describe('prop: other', function () {
    it('should spread the other properties to the root element', function () {
      var handleClick = function handleClick() {};

      var wrapper = shallow(_react.default.createElement(_Grid.default, {
        component: "span",
        onClick: handleClick
      }));

      _chai.assert.strictEqual(wrapper.props().onClick, handleClick);
    });
  });
  describe('hidden', function () {
    var hiddenProps = {
      onlyHidden: 'xs',
      xsUpHidden: true,
      smUpHidden: true,
      mdUpHidden: true,
      lgUpHidden: true,
      xlUpHidden: true,
      xsDownHidden: true,
      smDownHidden: true,
      mdDownHidden: true,
      lgDownHidden: true,
      xlDownHidden: true
    };
    (0, _keys.default)(hiddenProps).forEach(function (key) {
      var value = hiddenProps[key];
      it("should render ".concat(key, " with Hidden"), function () {
        var wrapper = shallow(_react.default.createElement(_Grid.default, {
          hidden: (0, _defineProperty2.default)({}, key, value)
        }));

        _chai.assert.strictEqual(wrapper.type(), _Hidden.default);
      });
    });
  });
});