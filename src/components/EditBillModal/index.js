import React, { useState, memo } from 'react';
import PropTypes from 'prop-types';
import styles from './index.module.scss';

const EditBillModal = ({ bill, onSaveClick, onCloseClick }) => {
  const [description, setDescription] = useState(bill.description);
  const [category, setCategory] = useState(bill.category);
  const [amount, setAmount] = useState(bill.amount);
  const [date, setDate] = useState(bill.date);

  const handleInputChange = ({ target: { value, name } }) => {
    switch (name) {
      case 'description':
        setDescription(value);
        break;
      case 'category':
        setCategory(value);
        break;
      case 'amount':
        setAmount(value);
        break;
      case 'date':
        setDate(value);
        break;
      default:
    }
  };

  const handleSaveClick = () => {
    if (description && category && amount && date) {
      onSaveClick({
        description,
        category,
        amount,
        date,
      });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.overlay} />
      <div className={styles.modal}>
        <input
          placeholder='Enter description'
          name='description'
          value={description}
          onChange={handleInputChange}
        />
        <input
          placeholder='Enter category'
          name='category'
          value={category}
          onChange={handleInputChange}
        />
        <input
          placeholder='Enter amount'
          name='amount'
          value={amount}
          onChange={handleInputChange}
        />
        <input
          placeholder='Enter date (DD-MM-YYYY)'
          name='date'
          value={date}
          onChange={handleInputChange}
        />
        <div className={styles.actions}>
          <button onClick={handleSaveClick}>save</button>
          <button onClick={onCloseClick}>close</button>
        </div>
      </div>
    </div>
  );
};

EditBillModal.propTypes = {
  bill: PropTypes.array, 
  onSaveClick: PropTypes.func, 
  onCloseClick: PropTypes.func,
};

export default memo(EditBillModal);
