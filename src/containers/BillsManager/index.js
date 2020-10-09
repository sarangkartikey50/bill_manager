import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import billManagerActions from 'redux/actions/billManager';
import Loader from 'shared/Loader';
import styles from './index.module.scss';

const BillsManager = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(billManagerActions.getBills());
  }, []);
  return (
    <div className={styles.container}>
      <Loader />
    </div>
  );
}

export default BillsManager;