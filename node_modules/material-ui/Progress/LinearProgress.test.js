"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _chai = require("chai");

var _consoleErrorMock = _interopRequireDefault(require("test/utils/consoleErrorMock"));

var _testUtils = require("../test-utils");

var _LinearProgress = _interopRequireDefault(require("./LinearProgress"));

var _ref = _react.default.createElement(_LinearProgress.default, null);

var _ref2 = _react.default.createElement(_LinearProgress.default, null);

var _ref3 = _react.default.createElement(_LinearProgress.default, {
  className: "woofLinearProgress"
});

var _ref4 = _react.default.createElement(_LinearProgress.default, null);

var _ref5 = _react.default.createElement(_LinearProgress.default, {
  color: "primary"
});

var _ref6 = _react.default.createElement(_LinearProgress.default, {
  color: "secondary"
});

var _ref7 = _react.default.createElement(_LinearProgress.default, {
  value: 1,
  variant: "determinate"
});

var _ref8 = _react.default.createElement(_LinearProgress.default, {
  color: "primary",
  value: 1,
  variant: "determinate"
});

var _ref9 = _react.default.createElement(_LinearProgress.default, {
  color: "secondary",
  value: 1,
  variant: "determinate"
});

var _ref10 = _react.default.createElement(_LinearProgress.default, {
  variant: "determinate",
  value: 77
});

var _ref11 = _react.default.createElement(_LinearProgress.default, {
  value: 1,
  valueBuffer: 1,
  variant: "buffer"
});

var _ref12 = _react.default.createElement(_LinearProgress.default, {
  value: 1,
  valueBuffer: 1,
  color: "primary",
  variant: "buffer"
});

var _ref13 = _react.default.createElement(_LinearProgress.default, {
  value: 1,
  valueBuffer: 1,
  color: "secondary",
  variant: "buffer"
});

var _ref14 = _react.default.createElement(_LinearProgress.default, {
  variant: "buffer",
  value: 77,
  valueBuffer: 85
});

var _ref15 = _react.default.createElement(_LinearProgress.default, {
  variant: "query"
});

var _ref16 = _react.default.createElement(_LinearProgress.default, {
  variant: "determinate",
  value: undefined
});

var _ref17 = _react.default.createElement(_LinearProgress.default, {
  variant: "buffer",
  value: undefined
});

