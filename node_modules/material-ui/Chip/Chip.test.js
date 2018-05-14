"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _keycode = _interopRequireDefault(require("keycode"));

var _chai = require("chai");

var _sinon = require("sinon");

var _CheckBox = _interopRequireDefault(require("../internal/svg-icons/CheckBox"));

var _Cancel = _interopRequireDefault(require("../internal/svg-icons/Cancel"));

var _testUtils = require("../test-utils");

var _Avatar = _interopRequireDefault(require("../Avatar"));

var _Chip = _interopRequireDefault(require("./Chip"));

var _ref = _react.default.createElement(_Chip.default, null);

var _ref2 = _react.default.createElement(_Chip.default, {
  className: "my-Chip",
  "data-my-prop": "woofChip"
}, "Text Chip");

var _ref4 = _react.default.createElement(_Avatar.default, {
  className: "my-Avatar",
  "data-my-prop": "woofChip"
}, "MB");

var _ref5 = _react.default.createElement(_CheckBox.default, null);

var _ref6 = _react.default.createElement("input", {
  className: "child-input"
});

describe('<Chip />', function () {
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
  describe('text only', function () {
    var wrapper;
    before(function () {
      wrapper = shallow(_ref2);
    });
    it('should render a div containing a span', function () {
      _chai.assert.strictEqual(wrapper.name(), 'div');

      _chai.assert.strictEqual(wrapper.childAt(0).is('span'), true, 'should be a span');
    });
    it('should merge user classes & spread custom props to the root node', function () {
      _chai.assert.strictEqual(wrapper.hasClass(classes.root), true);

      _chai.assert.strictEqual(wrapper.hasClass('my-Chip'), true);

      _chai.assert.strictEqual(wrapper.prop('data-my-prop'), 'woofChip');
    });
    it('should have a tabIndex prop with value -1', function () {
      _chai.assert.strictEqual(wrapper.props().tabIndex, -1);
    });
  });
  describe('clickable text chip', function () {
    var wrapper;
    var handleClick;

    var _ref3 = _react.default.createElement(_Chip.default, {
      className: "my-Chip",
      "data-my-prop": "woofChip",
      onClick: handleClick
    }, "Text Chip");

    before(function () {
      handleClick = function handleClick() {};

      wrapper = shallow(_ref3);
    });
    it('should render a div containing a span', function () {
      _chai.assert.strictEqual(wrapper.name(), 'div');

      _chai.assert.strictEqual(wrapper.childAt(0).is('span'), true, 'should be a span');
    });
    it('should merge user classes & spread custom props to the root node', function () {
      _chai.assert.strictEqual(wrapper.hasClass(classes.root), true);

      _chai.assert.strictEqual(wrapper.hasClass('my-Chip'), true);

      _chai.assert.strictEqual(wrapper.prop('data-my-prop'), 'woofChip');

      _chai.assert.strictEqual(wrapper.props().onClick, handleClick);
    });
    it('should have a tabIndex prop', function () {
      _chai.assert.strictEqual(wrapper.props().tabIndex, 0);
    });
    it('should apply user value of tabIndex', function () {
      wrapper = shallow( // eslint-disable-next-line jsx-a11y/tabindex-no-positive
      _react.default.createElement(_Chip.default, {
        onClick: function onClick() {},
        tabIndex: 5
      }, 'Text Chip'));

      _chai.assert.strictEqual(wrapper.props().tabIndex, 5);
    });
  });
  describe('deletable Avatar chip', function () {
    var wrapper;
    before(function () {
      wrapper = shallow(_react.default.createElement(_Chip.default, {
        avatar: _ref4,
        label: "Text Avatar Chip",
        onDelete: function onDelete() {},
        className: "my-Chip",
        "data-my-prop": "woofChip"
      }));
    });
    it('should render a div containing an Avatar, span and svg', function () {
      _chai.assert.strictEqual(wrapper.name(), 'div');

      _chai.assert.strictEqual(wrapper.childAt(0).is(_Avatar.default), true, 'should have an Avatar');

      _chai.assert.strictEqual(wrapper.childAt(1).is('span'), true, 'should have a span');

      _chai.assert.strictEqual(wrapper.childAt(2).is('pure(Cancel)'), true, 'should be an svg icon');
    });
    it('should merge user classes & spread custom props to the root node', function () {
      _chai.assert.strictEqual(wrapper.hasClass(classes.root), true);

      _chai.assert.strictEqual(wrapper.hasClass('my-Chip'), true);

      _chai.assert.strictEqual(wrapper.props()['data-my-prop'], 'woofChip');
    });
    it('should merge user classes & spread custom props to the Avatar node', function () {
      _chai.assert.strictEqual(wrapper.childAt(0).hasClass(classes.avatar), true);

      _chai.assert.strictEqual(wrapper.childAt(0).hasClass('my-Avatar'), true);

      _chai.assert.strictEqual(wrapper.childAt(0).props()['data-my-prop'], 'woofChip');
    });
    it('should have a tabIndex prop', function () {
      _chai.assert.strictEqual(wrapper.props().tabIndex, 0);
    });
    it('should fire the function given in onDeleteRequest', function () {
      var onDeleteSpy = (0, _sinon.spy)();
      wrapper.setProps({
        onDelete: onDeleteSpy
      });
      wrapper.find('pure(Cancel)').simulate('click', {
        stopPropagation: function stopPropagation() {}
      });

      _chai.assert.strictEqual(onDeleteSpy.callCount, 1, 'should have called the onDelete handler');
    });
    it('should stop propagation in onDeleteRequest', function () {
      var onDeleteSpy = (0, _sinon.spy)();
      var stopPropagationSpy = (0, _sinon.spy)();
      wrapper.setProps({
        onDelete: onDeleteSpy
      });
      wrapper.find('pure(Cancel)').simulate('click', {
        stopPropagation: stopPropagationSpy
      });

      _chai.assert.strictEqual(stopPropagationSpy.callCount, 1, 'should have called the stopPropagation handler');
    });
  });
  describe('prop: deleteIcon', function () {
    it('should fire the function given in onDeleteRequest', function () {
      var wrapper = shallow(_react.default.createElement(_Chip.default, {
        label: "Custom delete icon Chip",
        onDelete: function onDelete() {},
        deleteIcon: _ref5
      }));
      var onDeleteSpy = (0, _sinon.spy)();
      wrapper.setProps({
        onDelete: onDeleteSpy
      });
      wrapper.find(_CheckBox.default).simulate('click', {
        stopPropagation: function stopPropagation() {}
      });

      _chai.assert.strictEqual(onDeleteSpy.callCount, 1, 'should have called the onDelete handler');
    });
    it('should render a default icon', function () {
      var wrapper = mount(_react.default.createElement(_Chip.default, {
        label: "Custom delete icon Chip",
        onDelete: function onDelete() {}
      }));

      _chai.assert.strictEqual(wrapper.find(_Cancel.default).length, 1);
    });
  });
  describe('reacts to keyboard chip', function () {
    var ChipNaked = (0, _testUtils.unwrap)(_Chip.default);
    var wrapper;
    describe('onKeyDown is defined', function () {
      it('should call onKeyDown when a key is pressed', function () {
        var anyKeydownEvent = {
          keycode: (0, _keycode.default)('p')
        };
        var onKeyDownSpy = (0, _sinon.spy)();
        wrapper = mount(_react.default.createElement(_Chip.default, {
          classes: {},
          onKeyDown: onKeyDownSpy
        }, "Text Chip"));
        wrapper.find('div').simulate('keydown', anyKeydownEvent);

        _chai.assert.strictEqual(onKeyDownSpy.callCount, 1, 'should have called onKeyDown');

        _chai.assert.strictEqual(onKeyDownSpy.args[0][0].keyCode, anyKeydownEvent.keyCode, 'should have same keyCode');
      });
    });
    describe('escape', function () {
      it('should unfocus when a esc key is pressed', function () {
        var wrapper2 = mount(_react.default.createElement(ChipNaked, {
          classes: {}
        }, "Text Chip"));
        var handleBlur = (0, _sinon.spy)();
        wrapper2.instance().chipRef.blur = handleBlur;
        wrapper2.find('div').simulate('keydown', {
          preventDefault: function preventDefault() {},
          keyCode: (0, _keycode.default)('esc')
        });

        _chai.assert.strictEqual(handleBlur.callCount, 1);
      });
    });
    describe('onClick is defined', function () {
      var onClickSpy;
      before(function () {
        onClickSpy = (0, _sinon.spy)();
        wrapper = mount(_react.default.createElement(ChipNaked, {
          classes: {},
          onClick: onClickSpy
        }, "Text Chip"));
      });
      afterEach(function () {
        onClickSpy.resetHistory();
      });
      it('should call onClick when `space` is pressed ', function () {
        var preventDefaultSpy = (0, _sinon.spy)();
        var spaceKeydownEvent = {
          preventDefault: preventDefaultSpy,
          keyCode: (0, _keycode.default)('space')
        };
        wrapper.find('div').simulate('keydown', spaceKeydownEvent);

        _chai.assert.strictEqual(preventDefaultSpy.callCount, 1, 'should have stopped event propagation');

        _chai.assert.strictEqual(onClickSpy.callCount, 1, 'should have called onClick');

        _chai.assert.strictEqual(onClickSpy.args[0][0].keyCode, spaceKeydownEvent.keyCode);
      });
      it('should call onClick when `enter` is pressed ', function () {
        var preventDefaultSpy = (0, _sinon.spy)();
        var enterKeydownEvent = {
          preventDefault: preventDefaultSpy,
          keyCode: (0, _keycode.default)('enter')
        };
        wrapper.find('div').simulate('keydown', enterKeydownEvent);

        _chai.assert.strictEqual(preventDefaultSpy.callCount, 1, 'should have stopped event propagation');

        _chai.assert.strictEqual(onClickSpy.callCount, 1, 'should have called onClick');

        _chai.assert.strictEqual(onClickSpy.args[0][0].keyCode, enterKeydownEvent.keyCode);
      });
    });
    describe('onDelete is defined and `backspace` is pressed', function () {
      it('should call onDelete', function () {
        var onDeleteSpy = (0, _sinon.spy)();
        var wrapper2 = mount(_react.default.createElement(ChipNaked, {
          classes: {},
          onDelete: onDeleteSpy
        }, "Text Chip"));
        var preventDefaultSpy = (0, _sinon.spy)();
        var backspaceKeydownEvent = {
          preventDefault: preventDefaultSpy,
          keyCode: (0, _keycode.default)('backspace')
        };
        wrapper2.find('div').simulate('keydown', backspaceKeydownEvent);

        _chai.assert.strictEqual(preventDefaultSpy.callCount, 1, 'should have stopped event propagation');

        _chai.assert.strictEqual(onDeleteSpy.callCount, 1, 'should have called onClick');

        _chai.assert.strictEqual(onDeleteSpy.args[0][0].keyCode, backspaceKeydownEvent.keyCode);
      });
    });
    describe('has children that generate events', function () {
      var onClickSpy;
      var onDeleteSpy;
      var onKeyDownSpy;
      before(function () {
        onClickSpy = (0, _sinon.spy)();
        onDeleteSpy = (0, _sinon.spy)();
        onKeyDownSpy = (0, _sinon.spy)();
        wrapper = mount(_react.default.createElement(_Chip.default, {
          classes: {},
          onClick: onClickSpy,
          onDelete: onDeleteSpy,
          onKeyDown: onKeyDownSpy,
          label: _ref6
        }));
      });
      afterEach(function () {
        onClickSpy.resetHistory();
        onDeleteSpy.resetHistory();
      });
      it('should not call onDelete for child event', function () {
        wrapper.find('.child-input').simulate('keydown', {
          keyCode: (0, _keycode.default)('backspace')
        });

        _chai.assert.strictEqual(onDeleteSpy.notCalled, true);
      });
      it('should not call onClick for child event when `space` is pressed', function () {
        wrapper.find('.child-input').simulate('keydown', {
          keyCode: (0, _keycode.default)('space')
        });

        _chai.assert.strictEqual(onClickSpy.notCalled, true);
      });
      it('should not call onClick for child event when `enter` is pressed', function () {
        wrapper.find('.child-input').simulate('keydown', {
          keyCode: (0, _keycode.default)('enter')
        });

        _chai.assert.strictEqual(onClickSpy.notCalled, true);
      });
      it('should not call onKeyDown for child event', function () {
        wrapper.find('.child-input').simulate('keydown', {
          keyCode: (0, _keycode.default)('p')
        });

        _chai.assert.strictEqual(onKeyDownSpy.notCalled, true);
      });
    });
  });
});