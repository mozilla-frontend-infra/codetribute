"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _chai = require("chai");

var _testUtils = require("../test-utils");

var _CardHeader = _interopRequireDefault(require("./CardHeader"));

var _Typography = _interopRequireDefault(require("../Typography"));

var _ref = _react.default.createElement(_CardHeader.default, null);

var _ref2 = _react.default.createElement(_CardHeader.default, null);

var _ref3 = _react.default.createElement(_CardHeader.default, null);

var _ref4 = _react.default.createElement(_CardHeader.default, {
  title: "Title",
  subheader: "Subheader"
});

var _ref5 = _react.default.createElement("span", null);

describe('<CardHeader />', function () {
  var shallow;
  var classes;
  before(function () {
    shallow = (0, _testUtils.createShallow)({
      untilSelector: 'div'
    });
    classes = (0, _testUtils.getClasses)(_ref);
  });
  it('should render CardContent', function () {
    var wrapper = shallow(_ref2);

    _chai.assert.strictEqual(wrapper.name(), 'div');
  });
  it('should have the root class', function () {
    var wrapper = shallow(_ref3);

    _chai.assert.strictEqual(wrapper.hasClass(classes.root), true);
  });
  describe('with custom styles', function () {
    var wrapper;
    var extraClasses;
    beforeEach(function () {
      extraClasses = {
        title: 'foo',
        subheader: 'bar'
      };
      wrapper = shallow(_react.default.createElement(_CardHeader.default, {
        title: "Title",
        subheader: "Subheader",
        classes: {
          title: extraClasses.title,
          subheader: extraClasses.subheader
        }
      })).childAt(0);
    });
    it('should render with the title class', function () {
      var title = wrapper.childAt(0);

      _chai.assert.strictEqual(title.hasClass(extraClasses.title), true);
    });
    it('should render with the subheader class', function () {
      var subheader = wrapper.childAt(1);

      _chai.assert.strictEqual(subheader.hasClass(extraClasses.subheader), true);
    });
  });
  describe('without an avatar', function () {
    var wrapper;
    beforeEach(function () {
      wrapper = shallow(_ref4).childAt(0);
    });
    it('should render the title as headline text', function () {
      var title = wrapper.childAt(0);

      _chai.assert.strictEqual(title.type(), _Typography.default);

      _chai.assert.strictEqual(title.props().variant, 'headline');
    });
    it('should render the subheader as body1 secondary text', function () {
      var subheader = wrapper.childAt(1);

      _chai.assert.strictEqual(subheader.type(), _Typography.default);

      _chai.assert.strictEqual(subheader.props().variant, 'body1');

      _chai.assert.strictEqual(subheader.props().color, 'textSecondary');
    });
    it('should not render the subheader if none is given', function () {
      var title = wrapper.childAt(0);

      _chai.assert.strictEqual(title.type(), _Typography.default);

      _chai.assert.strictEqual(wrapper.length, 1);
    });
  });
  describe('with an avatar', function () {
    var wrapper;
    var avatar;

    var _ref6 = _react.default.createElement(_CardHeader.default, {
      avatar: avatar,
      title: "Title",
      subheader: "Subhead"
    });

    beforeEach(function () {
      avatar = _ref5;
      wrapper = shallow(_ref6);
    });
    it('should render the avatar inside the first child', function () {
      var container = wrapper.childAt(0);

      _chai.assert.strictEqual(container.is('div'), true);

      _chai.assert.strictEqual(container.hasClass(classes.avatar), true);

      _chai.assert.strictEqual(container.childAt(0).equals(avatar), true);
    });
    it('should render the title as body2 text inside the second child', function () {
      var container = wrapper.childAt(1);

      _chai.assert.strictEqual(container.hasClass(classes.content), true, 'should have the content class');

      var title = container.childAt(0);

      _chai.assert.strictEqual(title.type(), _Typography.default);

      _chai.assert.strictEqual(title.props().variant, 'body2');
    });
    it('should render the subeader as body2 secondary text inside the second child', function () {
      var container = wrapper.childAt(1);

      _chai.assert.strictEqual(container.hasClass(classes.content), true, 'should have the content class');

      var subheader = container.childAt(1);

      _chai.assert.strictEqual(subheader.type(), _Typography.default);

      _chai.assert.strictEqual(subheader.props().variant, 'body2');

      _chai.assert.strictEqual(subheader.props().color, 'textSecondary');
    });
  });
});