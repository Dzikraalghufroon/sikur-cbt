import React from 'react';
import Styles from './Modal.module.css';

function Modal({ show, handleClose, children, title }) {
    return (
        <div className={`${Styles.modal} ${show ? Styles.show : ''}`}>
            <div className={Styles.modalContent}>
                <span className={Styles.close} onClick={handleClose}>&times;</span>
                {title && <div className={Styles.modalHeader}>{title}</div>}
                <div className={Styles.modalBody}>
                    {children}
                </div>
                <div className={Styles.modalFooter}>
                    <button className={Styles.button} onClick={handleClose}>Close</button>
                </div>
            </div>
        </div>
    );
}

export default Modal;
