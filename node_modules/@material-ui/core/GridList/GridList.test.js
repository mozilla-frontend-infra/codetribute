"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _chai = require("chai");

var _testUtils = require("../test-utils");

var _GridList = _interopRequireDefault(require("./GridList"));

var tilesData = [{
  img: 'images/grid-list/00-52-29-429_640.jpg',
  title: 'Breakfast',
  author: 'jill111'
}, {
  img: 'images/grid-list/burger-827309_640.jpg',
  title: 'Tasty burger',
  author: 'director90'
}];

var _ref = _react.default.createElement(_GridList.default, null, _react.default.createElement("br", null));

var _ref2 = _react.default.createElement(_GridList.default, {
  component: "ul"
}, _react.default.createElement("br", null));

var _ref3 = _react.default.createElement("span", null, "this is a null child");

var _ref4 = _react.default.createElement(_GridList.default, {
  cellHeight: "auto"
}, _react.default.createElement("br", null));

describe('<GridList />', function () {
  var shallow;
  before(function () {
    shallow = (0, _testUtils.createShallow)({
      dive: true
    });
  });
  it('should render a ul', function () {
    var wrapper = shallow(_ref);

    _chai.assert.strictEqual(wrapper.name(), 'ul');
  });
  it('should render a ul', function () {
    var wrapper = shallow(_ref2);

    _chai.assert.strictEqual(wrapper.name(), 'ul');
  });
  it('should render children and change cellHeight', function () {
    var cellHeight = 250;
    var wrapper = shallow(_react.default.createElement(_GridList.default, {
      cellHeight: cellHeight
    }, tilesData.map(function (tile) {
      return _react.default.createElement("span", {
        key: tile.img,
        className: "grid-tile",
        title: tile.title,
        subtitle: _react.default.createElement("span", null, "by: ", tile.author)
      }, _react.default.createElement("img", {
        src: tile.img,
        alt: "foo"
      }));
    })));

    _chai.assert.strictEqual(wrapper.find('.grid-tile').length, 2, 'should contain the children');

    _chai.assert.strictEqual(wrapper.children().at(0).prop('style').height, cellHeight + 4, 'should have height to 254');
  });
  it('renders children by default', function () {
    var wrapper = shallow(_react.default.createElement(_GridList.default, null, tilesData.map(function (tile) {
      return _react.default.createElement("span", {
        key: tile.img,
        className: "grid-tile",
        title: tile.title,
        subtitle: _react.default.createElement("span", null, "by: ", tile.author)
      }, _react.default.createElement("img", {
        src: tile.img,
        alt: "foo"
      }));
    }), false && _ref3));

    _chai.assert.strictEqual(wrapper.find('.grid-tile').length, 2, 'should contain the children');
  });
  it('renders children and change cols', function () {
    var wrapper = shallow(_react.default.createElement(_GridList.default, {
      cols: 4
    }, tilesData.map(function (tile) {
      return _react.default.createElement("span", {
        key: tile.img,
        className: "grid-tile",
        title: tile.title,
        subtitle: _react.default.createElement("span", null, "by: ", tile.author)
      }, _react.default.createElement("img", {
        src: tile.img,
        alt: "foo"
      }));
    })));

    _chai.assert.strictEqual(wrapper.find('.grid-tile').length, 2, 'should contain the children');

    _chai.assert.strictEqual(wrapper.children().at(0).prop('style').width, '25%', 'should have 25% of width');
  });
  it('renders children and change spacing', function () {
    var spacing = 10;
    var wrapper = shallow(_react.default.createElement(_GridList.default, {
      spacing: spacing
    }, tilesData.map(function (tile) {
      return _react.default.createElement("span", {
        key: tile.img,
        className: "grid-tile",
        title: tile.title,
        subtitle: _react.default.createElement("span", null, "by: ", tile.author)
      }, _react.default.createElement("img", {
        src: tile.img,
        alt: "foo"
      }));
    })));

    _chai.assert.strictEqual(wrapper.find('.grid-tile').length, 2, 'should contain the children');

    _chai.assert.strictEqual(wrapper.children().at(0).prop('style').padding, spacing / 2, 'should have 5 of padding');
  });
  it('should render children and overwrite style', function () {
    var style = {
      backgroundColor: 'red'
    };
    var wrapper = shallow(_react.default.createElement(_GridList.default, {
      style: style
    }, tilesData.map(function (tile) {
      return _react.default.createElement("span", {
        key: tile.img,
        className: "grid-tile",
        title: tile.title,
        subtitle: _react.default.createElement("span", null, "by: ", tile.author)
      }, _react.default.createElement("img", {
        src: tile.img,
        alt: "foo"
      }));
    })));

    _chai.assert.strictEqual(wrapper.find('.grid-tile').length, 2, 'should contain the children');

    _chai.assert.strictEqual(wrapper.prop('style').backgroundColor, style.backgroundColor, 'should have a red backgroundColor');
  });
  describe('prop: cellHeight', function () {
    it('should accept auto as a property', function () {
      var wrapper = shallow(_ref4);

      _chai.assert.strictEqual(wrapper.children().at(0).props().style.height, 'auto');
    });
  });
});