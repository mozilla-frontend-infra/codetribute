"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _chai = require("chai");

var _testUtils = require("../test-utils");

var _KeyboardArrowLeft = _interopRequireDefault(require("../internal/svg-icons/KeyboardArrowLeft"));

var _KeyboardArrowRight = _interopRequireDefault(require("../internal/svg-icons/KeyboardArrowRight"));

var _Paper = _interopRequireDefault(require("../Paper"));

var _Button = _interopRequireDefault(require("../Button/Button"));

var _Progress = require("../Progress");

var _MobileStepper = _interopRequireDefault(require("./MobileStepper"));

var _ref = _react.default.createElement(_Button.default, null, "Next", _react.default.createElement(_KeyboardArrowRight.default, null));

var _ref2 = _react.default.createElement(_Button.default, null, _react.default.createElement(_KeyboardArrowLeft.default, null), "Back");

var _ref3 = _react.default.createElement(_Button.default, null, _react.default.createElement(_KeyboardArrowLeft.default, null), "Past");

var _ref4 = _react.default.createElement(_Button.default, null, "Future", _react.default.createElement(_KeyboardArrowRight.default, null));

var _ref5 = _react.default.createElement(_Button.default, {
  disabled: true
}, "back");

var _ref6 = _react.default.createElement(_Button.default, {
  disabled: true
}, "back");

