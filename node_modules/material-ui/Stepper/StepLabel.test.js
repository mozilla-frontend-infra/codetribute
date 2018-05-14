"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _chai = require("chai");

var _testUtils = require("../test-utils");

var _Typography = _interopRequireDefault(require("../Typography"));

var _StepLabel = _interopRequireDefault(require("./StepLabel"));

var _StepIcon = _interopRequireDefault(require("./StepIcon"));

var _ref = _react.default.createElement(_StepLabel.default, null);

var _ref2 = _react.default.createElement(_StepLabel.default, null, "Step One");

var _ref3 = _react.default.createElement(_StepLabel.default, {
  icon: 1,
  active: true,
  completed: true,
  alternativeLabel: true
}, "Step One");

var _ref4 = _react.default.createElement(_StepLabel.default, {
  active: true
}, "Step One");

var _ref5 = _react.default.createElement(_StepLabel.default, {
  icon: 1,
  active: true
}, "Step One");

var _ref6 = _react.default.createElement(_StepLabel.default, {
  active: false
}, "Step One");

var _ref7 = _react.default.createElement(_StepLabel.default, {
  completed: true
}, "Step One");

var _ref8 = _react.default.createElement(_StepLabel.default, {
  icon: 1,
  completed: true
}, "Step One");

var _ref9 = _react.default.createElement(_StepLabel.default, {
  error: true
}, "Step One");

var _ref10 = _react.default.createElement(_StepLabel.default, {
  icon: 1,
  error: true
}, "Step One");

var _ref11 = _react.default.createElement(_StepLabel.default, {
  icon: 1,
  disabled: true
}, "Step One");

var _ref12 = _react.default.createElement(_StepLabel.default, {
  icon: 1,
  optional: _react.default.createElement(_Typography.default, {
    variant: "caption"
  }, "Optional Text")
}, "Step One");

describe('<StepLabel />', function () {
  var shallow;
  var classes;
  var mount;
  before(function () {
    shallow = (0, _testUtils.createShallow)({
      dive: true
    });
    classes = (0, _testUtils.getClasses)(_ref);
    mount = (0, _testUtils.createMount)();
  });
  after(function () {
    mount.cleanUp();
  });
  it('merges styles and other props into the root node', function () {
    var wrapper = shallow(_react.default.createElement(_StepLabel.default, {
      orientation: "horizontal",
      style: {
        paddingRight: 200,
        color: 'purple',
        border: '1px solid tomato'
      },
      "data-myProp": "hello"
    }, "My Label"));
    var props = wrapper.props();

    _chai.assert.strictEqual(props.style.paddingRight, 200);

    _chai.assert.strictEqual(props.style.color, 'purple');

    _chai.assert.strictEqual(props.style.border, '1px solid tomato');

    _chai.assert.strictEqual(props['data-myProp'], 'hello');
  });
  describe('label content', function () {
    it('renders the label from children', function () {
      var wrapper = shallow(_ref2);

      _chai.assert.strictEqual(wrapper.contains('Step One'), true);
    });
    it('renders <StepIcon>', function () {
      var wrapper = shallow(_ref3);
      var stepIcon = wrapper.find(_StepIcon.default);

      _chai.assert.strictEqual(stepIcon.length, 1, 'should have an <StepIcon />');

      var props = stepIcon.props();

      _chai.assert.strictEqual(props.icon, 1, 'should set icon');
    });
  });
  describe('prop: active', function () {
    it('renders <Typography> with the className active', function () {
      var wrapper = shallow(_ref4);
      var text = wrapper.find(_Typography.default);

      _chai.assert.strictEqual(text.hasClass(classes.active), true);
    });
    it('renders <StepIcon> with the prop active set to true', function () {
      var wrapper = shallow(_ref5);
      var stepIcon = wrapper.find(_StepIcon.default);

      _chai.assert.strictEqual(stepIcon.props().active, true, 'should set active');
    });
    it('renders <Typography> without the className active', function () {
      var wrapper = shallow(_ref6);
      var text = wrapper.find(_Typography.default);

      _chai.assert.strictEqual(text.hasClass(classes.labelActive), false);
    });
  });
  describe('prop: completed', function () {
    it('renders <Typography> with the className completed', function () {
      var wrapper = shallow(_ref7);
      var text = wrapper.find(_Typography.default);

      _chai.assert.strictEqual(text.hasClass(classes.completed), true);
    });
    it('renders <StepIcon> with the prop completed set to true', function () {
      var wrapper = shallow(_ref8);
      var stepIcon = wrapper.find(_StepIcon.default);

      _chai.assert.strictEqual(stepIcon.props().completed, true, 'should set completed');
    });
  });
  describe('prop: error', function () {
    it('renders <Typography> with the className error', function () {
      var wrapper = shallow(_ref9);
      var text = wrapper.find(_Typography.default);

      _chai.assert.strictEqual(text.hasClass(classes.error), true);
    });
    it('renders <StepIcon> with the prop error set to true', function () {
      var wrapper = shallow(_ref10);
      var stepIcon = wrapper.find(_StepIcon.default);

      _chai.assert.strictEqual(stepIcon.props().error, true, 'should set error');
    });
  });
  describe('prop: disabled', function () {
    it('renders with disabled className when disabled', function () {
      var wrapper = shallow(_ref11);

      _chai.assert.strictEqual(wrapper.hasClass(classes.disabled), true);
    });
  });
  describe('prop: classes', function () {
    it('should set iconContainer', function () {
      var wrapper = shallow(_react.default.createElement(_StepLabel.default, {
        classes: {
          iconContainer: 'my-custom-class'
        },
        icon: 1
      }, "Step One"));

      _chai.assert.include(wrapper.find('span').at(1).props().className, 'my-custom-class');
    });
  });
  describe('prop: optional = Optional Text', function () {
    it('creates a <Typography> component with text "Optional Text"', function () {
      var wrapper = shallow(_ref12);

      _chai.assert.strictEqual(wrapper.find(_Typography.default).at(1).contains('Optional Text'), true);
    });
  });
});