"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _getPrototypeOf = _interopRequireDefault(require("@babel/runtime/core-js/object/get-prototype-of"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireDefault(require("react"));

var _sinon = require("sinon");

var _chai = require("chai");

var _JssProvider = _interopRequireDefault(require("react-jss/lib/JssProvider"));

var _jss = require("jss");

var _consoleErrorMock = _interopRequireDefault(require("test/utils/consoleErrorMock"));

var _jssPreset = _interopRequireDefault(require("./jssPreset"));

var _withStyles = _interopRequireDefault(require("./withStyles"));

var _MuiThemeProvider = _interopRequireDefault(require("./MuiThemeProvider"));

var _createMuiTheme = _interopRequireDefault(require("./createMuiTheme"));

var _createGenerateClassName = _interopRequireDefault(require("./createGenerateClassName"));

var _testUtils = require("../test-utils");

var _ref = _react.default.createElement("div", null);

// eslint-disable-next-line react/prefer-stateless-function
var Empty =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(Empty, _React$Component);

  function Empty() {
    (0, _classCallCheck2.default)(this, Empty);
    return (0, _possibleConstructorReturn2.default)(this, (Empty.__proto__ || (0, _getPrototypeOf.default)(Empty)).apply(this, arguments));
  }

  (0, _createClass2.default)(Empty, [{
    key: "render",
    value: function render() {
      return _ref;
    }
  }]);
  return Empty;
}(_react.default.Component);

