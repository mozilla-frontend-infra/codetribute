"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _chai = require("chai");

var _testUtils = require("../test-utils");

var _ListItemText = _interopRequireDefault(require("./ListItemText"));

var _ListItemSecondaryAction = _interopRequireDefault(require("./ListItemSecondaryAction"));

var _ListItem = _interopRequireDefault(require("./ListItem"));

var _ListItemAvatar = _interopRequireDefault(require("./ListItemAvatar"));

var _Avatar = _interopRequireDefault(require("../Avatar"));

var _ButtonBase = _interopRequireDefault(require("../ButtonBase"));

var _ref = _react.default.createElement(_ListItem.default, null);

var _ref2 = _react.default.createElement(_ListItem.default, {
  component: "div"
});

var _ref3 = _react.default.createElement(_ListItem.default, null);

var _ref4 = _react.default.createElement(_ListItem.default, {
  className: "woofListItem"
});

var _ref5 = _react.default.createElement(_ListItem.default, {
  disableGutters: true
});

var _ref6 = _react.default.createElement(_ListItem.default, null, _react.default.createElement(_ListItemAvatar.default, null, _react.default.createElement(_Avatar.default, null)));

var _ref7 = _react.default.createElement(_ListItem.default, {
  button: true
});

var _ref8 = _react.default.createElement(_ListItem.default, {
  button: true,
  component: "a"
});

var _ref9 = _react.default.createElement(_ListItem.default, {
  button: true,
  component: "li"
});

var _ref10 = _react.default.createElement(_ListItem.default, null);

var _ref11 = _react.default.createElement(_ListItem.default, null, _react.default.createElement(_ListItemText.default, {
  primary: "primary"
}), _react.default.createElement(_ListItemSecondaryAction.default, null));

var _ref12 = _react.default.createElement(_ListItem.default, {
  component: "span"
}, _react.default.createElement(_ListItemText.default, {
  primary: "primary"
}), _react.default.createElement(_ListItemSecondaryAction.default, null));

var _ref13 = _react.default.createElement(_ListItem.default, {
  button: true
}, _react.default.createElement(_ListItemText.default, {
  primary: "primary"
}), _react.default.createElement(_ListItemSecondaryAction.default, null));

var _ref14 = _react.default.createElement(_ListItem.default, {
  ContainerComponent: "div"
}, _react.default.createElement(_ListItemText.default, {
  primary: "primary"
}), _react.default.createElement(_ListItemSecondaryAction.default, null));

var _ref15 = _react.default.createElement(_ListItemText.default, {
  primary: "primary"
});

var _ref16 = _react.default.createElement(_ListItemSecondaryAction.default, null);

describe('<ListItem />', function () {
  var shallow;
  var classes;
  before(function () {
    shallow = (0, _testUtils.createShallow)({
      dive: true
    });
    classes = (0, _testUtils.getClasses)(_ref);
  });
  it('should render a div', function () {
    var wrapper = shallow(_ref2);

    _chai.assert.strictEqual(wrapper.name(), 'div');
  });
  it('should render a li', function () {
    var wrapper = shallow(_ref3);

    _chai.assert.strictEqual(wrapper.name(), 'li');
  });
  it('should render with the user, root and gutters classes', function () {
    var wrapper = shallow(_ref4);

    _chai.assert.strictEqual(wrapper.hasClass('woofListItem'), true);

    _chai.assert.strictEqual(wrapper.hasClass(classes.root), true);

    _chai.assert.strictEqual(wrapper.hasClass(classes.gutters), true, 'should have the gutters class');
  });
  it('should disable the gutters', function () {
    var wrapper = shallow(_ref5);

    _chai.assert.strictEqual(wrapper.hasClass(classes.root), true);

    _chai.assert.strictEqual(wrapper.hasClass(classes.gutters), false, 'should not have the gutters class');
  });
  it('should use dense class when ListItemAvatar is present', function () {
    var wrapper = shallow(_ref6, {
      context: {
        dense: false
      }
    });

    _chai.assert.strictEqual(wrapper.hasClass(classes.dense), true);
  });
  describe('prop: button', function () {
    it('should render a div', function () {
      var wrapper = shallow(_ref7);

      _chai.assert.strictEqual(wrapper.props().component, 'div');
    });
  });
  describe('prop: component', function () {
    it('should change the component', function () {
      var wrapper = shallow(_ref8);

      _chai.assert.strictEqual(wrapper.props().component, 'a');
    });
    it('should change the component', function () {
      var wrapper = shallow(_ref9);

      _chai.assert.strictEqual(wrapper.props().component, 'li');
    });
  });
  describe('context: dense', function () {
    it('should forward the context', function () {
      var wrapper = shallow(_ref10);

      _chai.assert.strictEqual(wrapper.instance().getChildContext().dense, false, 'dense should be false by default');

      wrapper.setProps({
        dense: true
      });

      _chai.assert.strictEqual(wrapper.instance().getChildContext().dense, true, 'dense should be true when set');
    });
  });
  describe('secondary action', function () {
    it('should wrap with a container', function () {
      var wrapper = shallow(_ref11);

      _chai.assert.strictEqual(wrapper.hasClass(classes.container), true);

      _chai.assert.strictEqual(wrapper.type(), 'li');

      _chai.assert.strictEqual(wrapper.childAt(0).type(), 'div');
    });
    it('should accept a component property', function () {
      var wrapper = shallow(_ref12);

      _chai.assert.strictEqual(wrapper.hasClass(classes.container), true);

      _chai.assert.strictEqual(wrapper.type(), 'li');

      _chai.assert.strictEqual(wrapper.childAt(0).type(), 'span');
    });
    it('should accet a button property', function () {
      var wrapper = shallow(_ref13);

      _chai.assert.strictEqual(wrapper.hasClass(classes.container), true);

      _chai.assert.strictEqual(wrapper.type(), 'li');

      _chai.assert.strictEqual(wrapper.childAt(0).type(), _ButtonBase.default);
    });
    it('should accept a ContainerComponent property', function () {
      var wrapper = shallow(_ref14);

      _chai.assert.strictEqual(wrapper.hasClass(classes.container), true);

      _chai.assert.strictEqual(wrapper.type(), 'div');

      _chai.assert.strictEqual(wrapper.childAt(0).type(), 'div');
    });
    it('should allow customization of the wrapper', function () {
      var wrapper = shallow(_react.default.createElement(_ListItem.default, {
        ContainerProps: {
          className: 'bubu'
        }
      }, _ref15, _ref16));

      _chai.assert.strictEqual(wrapper.hasClass(classes.container), true);

      _chai.assert.strictEqual(wrapper.hasClass('bubu'), true);
    });
  });
});