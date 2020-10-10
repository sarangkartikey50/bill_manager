import React, { memo } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './index.module.scss';

const SelectCategory = ({
  className,
  categories,
  filterCategory,
  onChange,
}) => {
  const handleSelectChange = ({ target: { value } }) => {
    onChange({ category: value });
  };
  return (
    <div className={cx(styles.container, className)}>
      <select onChange={handleSelectChange}>
        <option value='all' selected={filterCategory === 'all'}>
          ALL
        </option>
        {categories.map((category) => (
          <option value={category} selected={filterCategory === category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

SelectCategory.propTypes = {
  className: PropTypes.string,
  categories: PropTypes.array,
  filterCategory: PropTypes.string,
  onChange: PropTypes.func,
};

export default memo(SelectCategory);
