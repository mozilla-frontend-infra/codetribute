"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _chai = require("chai");

var _testUtils = require("../test-utils");

var _GridListTileBar = _interopRequireDefault(require("./GridListTileBar"));

describe('<GridListTileBar />', function () {
  var shallow;
  before(function () {
    shallow = (0, _testUtils.createShallow)({
      dive: true
    });
  });
  var tileData = {
    img: 'images/grid-list/00-52-29-429_640.jpg',
    title: 'Breakfast',
    author: 'jill111'
  };
  describe('prop: title', function () {
    it('should renders title', function () {
      var wrapper = shallow(_react.default.createElement(_GridListTileBar.default, {
        title: tileData.title
      }));

      _chai.assert.strictEqual(wrapper.children('div').text(), tileData.title, 'should contain the title');
    });
  });
});