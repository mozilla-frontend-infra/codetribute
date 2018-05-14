"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _sinon = require("sinon");

var _chai = require("chai");

var _testUtils = require("../test-utils");

var _Input = _interopRequireDefault(require("../Input"));

var _Select = _interopRequireDefault(require("../Select"));

var _FormControl = _interopRequireDefault(require("./FormControl"));

var _ref = _react.default.createElement(_FormControl.default, null);

var _ref2 = _react.default.createElement(_FormControl.default, {
  className: "woofFormControl"
});

var _ref3 = _react.default.createElement(_FormControl.default, {
  className: "woofFormControl"
});

var _ref4 = _react.default.createElement(_FormControl.default, null);

var _ref5 = _react.default.createElement(_FormControl.default, {
  margin: "normal"
});

var _ref6 = _react.default.createElement(_FormControl.default, {
  margin: "dense"
});

var _ref7 = _react.default.createElement(_FormControl.default, null);

var _ref8 = _react.default.createElement(_FormControl.default, {
  required: true
});

var _ref9 = _react.default.createElement(_FormControl.default, null, _react.default.createElement(_Input.default, {
  value: "bar"
}));

var _ref10 = _react.default.createElement(_FormControl.default, null, _react.default.createElement(_Input.default, {
  defaultValue: "bar"
}));

var _ref11 = _react.default.createElement(_FormControl.default, null, _react.default.createElement(_Input.default, {
  endAdornment: _react.default.createElement("div", null)
}));

var _ref12 = _react.default.createElement(_FormControl.default, null, _react.default.createElement(_Input.default, {
  startAdornment: _react.default.createElement("div", null)
}));

var _ref13 = _react.default.createElement(_FormControl.default, null, _react.default.createElement(_Select.default, {
  value: ""
}));

var _ref14 = _react.default.createElement(_FormControl.default, null, _react.default.createElement(_Select.default, {
  value: "",
  input: _react.default.createElement(_Input.default, {
    startAdornment: _react.default.createElement("div", null)
  })
}));

var _ref15 = _react.default.createElement(_FormControl.default, null);

