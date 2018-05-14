"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _chai = require("chai");

var _sinon = require("sinon");

var _testUtils = require("../test-utils");

var _Tab = _interopRequireDefault(require("./Tab"));

var _ButtonBase = _interopRequireDefault(require("../ButtonBase"));

var _Icon = _interopRequireDefault(require("../Icon"));

var _ref = _react.default.createElement(_Icon.default, null, "restore");

var _ref2 = _react.default.createElement(_Tab.default, {
  textColor: "inherit"
});

var _ref3 = _react.default.createElement(_Tab.default, {
  textColor: "inherit"
});

var _ref4 = _react.default.createElement(_Tab.default, {
  textColor: "inherit",
  className: "woofTab"
});

var _ref5 = _react.default.createElement(_Tab.default, {
  selected: true,
  textColor: "secondary"
});

var _ref6 = _react.default.createElement(_Tab.default, {
  disabled: true,
  textColor: "secondary"
});

var _ref7 = _react.default.createElement(_Tab.default, {
  textColor: "inherit",
  label: "foo"
});

var _ref8 = _react.default.createElement(_Tab.default, {
  textColor: "inherit",
  label: "foo"
});

var _ref10 = _react.default.createElement(_Tab.default, {
  selected: true,
  textColor: "inherit"
});

var _ref11 = _react.default.createElement(_Tab.default, {
  textColor: "inherit",
  fullWidth: true
});

describe('<Tab />', function () {
  var shallow;
  var mount;
  var classes;
  var icon = _ref;
  before(function () {
    shallow = (0, _testUtils.createShallow)({
      dive: true
    });
    mount = (0, _testUtils.createMount)();
    classes = (0, _testUtils.getClasses)(_ref2);
  });
  after(function () {
    mount.cleanUp();
  });
  it('should render with the root class', function () {
    var wrapper = shallow(_ref3);

    _chai.assert.strictEqual(wrapper.type(), _ButtonBase.default);

    _chai.assert.strictEqual(wrapper.hasClass(classes.root), true);
  });
  describe('prop: className', function () {
    it('should render with the user and root classes', function () {
      var wrapper = shallow(_ref4);

      _chai.assert.strictEqual(wrapper.hasClass('woofTab'), true);

      _chai.assert.strictEqual(wrapper.hasClass(classes.root), true);
    });
  });
  describe('prop: selected', function () {
    it('should render with the selected and root classes', function () {
      var wrapper = shallow(_ref5);

      _chai.assert.strictEqual(wrapper.hasClass(classes.selected), true);

      _chai.assert.strictEqual(wrapper.hasClass(classes.textColorSecondary), true);

      _chai.assert.strictEqual(wrapper.hasClass(classes.root), true);

      _chai.assert.strictEqual(wrapper.props()['aria-selected'], true);
    });
  });
  describe('prop: disabled', function () {
    it('should render with the disabled and root classes', function () {
      var wrapper = shallow(_ref6);

      _chai.assert.strictEqual(wrapper.hasClass(classes.disabled), true);

      _chai.assert.strictEqual(wrapper.hasClass(classes.textColorSecondary), true);

      _chai.assert.strictEqual(wrapper.hasClass(classes.root), true);
    });
  });
  describe('prop: onClick', function () {
    it('should be called when a click is triggered', function () {
      var handleClick = (0, _sinon.spy)();
      var wrapper = shallow(_react.default.createElement(_Tab.default, {
        textColor: "inherit",
        onClick: handleClick,
        onChange: function onChange() {}
      }));
      wrapper.simulate('click');

      _chai.assert.strictEqual(handleClick.callCount, 1, 'it should forward the onClick');
    });
  });
  describe('prop: label', function () {
    it('should render label with the label class', function () {
      var wrapper = shallow(_ref7);
      var label = wrapper.childAt(0).childAt(0).childAt(0);

      _chai.assert.strictEqual(label.hasClass(classes.label), true);
    });
    it('should render with text wrapping', function () {
      var wrapper = shallow(_ref8);
      var instance = wrapper.instance();
      instance.label = {
        getClientRects: (0, _sinon.stub)().returns({
          length: 2
        })
      };
      instance.checkTextWrap();
      wrapper.update();
      var label = wrapper.childAt(0).childAt(0).childAt(0);

      _chai.assert.strictEqual(label.hasClass(classes.labelWrapped), true, 'should have labelWrapped class');

      _chai.assert.strictEqual(wrapper.state().wrappedText, true, 'wrappedText state should be true');
    });
  });
  describe('prop: classes', function () {
    it('should render label with a custom label class', function () {
      var wrapper = shallow(_react.default.createElement(_Tab.default, {
        textColor: "inherit",
        label: "foo",
        classes: {
          label: 'MyLabel'
        }
      }));
      var label = wrapper.childAt(0).childAt(0).childAt(0);

      _chai.assert.strictEqual(label.hasClass(classes.label), true);

      _chai.assert.strictEqual(label.hasClass('MyLabel'), true);
    });
  });

  var _ref9 = _react.default.createElement(_Tab.default, {
    textColor: "inherit",
    icon: icon
  });

  describe('prop: icon', function () {
    it('should render icon element', function () {
      var wrapper = shallow(_ref9);
      var iconWrapper = wrapper.childAt(0).childAt(0);

      _chai.assert.strictEqual(iconWrapper.is(_Icon.default), true);
    });
  });
  describe('prop: textColor', function () {
    it('should support the inherit value', function () {
      var wrapper = shallow(_ref10);

      _chai.assert.strictEqual(wrapper.hasClass(classes.selected), true);

      _chai.assert.strictEqual(wrapper.hasClass(classes.textColorInherit), true);

      _chai.assert.strictEqual(wrapper.hasClass(classes.root), true);
    });
  });
  describe('prop: fullWidth', function () {
    it('should have the fullWidth class', function () {
      var wrapper = shallow(_ref11);

      _chai.assert.strictEqual(wrapper.hasClass(classes.fullWidth), true);
    });
  });
  describe('prop: style', function () {
    it('should be able to override everything', function () {
      var style = {
        width: '80%',
        color: 'red',
        alignText: 'center'
      };
      var wrapper = shallow(_react.default.createElement(_Tab.default, {
        fullWidth: true,
        style: style
      }));

      _chai.assert.deepEqual(wrapper.props().style, style);
    });
  });
  it('should have a ref on label property', function () {
    var TabNaked = (0, _testUtils.unwrap)(_Tab.default);
    var instance = mount(_react.default.createElement(TabNaked, {
      textColor: "inherit",
      label: "foo",
      classes: classes
    })).instance();

    _chai.assert.isDefined(instance.label, 'should be defined');
  });
});