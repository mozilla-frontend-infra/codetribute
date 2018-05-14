"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _chai = require("chai");

var _sinon = require("sinon");

var _testUtils = require("../test-utils");

var _GridListTile = _interopRequireDefault(require("./GridListTile"));

var _ref = _react.default.createElement(_GridListTile.default, null);

var _ref2 = _react.default.createElement("div", null);

var _ref3 = _react.default.createElement("img", {
  alt: "test"
});

var _ref4 = _react.default.createElement("img", {
  alt: "test2"
});

var _ref5 = _react.default.createElement(_GridListTile.default, null);

describe('<GridListTile />', function () {
  var shallow;
  var mount;
  var classes;
  var GridListTileNaked = (0, _testUtils.unwrap)(_GridListTile.default);
  before(function () {
    shallow = (0, _testUtils.createShallow)({
      dive: true
    });
    mount = (0, _testUtils.createMount)();
    classes = (0, _testUtils.getClasses)(_ref);
  });
  after(function () {
    mount.cleanUp();
  });
  var tileData = {
    img: 'images/grid-list/00-52-29-429_640.jpg',
    title: 'Breakfast',
    author: 'jill111'
  };
  it('should render a li', function () {
    var children = _react.default.createElement("img", {
      src: tileData.img,
      alt: "foo"
    });

    var wrapper = shallow(_react.default.createElement(_GridListTile.default, null, children));

    _chai.assert.strictEqual(wrapper.name(), 'li');
  });
  it('should render a ul', function () {
    var children = _react.default.createElement("img", {
      src: tileData.img,
      alt: "foo"
    });

    var wrapper = shallow(_react.default.createElement(_GridListTile.default, {
      component: "li"
    }, children));

    _chai.assert.strictEqual(wrapper.name(), 'li');
  });
  describe('prop: children', function () {
    it('should render children by default', function () {
      var children = _react.default.createElement("img", {
        src: tileData.img,
        alt: "foo"
      });

      var wrapper = shallow(_react.default.createElement(_GridListTile.default, null, children));

      _chai.assert.strictEqual(wrapper.containsMatchingElement(children), true, 'should contain the children');
    });
    it('should not change non image child', function () {
      var children = _ref2;
      var wrapper = shallow(_react.default.createElement(_GridListTile.default, null, children));

      _chai.assert.strictEqual(wrapper.containsMatchingElement(children), true);
    });
  });
  describe('prop: className', function () {
    it('should renders className', function () {
      var children = _react.default.createElement("img", {
        src: tileData.img,
        alt: "foo"
      });

      var wrapper = shallow(_react.default.createElement(_GridListTile.default, {
        className: "foo"
      }, children));

      _chai.assert.strictEqual(wrapper.hasClass('foo'), true, 'should contain the className');
    });
  });
  describe('mount', function () {
    var instance;
    var wrapper;
    beforeEach(function () {
      wrapper = mount(_react.default.createElement(GridListTileNaked, {
        classes: {
          imgFullWidth: 'imgFullWidth foo',
          imgFullHeight: 'imgFullHeight'
        }
      }, _ref3));
      instance = wrapper.instance();
    });
    it('should handle missing image', function () {
      // Test that it doesn't crash.
      instance.imgElement = null;
      instance.ensureImageCover();
      instance.fit();
      instance.imgElement = {
        complete: false
      };
      instance.fit();

      _chai.assert.strictEqual(instance.imgElement instanceof HTMLElement, false);

      wrapper.setProps({
        children: _ref4
      });

      _chai.assert.strictEqual(instance.imgElement instanceof HTMLElement, true);
    });
    it('should fit the height', function () {
      instance.imgElement = {
        complete: true,
        width: 16,
        height: 9,
        parentNode: {
          offsetWidth: 4,
          offsetHeight: 3
        },
        classList: {
          remove: (0, _sinon.spy)(),
          add: (0, _sinon.spy)()
        },
        removeEventListener: function removeEventListener() {}
      };
      instance.ensureImageCover();

      _chai.assert.strictEqual(instance.imgElement.classList.remove.callCount, 1);

      _chai.assert.strictEqual(instance.imgElement.classList.remove.args[0][0], 'imgFullWidth');

      _chai.assert.strictEqual(instance.imgElement.classList.add.callCount, 1);

      _chai.assert.strictEqual(instance.imgElement.classList.add.args[0][0], 'imgFullHeight');
    });
    it('should fit the width', function () {
      instance.imgElement = {
        complete: true,
        width: 4,
        height: 3,
        parentNode: {
          offsetWidth: 16,
          offsetHeight: 9
        },
        classList: {
          remove: (0, _sinon.spy)(),
          add: (0, _sinon.spy)()
        },
        removeEventListener: function removeEventListener() {}
      };
      instance.ensureImageCover();

      _chai.assert.strictEqual(instance.imgElement.classList.remove.callCount, 1);

      _chai.assert.strictEqual(instance.imgElement.classList.remove.args[0][0], 'imgFullHeight');

      _chai.assert.strictEqual(instance.imgElement.classList.add.callCount, 1);

      _chai.assert.strictEqual(instance.imgElement.classList.add.args[0][0], 'imgFullWidth');
    });
  });
  describe('resize', function () {
    var clock;
    before(function () {
      clock = (0, _sinon.useFakeTimers)();
    });
    after(function () {
      clock.restore();
    });
    it('should handle the resize event', function () {
      var wrapper = shallow(_ref5);
      var instance = wrapper.instance();
      instance.imgElement = {
        complete: true,
        width: 4,
        height: 3,
        parentNode: {
          offsetWidth: 16,
          offsetHeight: 9
        },
        classList: {
          remove: (0, _sinon.spy)(),
          add: (0, _sinon.spy)()
        },
        removeEventListener: function removeEventListener() {}
      };
      wrapper.find('EventListener').at(0).simulate('resize');

      _chai.assert.strictEqual(instance.imgElement.classList.remove.callCount, 0);

      clock.tick(166);

      _chai.assert.strictEqual(instance.imgElement.classList.remove.callCount, 1);

      _chai.assert.strictEqual(instance.imgElement.classList.remove.args[0][0], classes.imgFullHeight);

      _chai.assert.strictEqual(instance.imgElement.classList.add.callCount, 1);

      _chai.assert.strictEqual(instance.imgElement.classList.add.args[0][0], classes.imgFullWidth);
    });
  });
});