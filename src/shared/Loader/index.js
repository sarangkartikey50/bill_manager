import React, { memo } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './index.module.scss';

const Loader = ({ className }) => {
  return (
    <svg className={cx(styles.container, className)} viewBox='0 0 34 34'>
      <path
        d='M17 32c8.284 0 15-6.716 15-15 0-8.284-6.716-15-15-15C8.716 2 2 8.716 2 17'
        stroke='currentColor'
        fill='none'
        strokeWidth='3'
        fillRule='evenodd'
      ></path>
    </svg>
  );
};

Loader.propTypes = {
  className: PropTypes.string,
};

export default memo(Loader);
