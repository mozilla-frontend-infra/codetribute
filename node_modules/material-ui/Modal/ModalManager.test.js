"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _chai = require("chai");

var _scrollbarSize = _interopRequireDefault(require("dom-helpers/util/scrollbarSize"));

var _ModalManager = _interopRequireDefault(require("./ModalManager"));

describe('ModalManager', function () {
  var modalManager;
  var container1;
  before(function () {
    modalManager = new _ModalManager.default();
    container1 = document.createElement('div');
    document.body.appendChild(container1);
  });
  after(function () {
    document.body.removeChild(container1);
  });
  it('should add a modal only once', function () {
    var modal = {};
    var modalManager2 = new _ModalManager.default();
    var idx = modalManager2.add(modal, container1);

    _chai.assert.strictEqual(modalManager2.add(modal, container1), idx);

    modalManager2.remove(modal);
  });
  describe('managing modals', function () {
    var modal1;
    var modal2;
    var modal3;
    before(function () {
      modal1 = {};
      modal2 = {};
      modal3 = {};
    });
    it('should add modal1', function () {
      var idx = modalManager.add(modal1, container1);

      _chai.assert.strictEqual(idx, 0, 'should be the first modal');

      _chai.assert.strictEqual(modalManager.isTopModal(modal1), true, 'should be the top modal');
    });
    it('should add modal2', function () {
      var idx = modalManager.add(modal2, container1);

      _chai.assert.strictEqual(idx, 1, 'should be the second modal');

      _chai.assert.strictEqual(modalManager.isTopModal(modal2), true, 'should be the top modal');
    });
    it('should add modal3', function () {
      var idx = modalManager.add(modal3, container1);

      _chai.assert.strictEqual(idx, 2, 'should be the third modal');

      _chai.assert.strictEqual(modalManager.isTopModal(modal3), true, 'should be the top modal');
    });
    it('should remove modal2', function () {
      var idx = modalManager.remove(modal2);

      _chai.assert.strictEqual(idx, 1, 'should be the second modal');
    });
    it('should add modal2', function () {
      var idx = modalManager.add(modal2, container1);

      _chai.assert.strictEqual(idx, 2, 'should be the "third" modal');

      _chai.assert.strictEqual(modalManager.isTopModal(modal2), true, 'modal2 should be the top modal');

      _chai.assert.strictEqual(modalManager.isTopModal(modal3), false, 'modal3 should not be the top modal');
    });
    it('should remove modal3', function () {
      var idx = modalManager.remove(modal3);

      _chai.assert.strictEqual(idx, 1, 'should be the "second" modal');
    });
    it('should remove modal2', function () {
      var idx = modalManager.remove(modal2);

      _chai.assert.strictEqual(idx, 1, 'should be the "second" modal');

      _chai.assert.strictEqual(modalManager.isTopModal(modal1), true, 'modal1 should be the top modal');
    });
    it('should remove modal1', function () {
      var idx = modalManager.remove(modal1);

      _chai.assert.strictEqual(idx, 0, 'should be the "first" modal');
    });
    it('should not do anything', function () {
      var idx = modalManager.remove({
        nonExisting: true
      });

      _chai.assert.strictEqual(idx, -1, 'should not find the non existing modal');
    });
  });
  describe('overflow', function () {
    var fixedNode;
    beforeEach(function () {
      fixedNode = document.createElement('div');
      fixedNode.classList.add('mui-fixed');
      fixedNode.style.padding = '14px';
      document.body.appendChild(fixedNode);
      window.innerWidth += 1; // simulate a scrollbar
    });
    afterEach(function () {
      document.body.removeChild(fixedNode);
      window.innerWidth -= 1;
    });
    it('should handle the scroll', function () {
      var modal = {};
      var paddingRightBefore = container1.style.paddingRight;
      modalManager.add(modal, container1);

      _chai.assert.strictEqual(container1.style.overflow, 'hidden');

      _chai.assert.strictEqual(container1.style.paddingRight, "".concat((0, _scrollbarSize.default)(), "px"));

      _chai.assert.strictEqual(fixedNode.style.paddingRight, "".concat(14 + (0, _scrollbarSize.default)(), "px"));

      modalManager.remove(modal);

      _chai.assert.strictEqual(container1.style.overflow, '');

      _chai.assert.strictEqual(container1.style.paddingRight, paddingRightBefore);

      _chai.assert.strictEqual(fixedNode.style.paddingRight, '14px');
    });
  });
  describe('container aria-hidden', function () {
    var mountNode1;
    var container2;
    beforeEach(function () {
      container2 = document.createElement('div');
      document.body.appendChild(container2);
      mountNode1 = document.createElement('div');
      container2.appendChild(mountNode1);
      modalManager = new _ModalManager.default();
    });
    afterEach(function () {
      document.body.removeChild(container2);
    });
    it('should add aria-hidden to container siblings', function () {
      modalManager.add({}, container2);

      _chai.assert.strictEqual(mountNode1.getAttribute('aria-hidden'), 'true');
    });
    it('should add aria-hidden to previous modals', function () {
      var modal2 = {};
      var modal3 = {};
      var mountNode2 = document.createElement('div');
      modal2.mountNode = mountNode2;
      container2.appendChild(mountNode2);
      modalManager.add(modal2, container2);
      modalManager.add(modal3, container2);

      _chai.assert.strictEqual(mountNode1.getAttribute('aria-hidden'), 'true');

      _chai.assert.strictEqual(mountNode2.getAttribute('aria-hidden'), 'true');
    });
    it('should remove aria-hidden on americas next top modal', function () {
      var modal2 = {};
      var modal3 = {};
      var mountNode2 = document.createElement('div');
      modal2.mountNode = mountNode2;
      container2.appendChild(mountNode2);
      modalManager.add({}, container1);
      modalManager.add(modal2, container2);
      modalManager.add(modal3, container2);

      _chai.assert.strictEqual(mountNode2.getAttribute('aria-hidden'), 'true');

      modalManager.remove(modal3, container2);

      _chai.assert.strictEqual(mountNode2.getAttribute('aria-hidden'), null);
    });
    it('should remove aria-hidden on siblings', function () {
      var modal = {};
      modalManager.add(modal, container2);

      _chai.assert.strictEqual(mountNode1.getAttribute('aria-hidden'), 'true');

      modalManager.remove(modal, container2);

      _chai.assert.strictEqual(mountNode1.getAttribute('aria-hidden'), null);
    });
  });
});