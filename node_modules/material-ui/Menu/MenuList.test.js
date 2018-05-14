"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _chai = require("chai");

var _testUtils = require("../test-utils");

var _MenuList = _interopRequireDefault(require("./MenuList"));

var _ref = _react.default.createElement(_MenuList.default, {
  className: "test-class",
  "data-test": "hi"
});

var _ref2 = _react.default.createElement(_MenuList.default, null, _react.default.createElement("div", null), _react.default.createElement("div", null), null);

describe('<MenuList />', function () {
  var shallow;
  before(function () {
    shallow = (0, _testUtils.createShallow)({
      dive: true,
      disableLifecycleMethods: true
    });
  });
  describe('list node', function () {
    var wrapper;
    before(function () {
      wrapper = shallow(_ref);
    });
    it('should render a List', function () {
      _chai.assert.strictEqual(wrapper.name(), 'List');

      _chai.assert.strictEqual(wrapper.props()['data-test'], 'hi');

      _chai.assert.strictEqual(wrapper.hasClass('test-class'), true);
    });
  });
  describe('prop: children', function () {
    it('should support invalid children', function () {
      var wrapper = shallow(_ref2);

      _chai.assert.strictEqual(wrapper.find('div').length, 2);
    });
  });
});