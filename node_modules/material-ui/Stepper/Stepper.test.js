"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _chai = require("chai");

var _CheckCircle = _interopRequireDefault(require("../internal/svg-icons/CheckCircle"));

var _testUtils = require("../test-utils");

var _Paper = _interopRequireDefault(require("../Paper"));

var _Step = _interopRequireDefault(require("./Step"));

var _StepConnector = _interopRequireDefault(require("./StepConnector"));

var _Stepper = _interopRequireDefault(require("./Stepper"));

var _ref = _react.default.createElement(_Stepper.default, {
  className: "foo"
}, _react.default.createElement(_Step.default, null));

var _ref2 = _react.default.createElement(_Stepper.default, null, _react.default.createElement(_Step.default, null));

var _ref3 = _react.default.createElement(_Stepper.default, null, _react.default.createElement("div", null), _react.default.createElement("div", null), _react.default.createElement("div", null));

var _ref4 = _react.default.createElement(_Stepper.default, {
  activeStep: 0
}, _react.default.createElement("div", {
  className: "child-0"
}), _react.default.createElement("div", {
  className: "child-1"
}), _react.default.createElement("div", {
  className: "child-2"
}));

var _ref5 = _react.default.createElement(_Stepper.default, {
  linear: false,
  activeStep: 0
}, _react.default.createElement("div", {
  className: "child-0"
}), _react.default.createElement("div", {
  className: "child-1"
}), _react.default.createElement("div", {
  className: "child-2"
}));

var _ref6 = _react.default.createElement("div", null);

var _ref7 = _react.default.createElement("div", {
  key: 1
});

var _ref8 = _react.default.createElement("div", {
  key: 2
});

var _ref9 = _react.default.createElement(_Stepper.default, null, _react.default.createElement(_Step.default, null), _react.default.createElement(_Step.default, null));

var _ref10 = _react.default.createElement(_Stepper.default, {
  connector: _react.default.createElement(_CheckCircle.default, null)
}, _react.default.createElement(_Step.default, null), _react.default.createElement(_Step.default, null));

var _ref11 = _react.default.createElement(_Stepper.default, {
  connector: null
}, _react.default.createElement(_Step.default, null), _react.default.createElement(_Step.default, null));

describe('<Stepper />', function () {
  var shallow;
  var mount;
  before(function () {
    shallow = (0, _testUtils.createShallow)({
      dive: true
    });
    mount = (0, _testUtils.createMount)();
  });
  after(function () {
    mount.cleanUp();
  });
  it('merges user className into the root node', function () {
    var wrapper = shallow(_ref);

    _chai.assert.include(wrapper.props().className, 'foo');
  });
  it('should render a Paper component', function () {
    var wrapper = shallow(_ref2);

    _chai.assert.strictEqual(wrapper.type(), _Paper.default);

    _chai.assert.strictEqual(wrapper.props().elevation, 0, 'should have no elevation');
  });
  describe('rendering children', function () {
    it('renders 3 children with connectors as separators', function () {
      var wrapper = shallow(_ref3);
      var children = wrapper.children();

      _chai.assert.strictEqual(children.length, 5);

      _chai.assert.strictEqual(wrapper.childAt(1).find(_StepConnector.default).length, 1);

      _chai.assert.strictEqual(wrapper.childAt(3).find(_StepConnector.default).length, 1);
    });
  });
  describe('controlling child props', function () {
    it('controls children linearly based on the activeStep prop', function () {
      var wrapper = shallow(_ref4);

      _chai.assert.strictEqual(wrapper.find('.child-0').props().active, true);

      _chai.assert.strictEqual(wrapper.find('.child-1').props().active, false);

      _chai.assert.strictEqual(wrapper.find('.child-2').props().active, false);

      _chai.assert.strictEqual(wrapper.find('.child-1').props().disabled, true);

      _chai.assert.strictEqual(wrapper.find('.child-2').props().disabled, true);

      wrapper.setProps({
        activeStep: 1
      });

      _chai.assert.strictEqual(wrapper.find('.child-0').props().completed, true);

      _chai.assert.strictEqual(wrapper.find('.child-0').props().active, false);

      _chai.assert.strictEqual(wrapper.find('.child-1').props().active, true);

      _chai.assert.strictEqual(wrapper.find('.child-2').props().active, false);

      _chai.assert.strictEqual(wrapper.find('.child-2').props().disabled, true);
    });
    it('controls children non-linearly based on the activeStep prop', function () {
      var wrapper = shallow(_ref5);

      _chai.assert.strictEqual(wrapper.find('.child-0').props().active, true);

      _chai.assert.strictEqual(wrapper.find('.child-1').props().active, false);

      _chai.assert.strictEqual(wrapper.find('.child-2').props().active, false);

      wrapper.setProps({
        activeStep: 1
      });

      _chai.assert.strictEqual(wrapper.find('.child-0').props().active, false);

      _chai.assert.strictEqual(wrapper.find('.child-1').props().active, true);

      _chai.assert.strictEqual(wrapper.find('.child-2').props().active, false);

      wrapper.setProps({
        activeStep: 2
      });

      _chai.assert.strictEqual(wrapper.find('.child-0').props().active, false);

      _chai.assert.strictEqual(wrapper.find('.child-1').props().active, false);

      _chai.assert.strictEqual(wrapper.find('.child-2').props().active, true);
    });
    it('passes last down correctly when rendering children containing arrays', function () {
      var wrapper = shallow(_react.default.createElement(_Stepper.default, {
        linear: false
      }, _ref6, [_ref7, _ref8]));
      var steps = wrapper.children().find('div');

      _chai.assert.strictEqual(steps.at(0).props().last, false);

      _chai.assert.strictEqual(steps.at(1).props().last, false);

      _chai.assert.strictEqual(steps.at(2).props().last, true);
    });
  });
  describe('step connector', function () {
    it('should have a default step connector', function () {
      var wrapper = shallow(_ref9);

      _chai.assert.strictEqual(wrapper.find(_StepConnector.default).length, 1, 'should contain a <StepConnector /> child');
    });
    it('should allow the developer to specify a custom step connector', function () {
      var wrapper = shallow(_ref10);

      _chai.assert.strictEqual(wrapper.find(_CheckCircle.default).length, 1, 'should contain a <CheckCircle /> child');

      _chai.assert.strictEqual(wrapper.find(_StepConnector.default).length, 0, 'should not contain a <StepConnector /> child');
    });
    it('should allow the step connector to be removed', function () {
      var wrapper = shallow(_ref11);

      _chai.assert.strictEqual(wrapper.find(_StepConnector.default).length, 0, 'should not contain a <StepConnector /> child');
    });
  });
});