describe('withStyles', function () {
  var shallow;
  var mount;
  before(function () {
    shallow = (0, _testUtils.createShallow)();
    mount = (0, _testUtils.createMount)();
  });
  after(function () {
    mount.cleanUp();
  });
  describe('props', function () {
    var StyledComponent1;
    var classes;

    var _ref2 = _react.default.createElement(StyledComponent1, null);

    before(function () {
      var styles = {
        root: {
          display: 'flex'
        }
      };
      StyledComponent1 = (0, _withStyles.default)(styles, {
        name: 'MuiTextField'
      })(Empty);
      classes = (0, _testUtils.getClasses)(_ref2);
    });

    var _ref3 = _react.default.createElement(StyledComponent1, null);

    it('should provide a classes property', function () {
      var wrapper = shallow(_ref3);

      _chai.assert.deepEqual(wrapper.props().classes, classes, 'Should provide the classes property');
    });
    describe('prop: classes', function () {
      before(function () {
        _consoleErrorMock.default.spy();
      });
      after(function () {
        _consoleErrorMock.default.reset();
      });
      it('should accept a classes property', function () {
        var wrapper = shallow(_react.default.createElement(StyledComponent1, {
          classes: {
            root: 'h1'
          }
        }));

        _chai.assert.deepEqual(wrapper.props().classes, {
          root: "".concat(classes.root, " h1")
        });

        _chai.assert.strictEqual(_consoleErrorMock.default.callCount(), 0);
      });
      it('should ignore undefined property', function () {
        var wrapper = shallow(_react.default.createElement(StyledComponent1, {
          classes: {
            root: undefined
          }
        }));

        _chai.assert.deepEqual(wrapper.props().classes, {
          root: classes.root
        });

        _chai.assert.strictEqual(_consoleErrorMock.default.callCount(), 0);
      });
      it('should warn if providing a unknown key', function () {
        var wrapper = shallow(_react.default.createElement(StyledComponent1, {
          classes: {
            bar: 'foo'
          }
        }));

        _chai.assert.deepEqual(wrapper.props().classes, {
          root: classes.root,
          bar: 'undefined foo'
        });

        _chai.assert.strictEqual(_consoleErrorMock.default.callCount(), 1);

        _chai.assert.match(_consoleErrorMock.default.args()[0][0], /Material-UI: the key `bar` provided to the classes property is not implemented/);
      });
      it('should warn if providing a non string', function () {
        var wrapper = shallow(_react.default.createElement(StyledComponent1, {
          classes: {
            root: {}
          }
        }));

        _chai.assert.deepEqual(wrapper.props().classes, {
          root: "".concat(classes.root, " [object Object]")
        });

        _chai.assert.strictEqual(_consoleErrorMock.default.callCount(), 2);

        _chai.assert.match(_consoleErrorMock.default.args()[1][0], /Material-UI: the key `root` provided to the classes property is not valid/);
      });
    });
    describe('prop: innerRef', function () {
      it('should provide a ref on the inner component', function () {
        var handleRef = (0, _sinon.spy)();
        mount(_react.default.createElement(StyledComponent1, {
          innerRef: handleRef
        }));

        _chai.assert.strictEqual(handleRef.callCount, 1);
      });
    });

    var _ref4 = _react.default.createElement(StyledComponent1, null);

    describe('cache', function () {
      it('should recycle with no classes property', function () {
        var wrapper = mount(_ref4);
        var classes1 = wrapper.find(Empty).props().classes;
        wrapper.update();
        var classes2 = wrapper.find(Empty).props().classes;

        _chai.assert.strictEqual(classes1, classes2);
      });
      it('should recycle even when a classes property is provided', function () {
        var inputClasses = {
          root: 'foo'
        };
        var wrapper = mount(_react.default.createElement(StyledComponent1, {
          classes: inputClasses
        }));
        var classes1 = wrapper.find(Empty).props().classes;
        wrapper.setProps({
          classes: inputClasses
        });
        var classes2 = wrapper.find(Empty).props().classes;

        _chai.assert.strictEqual(classes1, classes2);
      });
      it('should invalidate the cache', function () {
        var wrapper = mount(_react.default.createElement(StyledComponent1, {
          classes: {
            root: 'foo'
          }
        }));
        var classes1 = wrapper.find(Empty).props().classes;

        _chai.assert.deepEqual(classes1, {
          root: "".concat(classes.root, " foo")
        });

        wrapper.setProps({
          classes: {
            root: 'bar'
          }
        });
        var classes2 = wrapper.find(Empty).props().classes;

        _chai.assert.notStrictEqual(classes1, classes2);

        _chai.assert.deepEqual(classes2, {
          root: "".concat(classes.root, " bar")
        });
      });
    });
  });
  describe('mount', function () {
    var sheetsRegistry;
    var jss;
    var generateClassName;
    beforeEach(function () {
      jss = (0, _jss.create)((0, _jssPreset.default)());
      generateClassName = (0, _createGenerateClassName.default)();
      sheetsRegistry = new _jss.SheetsRegistry();
    });
    it('should run lifecycles with no theme', function () {
      var styles = {
        root: {
          display: 'flex'
        }
      };
      var StyledComponent = (0, _withStyles.default)(styles)(Empty);
      var wrapper = mount(_react.default.createElement(_MuiThemeProvider.default, {
        theme: (0, _createMuiTheme.default)()
      }, _react.default.createElement(_JssProvider.default, {
        registry: sheetsRegistry,
        jss: jss,
        generateClassName: generateClassName
      }, _react.default.createElement(StyledComponent, null))));

      _chai.assert.strictEqual(sheetsRegistry.registry.length, 1);

      _chai.assert.deepEqual(sheetsRegistry.registry[0].classes, {
        root: 'Empty-root-1'
      });

      wrapper.update();

      _chai.assert.strictEqual(sheetsRegistry.registry.length, 1, 'should only attach once');

      _chai.assert.deepEqual(sheetsRegistry.registry[0].classes, {
        root: 'Empty-root-1'
      });

      wrapper.setProps({
        theme: (0, _createMuiTheme.default)()
      });

      _chai.assert.strictEqual(sheetsRegistry.registry.length, 1, 'should only attach once');

      _chai.assert.deepEqual(sheetsRegistry.registry[0].classes, {
        root: 'Empty-root-1'
      });

      wrapper.unmount();

      _chai.assert.strictEqual(sheetsRegistry.registry.length, 0);
    });
    it('should work when depending on a theme', function () {
      var styles = function styles(theme) {
        return {
          root: {
            padding: theme.spacing.unit
          }
        };
      };

      var StyledComponent = (0, _withStyles.default)(styles, {
        name: 'MuiTextField'
      })(Empty);
      var wrapper = mount(_react.default.createElement(_MuiThemeProvider.default, {
        theme: (0, _createMuiTheme.default)()
      }, _react.default.createElement(_JssProvider.default, {
        registry: sheetsRegistry,
        jss: jss,
        generateClassName: generateClassName
      }, _react.default.createElement(StyledComponent, null))));

      _chai.assert.strictEqual(sheetsRegistry.registry.length, 1, 'should only attach once');

      _chai.assert.deepEqual(sheetsRegistry.registry[0].classes, {
        root: 'MuiTextField-root-1'
      });

      wrapper.setProps({
        theme: (0, _createMuiTheme.default)()
      });

      _chai.assert.strictEqual(sheetsRegistry.registry.length, 1, 'should only attach once');

      _chai.assert.deepEqual(sheetsRegistry.registry[0].classes, {
        root: 'MuiTextField-root-2'
      });
    });
    it('should support the overrides key', function () {
      var styles = {
        root: {
          padding: 8
        }
      };
      var StyledComponent = (0, _withStyles.default)(styles, {
        name: 'MuiTextField'
      })(Empty);
      mount(_react.default.createElement(_MuiThemeProvider.default, {
        theme: (0, _createMuiTheme.default)({
          overrides: {
            MuiTextField: {
              root: {
                padding: 9
              }
            }
          }
        })
      }, _react.default.createElement(_JssProvider.default, {
        registry: sheetsRegistry,
        jss: jss,
        generateClassName: generateClassName
      }, _react.default.createElement(StyledComponent, null))));

      _chai.assert.strictEqual(sheetsRegistry.registry.length, 1, 'should only attach once');

      _chai.assert.deepEqual(sheetsRegistry.registry[0].rules.raw, {
        root: {
          padding: 9
        }
      });
    });
    describe('options: disableStylesGeneration', function () {
      it('should not generate the styles', function () {
        var styles = {
          root: {
            display: 'flex'
          }
        };
        var StyledComponent = (0, _withStyles.default)(styles)(Empty);
        var wrapper = mount(_react.default.createElement(_MuiThemeProvider.default, {
          theme: (0, _createMuiTheme.default)(),
          disableStylesGeneration: true
        }, _react.default.createElement(_JssProvider.default, {
          registry: sheetsRegistry,
          jss: jss,
          generateClassName: generateClassName
        }, _react.default.createElement(StyledComponent, null))));

        _chai.assert.strictEqual(sheetsRegistry.registry.length, 0);

        _chai.assert.deepEqual(wrapper.find(Empty).props().classes, {});

        wrapper.unmount();

        _chai.assert.strictEqual(sheetsRegistry.registry.length, 0);
      });
    });
  });
  describe('HMR with same state', function () {
    it('should take the new stylesCreator into account', function () {
      var styles1 = {
        root: {
          padding: 1
        }
      };
      var StyledComponent1 = (0, _withStyles.default)(styles1, {
        name: 'MuiTextField'
      })(Empty);
      var wrapper = mount(_react.default.createElement(StyledComponent1, null));
      var styles2 = {
        root: {
          padding: 2
        }
      };
      var StyledComponent2 = (0, _withStyles.default)(styles2, {
        name: 'MuiTextField'
      })(Empty); // Simulate react-hot-loader behavior

      wrapper.instance().componentDidUpdate = StyledComponent2.prototype.componentDidUpdate;
      var classes1 = wrapper.childAt(0).props().classes.root;
      wrapper.setProps({});
      wrapper.update();
      var classes2 = wrapper.childAt(0).props().classes.root;

      _chai.assert.notStrictEqual(classes1, classes2, 'should generate new classes');
    });
  });
});