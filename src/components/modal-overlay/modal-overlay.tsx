import styles from './modal-overlay.module.css';
import PropTypes from 'prop-types';

const ModalOverlay = ({children, modalClose}) => {
    return (
        <div className={styles.overlay} onClick={() => modalClose()}>
            {children}
        </div>
    )
}

ModalOverlay.propTypes = {
    children: PropTypes.any.isRequired,
    modalClose: PropTypes.func.isRequired
  };

export default ModalOverlay;