describe('<FormControl />', function () {
  var shallow;
  var classes;
  before(function () {
    shallow = (0, _testUtils.createShallow)({
      dive: true
    });
    classes = (0, _testUtils.getClasses)(_ref);
  });
  describe('initial state', function () {
    it('should render a div with the root and user classes', function () {
      var wrapper = shallow(_ref2);

      _chai.assert.strictEqual(wrapper.name(), 'div');

      _chai.assert.strictEqual(wrapper.hasClass(classes.root), true);

      _chai.assert.strictEqual(wrapper.hasClass('woofFormControl'), true);
    });
    it('should have the focused class', function () {
      var wrapper = shallow(_ref3);

      _chai.assert.strictEqual(wrapper.name(), 'div');

      _chai.assert.strictEqual(wrapper.hasClass(classes.root), true);

      _chai.assert.strictEqual(wrapper.hasClass('woofFormControl'), true);
    });
    it('should have no margin', function () {
      var wrapper = shallow(_ref4);

      _chai.assert.strictEqual(wrapper.name(), 'div');

      _chai.assert.strictEqual(wrapper.hasClass(classes.marginNormal), false);

      _chai.assert.strictEqual(wrapper.hasClass(classes.marginDense), false);
    });
    it('should have the margin normal class', function () {
      var wrapper = shallow(_ref5);

      _chai.assert.strictEqual(wrapper.name(), 'div');

      _chai.assert.strictEqual(wrapper.hasClass(classes.marginNormal), true);
    });
    it('should have the margin dense class', function () {
      var wrapper = shallow(_ref6);

      _chai.assert.strictEqual(wrapper.name(), 'div');

      _chai.assert.strictEqual(wrapper.hasClass(classes.marginDense), true);

      _chai.assert.strictEqual(wrapper.hasClass(classes.marginNormal), false);
    });
  });
  describe('initial state', function () {
    var wrapper;
    beforeEach(function () {
      wrapper = shallow(_ref7);
    });
    it('should not be filled initially', function () {
      _chai.assert.strictEqual(wrapper.state().filled, false);
    });
    it('should not be focused initially', function () {
      _chai.assert.strictEqual(wrapper.state().focused, false);
    });
  });
  describe('prop: required', function () {
    it('should not apply it to the DOM', function () {
      var wrapper = shallow(_ref8);

      _chai.assert.strictEqual(wrapper.props().required, undefined);
    });
  });
  describe('input', function () {
    it('should be filled with a value', function () {
      var wrapper = shallow(_ref9);

      _chai.assert.strictEqual(wrapper.state().filled, true);
    });
    it('should be filled with a defaultValue', function () {
      var wrapper = shallow(_ref10);

      _chai.assert.strictEqual(wrapper.state().filled, true);
    });
    it('should be adorned with an endAdornment', function () {
      var wrapper = shallow(_ref11);

      _chai.assert.strictEqual(wrapper.state().adornedStart, false);
    });
    it('should be adorned with a startAdornment', function () {
      var wrapper = shallow(_ref12);

      _chai.assert.strictEqual(wrapper.state().adornedStart, true);
    });
  });
  describe('select', function () {
    it('should not be adorned without a startAdornment', function () {
      var wrapper = shallow(_ref13);

      _chai.assert.strictEqual(wrapper.state().adornedStart, false);
    });
    it('should be adorned with a startAdornment', function () {
      var wrapper = shallow(_ref14);

      _chai.assert.strictEqual(wrapper.state().adornedStart, true);
    });
  });
  describe('muiFormControl child context', function () {
    var wrapper;
    var muiFormControlContext;

    function loadChildContext() {
      muiFormControlContext = wrapper.instance().getChildContext().muiFormControl;
    }

    beforeEach(function () {
      wrapper = shallow(_ref15);
      loadChildContext();
    });
    describe('from state', function () {
      it('should have the filled state from the instance', function () {
        _chai.assert.strictEqual(muiFormControlContext.filled, false);

        wrapper.setState({
          filled: true
        });
        loadChildContext();

        _chai.assert.strictEqual(muiFormControlContext.filled, true);
      });
      it('should have the focused state from the instance', function () {
        _chai.assert.strictEqual(muiFormControlContext.focused, false);

        wrapper.setState({
          focused: true
        });
        loadChildContext();

        _chai.assert.strictEqual(muiFormControlContext.focused, true);
      });
      it('should have the adornedStart state from the instance', function () {
        _chai.assert.strictEqual(muiFormControlContext.adornedStart, false);

        wrapper.setState({
          adornedStart: true
        });
        loadChildContext();

        _chai.assert.strictEqual(muiFormControlContext.adornedStart, true);
      });
    });
    describe('from props', function () {
      it('should have the required prop from the instance', function () {
        _chai.assert.strictEqual(muiFormControlContext.required, false);

        wrapper.setProps({
          required: true
        });
        loadChildContext();

        _chai.assert.strictEqual(muiFormControlContext.required, true);
      });
      it('should have the error prop from the instance', function () {
        _chai.assert.strictEqual(muiFormControlContext.error, false);

        wrapper.setProps({
          error: true
        });
        loadChildContext();

        _chai.assert.strictEqual(muiFormControlContext.error, true);
      });
      it('should have the margin prop from the instance', function () {
        _chai.assert.strictEqual(muiFormControlContext.margin, 'none');

        wrapper.setProps({
          margin: 'dense'
        });
        loadChildContext();

        _chai.assert.strictEqual(muiFormControlContext.margin, 'dense');
      });
    });
    describe('callbacks', function () {
      describe('onFilled', function () {
        it('should set the filled state', function () {
          _chai.assert.strictEqual(muiFormControlContext.filled, false);

          muiFormControlContext.onFilled();
          loadChildContext();

          _chai.assert.strictEqual(muiFormControlContext.filled, true);

          muiFormControlContext.onFilled();

          _chai.assert.strictEqual(muiFormControlContext.filled, true);
        });
      });
      describe('onEmpty', function () {
        it('should clean the filled state', function () {
          muiFormControlContext.onFilled();
          loadChildContext();

          _chai.assert.strictEqual(muiFormControlContext.filled, true);

          muiFormControlContext.onEmpty();
          loadChildContext();

          _chai.assert.strictEqual(muiFormControlContext.filled, false);

          muiFormControlContext.onEmpty();

          _chai.assert.strictEqual(muiFormControlContext.filled, false);
        });
      });
      describe('handleFocus', function () {
        it('should set the focused state', function () {
          _chai.assert.strictEqual(wrapper.state('focused'), false);

          muiFormControlContext.onFocus();

          _chai.assert.strictEqual(wrapper.state('focused'), true);

          muiFormControlContext.onFocus();

          _chai.assert.strictEqual(wrapper.state('focused'), true);
        });
        it('should be able to use a onFocus property', function () {
          var handleFocus = (0, _sinon.spy)();
          wrapper.setProps({
            onFocus: handleFocus
          });
          muiFormControlContext.onFocus();

          _chai.assert.strictEqual(handleFocus.callCount, 1);
        });
      });
      describe('handleBlur', function () {
        it('should clear the focused state', function () {
          _chai.assert.strictEqual(wrapper.state('focused'), false);

          muiFormControlContext.onFocus();

          _chai.assert.strictEqual(wrapper.state('focused'), true);

          muiFormControlContext.onBlur();

          _chai.assert.strictEqual(wrapper.state('focused'), false);

          muiFormControlContext.onBlur();

          _chai.assert.strictEqual(wrapper.state('focused'), false);
        });
        it('should be able to use a onBlur property', function () {
          var handleBlur = (0, _sinon.spy)();
          wrapper.setProps({
            onBlur: handleBlur
          });
          muiFormControlContext.onFocus();
          muiFormControlContext.onBlur({});

          _chai.assert.strictEqual(handleBlur.callCount, 1);
        });
      });
    });
  });
});