import styles from './modal-overlay.module.css';
import { motion } from "framer-motion";
import { TModalOverlayProps } from '../../services/types/modal-types';
import { FC } from 'react';

const ModalOverlay: FC<TModalOverlayProps> = ({children, modalClose}) => {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className={styles.overlay} onClick={() => modalClose()}>
                {children}
            </div>
        </motion.div>
    )
}

export default ModalOverlay;