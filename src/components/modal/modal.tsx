import ModalOverlay from '../modal-overlay/modal-overlay';
import styles from './modal.module.css';
import PropTypes from 'prop-types';
import {createPortal} from 'react-dom';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useRef } from 'react';

const Modal = ({header, children, modalClose}) => {
    const modalRoot = document.getElementById('modal') as HTMLElement;

    const modalClick = (event) => {
      event.stopPropagation();
    }

    const modalKeyDown = (event) => {
      if(event.key == 'Escape') {
        modalClose();
      }
    }

    useEffect(()=> {
      document.addEventListener('keydown', modalKeyDown);
      return () => {
        document.removeEventListener('keydown', modalKeyDown);
      }
    }, []);

    return createPortal(
        <>
          <ModalOverlay modalClose={modalClose}>
            <div className={'p-10 ' + styles.modalWindow} onClick={modalClick}>
                <header className={styles.modalHeader}>
                    <span className="text text_type_main-large">{header}</span>
                    <CloseIcon type="primary" onClick={() => modalClose()}/>
                </header>
                <section className="modalContent">
                    {children}
                </section>
            </div>
          </ModalOverlay>
        </>,
        modalRoot
      );
}

Modal.propTypes = {
  header: PropTypes.string,
  children: PropTypes.element.isRequired,
  modalClose: PropTypes.func.isRequired
};

export default Modal;