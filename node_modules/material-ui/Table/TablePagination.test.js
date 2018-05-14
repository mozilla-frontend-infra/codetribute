"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _chai = require("chai");

var _testUtils = require("../test-utils");

var _Select = _interopRequireDefault(require("../Select"));

var _IconButton = _interopRequireDefault(require("../IconButton"));

var _TableFooter = _interopRequireDefault(require("./TableFooter"));

var _TableCell = _interopRequireDefault(require("./TableCell"));

var _TablePagination = _interopRequireDefault(require("./TablePagination"));

var _Typography = _interopRequireDefault(require("../Typography"));

var _TableRow = _interopRequireDefault(require("./TableRow"));

describe('<TablePagination />', function () {
  var noop = function noop() {};

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

  var _ref = _react.default.createElement(_TablePagination.default, {
    count: 1,
    page: 0,
    onChangePage: noop,
    onChangeRowsPerPage: noop,
    rowsPerPage: 5
  });

  it('should render a TableCell', function () {
    var wrapper = shallow(_ref);

    _chai.assert.strictEqual(wrapper.type(), _TableCell.default);
  });

  var _ref2 = _react.default.createElement(_TablePagination.default, {
    count: 1,
    page: 0,
    onChangePage: noop,
    onChangeRowsPerPage: noop,
    rowsPerPage: 5,
    "data-my-prop": "woofTablePagination"
  });

  it('should spread custom props on the root node', function () {
    var wrapper = shallow(_ref2);

    _chai.assert.strictEqual(wrapper.props()['data-my-prop'], 'woofTablePagination', 'custom prop should be woofTablePagination');
  });

  var _ref3 = _react.default.createElement(_TablePagination.default, {
    count: 1,
    page: 0,
    onChangePage: noop,
    onChangeRowsPerPage: noop,
    rowsPerPage: 5
  });

  var _ref4 = _react.default.createElement(_TablePagination.default, {
    component: "div",
    count: 1,
    page: 0,
    onChangePage: noop,
    onChangeRowsPerPage: noop,
    rowsPerPage: 5
  });

  describe('prop: component', function () {
    it('should render a TableCell by default', function () {
      var wrapper = shallow(_ref3);

      _chai.assert.strictEqual(wrapper.type(), _TableCell.default);

      _chai.assert.notStrictEqual(wrapper.props().colSpan, undefined);
    });
    it('should be able to use outside of the table', function () {
      var wrapper = shallow(_ref4);

      _chai.assert.strictEqual(wrapper.name(), 'div');

      _chai.assert.strictEqual(wrapper.props().colSpan, undefined);
    });
  });

  var _ref6 = _react.default.createElement("table", null, _react.default.createElement(_TableFooter.default, null, _react.default.createElement(_TableRow.default, null, _react.default.createElement(_TablePagination.default, {
    count: 1,
    page: 0,
    onChangePage: noop,
    onChangeRowsPerPage: noop,
    rowsPerPage: 5,
    labelRowsPerPage: "Zeilen pro Seite:"
  }))));

  var _ref7 = _react.default.createElement("table", null, _react.default.createElement(_TableFooter.default, null, _react.default.createElement(_TableRow.default, null, _react.default.createElement(_TablePagination.default, {
    count: 6,
    page: 0,
    onChangePage: noop,
    onChangeRowsPerPage: noop,
    rowsPerPage: 5
  }))));

  var _ref8 = _react.default.createElement("table", null, _react.default.createElement(_TableFooter.default, null, _react.default.createElement(_TableRow.default, null, _react.default.createElement(_TablePagination.default, {
    count: 6,
    page: 1,
    onChangePage: noop,
    onChangeRowsPerPage: noop,
    rowsPerPage: 5
  }))));

  var _ref9 = _react.default.createElement("table", null, _react.default.createElement(_TableFooter.default, null, _react.default.createElement(_TableRow.default, null, _react.default.createElement(_TablePagination.default, {
    count: 0,
    page: 0,
    rowsPerPage: 5,
    onChangePage: noop,
    onChangeRowsPerPage: noop
  }))));

  describe('mount', function () {
    it('should use the labelDisplayedRows callback', function () {
      var labelDisplayedRowsCalled = false;

      function labelDisplayedRows(_ref5) {
        var from = _ref5.from,
            to = _ref5.to,
            count = _ref5.count,
            page = _ref5.page;
        labelDisplayedRowsCalled = true;

        _chai.assert.strictEqual(from, 6);

        _chai.assert.strictEqual(to, 10);

        _chai.assert.strictEqual(count, 42);

        _chai.assert.strictEqual(page, 1);

        return "Page ".concat(page);
      }

      var wrapper = mount(_react.default.createElement("table", null, _react.default.createElement(_TableFooter.default, null, _react.default.createElement(_TableRow.default, null, _react.default.createElement(_TablePagination.default, {
        count: 42,
        page: 1,
        onChangePage: noop,
        onChangeRowsPerPage: noop,
        rowsPerPage: 5,
        labelDisplayedRows: labelDisplayedRows
      })))));

      _chai.assert.strictEqual(labelDisplayedRowsCalled, true);

      _chai.assert.strictEqual(wrapper.html().includes('Page 1'), true);
    });
    it('should use labelRowsPerPage', function () {
      var wrapper = mount(_ref6);

      _chai.assert.strictEqual(wrapper.html().includes('Zeilen pro Seite:'), true);
    });
    it('should disable the back button on the first page', function () {
      var wrapper = mount(_ref7);
      var backButton = wrapper.find(_IconButton.default).at(0);
      var nextButton = wrapper.find(_IconButton.default).at(1);

      _chai.assert.strictEqual(backButton.props().disabled, true);

      _chai.assert.strictEqual(nextButton.props().disabled, false);
    });
    it('should disable the next button on the last page', function () {
      var wrapper = mount(_ref8);
      var backButton = wrapper.find(_IconButton.default).at(0);
      var nextButton = wrapper.find(_IconButton.default).at(1);

      _chai.assert.strictEqual(backButton.props().disabled, false);

      _chai.assert.strictEqual(nextButton.props().disabled, true);
    });
    it('should handle next button clicks properly', function () {
      var page = 1;
      var wrapper = mount(_react.default.createElement("table", null, _react.default.createElement(_TableFooter.default, null, _react.default.createElement(_TableRow.default, null, _react.default.createElement(_TablePagination.default, {
        count: 15,
        page: page,
        onChangePage: function onChangePage(event, nextPage) {
          page = nextPage;
        },
        onChangeRowsPerPage: noop,
        rowsPerPage: 5
      })))));
      var nextButton = wrapper.find(_IconButton.default).at(1);
      nextButton.simulate('click');

      _chai.assert.strictEqual(page, 2);
    });
    it('should handle back button clicks properly', function () {
      var page = 1;
      var wrapper = mount(_react.default.createElement("table", null, _react.default.createElement(_TableFooter.default, null, _react.default.createElement(_TableRow.default, null, _react.default.createElement(_TablePagination.default, {
        count: 15,
        page: page,
        onChangePage: function onChangePage(event, nextPage) {
          page = nextPage;
        },
        onChangeRowsPerPage: noop,
        rowsPerPage: 5
      })))));
      var nextButton = wrapper.find(_IconButton.default).at(0);
      nextButton.simulate('click');

      _chai.assert.strictEqual(page, 0);
    });
    it('should handle too high pages after changing rowsPerPage', function () {
      var page = 2;

      function ExampleTable(props) {
        // setProps only works on the mounted root element, so wrap the table
        return _react.default.createElement("table", null, _react.default.createElement(_TableFooter.default, null, _react.default.createElement(_TableRow.default, null, _react.default.createElement(_TablePagination.default, (0, _extends2.default)({
          count: 11,
          page: page,
          onChangePage: function onChangePage(event, nextPage) {
            page = nextPage;
          },
          onChangeRowsPerPage: noop
        }, props)))));
      }

      var wrapper = mount(_react.default.createElement(ExampleTable, {
        rowsPerPage: 5
      }));
      wrapper.setProps({
        rowsPerPage: 10
      }); // now, the third page doesn't exist anymore

      _chai.assert.strictEqual(page, 1);
    });
    it('should display 0 as start number if the table is empty ', function () {
      var wrapper = mount(_ref9);

      _chai.assert.strictEqual(wrapper.find(_Typography.default).at(1).text(), '0-0 of 0');
    });
    it('should call onChangePage with 0 if the table becomes empty', function () {
      var page = 1;

      function ExampleTable(props) {
        // setProps only works on the mounted root element, so wrap the table
        return _react.default.createElement("table", null, _react.default.createElement(_TableFooter.default, null, _react.default.createElement(_TableRow.default, null, _react.default.createElement(_TablePagination.default, (0, _extends2.default)({
          page: 1,
          rowsPerPage: 5,
          onChangePage: function onChangePage(event, newPage) {
            page = newPage;
          },
          onChangeRowsPerPage: noop
        }, props)))));
      }

      var wrapper = mount(_react.default.createElement(ExampleTable, {
        count: 10
      }));
      wrapper.setProps({
        count: 0
      }); // now, there is one page, which is empty

      _chai.assert.strictEqual(page, 0);
    });
    it('should hide the rows per page selector if there are less than two options', function () {
      var wrapper = mount(_react.default.createElement("table", null, _react.default.createElement(_TableFooter.default, null, _react.default.createElement(_TableRow.default, null, _react.default.createElement(_TablePagination.default, {
        page: 0,
        rowsPerPage: 5,
        rowsPerPageOptions: [5],
        onChangePage: noop,
        onChangeRowsPerPage: noop,
        count: 10
      })))));

      _chai.assert.strictEqual(wrapper.text().indexOf('Rows per page'), -1);

      _chai.assert.strictEqual(wrapper.find(_Select.default).length, 0);
    });
  });
});