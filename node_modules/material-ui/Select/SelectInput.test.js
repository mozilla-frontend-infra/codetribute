"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _getPrototypeOf = _interopRequireDefault(require("@babel/runtime/core-js/object/get-prototype-of"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _chai = require("chai");

var _sinon = require("sinon");

var _keycode = _interopRequireDefault(require("keycode"));

var _consoleErrorMock = _interopRequireDefault(require("test/utils/consoleErrorMock"));

var _testUtils = require("../test-utils");

var _Menu = _interopRequireWildcard(require("../Menu"));

var _SelectInput = _interopRequireDefault(require("./SelectInput"));

var _ref = _react.default.createElement(_Menu.MenuItem, {
  key: 1,
  value: 10
}, "Ten");

var _ref2 = _react.default.createElement(_Menu.MenuItem, {
  key: 2,
  value: 20
}, "Twenty");

var _ref3 = _react.default.createElement(_Menu.MenuItem, {
  key: 3,
  value: 30
}, "Thirty");

var _ref4 = _react.default.createElement(_Menu.MenuItem, null);

var _ref5 = _react.default.createElement(_Menu.MenuItem, {
  value: ""
}, "Ten");

var _ref6 = _react.default.createElement(_Menu.MenuItem, {
  value: 20
}, "Twenty");

var _ref7 = _react.default.createElement(_Menu.MenuItem, {
  value: 30
}, "Thirty");

var _ref10 = _react.default.createElement(_Menu.MenuItem, null, "Hello");

var _ref11 = _react.default.createElement("option", {
  value: 10
}, "Ten");

var _ref12 = _react.default.createElement("option", {
  value: 20
}, "Twenty");

var _ref13 = _react.default.createElement("option", {
  value: 30
}, "Thirty");

var _ref14 = _react.default.createElement("option", {
  value: 10
}, "Ten");

var _ref15 = _react.default.createElement("option", {
  value: 20
}, "Twenty");

var _ref16 = _react.default.createElement("option", {
  value: 30
}, "Thirty");

