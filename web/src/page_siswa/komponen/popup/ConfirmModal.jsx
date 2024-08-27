import React from 'react';
import Styles from './ConfirmModal.module.css'; 

const ConfirmModal = ({ show, onConfirm, onCancel, message }) => {
  if (!show) return null;

  return (
    <div className={Styles.modalBackdrop}>
      <div className={Styles.modalContent}>
        <h2>{message}</h2>
        <div className={Styles.modalButtons}>
          <button onClick={onConfirm} className={Styles.confirmButton}>Ya</button>
          <button onClick={onCancel} className={Styles.cancelButton}>Tidak</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
