"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _chai = require("chai");

var _testUtils = require("../test-utils");

var _ListSubheader = _interopRequireDefault(require("./ListSubheader"));

var _List = _interopRequireDefault(require("./List"));

var _ref = _react.default.createElement(_List.default, null);

var _ref2 = _react.default.createElement(_List.default, {
  component: "div"
});

var _ref3 = _react.default.createElement(_List.default, null);

var _ref4 = _react.default.createElement(_List.default, {
  className: "woofList"
});

var _ref5 = _react.default.createElement(_List.default, {
  disablePadding: true
});

var _ref6 = _react.default.createElement(_List.default, {
  subheader: _react.default.createElement(_ListSubheader.default, null, "Title")
});

var _ref7 = _react.default.createElement(_List.default, {
  subheader: _react.default.createElement(_ListSubheader.default, null, "Title")
});

var _ref8 = _react.default.createElement(_List.default, null);

var _ref9 = _react.default.createElement(_List.default, {
  dense: true
});

describe('<List />', function () {
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
  });
  it('should render a ul', function () {
    var wrapper = shallow(_ref3);

    _chai.assert.strictEqual(wrapper.name(), 'ul');
  });
  it('should render with the user, root and padding classes', function () {
    var wrapper = shallow(_ref4);

    _chai.assert.strictEqual(wrapper.hasClass('woofList'), true);

    _chai.assert.strictEqual(wrapper.hasClass(classes.root), true);

    _chai.assert.strictEqual(wrapper.hasClass(classes.padding), true, 'should have the padding class');
  });
  it('should disable the padding', function () {
    var wrapper = shallow(_ref5);

    _chai.assert.strictEqual(wrapper.hasClass(classes.root), true);

    _chai.assert.strictEqual(wrapper.hasClass(classes.padding), false, 'should not have the padding class');
  });
  describe('prop: subheader', function () {
    it('should render with subheader class', function () {
      var wrapper = shallow(_ref6);

      _chai.assert.strictEqual(wrapper.hasClass(classes.root), true);

      _chai.assert.strictEqual(wrapper.hasClass(classes.subheader), true, 'should have the subheader class');
    });
    it('should render ListSubheader', function () {
      var wrapper = shallow(_ref7);

      _chai.assert.strictEqual(wrapper.find(_ListSubheader.default).length, 1, 'should render ListSubheader');
    });
  });
  describe('context: dense', function () {
    it('should forward the context', function () {
      var wrapper1 = shallow(_ref8);

      _chai.assert.strictEqual(wrapper1.instance().getChildContext().dense, false, 'dense should be false by default');

      var wrapper2 = shallow(_ref9);

      _chai.assert.strictEqual(wrapper2.instance().getChildContext().dense, true, 'dense should be true when set');
    });
  });
});