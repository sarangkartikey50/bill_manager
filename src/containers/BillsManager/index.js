import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import size from 'lodash/size';
import billManagerActions from 'redux/actions/billManager';
import Loader from 'shared/Loader';
import BillsTable from 'components/BillsTable';
import EditBillModal from 'components/EditBillModal';
import SelectCategory from 'components/SelectCategory';
import TimeSeriesChart from 'components/TimeSeriesChart';
import styles from './index.module.scss';

const BillsManager = () => {
  const dispatch = useDispatch();
  const [showEditBillModal, setShowEditBillModal] = useState(false);
  const [editId, setEditId] = useState(0);
  const [filterCategory, setFilterCategory] = useState('all');

  const bills = useSelector((state) => get(state, 'billManager.bills', []));
  const billsLoading = useSelector((state) =>
    get(state, 'billManager.billsLoading', false)
  );
  const billsError = useSelector((state) =>
    get(state, 'billManager.billsError', {})
  );
  const billsById = useSelector((state) =>
    get(state, 'billManager.billsById', {})
  );
  const categories = useSelector((state) =>
    get(state, 'billManager.categories', [])
  );
  const timeSeriesChartData = useSelector((state) =>
    get(state, 'billManager.timeSeriesChartData', [])
  );

  useEffect(() => {
    dispatch(billManagerActions.getBills());
  }, []);

  const handleDeleteBillClick = useCallback(({ id }) => {
    dispatch(billManagerActions.deleteBill(id));
  }, []);

  const handleEditBillClick = useCallback(
    ({ id }) => {
      setEditId(id);
      setShowEditBillModal(true);
    },
    [editId, showEditBillModal]
  );

  const handleEditModalCloseClik = useCallback(() => {
    setShowEditBillModal(false);
    setEditId(0);
  }, [showEditBillModal, editId]);

  const handleEditModalSaveClick = useCallback(
    (newBill) => {
      setShowEditBillModal(false);
      dispatch(
        billManagerActions.updateBill({
          id: editId,
          ...newBill,
        })
      );
      setEditId(0);
    },
    [showEditBillModal, editId]
  );

  const handleAddBillClick = () => {
    setShowEditBillModal(true);
  };

  const handleFilterCategoryChange = useCallback(
    ({ category }) => {
      setFilterCategory(category);
    },
    [filterCategory]
  );

  return (
    <div className={styles.container}>
      {billsLoading ? (
        <Loader className={styles.loader} />
      ) : !isEmpty(billsError) ? (
        <div>something went wrong</div>
      ) : size(bills) ? (
        <div className={styles.billsWrapper}>
          <BillsTable
            bills={bills}
            onDeleteBillClick={handleDeleteBillClick}
            onEditBillClick={handleEditBillClick}
            filterCategory={filterCategory}
          />
        </div>
      ) : (
        <div className={styles.zeroCase}>No bills found</div>
      )}
      <div className={styles.footer}>
        <SelectCategory
          className={styles.selectCategory}
          filterCategory={filterCategory}
          onChange={handleFilterCategoryChange}
          categories={categories}
        />
        <button className={styles.addBill} onClick={handleAddBillClick}>
          add bill
        </button>
      </div>
      <TimeSeriesChart data={timeSeriesChartData} />
      {showEditBillModal ? (
        <EditBillModal
          bill={get(billsById, editId, {})}
          onCloseClick={handleEditModalCloseClik}
          onSaveClick={handleEditModalSaveClick}
        />
      ) : null}
    </div>
  );
};

export default BillsManager;
