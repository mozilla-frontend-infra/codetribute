"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _chai = require("chai");

var _testUtils = require("../test-utils");

var _TableCell = _interopRequireDefault(require("./TableCell"));

var _ref = _react.default.createElement(_TableCell.default, null);

var _ref2 = _react.default.createElement(_TableCell.default, null);

var _ref3 = _react.default.createElement(_TableCell.default, {
  "data-my-prop": "woofTableCell"
});

var _ref4 = _react.default.createElement(_TableCell.default, {
  className: "woofTableCell"
});

var _ref5 = _react.default.createElement(_TableCell.default, {
  className: "woofTableCell",
  padding: "none"
});

var _ref6 = _react.default.createElement(_TableCell.default, {
  className: "woofTableCell",
  padding: "checkbox"
});

var _ref7 = _react.default.createElement(_TableCell.default, {
  className: "woofTableCell",
  padding: "dense"
});

var _ref8 = _react.default.createElement("p", {
  className: "test"
}, "Hello");

var _ref9 = _react.default.createElement(_TableCell.default, null);

var _ref10 = _react.default.createElement(_TableCell.default, {
  scope: "row"
});

var _ref11 = _react.default.createElement(_TableCell.default, null);

var _ref12 = _react.default.createElement(_TableCell.default, {
  component: "div"
});

var _ref13 = _react.default.createElement(_TableCell.default, null);

var _ref14 = _react.default.createElement(_TableCell.default, {
  variant: "head"
});

var _ref15 = _react.default.createElement(_TableCell.default, {
  variant: "body"
});

var _ref16 = _react.default.createElement(_TableCell.default, {
  variant: "body"
});

var _ref17 = _react.default.createElement(_TableCell.default, {
  variant: "footer"
});

var _ref18 = _react.default.createElement(_TableCell.default, {
  numeric: true
});

var _ref19 = _react.default.createElement(_TableCell.default, {
  sortDirection: "asc"
});

var _ref20 = _react.default.createElement(_TableCell.default, {
  sortDirection: "desc"
});

