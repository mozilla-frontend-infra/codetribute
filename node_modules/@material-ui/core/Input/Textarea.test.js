"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _chai = require("chai");

var _sinon = require("sinon");

var _testUtils = require("../test-utils");

var _Textarea = _interopRequireDefault(require("./Textarea"));

function assignRefs(wrapper) {
  // refs don't work with shallow renders in enzyme so here we directly define
  // 'this.input', 'this.shadow', etc. for this Textarea via wrapper.instance()
  var input = wrapper.find('textarea').last();
  wrapper.instance().input = input;
  var textareaShadow = wrapper.find('textarea').at(2);
  wrapper.instance().shadow = textareaShadow;
  var singlelineShadow = wrapper.find('textarea').first();
  wrapper.instance().singlelineShadow = singlelineShadow;
  return {
    singlelineShadow: singlelineShadow,
    textareaShadow: textareaShadow,
    input: input
  };
}

var _ref = _react.default.createElement(_Textarea.default, null);

var _ref2 = _react.default.createElement(_Textarea.default, null);

var _ref3 = _react.default.createElement(_Textarea.default, null);

var _ref4 = _react.default.createElement(_Textarea.default, null);

describe('<Textarea />', function () {
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
  it('should render 3 textareas', function () {
    var wrapper = shallow(_ref);

    _chai.assert.strictEqual(wrapper.find('textarea').length, 3);
  });
  it('should change its height when the height of its shadows changes', function () {
    var wrapper = shallow(_ref2);

    _chai.assert.strictEqual(wrapper.state().height, 19);

    var refs = assignRefs(wrapper); // jsdom doesn't support scroll height so we have to simulate it changing
    // which makes this not so great of a test :(

    refs.textareaShadow.scrollHeight = 43;
    refs.singlelineShadow.scrollHeight = 43; // this is needed to trigger the resize

    refs.input.simulate('change', {
      target: {
        value: 'x'
      }
    });

    _chai.assert.strictEqual(wrapper.state().height, 43);

    refs.textareaShadow.scrollHeight = 19;
    refs.singlelineShadow.scrollHeight = 19;
    refs.input.simulate('change', {
      target: {
        value: ''
      }
    });

    _chai.assert.strictEqual(wrapper.state().height, 19);
  });
  describe('height behavior', function () {
    var wrapper;
    beforeEach(function () {
      var TextareaNaked = (0, _testUtils.unwrap)(_Textarea.default);
      wrapper = mount(_react.default.createElement(TextareaNaked, {
        classes: {},
        value: "f"
      }));
    });
    afterEach(function () {
      wrapper.unmount();
    });
    it('should update the height when the value change', function () {
      var instance = wrapper.instance();
      instance.singlelineShadow = {
        scrollHeight: 19
      };
      instance.shadow = {
        scrollHeight: 19
      };
      wrapper.setProps({
        value: 'fo'
      });

      _chai.assert.strictEqual(wrapper.state().height, 19);

      instance.shadow = {
        scrollHeight: 48
      };
      wrapper.setProps({
        value: 'foooooo'
      });

      _chai.assert.strictEqual(wrapper.state().height, 48);
    });
    it('should respect the rowsMax property', function () {
      var instance = wrapper.instance();
      var rowsMax = 4;
      var lineHeight = 19;
      instance.singlelineShadow = {
        scrollHeight: lineHeight
      };
      instance.shadow = {
        scrollHeight: lineHeight * 5
      };
      wrapper.setProps({
        rowsMax: rowsMax
      });

      _chai.assert.strictEqual(wrapper.state().height, lineHeight * rowsMax);
    });
  });
  it('should set filled', function () {
    var wrapper = shallow(_ref3);

    _chai.assert.strictEqual(wrapper.find('textarea').length, 3);

    var refs = assignRefs(wrapper); // this is needed to trigger the resize

    refs.input.simulate('change', {
      target: {
        value: 'x'
      }
    });

    _chai.assert.strictEqual(wrapper.instance().value, 'x'); // this is needed to trigger the resize


    refs.input.simulate('change', {
      target: {
        value: ''
      }
    });

    _chai.assert.strictEqual(wrapper.instance().value, '');
  });
  describe('prop: textareaRef', function () {
    it('should be able to access the native textarea', function () {
      var handleRef = (0, _sinon.spy)();
      mount(_react.default.createElement(_Textarea.default, {
        textareaRef: handleRef
      }));

      _chai.assert.strictEqual(handleRef.callCount, 1);
    });
  });
  describe('prop: onChange', function () {
    it('should be call the callback', function () {
      var handleChange = (0, _sinon.spy)();
      var wrapper = shallow(_react.default.createElement(_Textarea.default, {
        value: "x",
        onChange: handleChange
      }));

      _chai.assert.strictEqual(wrapper.find('textarea').length, 3);

      var refs = assignRefs(wrapper);
      var event = {
        target: {
          value: 'xx'
        }
      };
      refs.input.simulate('change', event);

      _chai.assert.strictEqual(wrapper.instance().value, 'xx');

      _chai.assert.strictEqual(handleChange.callCount, 1);

      _chai.assert.deepEqual(handleChange.args[0], [event]);
    });
  });
  describe('resize', function () {
    var clock;
    before(function () {
      clock = (0, _sinon.useFakeTimers)();
    });
    after(function () {
      clock.restore();
    });
    it('should handle the resize event', function () {
      var wrapper = shallow(_ref4);
      var refs = assignRefs(wrapper);
      refs.textareaShadow.scrollHeight = 43;
      refs.singlelineShadow.scrollHeight = 43;
      wrapper.find('EventListener').at(0).simulate('resize');

      _chai.assert.strictEqual(wrapper.state().height, 19);

      clock.tick(166);

      _chai.assert.strictEqual(wrapper.state().height, 43);
    });
  });
});