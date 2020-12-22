import React, { PureComponent } from 'react';
import { number, string } from 'prop-types';

export default class KotlinIcon extends PureComponent {
  render() {
    const { className, size, fill } = this.props;

    return (
      <svg className={className} viewBox="0 0 24 24" height={size} fill={fill}>
        <path d="M1.3 24l11.3-11.5L24 24zM0 0h12L0 12.5zm13.4 0L0 14v10l12-12L24 0z" />
      </svg>
    );
  }
}

KotlinIcon.propTypes = {
  size: number,
  fill: string,
};

KotlinIcon.defaultProps = {
  size: 24,
  fill: 'currentColor',
};