describe('<TableCell />', function () {
  var shallow;
  var classes;
  before(function () {
    shallow = (0, _testUtils.createShallow)({
      untilSelector: _TableCell.default,
      context: {
        table: {
          footer: true
        }
      }
    });
    classes = (0, _testUtils.getClasses)(_ref);
  });
  it('should render a td', function () {
    var wrapper = shallow(_ref2);

    _chai.assert.strictEqual(wrapper.name(), 'td');
  });
  it('should spread custom props on the root node', function () {
    var wrapper = shallow(_ref3);

    _chai.assert.strictEqual(wrapper.props()['data-my-prop'], 'woofTableCell', 'custom prop should be woofTableCell');
  });
  it('should render with the user, root and padding classes', function () {
    var wrapper = shallow(_ref4);

    _chai.assert.strictEqual(wrapper.hasClass('woofTableCell'), true);

    _chai.assert.strictEqual(wrapper.hasClass(classes.root), true);

    _chai.assert.strictEqual(wrapper.hasClass(classes.paddingDefault), false);
  });
  it('should render with the user, root and without the padding classes', function () {
    var wrapper = shallow(_ref5);

    _chai.assert.strictEqual(wrapper.hasClass('woofTableCell'), true);

    _chai.assert.strictEqual(wrapper.hasClass(classes.root), true);

    _chai.assert.strictEqual(wrapper.hasClass(classes.paddingDefault), false, 'should not have the padding class');
  });
  it('should render with the user, root, padding, and checkbox classes', function () {
    var wrapper = shallow(_ref6);

    _chai.assert.strictEqual(wrapper.hasClass('woofTableCell'), true);

    _chai.assert.strictEqual(wrapper.hasClass(classes.root), true);

    _chai.assert.strictEqual(wrapper.hasClass(classes.paddingCheckbox), true);
  });
  it('should render with the user, root, padding, and dense classes', function () {
    var wrapper = shallow(_ref7);

    _chai.assert.strictEqual(wrapper.hasClass('woofTableCell'), true);

    _chai.assert.strictEqual(wrapper.hasClass(classes.root), true);

    _chai.assert.strictEqual(wrapper.hasClass(classes.paddingDense), true);
  });
  it('should render children', function () {
    var children = _ref8;
    var wrapper = shallow(_react.default.createElement(_TableCell.default, null, children));

    _chai.assert.strictEqual(wrapper.childAt(0).equals(children), true);
  });
  it('should render a th with the head class when in the context of a table head', function () {
    var wrapper = shallow(_ref9);
    wrapper.setContext({
      table: {
        head: true
      }
    });

    _chai.assert.strictEqual(wrapper.name(), 'th');

    _chai.assert.strictEqual(wrapper.hasClass(classes.root), true);

    _chai.assert.strictEqual(wrapper.hasClass(classes.head), true, 'should have the head class');

    _chai.assert.strictEqual(wrapper.props().scope, 'col', 'should have the correct scope attribute');
  });
  it('should render specified scope attribute even when in the context of a table head', function () {
    var wrapper = shallow(_ref10);
    wrapper.setContext({
      table: {
        head: true
      }
    });

    _chai.assert.strictEqual(wrapper.props().scope, 'row', 'should have the specified scope attribute');
  });
  it('should render a th with the footer class when in the context of a table footer', function () {
    var wrapper = shallow(_ref11);
    wrapper.setContext({
      table: {
        footer: true
      }
    });

    _chai.assert.strictEqual(wrapper.name(), 'td');

    _chai.assert.strictEqual(wrapper.hasClass(classes.root), true);

    _chai.assert.strictEqual(wrapper.hasClass(classes.footer), true, 'should have the footer class');
  });
  it('should render a div when custom component prop is used', function () {
    var wrapper = shallow(_ref12);

    _chai.assert.strictEqual(wrapper.name(), 'div', 'should be a div element');

    _chai.assert.strictEqual(wrapper.hasClass(classes.root), true);
  });
  it('should render with the footer class when in the context of a table footer', function () {
    var wrapper = shallow(_ref13);
    wrapper.setContext({
      table: {
        footer: true
      }
    });

    _chai.assert.strictEqual(wrapper.hasClass(classes.root), true);

    _chai.assert.strictEqual(wrapper.hasClass(classes.footer), true, 'should have the footer class');
  });
  it('should render with the head class when variant is head, overriding context', function () {
    var wrapper = shallow(_ref14);
    wrapper.setContext({
      table: {
        footer: true
      }
    });

    _chai.assert.strictEqual(wrapper.hasClass(classes.head), true);

    _chai.assert.strictEqual(wrapper.props().scope, undefined, 'should have the correct scope attribute');
  });
  it('should render without head class when variant is body, overriding context', function () {
    var wrapper = shallow(_ref15);
    wrapper.setContext({
      table: {
        head: true
      }
    });

    _chai.assert.strictEqual(wrapper.hasClass(classes.head), false);
  });
  it('should render without footer class when variant is body, overriding context', function () {
    var wrapper = shallow(_ref16);
    wrapper.setContext({
      table: {
        footer: true
      }
    });

    _chai.assert.strictEqual(wrapper.hasClass(classes.footer), false);
  });
  it('should render with the footer class when variant is footer, overriding context', function () {
    var wrapper = shallow(_ref17);
    wrapper.setContext({
      table: {
        head: true
      }
    });

    _chai.assert.strictEqual(wrapper.hasClass(classes.footer), true);
  });
  it('should render with the numeric class', function () {
    var wrapper = shallow(_ref18);

    _chai.assert.strictEqual(wrapper.hasClass(classes.root), true);

    _chai.assert.strictEqual(wrapper.hasClass(classes.numeric), true, 'should have the numeric class');
  });
  it('should render aria-sort="ascending" when prop sortDirection="asc" provided', function () {
    var wrapper = shallow(_ref19);

    _chai.assert.strictEqual(wrapper.props()['aria-sort'], 'ascending');
  });
  it('should render aria-sort="descending" when prop sortDirection="desc" provided', function () {
    var wrapper = shallow(_ref20);

    _chai.assert.strictEqual(wrapper.props()['aria-sort'], 'descending');
  });
});