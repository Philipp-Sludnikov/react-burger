import styles from './modal-overlay.module.css';
import PropTypes from 'prop-types';
import { motion } from "framer-motion";

const ModalOverlay = ({children, modalClose}) => {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className={styles.overlay} onClick={() => modalClose()}>
                {children}
            </div>
        </motion.div>
    )
}

ModalOverlay.propTypes = {
    children: PropTypes.any.isRequired,
    modalClose: PropTypes.func.isRequired
  };

export default ModalOverlay;