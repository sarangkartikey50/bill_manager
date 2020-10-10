import React, { memo } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './index.module.scss';

const Row = ({
  id,
  description,
  category,
  amount,
  date,
  onEditClick,
  onDeleteClick,
  canBePaid,
}) => {
  return (
    <tr className={cx({
      [styles.highlight]: canBePaid
    })}>
      <td>{id}</td>
      <td>{description}</td>
      <td>{category}</td>
      <td>{amount}</td>
      <td>{date}</td>
      <td>
        <button onClick={() => onEditClick({ id })}>edit</button>
        <button onClick={() => onDeleteClick({ id })}>delete</button>
      </td>
    </tr>
  );
};

Row.propTypes = {
  id: PropTypes.number,
  description: PropTypes.string,
  category: PropTypes.string,
  amount: PropTypes.number,
  date: PropTypes.string,
  onEditClick: PropTypes.func,
  onDeleteClick: PropTypes.func,
  canBePaid: PropTypes.bool,
};

const BillsTable = ({
  bills,
  onDeleteBillClick,
  onEditBillClick,
  filterCategory,
}) => {
  const filteredBills = bills.filter(
    (bill) => bill.category === filterCategory || filterCategory === 'all'
  );
  return (
    <div className={styles.container}>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Description</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredBills.map((bill) => (
            <Row
              key={bill.id}
              {...bill}
              onDeleteClick={onDeleteBillClick}
              onEditClick={onEditBillClick}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

BillsTable.propTypes = {
  bills: PropTypes.array,
  onDeleteBillClick: PropTypes.func,
  onEditBillClick: PropTypes.func,
  filterCategory: PropTypes.string,
};

export default memo(BillsTable);
