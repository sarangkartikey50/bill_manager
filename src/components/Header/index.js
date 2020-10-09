import React, { memo } from 'react';
import styles from './index.module.scss';

const Header = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>Bill Manager</div>
    </div>
  );
}

export default memo(Header);