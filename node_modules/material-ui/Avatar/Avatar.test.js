"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _chai = require("chai");

var _Cancel = _interopRequireDefault(require("../internal/svg-icons/Cancel"));

var _testUtils = require("../test-utils");

var _Avatar = _interopRequireDefault(require("./Avatar"));

var _ref = _react.default.createElement(_Avatar.default, null);

var _ref2 = _react.default.createElement(_Avatar.default, {
  className: "my-avatar",
  src: "something.jpg",
  alt: "Hello World!",
  "data-my-prop": "woofAvatar"
});

var _ref3 = _react.default.createElement(_Avatar.default, {
  className: "my-avatar",
  "data-my-prop": "woofAvatar",
  childrenClassName: "my-children"
}, _react.default.createElement("span", {
  className: "my-icon-font"
}, "icon"));

var _ref4 = _react.default.createElement(_Avatar.default, {
  className: "my-avatar",
  "data-my-prop": "woofAvatar",
  childrenClassName: "my-children"
}, _react.default.createElement(_Cancel.default, null));

var _ref5 = _react.default.createElement(_Avatar.default, {
  className: "my-avatar",
  "data-my-prop": "woofAvatar"
}, "OT");

describe('<Avatar />', function () {
  var shallow;
  var classes;
  before(function () {
    shallow = (0, _testUtils.createShallow)({
      dive: true
    });
    classes = (0, _testUtils.getClasses)(_ref);
  });
  describe('image avatar', function () {
    it('should render a div containing an img', function () {
      var wrapper = shallow(_ref2);

      _chai.assert.strictEqual(wrapper.name(), 'div');

      _chai.assert.strictEqual(wrapper.childAt(0).is('img'), true, 'should be an img');

      _chai.assert.strictEqual(wrapper.hasClass(classes.root), true);

      _chai.assert.strictEqual(wrapper.hasClass('my-avatar'), true);

      _chai.assert.strictEqual(wrapper.prop('data-my-prop'), 'woofAvatar');

      _chai.assert.strictEqual(wrapper.hasClass(classes.colorDefault), false, 'should not apply the colorDefault class for image avatars');

      var img = wrapper.childAt(0);

      _chai.assert.strictEqual(img.hasClass(classes.img), true, 'should add the img class to the img node');

      _chai.assert.strictEqual(img.props().alt, 'Hello World!', 'should apply img props to the img node');

      _chai.assert.strictEqual(img.props().src, 'something.jpg', 'should apply img props to the img node');
    });
    it('should be able to add more properties to the image', function () {
      var onError = function onError() {};

      var wrapper = shallow(_react.default.createElement(_Avatar.default, {
        src: "something.jpg",
        imgProps: {
          onError: onError
        }
      }));

      _chai.assert.strictEqual(wrapper.childAt(0).props().onError, onError);
    });
  });
  describe('font icon avatar', function () {
    var wrapper;
    before(function () {
      wrapper = shallow(_ref3);
    });
    it('should render a div containing an font icon', function () {
      var icon = wrapper.childAt(0);

      _chai.assert.strictEqual(wrapper.name(), 'div');

      _chai.assert.strictEqual(icon.is('span'), true, 'should be a span');

      _chai.assert.strictEqual(icon.hasClass('my-icon-font'), true);

      _chai.assert.strictEqual(icon.text(), 'icon');
    });
    it('should merge user classes & spread custom props to the root node', function () {
      _chai.assert.strictEqual(wrapper.hasClass(classes.root), true);

      _chai.assert.strictEqual(wrapper.hasClass('my-avatar'), true);

      _chai.assert.strictEqual(wrapper.prop('data-my-prop'), 'woofAvatar');
    });
    it('should apply the colorDefault class', function () {
      _chai.assert.strictEqual(wrapper.hasClass(classes.colorDefault), true);
    });
    it('should apply the childrenClassName class', function () {
      _chai.assert.strictEqual(wrapper.childAt(0).hasClass('my-children'), true);
    });
  });
  describe('svg icon avatar', function () {
    var wrapper;
    before(function () {
      wrapper = shallow(_ref4);
    });
    it('should render a div containing an svg icon', function () {
      _chai.assert.strictEqual(wrapper.name(), 'div');

      _chai.assert.strictEqual(wrapper.childAt(0).is('pure(Cancel)'), true, 'should be an svg icon');
    });
    it('should merge user classes & spread custom props to the root node', function () {
      _chai.assert.strictEqual(wrapper.hasClass(classes.root), true);

      _chai.assert.strictEqual(wrapper.hasClass('my-avatar'), true);

      _chai.assert.strictEqual(wrapper.prop('data-my-prop'), 'woofAvatar');
    });
    it('should apply the colorDefault class', function () {
      _chai.assert.strictEqual(wrapper.hasClass(classes.colorDefault), true);
    });
    it('should apply the childrenClassName class', function () {
      _chai.assert.strictEqual(wrapper.childAt(0).hasClass('my-children'), true);
    });
  });
  describe('text avatar', function () {
    var wrapper;
    before(function () {
      wrapper = shallow(_ref5);
    });
    it('should render a div containing a string', function () {
      _chai.assert.strictEqual(wrapper.name(), 'div');

      _chai.assert.strictEqual(wrapper.childAt(0).text(), 'OT');
    });
    it('should merge user classes & spread custom props to the root node', function () {
      _chai.assert.strictEqual(wrapper.hasClass(classes.root), true);

      _chai.assert.strictEqual(wrapper.hasClass('my-avatar'), true);

      _chai.assert.strictEqual(wrapper.prop('data-my-prop'), 'woofAvatar');
    });
    it('should apply the colorDefault class', function () {
      _chai.assert.strictEqual(wrapper.hasClass(classes.colorDefault), true);
    });
  });
});