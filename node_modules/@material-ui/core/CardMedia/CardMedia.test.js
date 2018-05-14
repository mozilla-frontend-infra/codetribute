"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _chai = require("chai");

var _testUtils = require("../test-utils");

var _CardMedia = _interopRequireDefault(require("./CardMedia"));

var _ref = _react.default.createElement(_CardMedia.default, {
  image: "/foo.jpg"
});

var _ref2 = _react.default.createElement(_CardMedia.default, {
  className: "woofCardMedia",
  image: "/foo.jpg"
});

var _ref3 = _react.default.createElement(_CardMedia.default, {
  image: "/foo.jpg"
});

var _ref4 = _react.default.createElement(_CardMedia.default, {
  image: "/foo.jpg",
  "data-my-prop": "woofCardMedia"
});

var _ref5 = _react.default.createElement(_CardMedia.default, {
  image: "/foo.jpg",
  component: "img"
});

var _ref6 = _react.default.createElement(_CardMedia.default, {
  image: "/foo.jpg",
  component: "iframe"
});

var _ref7 = _react.default.createElement(_CardMedia.default, {
  src: "/foo.jpg",
  component: "picture"
});

var _ref8 = _react.default.createElement(_CardMedia.default, {
  image: "/foo.jpg",
  component: "table"
});

describe('<CardMedia />', function () {
  var shallow;
  var classes;
  before(function () {
    shallow = (0, _testUtils.createShallow)({
      untilSelector: 'CardMedia'
    });
    classes = (0, _testUtils.getClasses)(_ref);
  });
  it('should have the root and custom class', function () {
    var wrapper = shallow(_ref2);

    _chai.assert.strictEqual(wrapper.hasClass(classes.root), true);

    _chai.assert.strictEqual(wrapper.hasClass('woofCardMedia'), true);
  });
  it('should have the backgroundImage specified', function () {
    var wrapper = shallow(_ref3);

    _chai.assert.strictEqual(wrapper.prop('style').backgroundImage, 'url("/foo.jpg")');
  });
  it('should spread custom props on the root node', function () {
    var wrapper = shallow(_ref4);

    _chai.assert.strictEqual(wrapper.prop('data-my-prop'), 'woofCardMedia', 'custom prop should be woofCardMedia');
  });
  it('should have backgroundImage specified even though custom styles got passed', function () {
    var wrapper = shallow(_react.default.createElement(_CardMedia.default, {
      image: "/foo.jpg",
      style: {
        height: 200
      }
    }));

    _chai.assert.strictEqual(wrapper.prop('style').backgroundImage, 'url("/foo.jpg")');

    _chai.assert.strictEqual(wrapper.prop('style').height, 200);
  });
  it('should be possible to overwrite backgroundImage via custom styles', function () {
    var wrapper = shallow(_react.default.createElement(_CardMedia.default, {
      image: "/foo.jpg",
      style: {
        backgroundImage: 'url(/bar.jpg)'
      }
    }));

    _chai.assert.strictEqual(wrapper.prop('style').backgroundImage, 'url(/bar.jpg)');
  });
  describe('prop: component', function () {
    it('should render `img` component when `img` specified', function () {
      var wrapper = shallow(_ref5);

      _chai.assert.strictEqual(wrapper.type(), 'img');
    });
    it('should have `src` prop when media component specified', function () {
      var wrapper = shallow(_ref6);

      _chai.assert.strictEqual(wrapper.prop('src'), '/foo.jpg');
    });
    it('should not have default inline style when media component specified', function () {
      var wrapper = shallow(_ref7);

      _chai.assert.strictEqual(wrapper.prop('style'), undefined);
    });
    it('should not have `src` prop if not media component specified', function () {
      var wrapper = shallow(_ref8);

      _chai.assert.strictEqual(wrapper.prop('src'), undefined);
    });
  });
});