describe('<SelectInput />', function () {
  var shallow;
  var mount;
  var defaultProps = {
    classes: {
      select: 'select'
    },
    autoWidth: false,
    value: 10,
    native: false,
    multiple: false,
    displayEmpty: false,
    IconComponent: 'div',
    children: [_ref, _ref2, _ref3]
  };
  before(function () {
    shallow = (0, _testUtils.createShallow)();
    mount = (0, _testUtils.createMount)();
  });
  after(function () {
    mount.cleanUp();
  });
  it('should render a correct top element', function () {
    var wrapper = shallow(_react.default.createElement(_SelectInput.default, defaultProps));

    _chai.assert.strictEqual(wrapper.name(), 'div');

    _chai.assert.strictEqual(wrapper.find(_Menu.MenuItem).at(0).props()['data-value'], 10);
  });
  it('should accept invalid child', function () {
    shallow(_react.default.createElement(_SelectInput.default, defaultProps, null, _ref4));
  });
  describe('prop: readOnly', function () {
    it('should not trigger any event with readOnly', function () {
      var wrapper = shallow(_react.default.createElement(_SelectInput.default, (0, _extends2.default)({}, defaultProps, {
        readOnly: true
      })));
      wrapper.find(".".concat(defaultProps.classes.select)).simulate('keyDown', {
        which: (0, _keycode.default)('down')
      });

      _chai.assert.strictEqual(wrapper.state().open, false);
    });
  });
  describe('prop: MenuProps', function () {
    it('should apply additional properties to the Menu component', function () {
      var wrapper = shallow(_react.default.createElement(_SelectInput.default, (0, _extends2.default)({}, defaultProps, {
        MenuProps: {
          transitionDuration: 100
        }
      })));

      _chai.assert.strictEqual(wrapper.find(_Menu.default).props().transitionDuration, 100);
    });
    it('should be able to override PaperProps minWidth', function () {
      var wrapper = shallow(_react.default.createElement(_SelectInput.default, (0, _extends2.default)({}, defaultProps, {
        MenuProps: {
          PaperProps: {
            style: {
              minWidth: 12
            }
          }
        }
      })));

      _chai.assert.strictEqual(wrapper.find(_Menu.default).props().PaperProps.style.minWidth, 12);
    });
  });
  describe('prop: SelectDisplayProps', function () {
    it('should apply additional properties to the clickable div element', function () {
      var wrapper = shallow(_react.default.createElement(_SelectInput.default, (0, _extends2.default)({}, defaultProps, {
        SelectDisplayProps: {
          'data-test': 'SelectDisplay'
        }
      })));
      var selectDisplay = wrapper.find('[data-mui-test="SelectDisplay"]');

      _chai.assert.strictEqual(selectDisplay.props()['data-test'], 'SelectDisplay');
    });
  });
  describe('prop: type', function () {
    it('should be hidden by default', function () {
      var wrapper = shallow(_react.default.createElement(_SelectInput.default, defaultProps));

      _chai.assert.strictEqual(wrapper.find('input').props().type, 'hidden');
    });
    it('should be able to override it', function () {
      var wrapper = shallow(_react.default.createElement(_SelectInput.default, (0, _extends2.default)({}, defaultProps, {
        type: "text"
      })));

      _chai.assert.strictEqual(wrapper.find('input').props().type, 'text');
    });
  });
  describe('prop: displayEmpty', function () {
    it('should display the selected item even if its value is empty', function () {
      var wrapper = shallow(_react.default.createElement(_SelectInput.default, (0, _extends2.default)({}, defaultProps, {
        value: "",
        displayEmpty: true
      }), _ref5, _ref6, _ref7));

      _chai.assert.strictEqual(wrapper.find(".".concat(defaultProps.classes.select)).text(), 'Ten');
    });
  });
  describe('prop: renderValue', function () {
    it('should use the property to render the value', function () {
      var renderValue = function renderValue(x) {
        return String(-x);
      };

      var wrapper = shallow(_react.default.createElement(_SelectInput.default, (0, _extends2.default)({}, defaultProps, {
        renderValue: renderValue
      })));

      _chai.assert.strictEqual(wrapper.find(".".concat(defaultProps.classes.select)).text(), '-10');
    });
  });
  describe('prop: native=false', function () {
    it('should provide a value', function () {
      _chai.assert.throw(function () {
        shallow(_react.default.createElement(_SelectInput.default, (0, _extends2.default)({}, defaultProps, {
          value: undefined
        })));
      }, /the `value` property is required/);
    });
    describe('prop: onChange', function () {
      var wrapper;
      var handleChange;
      var instance;
      beforeEach(function () {
        handleChange = (0, _sinon.spy)();
        wrapper = mount(_react.default.createElement(_SelectInput.default, (0, _extends2.default)({}, defaultProps, {
          onChange: handleChange,
          MenuProps: {
            transitionDuration: 0
          }
        })));
        instance = wrapper.instance();
      });
      it('should call onChange when clicking an item', function () {
        wrapper.find(".".concat(defaultProps.classes.select)).simulate('click');

        _chai.assert.strictEqual(wrapper.state().open, true);

        var portalLayer = wrapper.find('Portal').instance().getMountNode();
        portalLayer.querySelectorAll('li')[1].click();

        _chai.assert.strictEqual(wrapper.state().open, false);

        _chai.assert.strictEqual(handleChange.callCount, 1);

        _chai.assert.strictEqual(handleChange.args[0][0].target.value, 20);
      });
      it('should ignore onBlur the first time the menu is open', function () {
        var handleBlur = (0, _sinon.spy)();
        wrapper.setProps({
          onBlur: handleBlur
        });
        wrapper.find(".".concat(defaultProps.classes.select)).simulate('click');

        _chai.assert.strictEqual(wrapper.state().open, true);

        _chai.assert.strictEqual(instance.ignoreNextBlur, true);

        wrapper.find(".".concat(defaultProps.classes.select)).simulate('blur');

        _chai.assert.strictEqual(handleBlur.callCount, 0);

        _chai.assert.strictEqual(instance.ignoreNextBlur, false);

        wrapper.find(".".concat(defaultProps.classes.select)).simulate('blur');

        _chai.assert.strictEqual(handleBlur.callCount, 1);
      });
      ['space', 'up', 'down'].forEach(function (key) {
        it("'should open menu when pressed ".concat(key, " key on select"), function () {
          wrapper.find(".".concat(defaultProps.classes.select)).simulate('keyDown', {
            which: (0, _keycode.default)(key)
          });

          _chai.assert.strictEqual(wrapper.state().open, true);

          _chai.assert.strictEqual(instance.ignoreNextBlur, true);
        });
      });
      it('should call handleClose', function () {
        wrapper.find(".".concat(defaultProps.classes.select)).simulate('click');

        _chai.assert.strictEqual(wrapper.state().open, true);

        var portalLayer = wrapper.find('Portal').instance().getMountNode();
        var backdrop = portalLayer.querySelector('[data-mui-test="Backdrop"]');
        backdrop.click();

        _chai.assert.strictEqual(wrapper.state().open, false);
      });
    });
    describe('prop: open (controlled)', function () {
      var ControlledWrapper =
      /*#__PURE__*/
      function (_React$Component) {
        (0, _inherits2.default)(ControlledWrapper, _React$Component);

        function ControlledWrapper() {
          var _ref8;

          var _temp, _this;

          (0, _classCallCheck2.default)(this, ControlledWrapper);

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          return (0, _possibleConstructorReturn2.default)(_this, (_temp = _this = (0, _possibleConstructorReturn2.default)(this, (_ref8 = ControlledWrapper.__proto__ || (0, _getPrototypeOf.default)(ControlledWrapper)).call.apply(_ref8, [this].concat(args))), Object.defineProperty((0, _assertThisInitialized2.default)(_this), "state", {
            configurable: true,
            enumerable: true,
            writable: true,
            value: {
              open: false
            }
          }), _temp));
        }

        (0, _createClass2.default)(ControlledWrapper, [{
          key: "render",
          value: function render() {
            var _this2 = this;

            return _react.default.createElement(_SelectInput.default, (0, _extends2.default)({}, defaultProps, {
              open: this.state.open,
              onClose: function onClose() {
                return _this2.setState({
                  open: false
                });
              },
              onOpen: function onOpen() {
                return _this2.setState({
                  open: true
                });
              }
            }), _react.default.createElement(_Menu.MenuItem, {
              onClick: function onClick() {
                return _this2.setState({
                  open: false
                });
              }
            }, "close"));
          }
        }]);
        return ControlledWrapper;
      }(_react.default.Component);

      var _ref9 = _react.default.createElement(ControlledWrapper, null);

      it('should allow to control closing by passing onClose props', function () {
        var wrapper = mount(_ref9);
        wrapper.find(".".concat(defaultProps.classes.select)).simulate('click');

        _chai.assert.strictEqual(wrapper.state().open, true);

        wrapper.find(_Menu.MenuItem).simulate('click');

        _chai.assert.strictEqual(wrapper.state().open, false);
      });
      it('should work when open is initially true', function () {
        var element = _react.default.createElement(_SelectInput.default, (0, _extends2.default)({}, defaultProps, {
          open: true
        }), _ref10);

        var wrapper1 = shallow(element, {
          disableLifecycleMethods: true
        });

        _chai.assert.strictEqual(wrapper1.find(_Menu.default).props().open, false);

        var wrapper2 = mount(element);

        _chai.assert.strictEqual(wrapper2.find(_Menu.default).props().open, true);
      });
    });
  });
  describe('prop: native=true', function () {
    it('should render a native select', function () {
      var wrapper = shallow(_react.default.createElement(_SelectInput.default, (0, _extends2.default)({}, defaultProps, {
        native: true
      }), _ref11, _ref12, _ref13));

      _chai.assert.strictEqual(wrapper.find('select').props().value, 10);
    });
    it('should response to update event', function () {
      var handleChange = (0, _sinon.spy)();
      var wrapper = mount(_react.default.createElement(_SelectInput.default, (0, _extends2.default)({}, defaultProps, {
        native: true,
        onChange: handleChange
      }), _ref14, _ref15, _ref16));
      wrapper.find('select').simulate('change', {
        target: {
          value: 20
        }
      });

      _chai.assert.strictEqual(handleChange.callCount, 1);

      _chai.assert.strictEqual(handleChange.args[0][0].target.value, 20);
    });
  });
  describe('prop: autoWidth', function () {
    it('should take the anchor width into account', function () {
      var wrapper = shallow(_react.default.createElement(_SelectInput.default, defaultProps));
      wrapper.instance().displayNode = {
        clientWidth: 14
      };
      wrapper.setProps({});

      _chai.assert.strictEqual(wrapper.find(_Menu.default).props().PaperProps.style.minWidth, 14);
    });
    it('should not take the anchor width into account', function () {
      var wrapper = shallow(_react.default.createElement(_SelectInput.default, (0, _extends2.default)({}, defaultProps, {
        autoWidth: true
      })));
      wrapper.instance().displayNode = {
        clientWidth: 14
      };
      wrapper.setProps({});

      _chai.assert.strictEqual(wrapper.find(_Menu.default).props().PaperProps.style.minWidth, undefined);
    });
  });
  describe('prop: multiple', function () {
    it('should take precedence', function () {
      var wrapper = shallow(_react.default.createElement(_SelectInput.default, (0, _extends2.default)({}, defaultProps, {
        disabled: true,
        tabIndex: 0
      })));

      _chai.assert.strictEqual(wrapper.find('[data-mui-test="SelectDisplay"]').props().tabIndex, 0);
    });
  });
  describe('prop: multiple', function () {
    before(function () {
      _consoleErrorMock.default.spy();
    });
    after(function () {
      _consoleErrorMock.default.reset();
    });
    it('should serialize multiple select value', function () {
      var wrapper = shallow(_react.default.createElement(_SelectInput.default, (0, _extends2.default)({}, defaultProps, {
        value: [10, 30],
        multiple: true
      })));

      _chai.assert.strictEqual(wrapper.find('input').props().value, '10,30');

      _chai.assert.deepEqual(wrapper.find(_Menu.MenuItem).map(function (wrapper2) {
        return wrapper2.props().selected;
      }), [true, false, true]);
    });
    it('should throw if non array', function () {
      _chai.assert.throw(function () {
        shallow(_react.default.createElement(_SelectInput.default, (0, _extends2.default)({}, defaultProps, {
          multiple: true
        })));
      }, /the `value` property must be an array/);
    });
    it('should warn if the input is invalid', function () {
      shallow(_react.default.createElement(_SelectInput.default, (0, _extends2.default)({}, defaultProps, {
        multiple: true,
        native: true
      })));

      _chai.assert.match(_consoleErrorMock.default.args()[0][0], /Material-UI: you can not use the `native={true}` and `multiple={true}`/);
    });
    describe('prop: onChange', function () {
      var wrapper;
      var handleChange;
      beforeEach(function () {
        handleChange = (0, _sinon.spy)();
        wrapper = mount(_react.default.createElement(_SelectInput.default, (0, _extends2.default)({}, defaultProps, {
          multiple: true,
          value: [20, 30],
          name: "age",
          onChange: handleChange,
          MenuProps: {
            transitionDuration: 0
          }
        })));
      });
      it('should call onChange when clicking an item', function () {
        wrapper.find(".".concat(defaultProps.classes.select)).simulate('click');

        _chai.assert.strictEqual(wrapper.state().open, true);

        var portalLayer = wrapper.find('Portal').instance().getMountNode();
        portalLayer.querySelectorAll('li')[1].click();

        _chai.assert.strictEqual(wrapper.state().open, true);

        _chai.assert.strictEqual(handleChange.callCount, 1);

        _chai.assert.deepEqual(handleChange.args[0][0].target.value, [30]);

        _chai.assert.deepEqual(handleChange.args[0][0].target.name, 'age');

        wrapper.setProps({
          value: [30]
        });
        portalLayer.querySelectorAll('li')[0].click();

        _chai.assert.strictEqual(wrapper.state().open, true);

        _chai.assert.strictEqual(handleChange.callCount, 2);

        _chai.assert.deepEqual(handleChange.args[1][0].target.value, [30, 10]);
      });
    });
    describe('prop: autoFocus', function () {
      it('should focus select after SelectInput did mount', function () {
        mount(_react.default.createElement(_SelectInput.default, (0, _extends2.default)({}, defaultProps, {
          autoFocus: true
        })));

        _chai.assert.strictEqual(document.activeElement.className, "".concat(defaultProps.classes.select));
      });
    });
  });
});