describe('<LinearProgress />', function () {
  var shallow;
  var classes;
  before(function () {
    shallow = (0, _testUtils.createShallow)({
      dive: true
    });
    classes = (0, _testUtils.getClasses)(_ref);
  });
  it('should render a div with the root class', function () {
    var wrapper = shallow(_ref2);

    _chai.assert.strictEqual(wrapper.name(), 'div');

    _chai.assert.strictEqual(wrapper.hasClass(classes.root), true);
  });
  it('should render with the user and root classes', function () {
    var wrapper = shallow(_ref3);

    _chai.assert.strictEqual(wrapper.hasClass('woofLinearProgress'), true);

    _chai.assert.strictEqual(wrapper.hasClass(classes.root), true);
  });
  it('should render intermediate variant by default', function () {
    var wrapper = shallow(_ref4);

    _chai.assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');

    _chai.assert.strictEqual(wrapper.childAt(0).hasClass(classes.barColorPrimary), true, 'should have the barColorPrimary class');

    _chai.assert.strictEqual(wrapper.childAt(0).hasClass(classes.bar1Indeterminate), true, 'should have the bar1Indeterminate class');

    _chai.assert.strictEqual(wrapper.childAt(1).hasClass(classes.barColorPrimary), true, 'should have the barColorPrimary class');

    _chai.assert.strictEqual(wrapper.childAt(1).hasClass(classes.bar2Indeterminate), true, 'should have the bar2Indeterminate class');
  });
  it('should render for the primary color', function () {
    var wrapper = shallow(_ref5);

    _chai.assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');

    _chai.assert.strictEqual(wrapper.childAt(0).hasClass(classes.barColorPrimary), true, 'should have the barColorPrimary class');

    _chai.assert.strictEqual(wrapper.childAt(1).hasClass(classes.barColorPrimary), true, 'should have the barColorPrimary class');
  });
  it('should render for the secondary color', function () {
    var wrapper = shallow(_ref6);

    _chai.assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');

    _chai.assert.strictEqual(wrapper.childAt(0).hasClass(classes.barColorSecondary), true, 'should have the barColorSecondary class');

    _chai.assert.strictEqual(wrapper.childAt(1).hasClass(classes.barColorSecondary), true, 'should have the barColorSecondary class');
  });
  it('should render with determinate classes for the primary color by default', function () {
    var wrapper = shallow(_ref7);

    _chai.assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');

    _chai.assert.strictEqual(wrapper.childAt(0).hasClass(classes.barColorPrimary), true, 'should have the barColorPrimary class');

    _chai.assert.strictEqual(wrapper.childAt(0).hasClass(classes.bar1Determinate), true, 'should have the bar1Determinate class');
  });
  it('should render with determinate classes for the primary color', function () {
    var wrapper = shallow(_ref8);

    _chai.assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');

    _chai.assert.strictEqual(wrapper.childAt(0).hasClass(classes.barColorPrimary), true, 'should have the barColorPrimary class');

    _chai.assert.strictEqual(wrapper.childAt(0).hasClass(classes.bar1Determinate), true, 'should have the bar1Determinate class');
  });
  it('should render with determinate classes for the secondary color', function () {
    var wrapper = shallow(_ref9);

    _chai.assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');

    _chai.assert.strictEqual(wrapper.childAt(0).hasClass(classes.barColorSecondary), true, 'should have the barColorSecondary class');

    _chai.assert.strictEqual(wrapper.childAt(0).hasClass(classes.bar1Determinate), true, 'should have the bar1Determinate class');
  });
  it('should set width of bar1 on determinate variant', function () {
    var wrapper = shallow(_ref10);

    _chai.assert.strictEqual(wrapper.hasClass(classes.root), true);

    _chai.assert.strictEqual(wrapper.childAt(0).props().style.transform, 'scaleX(0.77)', 'should have width set');

    _chai.assert.strictEqual(wrapper.props()['aria-valuenow'], 77);
  });
  it('should render with buffer classes for the primary color by default', function () {
    var wrapper = shallow(_ref11);

    _chai.assert.strictEqual(wrapper.hasClass(classes.root), true);

    _chai.assert.strictEqual(wrapper.childAt(0).hasClass(classes.dashedColorPrimary), true, 'should have the dashedColorPrimary class');

    _chai.assert.strictEqual(wrapper.childAt(1).hasClass(classes.barColorPrimary), true, 'should have the barColorPrimary class');

    _chai.assert.strictEqual(wrapper.childAt(1).hasClass(classes.bar1Buffer), true, 'should have the bar1Buffer class');

    _chai.assert.strictEqual(wrapper.childAt(2).hasClass(classes.colorPrimary), true, 'should have the colorPrimary class');

    _chai.assert.strictEqual(wrapper.childAt(2).hasClass(classes.bar2Buffer), true, 'should have the bar2Buffer class');
  });
  it('should render with buffer classes for the primary color', function () {
    var wrapper = shallow(_ref12);

    _chai.assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');

    _chai.assert.strictEqual(wrapper.childAt(0).hasClass(classes.dashedColorPrimary), true, 'should have the dashedColorPrimary class');

    _chai.assert.strictEqual(wrapper.childAt(1).hasClass(classes.barColorPrimary), true, 'should have the barColorPrimary class');

    _chai.assert.strictEqual(wrapper.childAt(1).hasClass(classes.bar1Buffer), true, 'should have the bar1Buffer class');

    _chai.assert.strictEqual(wrapper.childAt(2).hasClass(classes.colorPrimary), true, 'should have the colorPrimary class');

    _chai.assert.strictEqual(wrapper.childAt(2).hasClass(classes.bar2Buffer), true, 'should have the bar2Buffer class');
  });
  it('should render with buffer classes for the secondary color', function () {
    var wrapper = shallow(_ref13);

    _chai.assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');

    _chai.assert.strictEqual(wrapper.childAt(0).hasClass(classes.dashedColorSecondary), true, 'should have the dashedColorSecondary class');

    _chai.assert.strictEqual(wrapper.childAt(1).hasClass(classes.barColorSecondary), true, 'should have the barColorSecondary class');

    _chai.assert.strictEqual(wrapper.childAt(1).hasClass(classes.bar1Buffer), true, 'should have the bar1Buffer class');

    _chai.assert.strictEqual(wrapper.childAt(2).hasClass(classes.colorSecondary), true, 'should have the colorSecondary class');

    _chai.assert.strictEqual(wrapper.childAt(2).hasClass(classes.bar2Buffer), true, 'should have the bar2Buffer class');
  });
  it('should set width of bar1 and bar2 on buffer variant', function () {
    var wrapper = shallow(_ref14);

    _chai.assert.strictEqual(wrapper.hasClass(classes.root), true);

    _chai.assert.strictEqual(wrapper.childAt(1).props().style.transform, 'scaleX(0.77)', 'should have width set');

    _chai.assert.strictEqual(wrapper.childAt(2).props().style.transform, 'scaleX(0.85)', 'should have width set');
  });
  it('should render with query classes', function () {
    var wrapper = shallow(_ref15);

    _chai.assert.strictEqual(wrapper.hasClass(classes.root), true);

    _chai.assert.strictEqual(wrapper.hasClass(classes.query), true, 'should have the query class');

    _chai.assert.strictEqual(wrapper.childAt(0).hasClass(classes.barColorPrimary), true, 'should have the barColorPrimary class');

    _chai.assert.strictEqual(wrapper.childAt(0).hasClass(classes.bar1Indeterminate), true, 'should have the bar1Indeterminate class');

    _chai.assert.strictEqual(wrapper.childAt(1).hasClass(classes.barColorPrimary), true, 'should have the barColorPrimary class');

    _chai.assert.strictEqual(wrapper.childAt(1).hasClass(classes.bar2Indeterminate), true, 'should have the bar2Indeterminate class');
  });
  describe('prop: value', function () {
    before(function () {
      _consoleErrorMock.default.spy();
    });
    after(function () {
      _consoleErrorMock.default.reset();
    });
    it('should warn when not used as expected', function () {
      shallow(_ref16);

      _chai.assert.strictEqual(_consoleErrorMock.default.callCount(), 1);

      _chai.assert.match(_consoleErrorMock.default.args()[0][0], /Warning: Material-UI: you need to provide a value property/);

      shallow(_ref17);

      _chai.assert.strictEqual(_consoleErrorMock.default.callCount(), 3);

      _chai.assert.match(_consoleErrorMock.default.args()[1][0], /Warning: Material-UI: you need to provide a value property/);

      _chai.assert.match(_consoleErrorMock.default.args()[2][0], /Warning: Material-UI: you need to provide a valueBuffer property/);
    });
  });
});