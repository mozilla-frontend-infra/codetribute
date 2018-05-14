"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _react = _interopRequireDefault(require("react"));

var _chai = require("chai");

var _testUtils = require("../../test-utils");

describe('svg-icons', function () {
  var shallow;
  before(function () {
    shallow = (0, _testUtils.createShallow)();
  });
  it('should be able to render all of them', function (done) {
    // This test can only be run on the node env
    if (!_fs.default.readdir) {
      done();
      return;
    }

    _fs.default.readdir(__dirname, function (err, files) {
      if (err) {
        throw err;
      }

      files.forEach(function (file) {
        // Ignore no js files and tests
        if (file.indexOf('.js') === -1 || file.indexOf('spec.js') > -1) {
          return;
        } // eslint-disable-next-line global-require, import/no-dynamic-require


        var fileLoaded = require(_path.default.join(__dirname, file));

        if (!fileLoaded.default) {
          return;
        }

        var Icon = fileLoaded.default;
        var wrapper = shallow(_react.default.createElement(Icon, {
          className: "foo"
        }));

        _chai.assert.strictEqual(wrapper.hasClass('foo'), true);
      });
      done();
    });
  });
});