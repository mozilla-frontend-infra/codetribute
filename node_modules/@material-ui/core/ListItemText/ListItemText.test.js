"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _chai = require("chai");

var _testUtils = require("../test-utils");

var _Typography = _interopRequireDefault(require("../Typography"));

var _ListItemText = _interopRequireDefault(require("./ListItemText"));

var _ref = _react.default.createElement(_ListItemText.default, null);

var _ref2 = _react.default.createElement(_ListItemText.default, null);

var _ref3 = _react.default.createElement(_ListItemText.default, {
  className: "woofListItemText"
});

var _ref4 = _react.default.createElement(_ListItemText.default, {
  inset: true
});

var _ref5 = _react.default.createElement(_ListItemText.default, null);

var _ref6 = _react.default.createElement(_ListItemText.default, {
  primary: "This is the primary text"
});

var _ref7 = _react.default.createElement("span", null);

var _ref8 = _react.default.createElement("span", null);

var _ref9 = _react.default.createElement(_ListItemText.default, {
  secondary: "This is the secondary text"
});

var _ref10 = _react.default.createElement("span", null);

var _ref11 = _react.default.createElement(_ListItemText.default, {
  primary: "This is the primary text",
  secondary: "This is the secondary text"
});

var _ref12 = _react.default.createElement("p", {
  className: "test"
}, "This is the primary text");

var _ref13 = _react.default.createElement("p", {
  className: "test"
}, "This is the secondary text");

var _ref14 = _react.default.createElement(_ListItemText.default, {
  primary: "This is the primary text",
  secondary: "This is the secondary text"
});

describe('<ListItemText />', function () {
  var shallow;
  var classes;
  before(function () {
    shallow = (0, _testUtils.createShallow)({
      dive: true
    });
    classes = (0, _testUtils.getClasses)(_ref);
  });
  it('should render a div', function () {
    var wrapper = shallow(_ref2);

    _chai.assert.strictEqual(wrapper.name(), 'div');

    _chai.assert.strictEqual(wrapper.hasClass(classes.root), true);
  });
  it('should render with the user and root classes', function () {
    var wrapper = shallow(_ref3);

    _chai.assert.strictEqual(wrapper.hasClass('woofListItemText'), true);

    _chai.assert.strictEqual(wrapper.hasClass(classes.root), true);
  });
  it('should render with inset class', function () {
    var wrapper = shallow(_ref4);

    _chai.assert.strictEqual(wrapper.hasClass(classes.inset), true, 'should have the inset class');

    _chai.assert.strictEqual(wrapper.hasClass(classes.root), true);
  });
  it('should render with no children', function () {
    var wrapper = shallow(_ref5);

    _chai.assert.strictEqual(wrapper.children().length, 0, 'should have no children');
  });
  describe('prop: primary', function () {
    it('should render primary text', function () {
      var wrapper = shallow(_ref6);

      _chai.assert.strictEqual(wrapper.children().length, 1, 'should have 1 child');

      _chai.assert.strictEqual(wrapper.childAt(0).type(), _Typography.default);

      _chai.assert.strictEqual(wrapper.childAt(0).props().variant, 'subheading');

      _chai.assert.strictEqual(wrapper.childAt(0).children().equals('This is the primary text'), true, 'should have the primary text');
    });
    it('should use the primary node', function () {
      var primary = _ref7;
      var wrapper = shallow(_react.default.createElement(_ListItemText.default, {
        primary: primary
      }));

      _chai.assert.strictEqual(wrapper.contains(primary), true, 'should find the node');
    });
    it('should use the children prop as primary node', function () {
      var primary = _ref8;
      var wrapper = shallow(_react.default.createElement(_ListItemText.default, null, primary));

      _chai.assert.strictEqual(wrapper.contains(primary), true, 'should find the node');
    });
  });
  describe('prop: secondary', function () {
    it('should render secondary text', function () {
      var wrapper = shallow(_ref9);

      _chai.assert.strictEqual(wrapper.children().length, 1, 'should have 1 child');

      _chai.assert.strictEqual(wrapper.childAt(0).type(), _Typography.default);

      _chai.assert.strictEqual(wrapper.childAt(0).props().variant, 'body1');

      _chai.assert.strictEqual(wrapper.childAt(0).props().color, 'textSecondary', 'should have the text secondary property');

      _chai.assert.strictEqual(wrapper.childAt(0).children().equals('This is the secondary text'), true, 'should have the secondary text');
    });
    it('should use the secondary node', function () {
      var secondary = _ref10;
      var wrapper = shallow(_react.default.createElement(_ListItemText.default, {
        secondary: secondary
      }));

      _chai.assert.strictEqual(wrapper.contains(secondary), true, 'should find the node');
    });
  });
  describe('prop: disableTypography', function () {
    it('should wrap children in `<Typography/>` by default', function () {
      var wrapper = shallow(_ref11);

      _chai.assert.strictEqual(wrapper.children().length, 2, 'should have 2 children');

      _chai.assert.strictEqual(wrapper.childAt(0).type(), _Typography.default);

      _chai.assert.strictEqual(wrapper.childAt(0).props().variant, 'subheading');

      _chai.assert.strictEqual(wrapper.childAt(0).children().equals('This is the primary text'), true, 'should have the primary text');

      _chai.assert.strictEqual(wrapper.childAt(1).type(), _Typography.default);

      _chai.assert.strictEqual(wrapper.childAt(1).props().variant, 'body1');

      _chai.assert.strictEqual(wrapper.childAt(1).props().color, 'textSecondary');

      _chai.assert.strictEqual(wrapper.childAt(1).children().equals('This is the secondary text'), true, 'should have the secondary text');
    });
    it('should render JSX children', function () {
      var primaryChild = _ref12;
      var secondaryChild = _ref13;
      var wrapper = shallow(_react.default.createElement(_ListItemText.default, {
        primary: primaryChild,
        secondary: secondaryChild,
        disableTypography: true
      }));

      _chai.assert.strictEqual(wrapper.childAt(0).equals(primaryChild), true);

      _chai.assert.strictEqual(wrapper.childAt(1).equals(secondaryChild), true);
    });
  });
  it('should render primary and secondary text', function () {
    var wrapper = shallow(_ref14);

    _chai.assert.strictEqual(wrapper.children().length, 2, 'should have 2 children');

    _chai.assert.strictEqual(wrapper.childAt(0).type(), _Typography.default);

    _chai.assert.strictEqual(wrapper.childAt(0).props().variant, 'subheading');

    _chai.assert.strictEqual(wrapper.childAt(0).children().equals('This is the primary text'), true, 'should have the primary text');

    _chai.assert.strictEqual(wrapper.childAt(1).type(), _Typography.default);

    _chai.assert.strictEqual(wrapper.childAt(1).props().variant, 'body1');

    _chai.assert.strictEqual(wrapper.childAt(1).props().color, 'textSecondary');

    _chai.assert.strictEqual(wrapper.childAt(1).children().equals('This is the secondary text'), true, 'should have the secondary text');
  });
  it('should render primary and secondary text with customisable classes', function () {
    var textClasses = {
      primary: 'GeneralText',
      secondary: 'SecondaryText'
    };
    var wrapper = shallow(_react.default.createElement(_ListItemText.default, {
      primary: "This is the primary text",
      secondary: "This is the secondary text",
      classes: textClasses
    }));

    _chai.assert.strictEqual(wrapper.childAt(0).props().className.includes('GeneralText'), true, 'should have the primary text class');

    _chai.assert.strictEqual(wrapper.childAt(1).props().className.includes('SecondaryText'), true, 'should have the secondary text class');
  });
});