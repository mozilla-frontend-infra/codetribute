import _extends from "@babel/runtime/helpers/extends";
import React from 'react';
import { assert } from 'chai';
import { createShallow, createMount } from '../test-utils';
import Select from '../Select';
import IconButton from '../IconButton';
import TableFooter from './TableFooter';
import TableCell from './TableCell';
import TablePagination from './TablePagination';
import Typography from '../Typography';
import TableRow from './TableRow';
describe('<TablePagination />', () => {
  const noop = () => {};

  let shallow;
  let mount;
  before(() => {
    shallow = createShallow({
      dive: true
    });
    mount = createMount();
  });
  after(() => {
    mount.cleanUp();
  });

  var _ref = React.createElement(TablePagination, {
    count: 1,
    page: 0,
    onChangePage: noop,
    onChangeRowsPerPage: noop,
    rowsPerPage: 5
  });

  it('should render a TableCell', () => {
    const wrapper = shallow(_ref);
    assert.strictEqual(wrapper.type(), TableCell);
  });

  var _ref2 = React.createElement(TablePagination, {
    count: 1,
    page: 0,
    onChangePage: noop,
    onChangeRowsPerPage: noop,
    rowsPerPage: 5,
    "data-my-prop": "woofTablePagination"
  });

  it('should spread custom props on the root node', () => {
    const wrapper = shallow(_ref2);
    assert.strictEqual(wrapper.props()['data-my-prop'], 'woofTablePagination', 'custom prop should be woofTablePagination');
  });

  var _ref3 = React.createElement(TablePagination, {
    count: 1,
    page: 0,
    onChangePage: noop,
    onChangeRowsPerPage: noop,
    rowsPerPage: 5
  });

  var _ref4 = React.createElement(TablePagination, {
    component: "div",
    count: 1,
    page: 0,
    onChangePage: noop,
    onChangeRowsPerPage: noop,
    rowsPerPage: 5
  });

  describe('prop: component', () => {
    it('should render a TableCell by default', () => {
      const wrapper = shallow(_ref3);
      assert.strictEqual(wrapper.type(), TableCell);
      assert.notStrictEqual(wrapper.props().colSpan, undefined);
    });
    it('should be able to use outside of the table', () => {
      const wrapper = shallow(_ref4);
      assert.strictEqual(wrapper.name(), 'div');
      assert.strictEqual(wrapper.props().colSpan, undefined);
    });
  });

  var _ref5 = React.createElement("table", null, React.createElement(TableFooter, null, React.createElement(TableRow, null, React.createElement(TablePagination, {
    count: 1,
    page: 0,
    onChangePage: noop,
    onChangeRowsPerPage: noop,
    rowsPerPage: 5,
    labelRowsPerPage: "Zeilen pro Seite:"
  }))));

  var _ref6 = React.createElement("table", null, React.createElement(TableFooter, null, React.createElement(TableRow, null, React.createElement(TablePagination, {
    count: 6,
    page: 0,
    onChangePage: noop,
    onChangeRowsPerPage: noop,
    rowsPerPage: 5
  }))));

  var _ref7 = React.createElement("table", null, React.createElement(TableFooter, null, React.createElement(TableRow, null, React.createElement(TablePagination, {
    count: 6,
    page: 1,
    onChangePage: noop,
    onChangeRowsPerPage: noop,
    rowsPerPage: 5
  }))));

  var _ref8 = React.createElement("table", null, React.createElement(TableFooter, null, React.createElement(TableRow, null, React.createElement(TablePagination, {
    count: 0,
    page: 0,
    rowsPerPage: 5,
    onChangePage: noop,
    onChangeRowsPerPage: noop
  }))));

  describe('mount', () => {
    it('should use the labelDisplayedRows callback', () => {
      let labelDisplayedRowsCalled = false;

      function labelDisplayedRows({
        from,
        to,
        count,
        page
      }) {
        labelDisplayedRowsCalled = true;
        assert.strictEqual(from, 6);
        assert.strictEqual(to, 10);
        assert.strictEqual(count, 42);
        assert.strictEqual(page, 1);
        return `Page ${page}`;
      }

      const wrapper = mount(React.createElement("table", null, React.createElement(TableFooter, null, React.createElement(TableRow, null, React.createElement(TablePagination, {
        count: 42,
        page: 1,
        onChangePage: noop,
        onChangeRowsPerPage: noop,
        rowsPerPage: 5,
        labelDisplayedRows: labelDisplayedRows
      })))));
      assert.strictEqual(labelDisplayedRowsCalled, true);
      assert.strictEqual(wrapper.html().includes('Page 1'), true);
    });
    it('should use labelRowsPerPage', () => {
      const wrapper = mount(_ref5);
      assert.strictEqual(wrapper.html().includes('Zeilen pro Seite:'), true);
    });
    it('should disable the back button on the first page', () => {
      const wrapper = mount(_ref6);
      const backButton = wrapper.find(IconButton).at(0);
      const nextButton = wrapper.find(IconButton).at(1);
      assert.strictEqual(backButton.props().disabled, true);
      assert.strictEqual(nextButton.props().disabled, false);
    });
    it('should disable the next button on the last page', () => {
      const wrapper = mount(_ref7);
      const backButton = wrapper.find(IconButton).at(0);
      const nextButton = wrapper.find(IconButton).at(1);
      assert.strictEqual(backButton.props().disabled, false);
      assert.strictEqual(nextButton.props().disabled, true);
    });
    it('should handle next button clicks properly', () => {
      let page = 1;
      const wrapper = mount(React.createElement("table", null, React.createElement(TableFooter, null, React.createElement(TableRow, null, React.createElement(TablePagination, {
        count: 15,
        page: page,
        onChangePage: (event, nextPage) => {
          page = nextPage;
        },
        onChangeRowsPerPage: noop,
        rowsPerPage: 5
      })))));
      const nextButton = wrapper.find(IconButton).at(1);
      nextButton.simulate('click');
      assert.strictEqual(page, 2);
    });
    it('should handle back button clicks properly', () => {
      let page = 1;
      const wrapper = mount(React.createElement("table", null, React.createElement(TableFooter, null, React.createElement(TableRow, null, React.createElement(TablePagination, {
        count: 15,
        page: page,
        onChangePage: (event, nextPage) => {
          page = nextPage;
        },
        onChangeRowsPerPage: noop,
        rowsPerPage: 5
      })))));
      const nextButton = wrapper.find(IconButton).at(0);
      nextButton.simulate('click');
      assert.strictEqual(page, 0);
    });
    it('should handle too high pages after changing rowsPerPage', () => {
      let page = 2;

      function ExampleTable(props) {
        // setProps only works on the mounted root element, so wrap the table
        return React.createElement("table", null, React.createElement(TableFooter, null, React.createElement(TableRow, null, React.createElement(TablePagination, _extends({
          count: 11,
          page: page,
          onChangePage: (event, nextPage) => {
            page = nextPage;
          },
          onChangeRowsPerPage: noop
        }, props)))));
      }

      const wrapper = mount(React.createElement(ExampleTable, {
        rowsPerPage: 5
      }));
      wrapper.setProps({
        rowsPerPage: 10
      }); // now, the third page doesn't exist anymore

      assert.strictEqual(page, 1);
    });
    it('should display 0 as start number if the table is empty ', () => {
      const wrapper = mount(_ref8);
      assert.strictEqual(wrapper.find(Typography).at(1).text(), '0-0 of 0');
    });
    it('should call onChangePage with 0 if the table becomes empty', () => {
      let page = 1;

      function ExampleTable(props) {
        // setProps only works on the mounted root element, so wrap the table
        return React.createElement("table", null, React.createElement(TableFooter, null, React.createElement(TableRow, null, React.createElement(TablePagination, _extends({
          page: 1,
          rowsPerPage: 5,
          onChangePage: (event, newPage) => {
            page = newPage;
          },
          onChangeRowsPerPage: noop
        }, props)))));
      }

      const wrapper = mount(React.createElement(ExampleTable, {
        count: 10
      }));
      wrapper.setProps({
        count: 0
      }); // now, there is one page, which is empty

      assert.strictEqual(page, 0);
    });
    it('should hide the rows per page selector if there are less than two options', () => {
      const wrapper = mount(React.createElement("table", null, React.createElement(TableFooter, null, React.createElement(TableRow, null, React.createElement(TablePagination, {
        page: 0,
        rowsPerPage: 5,
        rowsPerPageOptions: [5],
        onChangePage: noop,
        onChangeRowsPerPage: noop,
        count: 10
      })))));
      assert.strictEqual(wrapper.text().indexOf('Rows per page'), -1);
      assert.strictEqual(wrapper.find(Select).length, 0);
    });
  });
});