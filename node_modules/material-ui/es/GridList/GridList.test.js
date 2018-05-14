import React from 'react';
import { assert } from 'chai';
import { createShallow } from '../test-utils';
import GridList from './GridList';
const tilesData = [{
  img: 'images/grid-list/00-52-29-429_640.jpg',
  title: 'Breakfast',
  author: 'jill111'
}, {
  img: 'images/grid-list/burger-827309_640.jpg',
  title: 'Tasty burger',
  author: 'director90'
}];

var _ref = React.createElement(GridList, null, React.createElement("br", null));

var _ref2 = React.createElement(GridList, {
  component: "ul"
}, React.createElement("br", null));

var _ref3 = React.createElement("span", null, "this is a null child");

var _ref4 = React.createElement(GridList, {
  cellHeight: "auto"
}, React.createElement("br", null));

describe('<GridList />', () => {
  let shallow;
  before(() => {
    shallow = createShallow({
      dive: true
    });
  });
  it('should render a ul', () => {
    const wrapper = shallow(_ref);
    assert.strictEqual(wrapper.name(), 'ul');
  });
  it('should render a ul', () => {
    const wrapper = shallow(_ref2);
    assert.strictEqual(wrapper.name(), 'ul');
  });
  it('should render children and change cellHeight', () => {
    const cellHeight = 250;
    const wrapper = shallow(React.createElement(GridList, {
      cellHeight: cellHeight
    }, tilesData.map(tile => React.createElement("span", {
      key: tile.img,
      className: "grid-tile",
      title: tile.title,
      subtitle: React.createElement("span", null, "by: ", tile.author)
    }, React.createElement("img", {
      src: tile.img,
      alt: "foo"
    })))));
    assert.strictEqual(wrapper.find('.grid-tile').length, 2, 'should contain the children');
    assert.strictEqual(wrapper.children().at(0).prop('style').height, cellHeight + 4, 'should have height to 254');
  });
  it('renders children by default', () => {
    const wrapper = shallow(React.createElement(GridList, null, tilesData.map(tile => React.createElement("span", {
      key: tile.img,
      className: "grid-tile",
      title: tile.title,
      subtitle: React.createElement("span", null, "by: ", tile.author)
    }, React.createElement("img", {
      src: tile.img,
      alt: "foo"
    }))), false && _ref3));
    assert.strictEqual(wrapper.find('.grid-tile').length, 2, 'should contain the children');
  });
  it('renders children and change cols', () => {
    const wrapper = shallow(React.createElement(GridList, {
      cols: 4
    }, tilesData.map(tile => React.createElement("span", {
      key: tile.img,
      className: "grid-tile",
      title: tile.title,
      subtitle: React.createElement("span", null, "by: ", tile.author)
    }, React.createElement("img", {
      src: tile.img,
      alt: "foo"
    })))));
    assert.strictEqual(wrapper.find('.grid-tile').length, 2, 'should contain the children');
    assert.strictEqual(wrapper.children().at(0).prop('style').width, '25%', 'should have 25% of width');
  });
  it('renders children and change spacing', () => {
    const spacing = 10;
    const wrapper = shallow(React.createElement(GridList, {
      spacing: spacing
    }, tilesData.map(tile => React.createElement("span", {
      key: tile.img,
      className: "grid-tile",
      title: tile.title,
      subtitle: React.createElement("span", null, "by: ", tile.author)
    }, React.createElement("img", {
      src: tile.img,
      alt: "foo"
    })))));
    assert.strictEqual(wrapper.find('.grid-tile').length, 2, 'should contain the children');
    assert.strictEqual(wrapper.children().at(0).prop('style').padding, spacing / 2, 'should have 5 of padding');
  });
  it('should render children and overwrite style', () => {
    const style = {
      backgroundColor: 'red'
    };
    const wrapper = shallow(React.createElement(GridList, {
      style: style
    }, tilesData.map(tile => React.createElement("span", {
      key: tile.img,
      className: "grid-tile",
      title: tile.title,
      subtitle: React.createElement("span", null, "by: ", tile.author)
    }, React.createElement("img", {
      src: tile.img,
      alt: "foo"
    })))));
    assert.strictEqual(wrapper.find('.grid-tile').length, 2, 'should contain the children');
    assert.strictEqual(wrapper.prop('style').backgroundColor, style.backgroundColor, 'should have a red backgroundColor');
  });
  describe('prop: cellHeight', () => {
    it('should accept auto as a property', () => {
      const wrapper = shallow(_ref4);
      assert.strictEqual(wrapper.children().at(0).props().style.height, 'auto');
    });
  });
});