describe('<MobileStepper />', function () {
  var shallow;
  var classes;
  var defaultProps = {
    steps: 2,
    nextButton: _ref,
    backButton: _ref2
  };
  before(function () {
    shallow = (0, _testUtils.createShallow)({
      dive: true
    });
    classes = (0, _testUtils.getClasses)(_react.default.createElement(_MobileStepper.default, defaultProps));
  });
  it('should render a Paper component', function () {
    var wrapper = shallow(_react.default.createElement(_MobileStepper.default, defaultProps));

    _chai.assert.strictEqual(wrapper.type(), _Paper.default);

    _chai.assert.strictEqual(wrapper.props().elevation, 0, 'should have no elevation');
  });
  it('should render with the root class', function () {
    var wrapper = shallow(_react.default.createElement(_MobileStepper.default, defaultProps));

    _chai.assert.strictEqual(wrapper.hasClass(classes.root), true);
  });
  it('should render the custom className and the root class', function () {
    var wrapper = shallow(_react.default.createElement(_MobileStepper.default, (0, _extends2.default)({
      className: "test-class-name"
    }, defaultProps)));

    _chai.assert.strictEqual(wrapper.is('.test-class-name'), true, 'should pass the test className');

    _chai.assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the mobileStepper class');
  });
  it('should render with the bottom class if position prop is set to bottom', function () {
    var wrapper = shallow(_react.default.createElement(_MobileStepper.default, (0, _extends2.default)({
      position: "bottom"
    }, defaultProps)));

    _chai.assert.strictEqual(wrapper.hasClass(classes.positionBottom), true);
  });
  it('should render with the top class if position prop is set to top', function () {
    var wrapper = shallow(_react.default.createElement(_MobileStepper.default, (0, _extends2.default)({
      position: "top"
    }, defaultProps)));

    _chai.assert.strictEqual(wrapper.hasClass(classes.positionTop), true);
  });
  it('should render two buttons', function () {
    var wrapper = shallow(_react.default.createElement(_MobileStepper.default, defaultProps));

    _chai.assert.lengthOf(wrapper.find(_Button.default), 2, 'should render two buttons');
  });
  it('should render the back button', function () {
    var wrapper = shallow(_react.default.createElement(_MobileStepper.default, defaultProps));
    var backButton = wrapper.childAt(0);

    _chai.assert.strictEqual(backButton.childAt(1).text(), 'Back', 'should set the back button text');

    _chai.assert.lengthOf(backButton.find(_KeyboardArrowLeft.default), 1, 'should render a single <KeyboardArrowLeft /> component');
  });
  it('should render next button', function () {
    var wrapper = shallow(_react.default.createElement(_MobileStepper.default, defaultProps));
    var nextButton = wrapper.childAt(2);

    _chai.assert.strictEqual(nextButton.childAt(0).text(), 'Next', 'should set the next button text');

    _chai.assert.lengthOf(nextButton.find(_KeyboardArrowRight.default), 1, 'should render a single <KeyboardArrowRight /> component');
  });
  it('should render backButton custom text', function () {
    var props = {
      steps: defaultProps.steps,
      nextButton: defaultProps.nextButton,
      backButton: _ref3
    };
    var wrapper = shallow(_react.default.createElement(_MobileStepper.default, props));

    _chai.assert.strictEqual(wrapper.childAt(0).childAt(1).text(), 'Past', 'should set the back button text');
  });
  it('should render nextButton custom text', function () {
    var props = {
      steps: defaultProps.steps,
      nextButton: _ref4,
      backButton: defaultProps.backButton
    };
    var wrapper = shallow(_react.default.createElement(_MobileStepper.default, props));

    _chai.assert.strictEqual(wrapper.childAt(2).childAt(0).text(), 'Future', 'should set the back button text');
  });
  it('should render disabled backButton', function () {
    var props = {
      steps: defaultProps.steps,
      nextButton: defaultProps.nextButton,
      backButton: _ref5
    };
    var wrapper = shallow(_react.default.createElement(_MobileStepper.default, props));
    var backButton = wrapper.childAt(0);

    _chai.assert.strictEqual(backButton.props().disabled, true, 'should disable the back button');
  });
  it('should render disabled nextButton', function () {
    var props = {
      steps: defaultProps.steps,
      nextButton: _ref6,
      backButton: defaultProps.backButton
    };
    var wrapper = shallow(_react.default.createElement(_MobileStepper.default, props));
    var nextButton = wrapper.childAt(2);

    _chai.assert.strictEqual(nextButton.props().disabled, true, 'should disable the next button');
  });
  it('should render just two buttons when supplied with variant text', function () {
    var wrapper = shallow(_react.default.createElement(_MobileStepper.default, (0, _extends2.default)({
      variant: "text"
    }, defaultProps)));

    _chai.assert.lengthOf(wrapper.children(), 2, 'should render exactly two children');
  });
  it('should render dots when supplied with variant dots', function () {
    var wrapper = shallow(_react.default.createElement(_MobileStepper.default, (0, _extends2.default)({
      variant: "dots"
    }, defaultProps)));

    _chai.assert.lengthOf(wrapper.children(), 3, 'should render exactly three children');

    _chai.assert.strictEqual(wrapper.childAt(1).hasClass(classes.dots), true, 'should have a single dots class');
  });
  it('should render a dot for each step when using dots variant', function () {
    var wrapper = shallow(_react.default.createElement(_MobileStepper.default, (0, _extends2.default)({
      variant: "dots"
    }, defaultProps)));

    _chai.assert.lengthOf(wrapper.find(".".concat(classes.dot)), 2, 'should render exactly two dots');
  });
  it('should render the first dot as active if activeStep is not set', function () {
    var wrapper = shallow(_react.default.createElement(_MobileStepper.default, (0, _extends2.default)({
      variant: "dots"
    }, defaultProps)));

    _chai.assert.strictEqual(wrapper.childAt(1).childAt(0).hasClass(classes.dotActive), true, 'should render the first dot active');
  });
  it('should honor the activeStep prop', function () {
    var wrapper = shallow(_react.default.createElement(_MobileStepper.default, (0, _extends2.default)({
      variant: "dots",
      activeStep: 1
    }, defaultProps)));

    _chai.assert.strictEqual(wrapper.childAt(1).childAt(1).hasClass(classes.dotActive), true, 'should render the second dot active');
  });
  it('should render a <LinearProgress /> when supplied with variant progress', function () {
    var wrapper = shallow(_react.default.createElement(_MobileStepper.default, (0, _extends2.default)({
      variant: "progress"
    }, defaultProps)));

    _chai.assert.lengthOf(wrapper.find(_Progress.LinearProgress), 1, 'should render a <LinearProgress />');
  });
  it('should calculate the <LinearProgress /> value correctly', function () {
    var props = {
      backButton: defaultProps.backButton,
      nextButton: defaultProps.nextButton
    };
    var wrapper = shallow(_react.default.createElement(_MobileStepper.default, (0, _extends2.default)({
      variant: "progress",
      steps: 3
    }, props)));
    var linearProgressProps = wrapper.find(_Progress.LinearProgress).props();

    _chai.assert.strictEqual(linearProgressProps.value, 0, 'should set <LinearProgress /> value to 0');

    wrapper = shallow(_react.default.createElement(_MobileStepper.default, (0, _extends2.default)({
      variant: "progress",
      steps: 3,
      activeStep: 1
    }, props)));
    linearProgressProps = wrapper.find(_Progress.LinearProgress).props();

    _chai.assert.strictEqual(linearProgressProps.value, 50, 'should set <LinearProgress /> value to 50');

    wrapper = shallow(_react.default.createElement(_MobileStepper.default, (0, _extends2.default)({
      variant: "progress",
      steps: 3,
      activeStep: 2
    }, props)));
    linearProgressProps = wrapper.find(_Progress.LinearProgress).props();

    _chai.assert.strictEqual(linearProgressProps.value, 100, 'should set <LinearProgress /> value to 100');
  });
});