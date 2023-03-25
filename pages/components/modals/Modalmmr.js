import styles from './Modal.module.css';

export default function ModalMMR({ isOpen, onClose, children }) {
  return (
    <>
      {isOpen && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <img src='../images/x_close.svg' className={styles.closeButton} onClick={onClose}></img>
            {children}
          </div>
        </div>
      )}
    </>
  );
}